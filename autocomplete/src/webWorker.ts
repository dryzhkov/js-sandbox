export class WebWorker {

  public static postMessage(payload: string): Promise<MessageEvent> {
    if (!WebWorker.instance) {
      return Promise.reject('worker not initialized');
    }

    WebWorker.instance.postMessage({ type: 'find_suggestion', payload: payload });

    return new Promise<MessageEvent>((resolve, reject) => {
      WebWorker.instance.onmessage = (event: MessageEvent) => {
        resolve(event);
      };

      WebWorker.instance.onerror = (error: ErrorEvent) => {
        reject(error);
      }
    });
  }

  private static instance: Worker;

  public static init(): Promise<void> {
    if (!WebWorker.instance) {
      return fetch('words.txt')
        .then(response => { return response.text(); })
        .then(result => {
          WebWorker.instance = new Worker(process.env.PUBLIC_URL + '/worker.js');
          const msg = {
            type: 'init_data',
            payload: result.split('\n')
          }
          WebWorker.instance.postMessage(msg);
          return;
        });
    }
    return Promise.resolve();
  }
}