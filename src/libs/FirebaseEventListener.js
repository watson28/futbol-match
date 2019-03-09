export default class FirebaseEventListener {
  _eventListeners = [];
  _errorListeners = [];
  _promiseResolved = false;

  constructor(onFirebaseEvent) {
    this._initialEventPromise = new Promise((resolve, reject) => {
      this._unsuscribe = onFirebaseEvent(event => {
        if (!this._promiseResolved) {
          this._promiseResolved = true;
          resolve(event);
        }
        this._notifyEvent(event);
      }, error => {
        if (this._promiseResolved) {
          this._promiseResolved = true;
          reject(error);
        }
        this._notifyError(error)
      });
    });
  }

  onEvent(callback) {
    this._eventListeners.push(callback);
  }

  onError(callback) {
    this._errorListeners.push(callback);
  }

  unsubscribe() {
    this._eventListeners = [];
    this._errorListeners = [];
    this._unsuscribe();
  }

  getInitialEventPromise() {
    return this._initialEventPromise;
  }

  _notifyEvent(event) {
    this._eventListeners.forEach(subscriber => subscriber(event));
  }

  _notifyError(error) {
    this._eventListeners.forEach(subscriber => subscriber(error));
  }
}