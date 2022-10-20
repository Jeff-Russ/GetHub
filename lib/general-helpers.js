const util = require('util')
// util in browser: https://github.com/simpleviewinc/util-browser/blob/master/index.min.js

function logAllProperties(obj) {
  if (obj == null) return; // recursive approach
  console.log(obj.constructor.name, 'properties: ', Object.getOwnPropertyNames(obj));
  logAllProperties(Object.getPrototypeOf(obj));
}
exports.logAllProperties = logAllProperties


function logConstructorNames(obj) {
  if (obj == null) return; // recursive approach
  console.log(obj.constructor.name);
  logConstructorNames(Object.getPrototypeOf(obj));
}
exports.logConstructorNames = logConstructorNames


function deepObjToString(obj, options={}) {
  return util.inspect(obj, {showHidden: false, depth: null, colors: true, ...options})
}
exports.deepObjToString = deepObjToString


function logDeepObj(obj, options={}) {
  console.log(util.inspect(obj, {showHidden: false, depth: null, colors: true, ...options}))
}
exports.logDeepObj = logDeepObj


const arr2obj = (arr) => arr.reduce((accum, v, i) => ({...accum, [i]: v}), {});
exports.arr2obj = arr2obj



/**
 * https://itnext.io/explode-an-array-into-a-deeply-nested-object-with-this-simple-recursive-function-4094ac1eeb8b
 * explode lets you take an array and convert it to an object where the keys become the value of a particular 
 * property within each object and the name of the key is passed as the second arg to explode. 
 * additional args (...rest) are keys withing arrays within the objects where each next key is goes deeper 
 * into the object,
 */
const explode = (array, key, ...rest) => array.reduce((acc, item) => ({
  ...acc,
  [item[key]]: rest.length ? {
    ...acc[item[key]],
    ...explode([item], ...rest)
  } : item
}), {})

exports.explode = explode

function objectifyArray (obj_or_arr) {
  if (!Array.isArray(obj_or_arr)) {
    const result = {}
    for (const [key, val] of Object.entries(obj_or_arr)) {
      if (Array.isArray(val)) result[key] = objectifyArray(val)
      else result[key] = val
    }
    return result
  }
  else {
    const result = {}
    obj_or_arr.forEach(function (val, idx) {
      if (typeof val === 'object') {
        result[idx] = objectifyArray(val)
      } else {
        result[idx] = val
      }
    })
    return result
  }
}

exports.objectifyArray = objectifyArray


function valType(val, string_is_num=false, bigint_is_int=false) {
  if (typeof val === 'string') {
    if (!string_is_num) return 'string'
    if (/^ *\d+\.?[0]* *$/.test(val)) return 'int'
    if (/^ *\d*\.\d+ *$/.test(val)) return 'float'
  }
  if (val === null || typeof val === 'undefined') return val
  if (Array.isArray(val)) return 'array'
  if (typeof val === 'number') return (val % 1 ? 'float' : 'int')
  if (bigint_is_int && typeof val == 'bigint') return 'int'
  return typeof val
}

exports.valType = valType

