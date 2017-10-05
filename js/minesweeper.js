// In game variable
var gridDims = 0;
const surroundingCellCoords = [ [-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1] ];
var flagsDropped = 0;

function initGrid(n) {
  const rows = n;
  const columns = n;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      $('#grid').append('<div id="row' + i + '-col' + j + '" class="cell unclicked"></div>');
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
    surroundingCells = surroundingCells.filter(function(cell) {
      return !cell.hasClass('mine');
    });
    surroundingCells.forEach(function(cell) {
      if (cell.text() > 0) {
        cell.text(parseInt(cell.text()) + 1)
      } else if (cell.text() === '') {
        cell.text(1);
        cell.addClass('numbered');
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
    return cell.length > 0;
  });
  return surroundingCells;
};

function playGame() {
  $('.cell').mousedown(function(click) {
    switch (click.which) {
      // Left click
      case 1:
        if ($(this).hasClass('unclicked')) {
          if ($(this).hasClass('flagged')) {
            // Do nothing to flagged cells
          } else if ($(this).hasClass('numbered')) {
            $(this).removeClass('unclicked');
          } else if ($(this).hasClass('mine')) {
            $(this).removeClass('unclicked');
            gameOver();
          } else if ($(this).text() === '') {
            $(this).removeClass('unclicked');
            uncoverSection($(this));
          };
        };
        break;
      // Right click
      case 3:
        if (flagsDropped < 10 && !$(this).hasClass('flagged')) {
          $(this).addClass('flagged').removeClass('unclicked');
          flagsDropped++;
        } else if ($(this).hasClass('flagged')) {
          $(this).removeClass('flagged').addClass('unclicked');
          flagsDropped--;
        };
        break;
    };
    checkForWin();
  });
};

function uncoverSection(cell) {
  var surroundingCells = cellsSurrounding(cell);
  surroundingCells = surroundingCells.filter(function(cell) {
    return cell.hasClass('unclicked');
  });
  surroundingCells.forEach(function(surroundingCell) {
    if (surroundingCell.hasClass('numbered')) {
      surroundingCell.removeClass('unclicked');
    } else if (surroundingCell.text() === '') {
      surroundingCell.removeClass('unclicked');
      uncoverSection(surroundingCell);
    };
  });
};

function checkForWin() {
};

function gameOver() {
  resetGameVariables();
  alert('You lose!')
};

function resetGameVariables() {
  gridDims = 0;
  flagsDropped = 0;
}

$(document).ready(function() {
  $('#easy').click(function initGame() {
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

  $('#medium').click(function initGame() {
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

  $('#hard').click(function initGame() {
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
