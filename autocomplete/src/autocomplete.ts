import { WebWorker } from './webWorker';
let webWorkerInProgress: boolean = false;
let nextValue: string;

export default function autocomplete(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  WebWorker.init()
    .then(() => {
      element.addEventListener("input", () => {
        const value = (element as any).value as string;

        if (value.trim() === '') {
          hideAutoCompleteUI();
        } else if (!webWorkerInProgress){
          getSuggestions(element, value);
        } else {
          nextValue = value;
        }
      });
  });
}

function getSuggestions(element: HTMLElement, text: string) {
  webWorkerInProgress = true;
  WebWorker.postMessage(text)
    .then(msgEvent => {
      webWorkerInProgress = false;
      displaySuggestions(element, msgEvent.data, text);

      if (nextValue) {
        getSuggestions(element, nextValue);
        nextValue = '';
      }
    })
    .catch(error => {
      webWorkerInProgress = false;
      (element as any).value = error;
    });
}

function displaySuggestions(element: HTMLElement, suggestions: any[], original: string) {
  hideAutoCompleteUI();
  const div = document.createElement('div');
  div.setAttribute('id', `${element.id}-autocomplete-list`);
  div.setAttribute('class', 'autocomplete-items');

  element.parentNode && element.parentNode.appendChild(div);

  for (let i = 0; i < suggestions.length; i++) {
    const b = document.createElement("DIV");
    b.innerHTML = "<strong>" + suggestions[i].substr(0, original.length) + "</strong>";
    b.innerHTML += suggestions[i].substr(original.length);
    b.innerHTML += "<input type='hidden' value='" + suggestions[i] + "'>";
    b.addEventListener("click", function(e) {
      (element as any).value = this.getElementsByTagName("input")[0].value;
      hideAutoCompleteUI();
    });
    div.appendChild(b);
  }
}

function hideAutoCompleteUI() {
  const lists = document.getElementsByClassName('autocomplete-items');
  for (let i = lists.length - 1; i >= 0; i--) {
    let listEl = lists[i];
    if (listEl && listEl.parentNode) {
      listEl.parentNode.removeChild(listEl);
    }
  }
}
