'use strict';

$(function () {

  var $grid = $('.grid');
  var $black = $('.blackDisplay');
  var $white = $('.whiteDisplay');
  var $winner = $('.winner');
  var squares = 64;

  setupGrid();

  var $lis = $grid.find('li');
  var turn = 'white';

  $lis.on('click', makeMove);

  function setupGrid() {
    $grid.empty();

    while (squares--) {
      $grid.append('<li />');
    }

    $('li:eq(27), li:eq(36)').addClass('white');
    $('li:eq(28), li:eq(35)').addClass('black');
  }

  function makeMove(e) {
    var $el = $(e.target);
    if (cellIsFree($el)) checkForMatches($el);
  }

  function checkForMatches($el) {
    var index = $lis.index($el);
    var validMoves = [1, 9, 8, 7, -1, -9, -8, -7].filter(function (n) {
      return checkDirection(n, index);
    });
    if (validMoves.length) {
      // console.log('validMoves:', validMoves);
      $el.addClass(turn);
      toggleTurn();
    }
  }

  function cellIsFree($el) {
    return !$el.hasClass('white') && !$el.hasClass('black');
  }

  function toggleTurn() {
    turn = opposingColor(turn);
    $grid.toggleClass('whiteGo blackGo');
  }

  function opposingColor(currentTurn) {
    return currentTurn === 'white' ? 'black' : 'white';
  }

  function overEdge(n, index) {
    return overTop(n, index) || overBottom(n, index) || overRight(n, index) || overLeft(n, index);
  }

  function overTop(n, index) {
    return index + n < 0;
  }

  function overBottom(n, index) {
    return index + n > 63;
  }

  function overLeft(n, index) {
    return index % 8 === 0 && (index + n) % 8 === 7;
  }

  function overRight(n, index) {
    return index % 8 === 7 && (index + n) % 8 === 0;
  }

  function checkDirection(n, index) {
    var toFlip = [];
    var looping = true;

    while (looping) {
      // starting from the index clicked, first check if it's on the edge, and if the first move would take it over the edge - if so break and don't bother looping again
      if (checkIfEdge(index) && overEdge(n, index)) {
        looping = false;
        break;
      }
      // add n to the index to check the next cell in that direction
      index += n;
      // grab that cell from the DOM
      var $el = $lis.eq(index);
      // if there is a cell and the cell does not have the opposing color don't bother looping again, else push cell into toFlip
      if (!$el.hasClass(opposingColor(turn))) looping = false;else toFlip.push($el);
    }

    if (toFlip.length) return isValidMove(toFlip, n);
  }

  function isValidMove(toFlip, n) {
    // find last element in toFlip array and find its index in the $lis array
    var $el = toFlip[toFlip.length - 1];
    var index = $lis.index($el);

    // if it's on the edge, and the next move would take it over the edge, empty the toFlip array
    if (checkIfEdge(index) && overEdge(n, index)) {
      toFlip = [];
    }

    // if there are still elements in the array, and the next counter has the correct class, flip all of the counters
    if (toFlip.length && $lis.eq(index + n).hasClass(turn)) {
      flipCounters(toFlip);
      return true;
    }

    return false;
  }

  function flipCounters(toFlip) {
    var classToAdd = turn;
    $.each(toFlip, function (i, $el) {
      setTimeout(function () {
        return addClasses($el, classToAdd);
      }, 100 * (i + 1));
    });
  }

  function addClasses($el, classToAdd) {
    $el.addClass(classToAdd + ' pulse').removeClass(opposingColor(classToAdd)).delay(1000).queue(function () {
      $el.removeClass('pulse').dequeue();
    });
    updateDisplay();
  }

  function checkIfEdge(index) {
    return index < 8 || index > 55 || index % 8 === 0 || index % 8 === 7;
  }

  function updateDisplay() {
    $black.text($('.black').length);
    $white.text($('.white').length);
    checkForWin();
  }

  function checkForWin() {
    if ($('li:not(.white):not(.black)').length === 0) {
      if ($('.black').length > $('.white').length) {
        $winner.text('Black wins!');
      } else if ($('.black').length < $('.white').length) {
        $winner.text('White wins!');
      } else {
        $winner.text('It\'s a draw!');
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4kKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgJGdyaWQgPSAkKCcuZ3JpZCcpO1xuICB2YXIgJGJsYWNrID0gJCgnLmJsYWNrRGlzcGxheScpO1xuICB2YXIgJHdoaXRlID0gJCgnLndoaXRlRGlzcGxheScpO1xuICB2YXIgJHdpbm5lciA9ICQoJy53aW5uZXInKTtcbiAgdmFyIHNxdWFyZXMgPSA2NDtcblxuICBzZXR1cEdyaWQoKTtcblxuICB2YXIgJGxpcyA9ICRncmlkLmZpbmQoJ2xpJyk7XG4gIHZhciB0dXJuID0gJ3doaXRlJztcblxuICAkbGlzLm9uKCdjbGljaycsIG1ha2VNb3ZlKTtcblxuICBmdW5jdGlvbiBzZXR1cEdyaWQoKSB7XG4gICAgJGdyaWQuZW1wdHkoKTtcblxuICAgIHdoaWxlIChzcXVhcmVzLS0pIHtcbiAgICAgICRncmlkLmFwcGVuZCgnPGxpIC8+Jyk7XG4gICAgfVxuXG4gICAgJCgnbGk6ZXEoMjcpLCBsaTplcSgzNiknKS5hZGRDbGFzcygnd2hpdGUnKTtcbiAgICAkKCdsaTplcSgyOCksIGxpOmVxKDM1KScpLmFkZENsYXNzKCdibGFjaycpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZU1vdmUoZSkge1xuICAgIHZhciAkZWwgPSAkKGUudGFyZ2V0KTtcbiAgICBpZiAoY2VsbElzRnJlZSgkZWwpKSBjaGVja0Zvck1hdGNoZXMoJGVsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRm9yTWF0Y2hlcygkZWwpIHtcbiAgICB2YXIgaW5kZXggPSAkbGlzLmluZGV4KCRlbCk7XG4gICAgdmFyIHZhbGlkTW92ZXMgPSBbMSwgOSwgOCwgNywgLTEsIC05LCAtOCwgLTddLmZpbHRlcihmdW5jdGlvbiAobikge1xuICAgICAgcmV0dXJuIGNoZWNrRGlyZWN0aW9uKG4sIGluZGV4KTtcbiAgICB9KTtcbiAgICBpZiAodmFsaWRNb3Zlcy5sZW5ndGgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCd2YWxpZE1vdmVzOicsIHZhbGlkTW92ZXMpO1xuICAgICAgJGVsLmFkZENsYXNzKHR1cm4pO1xuICAgICAgdG9nZ2xlVHVybigpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNlbGxJc0ZyZWUoJGVsKSB7XG4gICAgcmV0dXJuICEkZWwuaGFzQ2xhc3MoJ3doaXRlJykgJiYgISRlbC5oYXNDbGFzcygnYmxhY2snKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVR1cm4oKSB7XG4gICAgdHVybiA9IG9wcG9zaW5nQ29sb3IodHVybik7XG4gICAgJGdyaWQudG9nZ2xlQ2xhc3MoJ3doaXRlR28gYmxhY2tHbycpO1xuICB9XG5cbiAgZnVuY3Rpb24gb3Bwb3NpbmdDb2xvcihjdXJyZW50VHVybikge1xuICAgIHJldHVybiBjdXJyZW50VHVybiA9PT0gJ3doaXRlJyA/ICdibGFjaycgOiAnd2hpdGUnO1xuICB9XG5cbiAgZnVuY3Rpb24gb3ZlckVkZ2UobiwgaW5kZXgpIHtcbiAgICByZXR1cm4gb3ZlclRvcChuLCBpbmRleCkgfHwgb3ZlckJvdHRvbShuLCBpbmRleCkgfHwgb3ZlclJpZ2h0KG4sIGluZGV4KSB8fCBvdmVyTGVmdChuLCBpbmRleCk7XG4gIH1cblxuICBmdW5jdGlvbiBvdmVyVG9wKG4sIGluZGV4KSB7XG4gICAgcmV0dXJuIGluZGV4ICsgbiA8IDA7XG4gIH1cblxuICBmdW5jdGlvbiBvdmVyQm90dG9tKG4sIGluZGV4KSB7XG4gICAgcmV0dXJuIGluZGV4ICsgbiA+IDYzO1xuICB9XG5cbiAgZnVuY3Rpb24gb3ZlckxlZnQobiwgaW5kZXgpIHtcbiAgICByZXR1cm4gaW5kZXggJSA4ID09PSAwICYmIChpbmRleCArIG4pICUgOCA9PT0gNztcbiAgfVxuXG4gIGZ1bmN0aW9uIG92ZXJSaWdodChuLCBpbmRleCkge1xuICAgIHJldHVybiBpbmRleCAlIDggPT09IDcgJiYgKGluZGV4ICsgbikgJSA4ID09PSAwO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tEaXJlY3Rpb24obiwgaW5kZXgpIHtcbiAgICB2YXIgdG9GbGlwID0gW107XG4gICAgdmFyIGxvb3BpbmcgPSB0cnVlO1xuXG4gICAgd2hpbGUgKGxvb3BpbmcpIHtcbiAgICAgIC8vIHN0YXJ0aW5nIGZyb20gdGhlIGluZGV4IGNsaWNrZWQsIGZpcnN0IGNoZWNrIGlmIGl0J3Mgb24gdGhlIGVkZ2UsIGFuZCBpZiB0aGUgZmlyc3QgbW92ZSB3b3VsZCB0YWtlIGl0IG92ZXIgdGhlIGVkZ2UgLSBpZiBzbyBicmVhayBhbmQgZG9uJ3QgYm90aGVyIGxvb3BpbmcgYWdhaW5cbiAgICAgIGlmIChjaGVja0lmRWRnZShpbmRleCkgJiYgb3ZlckVkZ2UobiwgaW5kZXgpKSB7XG4gICAgICAgIGxvb3BpbmcgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICAvLyBhZGQgbiB0byB0aGUgaW5kZXggdG8gY2hlY2sgdGhlIG5leHQgY2VsbCBpbiB0aGF0IGRpcmVjdGlvblxuICAgICAgaW5kZXggKz0gbjtcbiAgICAgIC8vIGdyYWIgdGhhdCBjZWxsIGZyb20gdGhlIERPTVxuICAgICAgdmFyICRlbCA9ICRsaXMuZXEoaW5kZXgpO1xuICAgICAgLy8gaWYgdGhlcmUgaXMgYSBjZWxsIGFuZCB0aGUgY2VsbCBkb2VzIG5vdCBoYXZlIHRoZSBvcHBvc2luZyBjb2xvciBkb24ndCBib3RoZXIgbG9vcGluZyBhZ2FpbiwgZWxzZSBwdXNoIGNlbGwgaW50byB0b0ZsaXBcbiAgICAgIGlmICghJGVsLmhhc0NsYXNzKG9wcG9zaW5nQ29sb3IodHVybikpKSBsb29waW5nID0gZmFsc2U7ZWxzZSB0b0ZsaXAucHVzaCgkZWwpO1xuICAgIH1cblxuICAgIGlmICh0b0ZsaXAubGVuZ3RoKSByZXR1cm4gaXNWYWxpZE1vdmUodG9GbGlwLCBuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVmFsaWRNb3ZlKHRvRmxpcCwgbikge1xuICAgIC8vIGZpbmQgbGFzdCBlbGVtZW50IGluIHRvRmxpcCBhcnJheSBhbmQgZmluZCBpdHMgaW5kZXggaW4gdGhlICRsaXMgYXJyYXlcbiAgICB2YXIgJGVsID0gdG9GbGlwW3RvRmxpcC5sZW5ndGggLSAxXTtcbiAgICB2YXIgaW5kZXggPSAkbGlzLmluZGV4KCRlbCk7XG5cbiAgICAvLyBpZiBpdCdzIG9uIHRoZSBlZGdlLCBhbmQgdGhlIG5leHQgbW92ZSB3b3VsZCB0YWtlIGl0IG92ZXIgdGhlIGVkZ2UsIGVtcHR5IHRoZSB0b0ZsaXAgYXJyYXlcbiAgICBpZiAoY2hlY2tJZkVkZ2UoaW5kZXgpICYmIG92ZXJFZGdlKG4sIGluZGV4KSkge1xuICAgICAgdG9GbGlwID0gW107XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlcmUgYXJlIHN0aWxsIGVsZW1lbnRzIGluIHRoZSBhcnJheSwgYW5kIHRoZSBuZXh0IGNvdW50ZXIgaGFzIHRoZSBjb3JyZWN0IGNsYXNzLCBmbGlwIGFsbCBvZiB0aGUgY291bnRlcnNcbiAgICBpZiAodG9GbGlwLmxlbmd0aCAmJiAkbGlzLmVxKGluZGV4ICsgbikuaGFzQ2xhc3ModHVybikpIHtcbiAgICAgIGZsaXBDb3VudGVycyh0b0ZsaXApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gZmxpcENvdW50ZXJzKHRvRmxpcCkge1xuICAgIHZhciBjbGFzc1RvQWRkID0gdHVybjtcbiAgICAkLmVhY2godG9GbGlwLCBmdW5jdGlvbiAoaSwgJGVsKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFkZENsYXNzZXMoJGVsLCBjbGFzc1RvQWRkKTtcbiAgICAgIH0sIDEwMCAqIChpICsgMSkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ2xhc3NlcygkZWwsIGNsYXNzVG9BZGQpIHtcbiAgICAkZWwuYWRkQ2xhc3MoY2xhc3NUb0FkZCArICcgcHVsc2UnKS5yZW1vdmVDbGFzcyhvcHBvc2luZ0NvbG9yKGNsYXNzVG9BZGQpKS5kZWxheSgxMDAwKS5xdWV1ZShmdW5jdGlvbiAoKSB7XG4gICAgICAkZWwucmVtb3ZlQ2xhc3MoJ3B1bHNlJykuZGVxdWV1ZSgpO1xuICAgIH0pO1xuICAgIHVwZGF0ZURpc3BsYXkoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrSWZFZGdlKGluZGV4KSB7XG4gICAgcmV0dXJuIGluZGV4IDwgOCB8fCBpbmRleCA+IDU1IHx8IGluZGV4ICUgOCA9PT0gMCB8fCBpbmRleCAlIDggPT09IDc7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xuICAgICRibGFjay50ZXh0KCQoJy5ibGFjaycpLmxlbmd0aCk7XG4gICAgJHdoaXRlLnRleHQoJCgnLndoaXRlJykubGVuZ3RoKTtcbiAgICBjaGVja0ZvcldpbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tGb3JXaW4oKSB7XG4gICAgaWYgKCQoJ2xpOm5vdCgud2hpdGUpOm5vdCguYmxhY2spJykubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAoJCgnLmJsYWNrJykubGVuZ3RoID4gJCgnLndoaXRlJykubGVuZ3RoKSB7XG4gICAgICAgICR3aW5uZXIudGV4dCgnQmxhY2sgd2lucyEnKTtcbiAgICAgIH0gZWxzZSBpZiAoJCgnLmJsYWNrJykubGVuZ3RoIDwgJCgnLndoaXRlJykubGVuZ3RoKSB7XG4gICAgICAgICR3aW5uZXIudGV4dCgnV2hpdGUgd2lucyEnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICR3aW5uZXIudGV4dCgnSXRcXCdzIGEgZHJhdyEnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pOyJdLCJmaWxlIjoiYXBwLmpzIn0=
