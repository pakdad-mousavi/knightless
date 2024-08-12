import { Player } from '../models/player.js';

export const getPlayers = (req, res) => {
  res.send('Hall of fame stuff goes here. :)');
};

export const getPlayer = async (req, res) => {
  const { id } = req.params;
  const player = await Player.findOne({ id }).lean();
  const fullname = player.personalDetails.firstName + player.personalDetails.lastName;
  const dto = {
    player,
    title: fullname,
    isHomePage: false,
  };
  res.render('hall-of-fame/player', dto);
};
