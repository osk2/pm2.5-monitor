$(function() {
  var g3;
  var $left = $('.inputLeft');


  if (localStorage.leftBoard) {
    $left.val(localStorage.leftBoard);
  }

  $connect.on('click', function() {
    $note.text('connecting...');
    _connect($left.val());
    localStorage.leftBoard = $left.val();
  });

  function _connect(leftBoard) {
    boardReady({
      device: leftBoard
    }, function(board) {
      board.systemReset();
      board.samplingInterval = 250;
      g3 = getG3(board, 14, 3);
      g3.read(function(evt) {
        if (g3.pm25 <= 11) {
            document.getElementById("demo-area-01-show").innerHTML = ([g3.pm25].join(''));
            document.getElementById("123").innerHTML = (['空氣品質：良好'].join(''));
            document.getElementById("bgc").style.backgroundColor = '#89C541';
            } else if (g3.pm25 <= 23) {
                                document.getElementById("demo-area-01-show").innerHTML = ([g3.pm25].join(''));
                                document.getElementById("123").innerHTML = (['空氣品質：尚可'].join(''));
                                document.getElementById("bgc").style.backgroundColor = '#48B04B';
            } else if (g3.pm25 <= 35) {
                                document.getElementById("demo-area-01-show").innerHTML = ([g3.pm25].join(''));
                                document.getElementById("123").innerHTML = (['空氣品質：良好'].join(''));
                                document.getElementById("bgc").style.backgroundColor = '#388E3C';
            } else if (g3.pm25 <= 41) {
                                document.getElementById("demo-area-01-show").innerHTML = ([g3.pm25].join(''));
                                document.getElementById("123").innerHTML = (['空氣品質：尚可'].join(''));
                                document.getElementById("bgc").style.backgroundColor = '#FCD700';
            } else if (g3.pm25 <= 47) {
                                document.getElementById("demo-area-01-show").innerHTML = ([g3.pm25].join(''));
                                document.getElementById("123").innerHTML = (['空氣品質：尚可'].join(''));
                                document.getElementById("bgc").style.backgroundColor = '#FFC107';
            } else if (g3.pm25 <= 53) {
                                document.getElementById("demo-area-01-show").innerHTML = ([g3.pm25].join(''));
                                document.getElementById("123").innerHTML = (['空氣品質：尚可'].join(''));
                                document.getElementById("bgc").style.backgroundColor = '#FF9800';
            } else if (g3.pm25 <= 58) {
                                document.getElementById("demo-area-01-show").innerHTML = ([g3.pm25].join(''));
                                document.getElementById("123").innerHTML = (['空氣品質：不健康'].join(''));
                                document.getElementById("bgc").style.backgroundColor = '#FF5252';
            } else if (g3.pm25 <= 64) {
                                document.getElementById("demo-area-01-show").innerHTML = ([g3.pm25].join(''));
                                document.getElementById("123").innerHTML = (['空氣品質：不健康'].join(''));
                                document.getElementById("bgc").style.backgroundColor = '#F44336';
            } else if (g3.pm25 <= 70) {
                                document.getElementById("demo-area-01-show").innerHTML = ([g3.pm25].join(''));
                                document.getElementById("123").innerHTML = (['空氣品質：不健康'].join(''));
                                document.getElementById("bgc").style.backgroundColor = '#D32F2F';
            } else if (g3.pm25 > 71) {
                                document.getElementById("demo-area-01-show").innerHTML = ([g3.pm25].join(''));
                                document.getElementById("123").innerHTML = (['空氣品質：危害'].join(''));
                                document.getElementById("bgc").style.backgroundColor = '#9D1CB2';
            } else {
                                document.getElementById("demo-area-01-show").innerHTML = ([g3.pm25].join(''));
                                document.getElementById("123").innerHTML = (['空氣品質：危害'].join(''));
                                document.getElementById("bgc").style.backgroundColor = '#9D1CB2';
            }
      }, 1000);
    });
  }
});