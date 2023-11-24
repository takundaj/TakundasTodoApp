import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

/**
 * Sorts an array of objects by their 'title' property in ascending order.
 *
 * @param {FirebaseFirestoreTypes.DocumentData[] | [] | undefined} array - The array to be sorted.
 * @returns {FirebaseFirestoreTypes.DocumentData[] | [] | undefined} The sorted array.
 *
 * @example
 * // Returns sorted array based on 'title' property
 * const sortedArray = sortByTitle([
 *   { title: "Banana" },
 *   { title: "Apple" },
 *   { title: "Orange" },
 * ]);
 */

export const sortByTitle = (
  array: FirebaseFirestoreTypes.DocumentData[] | [] | undefined
) => {
  return array?.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
};

/**
 * Calculates the size based on the provided multiplier.
 * @param {number} multiplier
 *   - If 0, the result is 0.
 *   - If negative, the absolute value of the multiplier is multiplied by -4.
 *   - If positive, the multiplier is multiplied by 4.
 *
 * @returns {number} The calculated size.
 *
 * @example
 * // Returns 0
 * const result1 = size(0);
 *
 * // Returns -12 (4 * -3)
 * const result2 = size(-3);
 *
 * // Returns 8 (4 * 2)
 * const result3 = size(2);
 */

export const size = (multiplier: number) => {
  if (multiplier === 0) return 0;

  if (multiplier < 0) return multiplier * -4;

  return multiplier * 4;
};
