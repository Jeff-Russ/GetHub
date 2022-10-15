function commonElementsCount(arr1, arr2) {
  return arr1.filter( el => arr2.indexOf(el) >= 0).length
}

exports.commonElementsCount = commonElementsCount


const { valType } = require('./general-helpers');

/**
 * Usage:
 * try {
 *   searchArrayOfSingleKeyObjectsByKey(array, key)
 * } catch(e) {
 *   // if array was not in format for this search:
 *   // e.message.startsWith("non") will be false
 * }
 * text.startsWith("Hello");
 * @param {array} array of single key object to to search
 * @param {string} key to be searched for  
 * @returns matching element in array
 */
 function searchArrayOfSingleKeyObjectsByKey(array, key) {
  for (el of array) {
    if (valType(el) !== 'object') throw new Error('found non-object')
    el_keys = Object.keys(el)
    el_keys_len = el_keys.length
    if (el_keys_len > 1)  throw new Error('found object with more than one key')
    else if (key in el_keys) return  el
  }
  throw new Error('not found')
}


exports.searchArrayOfSingleKeyObjectsByKey = searchArrayOfSingleKeyObjectsByKey

/**
 * Usage: obj.get = get; someobject(topkey, innerkey, innerinnerkey)
 * It is meant to used on objects arranged to force them to be fully ordered by 
 * breaking multi-property objects in to arrays of single property objects.
 * 
 * it allows for:
 *    obj=[{onlykey: "this value"}, {onlykey: 0}] to be accessed by obj.get('onlykey')
 * or
 *    obj=[{key0: "this value", key1:0}] to be accessed by obj.get('key0')
 * 
 * 
 * @param  {...string} keys_through_obj 
 * @returns item in object (this) that is found at sequence of keys through object 
 */
function get(...keys_through_obj) {
  const errMsg = (curr_item, key) => `.get(${keys_through_obj.join(', ')}) failed with ${curr_item}[${key}]`
  let curr_item = this
  
  for (let key of keys_through_obj) {
    // console.log(`looping with ${key}`)
    const curr_type = valType(curr_item)
    if (!curr_type) {
      throw new Error(errMsg(curr_item, key))
    }
    const key_type = valType(key,true)
    if (key_type === 'int') key = parseInt(key)

    if (key in curr_item) {
      console.log(`${key} key found directly`)
      curr_item = curr_item[key]
    }
    if (curr_type === 'object' && Object.keys(curr_item).length === 1){
      curr_item = curr_item[Object.keys(curr_item)[0]]
    }
    else if (curr_type === 'array') {
      let found;
      try {
        found = searchArrayOfSingleKeyObjectsByKey(key)
        curr_item = found
      } catch(e) {
        if (e.message.startsWith("non")) {
          throw new Error(errMsg(typeof curr_item, key))
        } // else maybe try something else?
      }
    }
      // var ob_keys, ob_keys_len;
      // if (curr_type === 'object') {
      //   ob_keys = Object.keys(curr_item)
      //   ob_keys_len = ob_keys.length
      // }
      // if (ob_keys_len === 1 && key_type === 'int' && curr_item[ob_keys[0]] === 'array') {
      // }
    else {
      throw new Error(errMsg(typeof curr_item, key))
    }
  }
  return curr_item
}

exports.get = get