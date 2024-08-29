import { Chess } from '/chessjs/chess.js';
import { createGameFen, checkForPieces, highlightSquare } from './chessUtils.mjs';

const getsliderValues = (sliders) => {
  let sliderLeft = Number(sliders[0].value);
  let sliderRight = Number(sliders[1].value);

  // Slider 1 must always be less than slider 2
  if (sliderLeft > sliderRight) {
    let tmp = sliderRight;
    sliderRight = sliderLeft;
    sliderLeft = tmp;
  }

  return { sliderLeft, sliderRight };
};

const watchSliders = (sliders, displayElement) => {
  if (!sliders || !displayElement) return;

  sliders.forEach((slider) => {
    slider.addEventListener('input', () => {
      // Get slider values and display them
      const { sliderLeft, sliderRight } = getsliderValues(sliders);
      displayElement.innerText = `${sliderLeft} - ${sliderRight}`;
    });
  });
};

const removeActiveFilter = (filterName) => {
  const filter = document.querySelector(`input[value="${filterName}"]`);
  const form = document.querySelector('form');
  filter.checked = false;

  form.submit();
};

const watchActiveFilters = (filterBox) => {
  if (!filterBox) return;

  filterBox.addEventListener('click', (e) => {
    const element = e.target;
    if (element.tagName === 'A') {
      const filterName = element.nextElementSibling.innerText;
      removeActiveFilter(filterName);
    }
  });
};

const resetFilters = (checkboxes, ranges) => {
  if (!checkboxes.length || !ranges.length) return;

  const resetBtn = document.querySelector('button[type=reset]');
  const form = document.querySelector('form');

  resetBtn.addEventListener('click', () => {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    ranges[0].value = 2500;
    ranges[1].value = 2900;

    form.submit();
  });
};

const setUpSampleBoards = (boardElements) => {
  if (!boardElements.length) return;

  boardElements.forEach((boardElement) => {
    // Get respective data from the webpage
    const boardName = boardElement.dataset['board-name'];
    const posFen = boardElement.dataset.fen;
    const gameFen = createGameFen(posFen);
    const maxMoves = Number(boardElement.dataset['max-moves']);

    // Get the game board's panel (all sampleBoards have a reset button and a move counter panel)
    const panel = document.querySelector(`.${boardName}`);
    const resetBtn = panel.children[0];
    const moveCounterPanel = panel.children[1];

    // Keep track of moves gone
    let moveCounter = 0;

    // Create the game
    const game = new Chess();
    game.load(gameFen, { skipValidation: true });

    // Only allow white pieces to be moved
    const onDragStart = (_, piece) => {
      if (piece.search(/^w/) === -1) {
        return false;
      }
    };

    // For promotions or en passants, to load in the new position on the board
    const onSnapEnd = () => {
      board.position(game.fen());
    };

    // Integrate the board move with the game move
    const onDrop = (from, to) => {
      // Make the move in the game
      try {
        const move = game.move({
          from,
          to,
          promotion: 'q',
        });

        // Update the move counter
        moveCounter++;
        updateMovePanel();

        // Load in the new position, but as white's turn again
        const newPosFen = move.after.split(' ')[0];
        const newGameFen = createGameFen(newPosFen, 'w');
        game.load(newGameFen, { skipValidation: true });
      } catch {
        //If it was an illegal move, just snap back
        return 'snapback';
      }
    };

    // Create the config object for the gameboard
    const config = {
      draggable: true,
      position: gameFen,
      pieceTheme: '/chesspieces/{piece}.svg',
      onDrop,
      onDragStart,
      onSnapEnd,
    };

    const board = new Chessboard(boardElement, config);

    // Handle the reset button
    resetBtn.addEventListener('click', (e) => {
      // Reset both the game and chessboard positions
      e.preventDefault();
      board.position(gameFen);
      game.load(gameFen, { skipValidation: true });

      // Reset move counter
      moveCounter = 0;
      updateMovePanel();
    });

    // Update the counter panel
    const updateMovePanel = () => {
      moveCounterPanel.innerHTML = `Moves Used: ${moveCounter}`;

      // If the move limit is hit, check to see if all black pawns are captured
      if (moveCounter === maxMoves) {
        const allBlackPawnsCaptured = !checkForPieces(game, 'p', 'b');

        if (allBlackPawnsCaptured) {
          moveCounterPanel.classList.add('success-panel');
        } else {
          moveCounterPanel.classList.add('fail-panel');
        }
      }

      if (moveCounter === 0) {
        moveCounterPanel.classList.remove('success-panel');
        moveCounterPanel.classList.remove('fail-panel');
      }
    };

    // Handle dynamic board resizing
    window.addEventListener('resize', () => {
      board.resize();
    });
  });
};

const setUpPositionBoards = (boardElements) => {
  if (!boardElements.length) return;

  boardElements.forEach((boardElement) => {
    // Get respective data from the webpage
    const posFen = boardElement.dataset.fen;
    let squaresToHighlight = boardElement.dataset['highlight-squares'];
    if (squaresToHighlight.length) squaresToHighlight = squaresToHighlight.split(',');

    const config = {
      position: posFen || 'start',
      pieceTheme: '/chesspieces/{piece}.svg',
    };

    const board = new Chessboard(boardElement, config);

    // Make a function so that it can be reused when the board is resized
    const highlightAllSquares = () => {
      if (squaresToHighlight && squaresToHighlight.length) {
        for (let square of squaresToHighlight) {
          highlightSquare(boardElement, square);
        }
      }
    };
    highlightAllSquares();

    // Handle dynamic board resizing
    window.addEventListener('resize', () => {
      board.resize();
      highlightAllSquares(); // Re-highlight the squares
    });
  });
};

const setUpPuzzleBoards = (boardElements) => {
  if (!boardElements.length) return;

  boardElements.forEach((boardElement) => {
    // Get the game position and the puzzle solution
    const pgn = boardElement.dataset.pgn.replaceAll(',', ' ');
    const solution = boardElement.dataset.solution.split(',');

    // Get the move box and message box elements for the respective board
    const id = boardElement.id;
    const pgnPanel = document.querySelector(`.${id}.pgn-panel`);
    const messageBox = pgnPanel.querySelector(`.message-box`);
    // const moveBox = pgnPanel.querySelector(`.move-box`);

    // Create the game with the pgn
    const game = new Chess();
    game.loadPgn(pgn);

    // Deduce the board orientation based on number of moves done
    const gameLength = game.moveNumber();
    const orientation = gameLength % 2 === 0 ? 'white' : 'black';

    // Keep track of the moves used by the player
    let movesUsed = 0;

    // Only allow the player to move their respective pieces
    const onDragStart = (_, piece) => {
      if ((orientation === 'white' && piece.search(/^w/) === -1) || (orientation === 'black' && piece.search(/^b/) === -1)) {
        return false;
      }
    };

    const onDrop = (from, to) => {
      try {
        // Make the move (checks if it is legal or not)
        const move = game.move({ from, to });

        // If the move is correct...
        if (move.lan === solution[movesUsed]) {
          updatePgnPanel({ move, isCorrect: true, puzzleOver: false });

          // If the puzzle is over...
          if (solution.length === movesUsed + 1) {
            updatePgnPanel({ move, isCorrect: true, puzzleOver: true });
            return;
          }

          // If the puzzle is not over, make the opponents move
          window.setTimeout(() => {
            game.move(solution[movesUsed + 1]);
            board.position(game.fen());
            movesUsed += 2;
          }, 400);
        }

        // If the move is wrong...
        else {
          updatePgnPanel({ move, isCorrect: false, puzzleOver: false });
          game.undo(); // Undo the move

          window.setTimeout(() => {
            board.position(game.fen()); // Return back to position before the move
          }, 400);
        }
      } catch {
        return 'snapback';
      }
    };

    // Create the chessboard
    const config = {
      position: game.fen() || 'start',
      draggable: true,
      onDrop,
      onDragStart,
      moveSpeed: 150,
      pieceTheme: '/chesspieces/{piece}.svg',
    };

    const board = new Chessboard(boardElement, config);
    board.orientation(orientation);

    const updatePgnPanel = (obj) => {
      // Initial run, set the message to tell the player who's turn it is
      if (obj.orientation) {
        const message = [];
        message.push(`<h4>It's your turn.</h4>`);
        message.push(`<span class="font-normal">Find the best move for ${obj.orientation}.</span>`);
        messageBox.innerHTML = message.join('');
      }

      if (obj.move) {
        // Set the message to tell the player the puzzle is over
        if (obj.puzzleOver && obj.isCorrect) {
          messageBox.innerHTML = `<h4>Puzzle solved!</h4><span class="font-normal">Great job.</span>`;
        } else {
          // Tell the player to keep going or to try again based on move
          const messageType = obj.isCorrect ? 'success' : 'fail';
          const messageTitle = obj.isCorrect ? `<h4><span class="${messageType}">${obj.move.san}</span> is the best move.</h4>` : `<h4><span class="${messageType}">${obj.move.san}</span> is not the right move.</h4>`;
          const messageText = obj.isCorrect ? `<span class="font-normal">Keep going...</span>` : `<span class="font-normal">Try again.</span>`;
          messageBox.innerHTML = messageTitle + messageText;
        }
      }
    };

    // Give the pgn panel its initial message
    updatePgnPanel({ orientation });
  });
};

const sliders = document.querySelectorAll('.slider > input');
const displayElement = document.querySelector('.rating-range-values');
watchSliders(sliders, displayElement);

const activeFiltersContainer = document.querySelector('.active-filters');
watchActiveFilters(activeFiltersContainer);

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const ranges = document.querySelectorAll('input[type=range]');
resetFilters(checkboxes, ranges);

const sampleBoards = document.querySelectorAll('.sample-board');
setUpSampleBoards(sampleBoards);

const positionBoards = document.querySelectorAll('.position-board');
setUpPositionBoards(positionBoards);

const puzzleBoards = document.querySelectorAll('.puzzle-board');
setUpPuzzleBoards(puzzleBoards);
