const squares = {
  A8: 0, B8: 1, C8: 2, D8: 3, E8: 4, F8: 5, G8: 6, H8: 7,
  A7: 16, B7: 17, C7: 18, D7: 19, E7: 20, F7: 21, G7: 22, H7: 23,
  A6: 32, B6: 33, C6: 34, D6: 35, E6: 36, F6: 37, G6: 38, H6: 39,
  A5: 48, B5: 49, C5: 50, D5: 51, E5: 52, F5: 53, G5: 54, H5: 55,
  A4: 64, B4: 65, C4: 66, D4: 67, E4: 68, F4: 69, G4: 70, H4: 71,
  A3: 80, B3: 81, C3: 82, D3: 83, E3: 84, F3: 85, G3: 86, H3: 87,
  A2: 96, B2: 97, C2: 98, D2: 99, E2: 100, F2: 101, G2: 102, H2: 103,
  A1: 112, B1: 113, C1: 114, D1: 115, E1: 116, F1: 117, G1: 118, H1: 119
};

/**
 * 
 * @param {Object} obj 
 * @param {Array} values 
 */
const getKeysByValues = (obj, values) => {
  const objectKeys = Object.keys(obj);

  //map array with numbers to find needed squares
  const result = values.map((el) => {
    return objectKeys.find((key) => obj[key] === el);
  });

  //filter result to get rid of 'undefined' squares
  const filtered = result.filter(key => key);

  return filtered;
}

/**
 * 
 * @param {String} square 
 */
const getPossibleKnightMoves = (square) => {
  //find chosen square's number
  const currentSquare = squares[square];

  //all possible knight moves
  const possibleMoves = [currentSquare + 31, currentSquare + 33,
  currentSquare + 18, currentSquare - 14,
  currentSquare - 31, currentSquare - 33,
  currentSquare + 14, currentSquare - 18];

  //find needed square names
  const resultSquares = getKeysByValues(squares, possibleMoves);

  //add color class to a chosen square
  const currentSquareDiv = document.querySelector(`div[data-square='${square}']`);
  currentSquareDiv.classList.add('chosen');

  //add color class to needed squares
  resultSquares.forEach((square) => {
    const squareDiv = document.querySelector(`div[data-square='${square}']`);
    squareDiv.classList.add('possible');
  });
};

const clearChosenSquares = () => {
  const chosenSquare = document.querySelector('.chosen');
  const possibleSquares = document.querySelectorAll('.possible');

  if (chosenSquare) {
    chosenSquare.classList.remove('chosen');
  }
  for (square of possibleSquares) {
    square.classList.remove('possible');
  }
};

/**
 * 
 * @param {Boolean} isBottom 
 */
const renderBoardCoordLetters = (isBottom = false) => {
  const positionClass = isBottom ? 'bottom' : 'top';
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const result = letters.map((letter) => {
    const letterCoord = document.createElement('div');
    letterCoord.classList.add('coord', positionClass);
    letterCoord.innerHTML = letter;

    return letterCoord;
  });

  return result;
};

const renderBoardCoordNumbers = () => {
  let result = [];

  //create 8 numbers from 8 to 1
  for (let i = 8; i > 0; i -= 1) {
    const leftNumber = document.createElement('div');
    leftNumber.classList.add('coord', 'left');
    leftNumber.innerHTML = i;

    const rightNumber = document.createElement('div');
    rightNumber.classList.add('coord', 'right');
    rightNumber.innerHTML = i;

    result.push(leftNumber, rightNumber);
  }

  return result;
};

const renderBoardCoords = () => {
  //coords container
  const coords = document.createElement('div');
  coords.setAttribute('id', 'coords');

  const topLetters = renderBoardCoordLetters();
  topLetters.forEach((letter) => coords.appendChild(letter));

  const numbers = renderBoardCoordNumbers();
  numbers.forEach((number) => coords.appendChild(number));

  const bottomLetters = renderBoardCoordLetters(true);
  bottomLetters.forEach((letter) => coords.appendChild(letter));

  return coords;
};

/**
 * 
 * @param {Object} squares 
 */
const renderBoardSquares = (squares) => {
  const squaresContainer = document.createElement('div');
  squaresContainer.setAttribute('id', 'squares');

  const squaresRow = document.createElement('div');
  squaresRow.classList.add('row');

  //clear squaresRow when counter is 8
  let counter = 0;

  for (square in squares) {
    const squareDiv = document.createElement('div');
    squareDiv.classList.add('square');
    squareDiv.dataset.square = square;

    counter += 1;
    
    squaresRow.appendChild(squareDiv);

    if (counter === 8) {
      squaresContainer.appendChild(squaresRow.cloneNode(true));
      counter = 0;
      squaresRow.innerHTML = '';
    }
  }

  return squaresContainer;


};

const renderBoard = () => {
  //UI
  const board = document.getElementById('board');

  //render parts of board
  const boardCoords = renderBoardCoords(board);
  const boardSquares = renderBoardSquares(squares);

  board.appendChild(boardCoords);
  board.appendChild(boardSquares);
};

renderBoard();

//UI
const squaresCollection = document.getElementsByClassName('square');

//add event listener to each square
[].forEach.call(squaresCollection, function (square) {
  square.addEventListener('click', function () {
    const squareValue = square.dataset.square;

    clearChosenSquares();
    getPossibleKnightMoves(squareValue);
  });
});
