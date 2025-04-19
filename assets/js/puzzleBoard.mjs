import { Chess, SQUARES } from 'chess.js';
import { Chessground } from '/chessground/dist/chessground.min.js';
import { files } from '/chessground/dist/types.js';
import { getMoveType } from './chessUtils.mjs';
import { playMoveAudio } from './sounds.mjs';

const FEEDBACK_MESSAGES = {
  correct: `<b class="text-green-500 font-medium">%%</b> is the best move, keep going...`,
  wrong: `<b class="text-rose-500 font-medium">%%</b> isn't right, try again.`,
  hint: `The piece on <b>%%</b> needs to move.`,
  solved: `<b class="font-medium">You solved the puzzle! Try the next one?</b>`,
};

const getCurrentMove = (game) => {
  const moves = game.history();
  return moves[moves.length - 1];
};

// Helper function to parse LAN strings into move objects
const getMoveFromLan = (moveLan) => {
  const from = moveLan.slice(0, 2);
  const to = moveLan.slice(2, 4);
  const promotion = moveLan.length > 4 ? moveLan[4].toLowerCase() : undefined;
  const move = { from, to };
  if (promotion) {
    move.promotion = promotion;
  }
  return move;
};

// Function to get puzzle information from the board element
const getPuzzleInfo = (boardElement) => {
  const puzzleData = boardElement.dataset.puzzle;
  const isPuzzlePgnOrFen = boardElement.dataset.type;
  const pgnArray = puzzleData ? puzzleData.split(',') : [];

  let solution;
  let initialPuzzleMove;
  if (isPuzzlePgnOrFen === 'pgn') {
    solution = boardElement.dataset.solution.split(',');

    // Remove the last move from the PGN
    initialPuzzleMove = pgnArray.pop();
  } else {
    solution = boardElement.dataset.solution.split(' ');
    solution.reverse();
    initialPuzzleMove = solution.pop();
    solution.reverse();
  }
  // The solution moves should be in LAN format

  const puzzleInfo = {
    positionPgn: pgnArray.join(' '),
    positionFen: isPuzzlePgnOrFen === 'fen' ? puzzleData : null,
    initialPuzzleMove,
    solutionInfo: {
      solution, // Array of moves in LAN format
      currentSolutionIdx: 0,
      getCurrentMove: () => {
        return puzzleInfo.solutionInfo.solution[puzzleInfo.solutionInfo.currentSolutionIdx];
      },
    },
  };

  return puzzleInfo;
};

const getOppositeColor = (color) => {
  return color === 'w' || color === 'white' ? 'black' : 'white';
};

const getDestsFromGame = (game) => {
  const dests = new Map();
  SQUARES.forEach((square) => {
    const possibleMoves = game.moves({ square, verbose: true });
    if (possibleMoves.length) {
      const possibleDests = possibleMoves.map((move) => move.to);
      dests.set(square, possibleDests);
    }
  });
  return dests;
};

const createPromotionMenu = (offset, playerColor) => {
  const promotionMenu = document.createElement('div');
  const color = playerColor === 'white' ? 'w' : 'b';
  promotionMenu.classList.add('promotion-menu');
  promotionMenu.style.left = `${offset}%`;
  promotionMenu.innerHTML = `
    <div style="background-image: url('/images/chesspieces/${color}Q.svg')" class="promotion-choice bg-[url('/images/chesspieces/${color}Q.svg')] bg-cover" data-piece="q"></div>
    <div style="background-image: url('/images/chesspieces/${color}R.svg')" class="promotion-choice bg-[url('/images/chesspieces/${color}R.svg')] bg-cover" data-piece="r"></div>
    <div style="background-image: url('/images/chesspieces/${color}B.svg')" class="promotion-choice bg-[url('/images/chesspieces/${color}B.svg')] bg-cover" data-piece="b"></div>
    <div style="background-image: url('/images/chesspieces/${color}N.svg')" class="promotion-choice bg-[url('/images/chesspieces/${color}N.svg')] bg-cover" data-piece="n"></div>
  `;
  return promotionMenu;
};

const calculateMenuOffset = (promotionSquare, isWhite) => {
  const file = promotionSquare[0];
  const idx = files.indexOf(file);
  const pos = isWhite ? idx : 7 - idx;
  return pos * 12.5 - 0.2; // subtract 0.2 for cg-wrap offset
};

const showPromotionMenu = (boardElement, game, dest, playerColor) => {
  // Display overlay
  boardElement.classList.add('puzzle-board-overlay');

  // Display menu
  const offset = calculateMenuOffset(dest, game.turn() === 'w');
  const menu = createPromotionMenu(offset, playerColor);
  boardElement.insertAdjacentElement('afterend', menu);

  // Promise, so that the game waits for promotion result
  const res = new Promise((resolve, reject) => {
    menu.addEventListener('click', (e) => {
      // Remove promotion menu
      boardElement.classList.remove('puzzle-board-overlay');
      menu.remove();
      // Resolve
      const piece = e.target.dataset.piece;
      resolve(piece);
    });
  });

  return res;
};
const endPuzzle = (cg, feedbackMessage) => {
  feedbackMessage.innerHTML = FEEDBACK_MESSAGES.solved;
  cg.set({
    movable: {
      free: false,
    },
  });
  const pastDate = 'Thu, 18 Dec 2013 12:00:00 UTC;';
  document.cookie = document.cookie + '; expires=' + pastDate;
};

const makeOpponentMove = (boardElement, feedbackMessage, cg, game, solutionInfo, playerColor) => {
  cg.set({
    movable: {
      color: getOppositeColor(playerColor),
    },
  });
  const moveObj = getMoveFromLan(solutionInfo.solution[solutionInfo.currentSolutionIdx]);
  const move = game.move(moveObj);
  const moveType = getMoveType(game, move);
  playMoveAudio(moveType);

  cg.set({
    fen: game.fen(),
    turnColor: playerColor,
    lastMove: [moveObj.from, moveObj.to],
    check: game.isCheck(),
    movable: {
      free: false,
      color: playerColor,
      dests: getDestsFromGame(game),
      events: {
        after: handlePlayerInput(boardElement, feedbackMessage, cg, game, solutionInfo, playerColor),
      },
    },
  });
  solutionInfo.currentSolutionIdx++;
};

const undoMove = (boardElement, feedbackMessage, cg, game, solutionInfo, playerColor) => {
  game.undo();
  const history = game.history({ verbose: true });
  const previousMove = history[history.length - 1];
  cg.set({
    fen: game.fen(),
    turnColor: playerColor,
    lastMove: [previousMove.from, previousMove.to],
    check: game.isCheck(),
    movable: {
      free: false,
      color: playerColor,
      dests: getDestsFromGame(game),
      events: {
        after: handlePlayerInput(boardElement, feedbackMessage, cg, game, solutionInfo, playerColor),
      },
    },
  });
};

const verifyMove = (boardElement, feedbackMessage, cg, game, move, solutionInfo, playerColor) => {
  if (move === solutionInfo.solution[solutionInfo.currentSolutionIdx]) {
    solutionInfo.currentSolutionIdx++;
    if (solutionInfo.currentSolutionIdx >= solutionInfo.solution.length || game.isCheckmate()) {
      return endPuzzle(cg, feedbackMessage);
    }
    feedbackMessage.innerHTML = FEEDBACK_MESSAGES.correct.replace('%%', getCurrentMove(game));
    cg.set({
      turnColor: getOppositeColor(playerColor),
    });
    setTimeout(makeOpponentMove, 600, boardElement, feedbackMessage, cg, game, solutionInfo, playerColor);
  } else {
    feedbackMessage.innerHTML = FEEDBACK_MESSAGES.wrong.replace('%%', getCurrentMove(game));
    setTimeout(undoMove, 600, boardElement, feedbackMessage, cg, game, solutionInfo, playerColor);
  }
};

const handlePlayerInput = (boardElement, feedbackMessage, cg, game, solutionInfo, playerColor) => {
  return async (orig, dest) => {
    let promotionPiece = '';
    let move = '';
    try {
      // Try to make the move
      move = game.move({ from: orig, to: dest });
    } catch {
      // Error occured, must be promotion
      promotionPiece = await showPromotionMenu(boardElement, game, dest, playerColor);
      move = game.move({ from: orig, to: dest, promotion: promotionPiece });
    }

    const moveType = getMoveType(game, move);
    playMoveAudio(moveType);

    // Set new board position
    const newConfig = {
      fen: game.fen(),
      check: game.isCheck(),
      movable: {
        dests: getDestsFromGame(game),
      },
    };
    cg.set(newConfig);

    // Verify whether the move made is correct or not
    verifyMove(boardElement, feedbackMessage, cg, game, move.lan, solutionInfo, playerColor);
  };
};

// Main function to set up the puzzle board
export const setUpPuzzleBoard = (boardElement, feedbackMessage) => {
  const puzzleInfo = getPuzzleInfo(boardElement);
  const solutionInfo = puzzleInfo.solutionInfo;
  const game = new Chess();

  if (puzzleInfo.positionFen) {
    game.load(puzzleInfo.positionFen);
  } else {
    game.loadPgn(puzzleInfo.positionPgn);
  }
  const playerColor = getOppositeColor(game.turn());

  const config = {
    fen: game.fen(),
    orientation: playerColor,
    turnColor: playerColor,
    movable: {
      free: false,
      color: playerColor,
    },
    premovable: {
      enabled: false,
    },
    drawable: {
      enabled: false,
      visible: false,
    },
  };

  const cg = Chessground(boardElement, config);

  setTimeout(() => {
    const move = game.move(puzzleInfo.initialPuzzleMove);
    const moveType = getMoveType(game, move);
    playMoveAudio(moveType);

    cg.set({
      fen: game.fen(),
      check: game.isCheck(),
      lastMove: [move.from, move.to],
      movable: {
        free: false,
        color: playerColor,
        dests: getDestsFromGame(game),
        events: {
          after: handlePlayerInput(boardElement, feedbackMessage, cg, game, solutionInfo, playerColor),
        },
      },
    });
  }, 500);
};
