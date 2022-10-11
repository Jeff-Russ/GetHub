/*
NOTES ON LEARNING JAVASCRIPT

* typeof value === 'object' is true arrays
* determining if a variable is an array can be done with Array.isArray(value)
* So my plan to determining if an object is a non-array object was to 
  1. check if it and object and then
  2. check if that object is also an array
  3. if not: its a non-array object.
BUT THERE IS A PROBLEM WITH THIS: null is a freaking object!

So the best I have to determine if a variable is non-array object, and by a
"non-array object" I really mean a json-like object is:

  variable !== null && typeof value === 'object' && !Array.isArray(variable)

which is freaking awful!!

BY THE WAY: undefined is not an object so the above would work to eliminate undefined
*/

console.log(util.inspect(myObject, {showHidden: false, depth: null, colors: true}))

function logObjDepth2(obj) {
  console.log(`------------\n${obj}\n---------`)
  for (const [key, value] of Object.entries(obj)){
    if (value !== null && typeof value === 'object') {
      const [size, start,end] = (Array.isArray(value)) 
        ? [value.length, '[', ']']
        : [Object.keys(value).length, '{', '}']
      if (size !== 0) {
        console.log(`${key}: ${start}`);
        for (const [k, v] of Object.entries(value)) {
          console.log(`  ${k}:`, typeof v === 'string' ? `"${v}"` : v);
        }
        console.log(end);
      }
      else {
        console.log(`${key}: ${start}${end}`)
      }
    }
    else if (typeof value === 'string') {
      const len = value.length
      if (len < 100) {
        console.log(`${key}: "${value}"`);
      } else {
        console.log(`${key}: <A string of length ${len}>`);
      }
      
    }
    else {
      console.log(`${key}: ${value}`);
    }
  }
}
exports.logObjDepth2 = logObjDepth2