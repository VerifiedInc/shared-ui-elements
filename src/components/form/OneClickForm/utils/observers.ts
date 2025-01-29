/**
 * Defines a callback function for observers.
 * @template T - The type of data the observer callback receives.
 */
type ObserverCallback<T> = (data: T) => void;

/**
 * Represents an observable object that can be observed by multiple observers.
 * @template T - The type of data the observable holds.
 */
interface Observable<T> {
  /**
   * Adds an observer to the list of observers.
   * @param observer - The callback function to be invoked when the observable is updated.
   */
  addObserver(observer: ObserverCallback<T>): void;

  /**
   * Removes an observer from the list of observers.
   * @param observer - The callback function to be removed from the list of observers.
   */
  removeObserver(observer: ObserverCallback<T>): void;

  /**
   * Notifies all observers with the provided data.
   * @param data - The data to be sent to all observers.
   */
  notify(data: T): void;
}

/**
 * Creates an observable object.
 * @template T - The type of data the observable will hold.
 * @returns An object with methods to manage observers for the created observable.
 */
export function createObservable<T>(): Observable<T> {
  // Array to store observer callback functions
  const observers: ObserverCallback<T>[] = [];

  /**
   * Adds an observer to the list of observers.
   * @param observer - The callback function to be added as an observer.
   */
  function addObserver(observer: ObserverCallback<T>) {
    observers.push(observer);
  }

  /**
   * Removes an observer from the list of observers.
   * @param observer - The callback function to be removed from the list of observers.
   */
  function removeObserver(observer: ObserverCallback<T>) {
    const index = observers.indexOf(observer);
    if (index !== -1) {
      observers.splice(index, 1);
    }
  }

  /**
   * Notifies all observers with the provided data.
   * @param data - The data to be sent to all observers.
   */
  function notify(data: T) {
    observers.forEach((observer) => {
      observer(data);
    });
  }

  // Return an object with methods to manage observers
  return {
    addObserver,
    removeObserver,
    notify,
  };
}
