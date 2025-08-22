import { Player } from '../models/player.js';
import { getPlayingStyles, getDistinctPlayingStyles } from '../helpers/getPlayingStyles.js';
import { RATINGS, getDistinctRatingKeys } from '../helpers/getRatings.js';

export const getPlayers = async (req, res) => {
  const cookieFilters = req.signedCookies?.filters;

  const playingStyles = cookieFilters?.playingStyles || [];
  const search = cookieFilters?.search || '';
  let rating = cookieFilters?.rating || '2500-2900';
  const hasBeenChampion = cookieFilters?.hasBeenChampion === true;

  // Update rating value if a valid and different rating is selected, update the rating
  let ratingValues;

  const isRatingValid = Object.keys(RATINGS).includes(rating);
  // If invalid, just use the default value
  if (!isRatingValid) {
    rating = '2500-2900';
  }

  ratingValues = RATINGS[rating];

  const filter = {};
  // Ratings
  filter['personalDetails.peakFideRating'] = { $gte: ratingValues[0], $lte: ratingValues[1] };

  // Playing styles
  if (playingStyles.length) {
    filter['playingStyle'] = { $in: playingStyles };
  }

  // Search
  if (search && search.length) {
    // Break the name into different parts
    const nameParts = search.split(' ');

    // If the search is only one word, search for the whole thing in both firstName and lastName
    if (nameParts.length === 1) {
      filter['$or'] = [
        { 'personalDetails.firstName': { $regex: `\\Q${encodeURIComponent(search)}\\E`, $options: 'i' } }, // Case-insensitive match
        { 'personalDetails.lastName': { $regex: `\\Q${encodeURIComponent(search)}\\E`, $options: 'i' } },
      ];
    }
    // If there are two or more parts, search first part and rest as firstName and lastName
    else if (nameParts.length >= 2) {
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');

      filter['$or'] = [
        { 'personalDetails.firstName': { $regex: `\\Q${encodeURIComponent(firstName)}\\E`, $options: 'i' } }, // Case-insensitive match
        { 'personalDetails.lastName': { $regex: `\\Q${encodeURIComponent(lastName)}\\E`, $options: 'i' } },
      ];
    }
  }

  // Former champion
  if (hasBeenChampion) {
    filter['personalDetails.hasBeenChampion'] = true;
  }

  // hbs template options needed
  const options = {
    playingStyles: {},
    ratings: getDistinctRatingKeys(),
    selectedRatingRange: rating,
    search: search || '',
    hasBeenChampion,
  };

  // used to identify which checkboxes were ticked
  const distinctPlayingStyles = getDistinctPlayingStyles();
  distinctPlayingStyles.forEach((style) => (options.playingStyles[style] = playingStyles.includes(style)));

  // Get the total number of records found
  const totalRecords = (await Player.find(filter).lean()).length;

  const { page } = req.query;
  const pageNumber = Number(page);

  // Paging object:
  const paging = {
    currentPage: 1,
    pageSize: 8,
    hasNext: false,
    hasPrev: false,
    totalRecords,
  };

  if (pageNumber && Number.isInteger(pageNumber) && pageNumber > 0) {
    // Validate pageNumber
    paging.currentPage = pageNumber; // Update the current page
    paging.hasPrev = pageNumber <= 1 ? false : true; // Update hasPrev based on the current page
  } else {
    paging.currentPage = 1; // If pageNumber is invalid, default it to 1
  }

  // Check to see if there is a next page from the data fetched
  const skip = (paging.currentPage - 1) * paging.pageSize;
  paging.hasNext = totalRecords - skip > paging.pageSize ? true : false;

  const players = await Player.find(filter).skip(skip).limit(paging.pageSize).lean();

  const model = {
    players,
    options,
    paging,
    title: 'Hall Of Fame',
    isHomePage: false,
    user: req.user ? req.user : null,
  };

  res.render('hall-of-fame/list', model);
};

export const applySearchFilters = (req, res) => {
  const { playingStyles: styles, search, rating: rts, formerChampion: chmp } = req.body;

  // Create filters object
  const filters = {
    playingStyles: styles ? [].concat(styles) : [],
    search: search?.toString().trim(),
    rating: rts || RATINGS['2500-2900'],
    hasBeenChampion: chmp === 'Former Champion',
  };

  // Create filters cookie and sign it
  res.cookie('filters', filters, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    signed: true,
  });

  return res.redirect('/hall-of-fame');
};

export const getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await Player.findOne({ id }).lean();

    const fullname = player.personalDetails.firstName + ' ' + player.personalDetails.lastName;
    player.playingStyle = getPlayingStyles(player.playingStyle);
    const model = {
      player,
      title: fullname,
      isHomePage: false,
      user: req.user ? req.user : null,
    };
    res.render('hall-of-fame/player', model);
  } catch (e) {
    console.log(e);
    res.send(`Cannot find ${id}`);
  }
};
