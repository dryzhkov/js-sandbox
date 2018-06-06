'use strict';

onmessage = function (e) {
  let workerResult = 'w~' + (e.data);
  setTimeout(function () { postMessage(workerResult); }, 1000);
}