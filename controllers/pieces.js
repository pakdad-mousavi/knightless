import { Piece } from '../models/piece.js';
import { getOtherPieces } from '../helpers/getOtherPieces.js';

export const getPieceById = async (req, res) => {
  const { id } = req.params;

  try {
    const piece = await Piece.findOne({ id }).lean();
    const otherPieces = getOtherPieces(piece.name);

    const model = {
      title: piece.name,
      piece,
      otherPieces,
      isHomePage: false,
    };

    res.render('pieces/piece', model);
  } catch (e) {
    console.log(e);
    res.send(`Cannot find ${id}`);
  }
};
