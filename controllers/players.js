import { Player } from '../models/player.js';
import { getPlayingStyles, getDistinctPlayingStyles } from '../helpers/getPlayingStyles.js';

export const getPlayers = (req, res) => {
  const playingStyles = getDistinctPlayingStyles();

  const model = {
    playingStyles,
    title: 'Hall Of Fame',
    isHomePage: false,
  };

  res.render('hall-of-fame/list', model);
};

export const applySearchFilters = (req, res) => {
  const { playingStyles: styles, ratingA: rtA, ratingB: rtB, formerChampion: chmp } = req.body;

  if (!Number.isInteger(rtA) || !Number.isInteger(rtB)) {
    res.send('Ratings need to be numbers.')
  };

    const filters = {
      playingStyles: styles ? [].concat(styles) : [],
      ratingsA: rtA,
      ratingsB: rtB,
      hasBeenChampion: chmp === 'true',
  }

  

  res.redirect('/hall-of-fame');
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
