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
    surroundingCells.forEach(function(cell) {
      if (cell.text() > 0) {
        cell.text(parseInt(cell.text()) + 1)
        cell.addClass('numbered');
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
  $('.cell').mousedown(function(click) {
    switch (click.which) {
      // Left click
      case 1:

        break;
      // Right click
      case 3:
        console.log($(this))
        if (flagsDropped < 10 && !$(this).hasClass('flagged')) {
          $(this).addClass('flagged').removeClass('unclicked');
          flagsDropped++;
        } else if ($(this).hasClass('flagged')) {
          $(this).removeClass('flagged').addClass('unclicked');
          flagsDropped--;
        };
        break;
    };
    gameStatus();
  });
};

function gameStatus() {

};

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
