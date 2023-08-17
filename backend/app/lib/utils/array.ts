declare global {
  interface Array<T> {
    remove(o: T | undefined | null): T[];
  }
}

/**
 * Returns an array with all elements but the element which
 * should be removed. If no element to remove was provided,
 * the provided array gets returned. This method does not
 * manipulate the original array.
 *
 * @param arr     The array to remove the element from
 * @param remove  The element which should get removed
 * @returns       The array without the provided element
 */
// eslint-disable-next-line no-extend-native, func-names
Array.prototype.remove = function <T>(this: T[], elem: T | undefined | null): T[] {
  return !elem ? this : this.filter((e) => e !== elem);
};
