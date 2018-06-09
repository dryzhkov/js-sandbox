'use strict';
var wordTrie = [];
function getSuggestions(value) {
  postMessage(wordTrie.splice(0, 10));
}

function initWords(words) {
  wordTrie = words;
}

onmessage = function (e) {
  var msg = e.data;

  if (msg.type === 'init_data') {
    initWords(msg.payload);
  } else if (msg.type === 'find_suggestion') {
    getSuggestions(msg.payload);
  }
};

