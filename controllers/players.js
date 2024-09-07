import { Player } from '../models/player.js';
import { getPlayingStyles, getDistinctPlayingStyles } from '../helpers/getPlayingStyles.js';

export const getPlayers = async (req, res) => {
  const cookieFilters = req.signedCookies?.filters;

  const playingStyles = cookieFilters?.playingStyles || [];
  const search = cookieFilters?.search || '';
  let ratingA = cookieFilters?.ratingA || false;
  let ratingB = cookieFilters?.ratingB || false;
  const hasBeenChampion = cookieFilters?.hasBeenChampion === true;

  const filter = {};
  if (playingStyles.length) {
    filter['playingStyle'] = { $in: playingStyles };
  }
  if (ratingA && ratingB) {
    // Make sure ratingA is always lower than ratingB
    if (ratingA > ratingB) {
      const temp = ratingA;
      ratingA = ratingB;
      ratingB = temp;
    }
    filter['personalDetails.peakFideRating'] = { $gte: ratingA, $lte: ratingB };
  }
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
  if (hasBeenChampion) {
    filter['personalDetails.hasBeenChampion'] = true;
  }

  const options = {
    playingStyles: {},
    search: search || '',
    ratingA: ratingA || 2500,
    ratingB: ratingB || 2900,
    hasBeenChampion,
  };

  const distinctPlayingStyles = getDistinctPlayingStyles();

  distinctPlayingStyles.forEach((style) => (options.playingStyles[style] = playingStyles.includes(style)));

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
  };

  res.render('hall-of-fame/list', model);
};

export const applySearchFilters = (req, res) => {
  const { playingStyles: styles, search, ratingA: rtA, ratingB: rtB, formerChampion: chmp } = req.body;

  let numRtA = Number(rtA);
  let numRtB = Number(rtB);
  if (!Number.isInteger(numRtA) || !Number.isInteger(numRtB)) {
    numRtA = 2500;
    numRtB = 2900;
  }
  const filters = {
    playingStyles: styles ? [].concat(styles) : [],
    search: search?.toString().trim(),
    ratingA: numRtA || 2500,
    ratingB: numRtB || 2900,
    hasBeenChampion: chmp === 'Former Champion',
  };

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
    };
    res.render('hall-of-fame/player', model);
  } catch (e) {
    console.log(e);
    res.send(`Cannot find ${id}`);
  }
};
