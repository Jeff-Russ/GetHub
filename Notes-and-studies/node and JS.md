## Array Objects vs Non-Array Objects 

In making this function:

```js
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
```

(There is a better way to do this, which I show at the end of this section.)

I learned a few things:

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

##### Better way to log deep objects:

[how-can-i-get-the-full-object-in-node-jss-console-log](https://stackoverflow.com/questions/10729276/how-can-i-get-the-full-object-in-node-jss-console-log-rather-than-object)

```js
const util = require('util')

console.log(util.inspect(myObject, {showHidden: false, depth: null, colors: true}))

// alternative shortcut
console.log(util.inspect(myObject, false, null, true /* enable colors */))
```

I'll just do this:

```js
const util = require('util')


function deepObjToString(obj, options={}) {
  return util.inspect(obj, {showHidden: false, depth: null, colors: true, ...options})
}
exports.deepObjToString = deepObjToString

function logDeepObj(obj, options={}) {
  console.log(util.inspect(obj, {showHidden: false, depth: null, colors: true, ...options}))
}
exports.logDeepObj = logDeepObj


```

## Object with null prototype

what does `[Object: null prototype] {...}` means?

https://www.bennadel.com/blog/2797-creating-objects-with-a-null-prototype-in-node-js.htm

It's what you get if you create and object like this:

```js
let safeCache = Object.create( null );

```


```js
function logAllProperties(obj) {
  if (obj == null) return; // recursive approach
  console.log(Object.getOwnPropertyNames(obj));
  logAllProperties(Object.getPrototypeOf(obj));
}
```

take a look in REPL

```js
> logAllProperties({})
[]
[
  'constructor',
  '__defineGetter__',
  '__defineSetter__',
  'hasOwnProperty',
  '__lookupGetter__',
  '__lookupSetter__',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toString',
  'valueOf',
  '__proto__',
  'toLocaleString'
]
> logAllProperties(Object.create( null ))
[]
```

see more here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

