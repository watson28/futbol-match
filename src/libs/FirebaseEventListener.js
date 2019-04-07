import isFunction from 'lodash/isFunction';

export default class FirebaseEventListener {
  _eventListeners = [];
  _errorListeners = [];
  _promiseResolved = false;

  constructor(onFirebaseEvent) {
    if (!isFunction(onFirebaseEvent) || onFirebaseEvent.length < 2) {
      throw new Error('Constructor requires a function with two arguments: onSnapshot and onError');
    }
    this._initialEventPromise = new Promise((resolve, reject) => {
      this._unsuscribe = onFirebaseEvent(event => {
        this._notifyEvent(event);
        if (!this._promiseResolved) {
          this._promiseResolved = true;
          resolve(event);
        }
      }, error => {
        this._notifyError(error)
        if (this._promiseResolved) {
          this._promiseResolved = true;
          reject(error);
        }
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
    this._errorListeners.forEach(subscriber => subscriber(error));
  }
}