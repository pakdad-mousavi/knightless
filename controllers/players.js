import { Player } from '../models/player.js';
import { getPlayingStyles } from '../helpers/getPlayingStyles.js';

export const getPlayers = (req, res) => {
  const model = {
    title: 'Hall Of Fame',
    isHomePage: false,
  };

  res.render('hall-of-fame/list', model);
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
