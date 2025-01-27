import { purry } from './purry';

/**
 * Split an array into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.
 * @param array the array
 * @param size the length of the chunk
 * @signature
 *    R.chunk(array, size)
 * @example
 *    R.chunk(['a', 'b', 'c', 'd'], 2) // => [['a', 'b'], ['c', 'd']]
 *    R.chunk(['a', 'b', 'c', 'd'], 3) // => [['a', 'b', 'c'], ['d']]
 * @data_first
 * @category Array
 */
export function chunk<T>(
  array: ReadonlyArray<T>,
  size: number
): Array<Array<T>>;

/**
 * Split an array into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.
 * @param size the length of the chunk
 * @signature
 *    R.chunk(size)(array)
 * @example
 *    R.chunk(2)(['a', 'b', 'c', 'd']) // => [['a', 'b'], ['c', 'd']]
 *    R.chunk(3)(['a', 'b', 'c', 'd']) // => [['a', 'b', 'c'], ['d']]
 * @data_last
 * @category Array
 */
export function chunk<T>(
  size: number
): (array: ReadonlyArray<T>) => Array<Array<T>>;

export function chunk() {
  return purry(_chunk, arguments);
}

function _chunk<T>(array: Array<T>, size: number) {
  const ret: Array<Array<T>> = [];
  let current: Array<T> | null = null;
  array.forEach(x => {
    if (!current) {
      current = [];
      ret.push(current);
    }
    current.push(x);
    if (current.length === size) {
      current = null;
    }
  });
  return ret;
}
