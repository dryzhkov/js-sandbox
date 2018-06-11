'use strict';
var wordTrie = [];
function getSuggestions(value) {
  if (value === '') {
    return [];
  }
  value = value.toLowerCase();
  var suggestions = [];
  var startingEl = traverseUntilEndOf(value);
  if (startingEl) {
    searchBFS(value, startingEl, suggestions, 10);
  }
  postMessage(suggestions);
}

function searchDFS(value, curEl, suggestions, limit) {
  if (suggestions.length === limit) {
    return;
  } else if (curEl.isWord) {
    suggestions.push(value);
  }

  for (var el of curEl.words) {
    if (el) {
      searchDFS(value + el.char, el, suggestions, limit);
    }
  }
}

function searchBFS(value, startEl, suggestions, limit) {
  var queue = [];
  queue.push({
    element: startEl,
    word: value
  });

  while (queue.length && suggestions.length < limit) {
    var w = queue.shift();
    if (w.element.isWord) {
      suggestions.push(w.word);
    }

    for (var child of w.element.words) {
      if (child) {
        queue.push({
          element: child,
          word: w.word + child.char
        });
      }
    }
  }
}

function traverseUntilEndOf(value) {
  var curWordList = wordTrie;
  var curEl = null;
  for (var i = 0; i < value.length; i++) {
    var c = value[i];
    var cIndex = atoi(c);
    curEl = curWordList[cIndex];
    if (curEl) {
      curWordList = curEl.words;
    } else {
      return null;
    }
  }

  return curEl;
}

function initWords(words) {
  var curWordList = wordTrie;
  for (var word of words) {
    for (var i = 0; i < word.length; i++) {
      var c = word[i].toLowerCase();
      var cIndex = atoi(c);
      if (curWordList[cIndex] === undefined) {
        var wordEl = {
          char: c,
          words: [],
          isWord: i === (word.length - 1)
        };

        curWordList[cIndex] = wordEl;
      } else if (i === (word.length - 1)) {
        curWordList[cIndex].isWord = true;
      }

      curWordList = curWordList[cIndex].words;
    }
    curWordList = wordTrie;
  }
}

onmessage = function (e) {
  var msg = e.data;

  if (msg.type === 'init_data') {
    initWords(msg.payload);
  } else if (msg.type === 'find_suggestion') {
    getSuggestions(msg.payload);
  }
};

function atoi(c) {
  return c.charCodeAt() - 48; // 48 is ASCII for "0"
}

