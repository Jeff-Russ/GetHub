"use strict";
exports.__esModule = true;
exports.symmetricDifferencesTest = exports.symmetricDifferences = exports.difference = exports.intersection = exports.removeByIndex = void 0;
/**
 * Remove one element by index from a returned copy of the array
 * @returns shallow copy of array with element at index removed
 */
function removeByIndex(array, index) {
    var cloneArray = array.slice(); // we have safe this because the .splice mutates...
    cloneArray.splice(index, 1); // the removal but returns the removed element so don't return this!
    return cloneArray;
}
exports.removeByIndex = removeByIndex;
// exports.removeByIndex = removeByIndex
/**
 * Get the intersection (common elements) between two or more arrays
 * @returns a new array of elements common to all arrays passed in
 */
function intersection() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    if (arrays.length === 2) {
        return arrays[0].filter(function (v) { return arrays[1].includes(v); });
    }
    return arrays.reduce(function (accumOrZeroth, nextArr) { return accumOrZeroth.filter(function (v) { return nextArr.includes(v); }); });
}
exports.intersection = intersection;
// exports.intersection = intersection
/**
 * Get the first array passed - the second array passed - the third array passed...etc.
 * @returns the first array passed with elements found in any subsequent arrays removed
 */
function difference() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    if (arrays.length === 2) {
        return arrays[0].filter(function (v) { return !arrays[1].includes(v); });
    }
    return arrays.reduce(function (accumOrZeroth, nextArr) { return accumOrZeroth.filter(function (v) { return !nextArr.includes(v); }); });
}
exports.difference = difference;
// exports.difference = difference
/**
 * Get the symmetric differences (aka) multiple array separated into an array of arrays by their origin.
 * @returns and array of arrays just like input arrays but each only contains element not found in any other array.
 */
function symmetricDifferences() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    if (arrays.length === 2)
        return arrays[0].filter(function (v) { return !arrays[1].includes(v); }).concat(arrays[1].filter(function (x) { return !arrays[0].includes(x); }));
    var differences = [];
    var _loop_1 = function (i) {
        var others = removeByIndex(arrays, i).flat();
        differences[i] = arrays[i].filter(function (v) { return !others.includes(v); });
    };
    for (var i = 0; i < arrays.length; i++) {
        _loop_1(i);
    }
    return differences;
}
exports.symmetricDifferences = symmetricDifferences;
// exports.symmetricDifferences = symmetricDifferences
function symmetricDifferencesTest() {
    var a1 = ['1only#1', 'all1', 'all2', '1only#2'];
    var a2 = ['2only#2', 'all1', '2only#2', 'all2'];
    var a3 = ['all2', '3onlyDuped', 'all1', '3onlyDuped'];
    console.log(symmetricDifferences(a1, a2, a3));
}
exports.symmetricDifferencesTest = symmetricDifferencesTest;
