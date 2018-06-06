export class WebWorker {

  public static postMessage(payload: string): Promise<MessageEvent> {
    if (!WebWorker.instance) {
      WebWorker.init();
    }

    WebWorker.instance.postMessage(payload);

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

  private static init() {
    if (!WebWorker.instance) {
      WebWorker.instance = new Worker(process.env.PUBLIC_URL + '/worker.js');
    }
    return WebWorker.instance;
  }
}