import { Chessground } from '/chessground/dist/chessground.min.js';
import { Chess } from 'chess.js';

export const setUpPositionBoard = (boardElement) => {
  // Get the data from the boardElement
  const fen = boardElement.dataset.fen;
  const lastMove = boardElement.dataset.lastMove;

  // Create the game and play opponent's last move
  const game = new Chess(fen);
  game.move(lastMove);

  // Create the chessboard
  const config = {
    fen: game.fen(),
    lastMove: [lastMove[0] + lastMove[1], lastMove[2] + lastMove[3]],
    orientation: game.turn() === 'w' ? 'white' : 'black',
    viewOnly: true,
  };

  const cg = Chessground(boardElement, config);
};
