// In game variable
var gridDims = 0;
const surroundingCellCoords = [ [-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1] ];

function initGrid(n) {
  const rows = n;
  const columns = n;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      $('#grid').append('<div id="row' + i + '-col' + j + '" class="cell"></div>');
    };
  };
};

function placeMines(numMines) {
  for(var i = 0; i < numMines; i++) {
    do {
      var mineRow = Math.floor(Math.random()*gridDims);
      var mineCol = Math.floor(Math.random()*gridDims);
      mineCell = $('#row' + mineRow + '-col' + mineCol);
    } while(mineCell.hasClass('mine'));
    mineCell.addClass('mine');
  };
};

function markNumbers() {
  $('.mine').each(function () {
    var surroundingCells = cellsSurrounding($(this))
    surroundingCells.forEach(function(cell) {
      if (cell.text() > 0) {
        cell.text(parseInt(cell.text()) + 1)
      } else if (cell.text() === '') {
        cell.text(1);
      };
    });
  });
};

function cellsSurrounding(mineCell) {
  var surroundingCells = []
  var mineIndex = mineCell.index();
  var mineRow = Math.floor(mineIndex/gridDims);
  var mineCol = mineIndex - (mineRow * gridDims);
  surroundingCellCoords.forEach(function(coord) {
    var surroundingCell = $('#row' + (mineRow + coord[0]) + '-col' + (mineCol + coord[1]));
    surroundingCells.push(surroundingCell)
  });
  surroundingCells = surroundingCells.filter(function(cell) {
    return cell.length > 0 && !cell.hasClass('mine');
  });
  return surroundingCells;
};

function playGame() {
  // if (gameInProgress) {
  //   setTimeout(moveSnake,100/(multiplier*.5));
  //   $('h3').text("Score: " + score);
  // };
};

function moveSnake() {
  // $(document).keydown(function(newDirection) {
  //   if (37 <= newDirection.which && newDirection.which <= 40) {
  //     // Don't allow snake to make 180 direction change
  //     if (Math.abs(newDirection.which - lastDirection) !== 2) {
  //       currentDirection = newDirection.which;
  //     };
  //   };
  // });
  //
  // var move = function(currentDirection) {
  //   var snakeHead = snake[0];
  //   switch(currentDirection){
  //     case 37:
  //       var nextCellCoords = [snakeHead[0], snakeHead[1]-1];
  //       var nextCell = $('#row' + nextCellCoords[0] + '-col' + nextCellCoords[1]);
  //       break;
  //     case 38:
  //       var nextCellCoords = [snakeHead[0]-1, snakeHead[1]];
  //       var nextCell = $('#row' + nextCellCoords[0] + '-col' + nextCellCoords[1]);
  //       break;
  //     case 39:
  //       var nextCellCoords = [snakeHead[0], snakeHead[1]+1];
  //       var nextCell = $('#row' + nextCellCoords[0] + '-col' + nextCellCoords[1]);
  //       break;
  //     case 40:
  //       var nextCellCoords = [snakeHead[0]+1, snakeHead[1]];
  //       var nextCell = $('#row' + nextCellCoords[0] + '-col' + nextCellCoords[1]);
  //       break;
  //   };
  //
  //   // Next cell is snake
  //   if (nextCell.hasClass('snake')) {
  //     alert('Game over! You hit your own snake!');
  //     resetGame();
  //     return;
  //   };
  //
  //   // Next cell is wall
  //   if (nextCellCoords[0] < 0 || nextCellCoords[0] > 39 || nextCellCoords[1] < 0 || nextCellCoords[1] > 39) {
  //     alert('Game over! You hit a wall!');
  //     resetGame();
  //     return;
  //   };
  //
  //   // Next cell is empty
  //   if (nextCell.hasClass('empty')) {
  //     snake.unshift(nextCellCoords);
  //     nextCell.removeClass('empty').addClass('snake');
  //     var snakeTail = snake.pop();
  //     $('#row' + snakeTail[0] + '-col' + snakeTail[1]).removeClass('snake').addClass('empty');
  //   };
  //
  //   // Next cell is apple
  //   if (nextCell.hasClass('apple')) {
  //     snake.unshift(nextCellCoords);
  //     nextCell.removeClass('apple').addClass('snake');
  //     multiplier += .05
  //     placeFruit();
  //     score = Math.floor(score += 10*multiplier);
  //   };
  // };
  //
  // move(currentDirection);
  // lastDirection = currentDirection;
  // playGame();
};

$(document).ready(function initGame() {
  $('#easy').click(function startGame() {
    gridDims = 9;
    var grid = $('#grid');
    grid.empty();
    grid.css('height', '180px');
    grid.css('width', '180px');
    grid.css('border','2px solid #000');
    initGrid(gridDims);
    placeMines(10,gridDims);
    markNumbers(gridDims);
    playGame();
  });

  $('#medium').click(function startGame() {
    gridDims = 16;
    var grid = $('#grid');
    grid.empty();
    grid.css('height', '320px');
    grid.css('width', '320px');
    grid.css('border','2px solid #000');
    initGrid(gridDims);
    placeMines(40,gridDims);
    markNumbers(gridDims);
    playGame();
  });

  $('#hard').click(function startGame() {
    gridDims = 24;
    var grid = $('#grid');
    grid.empty();
    grid.css('height', '480px');
    grid.css('width', '480px');
    grid.css('border','2px solid #000');
    initGrid(gridDims);
    placeMines(99,gridDims);
    markNumbers(gridDims);
    playGame();
  });
});
