import { Chess, SQUARES } from 'chess.js';
import { Chessground } from '/chessground/dist/chessground.min.js';
import { files } from '/chessground/dist/types.js';

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
  const dataPgn = boardElement.dataset.pgn;
  const pgnArray = dataPgn ? dataPgn.split(',') : [];
  const initialPuzzleMove = pgnArray.pop(); // Remove the last move from the PGN

  // The solution moves should be in LAN format
  const solution = boardElement.dataset.solution.split(',');

  const puzzleInfo = {
    positionPgn: pgnArray.join(' '),
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

const createPromotionMenu = (offset) => {
  const promotionMenu = document.createElement('div');
  promotionMenu.classList.add('promotion-menu');
  promotionMenu.style.left = `${offset}%`;
  promotionMenu.innerHTML = `
    <div class="promotion-choice bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIHN0cm9rZT0ibm9uZSI+PGNpcmNsZSBjeD0iNiIgY3k9IjEyIiByPSIyLjc1Ii8+PGNpcmNsZSBjeD0iMTQiIGN5PSI5IiByPSIyLjc1Ii8+PGNpcmNsZSBjeD0iMjIuNSIgY3k9IjgiIHI9IjIuNzUiLz48Y2lyY2xlIGN4PSIzMSIgY3k9IjkiIHI9IjIuNzUiLz48Y2lyY2xlIGN4PSIzOSIgY3k9IjEyIiByPSIyLjc1Ii8+PC9nPjxwYXRoIGQ9Ik05IDI2YzguNS0xLjUgMjEtMS41IDI3IDBsMi41LTEyLjVMMzEgMjVsLS4zLTE0LjEtNS4yIDEzLjYtMy0xNC41LTMgMTQuNS01LjItMTMuNkwxNCAyNSA2LjUgMTMuNSA5IDI2eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNOSAyNmMwIDIgMS41IDIgMi41IDQgMSAxLjUgMSAxIC41IDMuNS0xLjUgMS0xLjUgMi41LTEuNSAyLjUtMS41IDEuNS41IDIuNS41IDIuNSA2LjUgMSAxNi41IDEgMjMgMCAwIDAgMS41LTEgMC0yLjUgMCAwIC41LTEuNS0xLTIuNS0uNS0yLjUtLjUtMiAuNS0zLjUgMS0yIDIuNS0yIDIuNS00LTguNS0xLjUtMTguNS0xLjUtMjcgMHoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTExIDM4LjVhMzUgMzUgMSAwIDAgMjMgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMTEgMjlhMzUgMzUgMSAwIDEgMjMgMG0tMjEuNSAyLjVoMjBtLTIxIDNhMzUgMzUgMSAwIDAgMjIgMG0tMjMgM2EzNSAzNSAxIDAgMCAyNCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2VjZWMiLz48L2c+PC9zdmc+')] bg-cover" data-piece="q"></div>
    <div class="promotion-choice bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik05IDM5aDI3di0zSDl2M3ptMy41LTdsMS41LTIuNWgxN2wxLjUgMi41aC0yMHptLS41IDR2LTRoMjF2NEgxMnoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTE0IDI5LjV2LTEzaDE3djEzSDE0eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMTQgMTYuNUwxMSAxNGgyM2wtMyAyLjVIMTR6TTExIDE0VjloNHYyaDVWOWg1djJoNVY5aDR2NUgxMXoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTEyIDM1LjVoMjFtLTIwLTRoMTltLTE4LTJoMTdtLTE3LTEzaDE3TTExIDE0aDIzIiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2VjZWMiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjwvZz48L3N2Zz4=')] bg-cover" data-piece="r"></div>
    <div class="promotion-choice bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIGZpbGw9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNOSAzNmMzLjM5LS45NyAxMC4xMS40MyAxMy41LTIgMy4zOSAyLjQzIDEwLjExIDEuMDMgMTMuNSAyIDAgMCAxLjY1LjU0IDMgMi0uNjguOTctMS42NS45OS0zIC41LTMuMzktLjk3LTEwLjExLjQ2LTEzLjUtMS0zLjM5IDEuNDYtMTAuMTEuMDMtMTMuNSAxLTEuMzU0LjQ5LTIuMzIzLjQ3LTMtLjUgMS4zNTQtMS45NCAzLTIgMy0yeiIvPjxwYXRoIGQ9Ik0xNSAzMmMyLjUgMi41IDEyLjUgMi41IDE1IDAgLjUtMS41IDAtMiAwLTIgMC0yLjUtMi41LTQtMi41LTQgNS41LTEuNSA2LTExLjUtNS0xNS41LTExIDQtMTAuNSAxNC01IDE1LjUgMCAwLTIuNSAxLjUtMi41IDQgMCAwLS41LjUgMCAyeiIvPjxwYXRoIGQ9Ik0yNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAxIDEgNSAweiIvPjwvZz48cGF0aCBkPSJNMTcuNSAyNmgxME0xNSAzMGgxNW0tNy41LTE0LjV2NU0yMCAxOGg1IiBzdHJva2U9IiNlY2VjZWMiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48L2c+PC9zdmc+')] bg-cover" data-piece="b"></div>
    <div class="promotion-choice bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjZWNlY2VjIiBzdHJva2U9IiNlY2VjZWMiLz48cGF0aCBkPSJNMjQuNTUgMTAuNGwtLjQ1IDEuNDUuNS4xNWMzLjE1IDEgNS42NSAyLjQ5IDcuOSA2Ljc1UzM1Ljc1IDI5LjA2IDM1LjI1IDM5bC0uMDUuNWgyLjI1bC4wNS0uNWMuNS0xMC4wNi0uODgtMTYuODUtMy4yNS0yMS4zNC0yLjM3LTQuNDktNS43OS02LjY0LTkuMTktNy4xNmwtLjUxLS4xeiIgZmlsbD0iI2VjZWNlYyIgc3Ryb2tlPSJub25lIi8+PC9nPjwvc3ZnPg==')] bg-cover" data-piece="n"></div>
  `;
  return promotionMenu;
};

const calculateMenuOffset = (promotionSquare, isWhite) => {
  const file = promotionSquare[0];
  const idx = files.indexOf(file);
  const pos = isWhite ? idx : 7 - idx;
  return pos * 12.5 - 0.2; // subtract 0.2 for cg-wrap offset
};

const showPromotionMenu = (boardElement, game, dest) => {
  // Display overlay
  boardElement.classList.add('puzzle-board-overlay');

  // Display menu
  const offset = calculateMenuOffset(dest, game.turn() === 'w');
  const menu = createPromotionMenu(offset);
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
  completed = true;
  feedbackMessage.innerHTML = FEEDBACK_MESSAGES.solved;
  cg.set({
    movable: {
      free: false,
    },
  });
};

const makeOpponentMove = (boardElement, feedbackMessage, cg, game, solutionInfo, playerColor) => {
  cg.set({
    movable: {
      color: getOppositeColor(playerColor),
    },
  });
  const moveObj = getMoveFromLan(solutionInfo.solution[solutionInfo.currentSolutionIdx]);
  game.move(moveObj);
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
    try {
      // Try to make the move
      game.move({ from: orig, to: dest });
    } catch {
      // Error occured, must be promotion
      promotionPiece = await showPromotionMenu(boardElement, game, dest);
      game.move({ from: orig, to: dest, promotion: promotionPiece });
    }

    const move = orig + dest + promotionPiece;
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
    verifyMove(boardElement, feedbackMessage, cg, game, move, solutionInfo, playerColor);
  };
};

// Main function to set up the puzzle board
export const setUpPuzzleBoard = (boardElement, feedbackMessage) => {
  const puzzleInfo = getPuzzleInfo(boardElement);

  const solutionInfo = puzzleInfo.solutionInfo;
  const game = new Chess();
  const playerColor = getOppositeColor(game.turn());
  game.loadPgn(puzzleInfo.positionPgn);

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
  };

  const cg = Chessground(boardElement, config);

  setTimeout(() => {
    const move = game.move(puzzleInfo.initialPuzzleMove);
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
