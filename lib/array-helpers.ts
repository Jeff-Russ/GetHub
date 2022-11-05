
/**
 * Remove one element by index from a returned copy of the array 
 * @returns shallow copy of array with element at index removed
 */
export function removeByIndex(array:any[], index:number) {
  const cloneArray = array.slice(); // we have safe this because the .splice mutates...
  cloneArray.splice(index,1); // the removal but returns the removed element so don't return this!
  return cloneArray
}
// exports.removeByIndex = removeByIndex


/**
 * Get the intersection (common elements) between two or more arrays
 * @returns a new array of elements common to all arrays passed in
 */
export function intersection(...arrays:any[][]) {
  if (arrays.length === 2) {
    return arrays[0].filter(v => arrays[1].includes(v))
  }
  return arrays.reduce(
    (accumOrZeroth, nextArr) => accumOrZeroth.filter(v => nextArr.includes(v))
  )
}
// exports.intersection = intersection


/**
 * Get the first array passed - the second array passed - the third array passed...etc.
 * @returns the first array passed with elements found in any subsequent arrays removed
 */
export function difference(...arrays:any[][]) {
  if (arrays.length === 2) {
    return arrays[0].filter(v => !arrays[1].includes(v))
  }
  return arrays.reduce(
    (accumOrZeroth, nextArr) => accumOrZeroth.filter(v => !nextArr.includes(v))
  )
}
// exports.difference = difference


/**
 * Get the symmetric differences (aka) multiple array separated into an array of arrays by their origin.
 * @returns and array of arrays just like input arrays but each only contains element not found in any other array. 
 */
 export function symmetricDifferences(...arrays:any[][]) {
  if (arrays.length === 2) return arrays[0].filter(
    v => !arrays[1].includes(v)).concat(arrays[1].filter(x => !arrays[0].includes(x))
  );
  const differences:any[] = []
  for (let i = 0; i < arrays.length; i++) {
    const others = removeByIndex(arrays, i).flat();
    differences[i] = arrays[i].filter(v => !others.includes(v))
  }
  return differences
}
// exports.symmetricDifferences = symmetricDifferences

export function symmetricDifferencesTest() {
  const a1 = ['1only#1', 'all1', 'all2', '1only#2']
  const a2 = ['2only#2', 'all1', '2only#2', 'all2']
  const a3 = ['all2', '3onlyDuped', 'all1', '3onlyDuped']
  console.log(symmetricDifferences(a1,a2,a3))
}
