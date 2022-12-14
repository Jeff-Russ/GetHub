/**
 * Example usage:
 *  fetchGET('https://api.github.com/users/edx/repos')
 *    .then(json => {
 *      // use json
 *    })
 *    .catch(error => { console.log(`Error: ${error.message}`); });
 * @param {string} url 
 * @returns json or Promise.reject(new Error(res.status))
 */
export async function fetchGET(url:string) { // currently NOT USED
  const res = await fetch(url)
  return res.ok ? res.json() : Promise.reject(new Error(res.status.toString()));
}


/**
 * https://itnext.io/explode-an-array-into-a-deeply-nested-object-with-this-simple-recursive-function-4094ac1eeb8b
 * explode lets you take an array and convert it to an object where the keys become the value of a particular 
 * property within each object and the name of the key is passed as the second arg to explode. 
 * additional args (...rest) are keys withing arrays within the objects where each next key is goes deeper 
 * into the object,
 */
 export const explode = (array:any[], key:string, ...rest:string[]):object =>  // NOT USED
  array.reduce((acc, item) => (
    {
      ...acc,
      [item[key]]: rest.length ? {
        ...acc[item[key]],
        ...explode([item], rest[0], ...(rest.slice(1)))
      } : item
    }
  ), {})


// used in endpoints.js
export function objectifyArray (obj_or_arr:object | any[]) {
  const result:any  = {}
  if (!Array.isArray(obj_or_arr)) {
    for (const [key, val] of Object.entries(obj_or_arr)) {
      if (Array.isArray(val)) result[key] = objectifyArray(val)
      else result[key] = val
    }
    return result
  }
  else {
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


// late interpolating of plain strings https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string

// String.prototype.interpolate = function(params) {
//   const names = Object.keys(params);
//   const vals = Object.values(params);
//   const func = new Function(...names, `return \`${this}\`;`)(...vals);
//   console.log(func)
//   return func;
// }
// function String_interplate_demo() {
//   let template = 'Example text: ${text}';
//   let text = 'Foo Boo'
//   return template.interpolate({ text });
// }

export function interpolate(str:string, params:object) { // currently NOT USED
  const names = Object.keys(params);
  const vals = Object.values(params);
  const func = new Function(...names, `return \`${str}\`;`)(...vals);
  /* 
  if called with ("A string with ${variable}" {variable: "value"})
  new Function(...names, `return \`${string}\`;`)
  is:
  function anonymous(variable) {
    return `A string with ${variable}`;
  }
  and returning it with (...vals) means it is self executing,
  and a lot like this:

  (function(variable){
    return `A string with ${variable}`;
  })("value");

  */
  return func;
}

// NOT USED
function interplate_demo() {
  let template = 'Example text: ${text}';
  let text = 'Foo Boo'
  return interpolate(template, { text });
}

// /**
//  * DANGER: NOT DONE AND NOT WORKING! This is intended to be a sandboxed "jail" function
//  * @param {string} callable 
//  * @param {object} params to be passed to callable
//  * @returns 
//  */
// function callWithParams(callable:Function, params:object) {
//   const names = Object.keys(params);
//   const vals = Object.values(params);
//   const func = new Function(`return ${callable(...params)};`)(...params);
//   /* 
//   if called with ("A string with ${variable}" {variable: "value"})
//   new Function(...names, `return \`${string}\`;`)
//   is:
//   function anonymous(variable) {
//     return `A string with ${variable}`;
//   }
//   and returning it with (...vals) means it is self executing,
//   and a lot like this:

//   (function(variable){
//     return `A string with ${variable}`;
//   })("value");

//   */
//   return func;
// }

/**
* parseJSONLike is a more lax version of JSON.parse, allowing for single and backtick quotes in 
* keys and values as as well as commas after last items in arrays and objects. 
*
* @param {string} json - A JSON or JSON-like string
* @param {boolean} [retain_backticks_in_keys=false] If true `tplt ${v}` becomes "`tplt ${v}`" else "tplt ${v}"
* @param {boolean} [retain_backticks_in_vals=true] Same as retain_backticks_in_keys but for values
* @return {object} An object or array derived from json
*/
export function parseJSONLike(json:string, retain_backticks_in_keys=false, retain_backticks_in_vals=true) {  // currently NOT USED
  // The following replace functions separated by blank lines are applied in order to the string.
  // The replace functions not separated by blank lines are two choices, as decided by the 2nd + 3rd args.

  const doublequote_from_singlequote_keys = (str:string) => str.replace(/([{\[,][\n\r\s]*)'([^'\n\r:]+)':/gm, '$1"$2":');

  const doublequote_template_keys = (str:string) => str.replace(/([{\[,][\n\r\s]*)(`[^`\n\r:]+`):/gm, '$1"$2":');
  const doublequote_from_template_keys = (str:string) => str.replace(/([{\[,][\n\r\s]*)`([^`\n\r:]+)`:/gm, '$1"$2":');
  
  const doublequote_unquote_keys = (str:string) => str.replace(/([{\[,][\n\r\s]*)([^"][^\n\r:]+[^"]):/gm, '$1"$2":');

  const remove_last_commas = (str:string) => str.replace(/,([\n\r\s]*[}\]])/gm, '$1');

  const doublequote_from_singlequote_values = (str:string) => str.replace(/([:,][\n\r\s]*)'([^'\n\r,]+)'/gm, '$1"$2"');

  const doublequote_template_values = (str:string) => str.replace(/([:,][\n\r\s]*)(`[^`\n\r,]+`)/gm, '$1"$2"');
  const doublequote_from_template_values = (str:string) => str.replace(/([:,][\n\r\s]*)`([^'\n\r,]+)`/gm, '$1"$2"');
  
  const doublequote_object_values = (str:string) => str.replace(/(: )([^"\[{\n][^\n",]*)(,?)/gm, '$1"$2"$3')
  // At this point we might want to try unquoting allowed value types

  const doublequote_array_values = (str:string) => str.replace(/(\n *)([^\]\[{}",]+)(,)/gm, '$1"$2"$3')
  // Again, at this point we might want to try unquoting allowed value types

  const steps = [
    doublequote_from_singlequote_keys,
    retain_backticks_in_keys ? doublequote_template_keys : doublequote_from_template_keys,
    doublequote_unquote_keys,
    remove_last_commas,
    doublequote_from_singlequote_values,
    retain_backticks_in_vals ? doublequote_template_values : doublequote_from_template_values,
    doublequote_object_values,
    doublequote_array_values
  ]
  

  let step_num = 0;
  let result = '';
  let backtrack_json = '';

  while (true) {
    try {
      result = JSON.parse( json )
      // console.log(`${step_num} succeeded`)
      break
    }
    catch (e){
      if (step_num < steps.length) {
        // console.log(`trying again with step ${step_num}`)
        backtrack_json = json
        json = steps[step_num++](json)
      }
      else {
        console.error(`parseJSONLike could not parse:\n${json}`)
        throw (e)
      }
    } 
  }
  const unquote_allowed_valuetypes = (str:string) => str.replace(/"((?:true|false|-?\d+\.\d+|-?\d+|null))"/gm, '$1')
  try {
    return JSON.parse( unquote_allowed_valuetypes(json) )
  }
  catch (e) {
    console.log(json)
    try {
      return JSON.parse( unquote_allowed_valuetypes(backtrack_json) )
    } catch (e) {
      return result
    }
  }
}


// NOT USED
function parseJSONLike_Test(json:string) {

  json ??= `{
    "user-agent": "console",
    headers: {
      'user-agent': console,
      Accept: "application/vnd.github+json",
  `+
  "    `Authorization`: `Bearer ${json}`,"+`
      array: [
        null,
        2,
        true, -1.3,
        -3,
        value,
  `+
  "      `tmplte`"+`
      ],
    },
    more: {
      'user-agent': false,
      Accept: 'application/vnd.github+json',
      Authorization: true,
    }
  }`


  console.log(parseJSONLike(json))
}

// used in endpoints.ts
export function flashContentAndCSSClass(element:HTMLElement, temp_content?:string, temp_css_class?:string, ms=1000) {
  const original_text = element.innerHTML

  if (temp_content) {
    element.innerHTML = temp_content
  }
  if (temp_css_class) {
    element.classList.add(temp_css_class);
  }
  setTimeout(()=>{
    if (temp_content) {
      element.innerHTML = original_text
    }
    if (temp_css_class) {
      element.classList.remove(temp_css_class);
    }
  }, ms)
}


export function appendParentWithMessage(element:HTMLElement, message:string) { // NOT USED
  const parent_node = element.parentNode
  if (parent_node !== null) {
    parent_node.querySelectorAll('.appendParentWithMessage').forEach(e => {
      console.log(`removing ${e}`)
      e.remove()
    })
    const error_message = document.createElement("div");
    const textnode = document.createTextNode(message);
    error_message.classList.add('appendParentWithMessage');
    error_message.appendChild(textnode);
    parent_node.appendChild(error_message);
  }
  
}


export function unappendParentMessage(element:HTMLElement) { // NOT USED
  const parent_node = element.parentNode
  if (parent_node) {
    parent_node.querySelectorAll('.appendParentWithMessage').forEach(e => {
      console.log(`removing ${e}`)
      e.remove()
    })
  }
}


export function resizeElementToContents(element:HTMLElement, extra_height=2, extra_width=2) { // NOT USED
  /* suggested use: add to tag: onkeyup="resizeElementToContents(this)"
    or 
    document.getElementById('textArea').addEventListener('keyup', (event) => {
      resizeElementToContents(event.target)
    });
    document.getElementById('textArea').addEventListener('keydown', (event) => {
      setTimeout(()=>resizeElementToContents(event.target), 20)
    });
  */
  element.style.height = "1px";
  element.style.height = (extra_height+element.scrollHeight)+"px";
  element.style.width = "1px";
  element.style.width = (extra_width+element.scrollWidth)+"px";
}
export function resizeElementWhileTyping(element:HTMLElement, extra_height=2, extra_width=2) { // currently NOT USED
  element.addEventListener('keydown', (event:Event) => {
    if (event.target !== null && event.target instanceof HTMLElement) {
      const target:HTMLElement = event.target
      setTimeout(()=>resizeElementToContents(target, extra_height, extra_width), 20)
    }
  });
}  

export function saveAndLoadPageState(element_id:string) { // currently NOT USED
  // https://gist.github.com/jhammann/6000755

  const content = document.getElementById('element_id');
  
  if (content) {
    // this line isn't really necessary here but you have to append this attribute to the element you want the html stored of.
    content.setAttribute("contenteditable", 'true')//, "true")
  
    // save the page's state after you're done with editing and clicked outside the content
    content.addEventListener("blur", () => {
      console.log("in blur")
      localStorage.setItem('page_html', content.innerHTML);
    });
  
    // pretty logical, getItem retrieves your local storage data
    const page_html = localStorage.getItem('page_html')
    if (typeof page_html === 'string') {
      content.innerHTML = page_html;
    }
  }
}
// this function resets the localstorage and thus resets the page back to it's original state.
saveAndLoadPageState.reset = function (){  // currently NOT USED
  localStorage.clear();
  window.location = window.location;
}



/**
 * src: https://stackoverflow.com/a/9547490
 * passing "hello=1&another=2" returns {hello: 1, another: 2}
 * passing ("0=zeroth&1=first", []) returns ['zeroth', 'first']
 * passing ("0=zeroth&2=second", []) returns [ 'zeroth', <1 empty item>, 'second' ]
 * @param {string} query_string portion starting or after '?' 
 * @param {object} result should be {} or []. {} is default 
 * @returns Object (null prototype) with key/value pairs if result={} or array if result=[]
 */
 export function parseQuery(query_string:string, result:Record<string, any>) { // currently NOT USED
  if (/\%[a-zA-Z0-9]{2}/.test(query_string)) {
    query_string = decodeURIComponent(query_string)
  }
  result ??= Object.create( null );
  const pairs = (query_string[0] === '?' ? query_string.slice(1) : query_string).split('&');
  for (const element of pairs) {
      const pair = element.split('=');
      result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return result;
}

/** TO BE COMPLETED
 * parses similar Angular as shown: https://stackoverflow.com/a/9547490,
 * only, like the Ruby, query ending '[]' do not result in object keys ending '[]'.
 * Additionally, on can place a integer between `[` and `]` in query string to specify array index.
 * @param {string} query_string portion starting or after '?' 
 * @returns Object (null prototype)  with key/value pairs where arrays are build from duplicate keys
 */
 export function parseQueryMixed(query_string:string, result: Record<string, any>={} ) { // used in index.html
  if (/\%[a-zA-Z0-9]{2}/.test(query_string)) {
    query_string = decodeURIComponent(query_string)
  }
  const pairs = (query_string[0] === '?' ? query_string.slice(1) : query_string).split('&');

  for (const element of pairs) {
    let [key, val] = element.split('=');
    let idx:any = false
    if (/\[\d*\] *$/.test(key)) {
      [ key, idx ] = key.split(/[\[\]]/)
    }
    if (key in result || idx !== false) {
      if (!(key in result)) {
        result[key] = []
      }
      else if (!Array.isArray(result[key])) {
        result[key] = [result[key]]
      }
      if (/ *\d+ */.test(idx)) {
        result[key][parseInt(idx)] = val
      } else {
        result[key].push(val)
      }
    }
    else {
      result[key] = val
    }
  }
  // console.log(result)
  return result;
}

// NOT USED
export function parseQueryMixed_test() { 
  function runTest(query_string:string, expect:string) {
    const got = JSON.stringify(parseQueryMixed(query_string))
    const result = expect == got ? 'pass' : 'fail'
    console.log( expect == got ? 'pass' : 'fail' )
    if (result === 'fail') {
      console.log(`expect:\n${expect}\ngot:\n${got}`)
    }
  }
  let query_string, expect;

  query_string = '?list_a=1&list_a=2&list_a=3&list_b[]=1&list_b[]=2&list_b[]=3&list_c=1,2,3'
  expect = JSON.stringify({
    list_a: [ "1", "2", "3" ],
    list_b: [ "1", "2", "3" ],
    list_c: "1,2,3"
  });
  runTest(query_string, expect)

  query_string = '?list_a=1&list_a=2&list_a=3&list_b[]=1&list_b[2]=2&list_b[]=3&list_c=1,2,3'
  expect = JSON.stringify({
    list_a: [ "1", "2", "3" ],
    list_b: [ "1", null, "2", "3" ],
    list_c: "1,2,3"
  });
  runTest(query_string, expect)
}

// NOT USED
export function unparseQueryMixed(obj:Record<string, any>={}) {
  const array = Object.keys(obj).map(k=> {
    if (!Array.isArray(obj[k])) return `&${k}=${obj[k]}`
    let next_idx = 0
    return obj[k].map((el:any,idx:number)=> {
      if (idx === next_idx++) return `&${k}=${el}`
      else {
        next_idx = idx
        return `&${k}[${next_idx++}]=${el}`
      }
    }).join('')
  })
  return '?'+array.join('').slice(1)
}


// NOT USED
export function unparseQueryMixed_test() {
  function runTest(obj:object, expect:string) {
    const got = unparseQueryMixed(obj)
    const result = expect === got ? 'pass' : 'fail'
    console.log( expect === got ? 'pass' : 'fail' )
    if (result === 'fail') {
      console.log(`expect:\n${expect}\ngot:\n${got}`)
    }
  }
  let obj, expect;

  obj = {
    list_a: [ "1", "2", "3" ],
    list_b: [ "1", "2", "3" ],
    list_c: "1,2,3"
  };
  expect = '?list_a=1&list_a=2&list_a=3&list_b=1&list_b=2&list_b=3&list_c=1,2,3';
  runTest(obj, expect);

  obj = {
    list_a: [ "1", "2", "3" ],
    list_b: [ "1",, "2", "3" ],
    list_c: "1,2,3"
  };
  expect = '?list_a=1&list_a=2&list_a=3&list_b=1&list_b[2]=2&list_b=3&list_c=1,2,3';
  runTest(obj, expect);
}

export function pushQueryString(query_string:string) {  // used in index.html
  /* FIY, with http://localhost:3000/?endpoint=/organizations(%22%20%22)#api-response
    Object.keys(document.location)
    .filter(p=>typeof document.location[p]!=='function')
    .forEach(p=> console.log(`${p}: ${document.location[p]}`))
  shows:
    ancestorOrigins: [object DOMStringList]
    href: http://localhost:3000/?endpoint=/organizations(%22%20%22)#api-response
    origin: http://localhost:3000
    protocol: http:
    host: localhost:3000
    hostname: localhost
    port: 3000
    pathname: /
    search: ?endpoint=/organizations(%22%20%22)
    hash: #api-response
  So you can get them all like this:
    const { protocol, host, pathname, search, hash} = window.location
  And you can be sure that:
    window.location.href === protocol+'//'+host+pathname+search+hash
  */
  const { protocol, host, pathname, /* search, */ hash} = window.location
  let path = protocol+'//'+host+pathname+query_string+hash
  window.history.pushState({path},'',path);
}



// function test(...ordered_criteria:[string|Function, string|number][]): number {
//   let sum:number = 0;
//   let a:Record<string, any> = {
//     key: 'butts',
//     key2: 'farts'
//   };
//   let b:Record<string, any> = {
//     key: 'butts',
//     key2: 'farts'
//   };

//   for (let [ prop, direction ] of ordered_criteria) {
//     if (typeof direction !== 'number') {
//       direction = +(direction < 'd') * 2 - 1
//     }
//     if (typeof prop === 'function') {
//       if (prop(a) > prop(b)) sum += direction;
//       else if (prop(a) < prop(b)) sum -= direction;
//     }
//     else if (typeof prop === 'string') {
//       if (a[prop] > b[prop]) sum += direction;
//       else if (a[prop] < b[prop]) sum -= direction;
//     }
//   }
//   return sum;

// }


/**
 * multiCriteriaSort sorts (by value) an array of objects by multiple, nested criterion.
 * @param {Record<string, any>[]} array_of_objects 
 * @param  {...[string|Function, string|integer]} ordered_criteria n arrays where each has two elements:
 * the first is the key directly in the object within array_of_objects to be sorted or a function
 * two be called on array_of_objects, the return of which is compared between elements in array_of_objects
 * and 
 * the second is a string starting 'a' or 1 for ascending or a string starting 'd' or -1 for descending.
 * @returns the array_of_objects sort first by ordered_criteria[0] then by ordered_criteria[1], etc.
 */
 export function multiCriteriaSort(array_of_objects:Record<string, any>[], ...ordered_criteria:[string|Function, string|number][]) {
  // used in index.html and endpoints.ts
  array_of_objects.sort((a, b) :any => {
    for (let [ prop, direc ] of ordered_criteria) {
      const direction:number = typeof direc === 'number' ? direc : +(direc < 'd') * 2 - 1

      if (typeof prop === 'function') {
        if (prop(a) > prop(b)) return direction
        if (prop(a) < prop(b)) return -direction
      }
      else if (typeof prop === 'string') {
        if (a[prop] > b[prop]) return direction
        if (a[prop] < b[prop]) return -direction
      }
    }
  });
  return array_of_objects
}

/**
 * @param {array} array 
 * @returns sum of all elements in array
 */
 export const sumArray = (array:[]) => array.reduce((sum:number, n:number) => sum + n, 0);  // currently NOT USED

 export function multiCriteriaSort_test() { // NOT USED

  let votes = [
    { title: 'c', votes: 2, nums: [1,1] },
    { title: 'b', votes: 2, nums: [1,2] },
    { title: 'c', votes: 1, nums: [1,2,3] },
    { title: 'a', votes: 2, nums: [2,3,4] },
    { title: 'a', votes: 1, nums: [] },
    { title: 'd', votes: 3, nums: [10, 10] },
    { title: 'b', votes: 3, nums: [100] },
    { title: 'd', votes: 2, nums: [1,2,3] },
    { title: 'b', votes: 1, nums: [1,2,3] },
    { title: 'a', votes: 3, nums: [1,2,3] },
    { title: 'c', votes: 3, nums: [1,2,3] },
    { title: 'd', votes: 1, nums: [1,2,3] },
  ];
  console.log(votes)
  console.log("sort by title, ascending, then by votes, descending:")
  multiCriteriaSort(votes, ['title', 'asc'], ['votes', 'desc'])
  console.log(votes)
  
  console.log("sort by votes, descending, then by title, descending:")
  multiCriteriaSort(votes,  ['votes', -1], ['title', -1])
  console.log(votes)

  console.log("sort by votes, ascending, then by title, ascending:")
  multiCriteriaSort(votes, ['votes', 'a'], ['title', 'a'])
  console.log(votes)

  console.log("sort by sum of nums, descending, then by votes, descending:")
  multiCriteriaSort(votes, [(el:any)=>sumArray(el.nums), -1], ['votes', -1])
  console.log(votes)

  console.log("sort by length of nums, descending, then by votes, descending:")
  multiCriteriaSort(votes, [(el:any)=>el.nums.length, -1], ['votes', -1])
  console.log(votes)
}

/**
 * https://stackoverflow.com/a/35385518
 * @param {String} HTML representing a single element
 * @return {Element}
 */
 export function htmlToElement(html:string) :Node{ // THIS MAY NOT WORK WELL: currently NOT USED
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild || template; // || template is a crappy way  to silence TS error.
}


/**
 * https://stackoverflow.com/a/35385518
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 */
 export function htmlToElements(html:string) :NodeListOf<ChildNode>{ // THIS ALSO MAY NOT WORK WELL: currently NOT USED
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
}


// Builds the HTML Table out of myList json data from Ivy restful service.
export function buildHtmlTable(arr:any[], values_are_html_elements=false) { // currently NOT USED

  function addAllColumnHeaders(arr:any[], table:Node) {
    // Adds a header row to the table and returns the set of columns.
    // Need to do union of keys from all records as some records may not contain
    // all records
    const columnSet = [],
    tr = document.createElement('tr').cloneNode(false);
    for (let i = 0, l = arr.length; i < l; i++) {
      for (let key in arr[i]) {
        if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
          columnSet.push(key);
          const th = document.createElement('th').cloneNode(false);
          th.appendChild(document.createTextNode(key));
          tr.appendChild(th);
        }
      }
    }
    table.appendChild(tr);
    return columnSet;
  }

  const table:Node = document.createElement('table').cloneNode(false),
  columns = addAllColumnHeaders(arr, table);

  for (let i = 0, maxi = arr.length; i < maxi; ++i) {
    const tr = document.createElement('tr').cloneNode(false);
    for (let j = 0, maxj = columns.length; j < maxj; ++j) {
      const td = document.createElement('td').cloneNode(false);
      // const cellValue = arr[i][columns[j]];
      if (values_are_html_elements && arr[i][columns[j]]) {
        td.appendChild(htmlToElement(arr[i][columns[j]]));
      } else {
        td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}


function getSelectValues(select:HTMLSelectElement) {  // currently NOT USED
  // source: https://stackoverflow.com/a/5867262
  const result = [];
  const options = select && select.options;
  let opt;

  for (let i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

/**
 * Divides an array or string into two parts, with the length of each determined by the second and third args.
 * The return is an array of these two parts, where each is either is an array/string or a single element/character,
 * depending on whether its cooresponding size is more than 1 or 1, respectively. 
 * @param {array|string} arr_or_str the array or string to be bisected
 * @param {integer} size0 the size of the first element in return. If negative, size0 is -num-of-element-from-end to exclude.
 * @param {integer} size1 the size of the second element in return. If negative, size0 is -num-of-element-from-start to exclude.
 * @returns an array of two elements, each an array if the length is > 1, else it is one element.
 */
 export const bisect = (arr_or_str:any[]|string, size0:number, size1:number) => [ // used in index.html
  size0 === 1 ? arr_or_str[0] : arr_or_str.slice(0, size0),
  size1 === 1 ? arr_or_str[arr_or_str.length-1] : arr_or_str.slice(-size1)
]

/**
 * @param {Node|string} child (optional) Node or html string to be added within new element
 * @returns newly created HTMLUListElement
 */
 export function ul(child:(string|HTMLElement|undefined)=undefined)  { // used in endpoints.ts
  const node = document.createElement('ul');
  if (typeof child === 'string')
    node.insertAdjacentHTML('beforeend', child);
  else if (child)
    node.appendChild(child)
  return node;
}

/**
* @param {Node|string} child (optional) Node or html string to be added within new element
* @returns newly created HTMLLIElement
*/
export function li(child:Node|string) { // used in endpoints.ts
  const node = document.createElement('li')
  if (typeof child === 'string')
    node.insertAdjacentHTML('beforeend', child);
  else if (child)
    node.appendChild(child)
  return node;
}


export function factorial(num:number) { // currently NOT USED
  let rval=1;
  for (let i = 2; i <= num; i++)
    rval = rval * i;
  return rval;
}


/**
 * Returns all permutatins of the elements in an array
 * source: https://stackoverflow.com/a/37580979
 * @param {array} array 
 * @returns array of all permuations of array (wihout repetitions) where is the same size as array
 */
 export function permute(array:any[]) { // used only in permuteChooseR, which is used
  var length = array.length,
      result = [array.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = array[i];
      array[i] = array[k];
      array[k] = p;
      ++c[i];
      i = 1;
      result.push(array.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

/**
 * Returns all permutatins of the elements in an array, with size limited by k
 * adapted from https://stackoverflow.com/a/37580979
 * @param {array} array 
 * @param {integer} k size of each permutation. Must be <= array.length
 * @param {function} include_test (optional) function called with each permution as arg and index to be added, returning false to not include it. 
 * @returns array of all permuations of array (wihout repetitions) where is the k
 */
export function permuteChooseR(array:any[], r:number, include_test:Function) { // used in index.html
  const found:any[] = [];
  const result:any[] = [];
  permute(array).forEach(arr => {
    const resized = arr.slice(0, r);
    const json = JSON.stringify(resized);
    // console.log(resized, json)
    if (! found.includes(json) && (!include_test || include_test(resized, result.length))) {
      found.push(json);
      result.push(resized);
    }
    // else console.log(`not found: ${arr}`)
  })
  return result;
}




/**
 * based on: https://www.geeksforgeeks.org/combinations-with-repetitions/
 * @param {array} array 
 * @param {integer} r number of elements in each returned array of combinations
 * @returns  array of arrays where each is combinations (with repetitions) of elements in array and is of size r
 */
export function combinationsWithReps(array:any[], r:number) { // used in index.html
  const n = array.length
  r ??= n
  const results:any[] = []

  function combinationsWithRepsUtil(chosen:any[], array:any[], index:number, r:number, start:number, end:number) {
    // Since index has become r, current combination is ready to be printed, print
    if (index == r) {
      results.push([])
      const nth = results.length-1
      for (var i = 0; i < r; i++) {
        results[nth].push(array[chosen[i]])
      }
      return results
    }

    // One by one choose all elements (without considering the fact
    // whether element is already chosen or not) and recur
    for (var i = start; i <= end; i++) {
      chosen[index] = i
      combinationsWithRepsUtil(chosen, array, index + 1, r, i, end)
    }
    return results
  }
  var chosen = Array.from({ length: r + 1 }, (_, i) => 0) // Allocate memory

  // Call the recursive function
  return combinationsWithRepsUtil(chosen, array, 0, r, 0, n - 1)
}


export const windowProps = Object.assign( 
  /**
   * A utility to view names of globals that have been added to the window object
   * @returns array of string (names of globals on window object)
   */
  (get?:'all'|'added'|'browser') => {
    const browser = 
      navigator.vendor === "Google Inc." ? "chrome" : (
        navigator.vendor ===  "Apple Computer, Inc." ? "safari" : (
          navigator.vendor ===  "" ? "firefox" : "any"
        )
      );
    const window_properties = Object.getOwnPropertyNames(window);
    if (get === 'all')
      return window_properties
    if (get === 'added')
      return window_properties.filter(v => !windowProps[browser].has(v))
    if (get === 'browser')
      return Array.from(windowProps[browser]);
  },
  {
    ignored_added: new Set([
      "endpoints_json", // keep
      "github_org_json",
      "__assign",
      "__awaiter",
      "__generator",
      "__spreadArray",
      "fetchGET",
      "explode",
      "objectifyArray",
      "interpolate",
      "interplate_demo",
      "parseJSONLike",
      "parseJSONLike_Test",
      "flashContentAndCSSClass",
      "appendParentWithMessage",
      "unappendParentMessage",
      "resizeElementToContents",
      "resizeElementWhileTyping",
      "saveAndLoadPageState",
      "parseQuery",
      "parseQueryMixed",
      "parseQueryMixed_test",
      "unparseQueryMixed",
      "unparseQueryMixed_test",
      "pushQueryString",
      "multiCriteriaSort",
      "sumArray",
      "multiCriteriaSort_test",
      "htmlToElement",
      "htmlToElements",
      "buildHtmlTable",
      "getSelectValues",
      "bisect",
      "ul",
      "li",
      "factorial",
      "permute",
      "permuteChooseR",
      "combinationsWithReps",
      "windowProps",
      "makeEndpointsMenuCollapsible",
      "setupEndpointsMenuSelection",
      "endpointPreview",
      "addEndpointValidToGETList",
      "addEndpointTemplateToGETList",
      "handleClickApiEndpointValid",
      "handleClickApiEndpointTemplate",
      "handleClickGET",
      "endpointsMenuSettings",
      "refreshEndpointsMenuContents",
      "linkify",
      "module",
      "define",
      "renderjson",
      "makeListEditable",
      "selectedEndpointsToQueryString",
      "parseQueryStringEndpoints",
      "makeEndpointsSelectors",
      "selected_URLs",
      "responses",
      "rendered_json"]),
    any: new Set([
      "AbortController", "AbortSignal", "AbstractRange", "AggregateError", "AnalyserNode", "Animation", "AnimationEffect",  
      "AnimationEvent", "AnimationPlaybackEvent", "AnimationTimeline", "Array", "ArrayBuffer", "Attr", "Audio", "AudioBuffer",  
      "AudioBufferSourceNode", "AudioContext", "AudioDestinationNode", "AudioListener", "AudioNode", "AudioParam",  
      "AudioParamMap", "AudioProcessingEvent", "AudioScheduledSourceNode", "AudioWorklet", "AudioWorkletNode",  
      "AuthenticatorAssertionResponse", "AuthenticatorAttestationResponse", "AuthenticatorResponse", "BarProp",  
      "BaseAudioContext", "BeforeUnloadEvent", "BigInt", "BigInt64Array", "BigUint64Array", "BiquadFilterNode", "Blob",  
      "BlobEvent", "Boolean", "BroadcastChannel", "ByteLengthQueuingStrategy", "CDATASection", "CSS", "CSSAnimation",  
      "CSSConditionRule", "CSSFontFaceRule", "CSSGroupingRule", "CSSImportRule", "CSSKeyframeRule", "CSSKeyframesRule",  
      "CSSLayerBlockRule", "CSSLayerStatementRule", "CSSMediaRule", "CSSNamespaceRule", "CSSPageRule", "CSSRule", "CSSRuleList",  
      "CSSStyleDeclaration", "CSSStyleRule", "CSSStyleSheet", "CSSSupportsRule", "CSSTransition", "Cache", "CacheStorage",  
      "CanvasGradient", "CanvasPattern", "CanvasRenderingContext2D", "ChannelMergerNode", "ChannelSplitterNode", "CharacterData",  
      "Clipboard", "ClipboardEvent", "CloseEvent", "Comment", "CompositionEvent", "ConstantSourceNode", "ConvolverNode",  
      "CountQueuingStrategy", "Credential", "CredentialsContainer", "Crypto", "CryptoKey", "CustomElementRegistry",  
      "CustomEvent", "DOMException", "DOMImplementation", "DOMMatrix", "DOMMatrixReadOnly", "DOMParser", "DOMPoint",  
      "DOMPointReadOnly", "DOMQuad", "DOMRect", "DOMRectList", "DOMRectReadOnly", "DOMStringList", "DOMStringMap",  
      "DOMTokenList", "DataTransfer", "DataTransferItem", "DataTransferItemList", "DataView", "Date", "DelayNode", "Document",  
      "DocumentFragment", "DocumentTimeline", "DocumentType", "DragEvent", "DynamicsCompressorNode", "Element", "Error",  
      "ErrorEvent", "EvalError", "Event", "EventSource", "EventTarget", "File", "FileList", "FileReader", "FinalizationRegistry",  
      "Float32Array", "Float64Array", "FocusEvent", "FontFace", "FormData", "FormDataEvent", "Function", "GainNode", "Gamepad",  
      "GamepadButton", "GamepadEvent", "Geolocation", "GeolocationCoordinates", "GeolocationPosition",  
      "GeolocationPositionError", "HTMLAllCollection", "HTMLAnchorElement", "HTMLAreaElement", "HTMLAudioElement",  
      "HTMLBRElement", "HTMLBaseElement", "HTMLBodyElement", "HTMLButtonElement", "HTMLCanvasElement", "HTMLCollection",  
      "HTMLDListElement", "HTMLDataElement", "HTMLDataListElement", "HTMLDetailsElement", "HTMLDialogElement",  
      "HTMLDirectoryElement", "HTMLDivElement", "HTMLDocument", "HTMLElement", "HTMLEmbedElement", "HTMLFieldSetElement",  
      "HTMLFontElement", "HTMLFormControlsCollection", "HTMLFormElement", "HTMLFrameElement", "HTMLFrameSetElement",  
      "HTMLHRElement", "HTMLHeadElement", "HTMLHeadingElement", "HTMLHtmlElement", "HTMLIFrameElement", "HTMLImageElement",  
      "HTMLInputElement", "HTMLLIElement", "HTMLLabelElement", "HTMLLegendElement", "HTMLLinkElement", "HTMLMapElement",  
      "HTMLMarqueeElement", "HTMLMediaElement", "HTMLMenuElement", "HTMLMetaElement", "HTMLMeterElement", "HTMLModElement",  
      "HTMLOListElement", "HTMLObjectElement", "HTMLOptGroupElement", "HTMLOptionElement", "HTMLOptionsCollection",  
      "HTMLOutputElement", "HTMLParagraphElement", "HTMLParamElement", "HTMLPictureElement", "HTMLPreElement",  
      "HTMLProgressElement", "HTMLQuoteElement", "HTMLScriptElement", "HTMLSelectElement", "HTMLSlotElement",  
      "HTMLSourceElement", "HTMLSpanElement", "HTMLStyleElement", "HTMLTableCaptionElement", "HTMLTableCellElement",  
      "HTMLTableColElement", "HTMLTableElement", "HTMLTableRowElement", "HTMLTableSectionElement", "HTMLTemplateElement",  
      "HTMLTextAreaElement", "HTMLTimeElement", "HTMLTitleElement", "HTMLTrackElement", "HTMLUListElement", "HTMLUnknownElement",  
      "HTMLVideoElement", "HashChangeEvent", "Headers", "History", "IDBCursor", "IDBCursorWithValue", "IDBDatabase",  
      "IDBFactory", "IDBIndex", "IDBKeyRange", "IDBObjectStore", "IDBOpenDBRequest", "IDBRequest", "IDBTransaction",  
      "IDBVersionChangeEvent", "IIRFilterNode", "Image", "ImageBitmap", "ImageBitmapRenderingContext", "ImageData", "Infinity",  
      "InputEvent", "Int16Array", "Int32Array", "Int8Array", "IntersectionObserver", "IntersectionObserverEntry", "Intl", "JSON",  
      "KeyboardEvent", "KeyframeEffect", "Location", "Lock", "LockManager", "Map", "Math", "MediaCapabilities",  
      "MediaDeviceInfo", "MediaDevices", "MediaElementAudioSourceNode", "MediaEncryptedEvent", "MediaError",  
      "MediaKeyMessageEvent", "MediaKeySession", "MediaKeyStatusMap", "MediaKeySystemAccess", "MediaKeys", "MediaList",  
      "MediaMetadata", "MediaQueryList", "MediaQueryListEvent", "MediaRecorder", "MediaSession", "MediaSource", "MediaStream",  
      "MediaStreamAudioDestinationNode", "MediaStreamAudioSourceNode", "MediaStreamTrack", "MediaStreamTrackEvent",  
      "MessageChannel", "MessageEvent", "MessagePort", "MimeType", "MimeTypeArray", "MouseEvent", "MutationEvent",  
      "MutationObserver", "MutationRecord", "NaN", "NamedNodeMap", "NavigationPreloadManager", "Navigator", "Node", "NodeFilter",  
      "NodeIterator", "NodeList", "Notification", "Number", "Object", "OfflineAudioCompletionEvent", "OfflineAudioContext",  
      "Option", "OscillatorNode", "PageTransitionEvent", "PannerNode", "Path2D", "Performance", "PerformanceEntry",  
      "PerformanceMark", "PerformanceMeasure", "PerformanceNavigation", "PerformanceNavigationTiming", "PerformanceObserver",  
      "PerformanceObserverEntryList", "PerformancePaintTiming", "PerformanceResourceTiming", "PerformanceTiming", "PeriodicWave",  
      "PermissionStatus", "Permissions", "Plugin", "PluginArray", "PointerEvent", "PopStateEvent", "ProcessingInstruction",  
      "ProgressEvent", "Promise", "PromiseRejectionEvent", "Proxy", "PublicKeyCredential", "PushManager", "PushSubscription",  
      "PushSubscriptionOptions", "RTCCertificate", "RTCDTMFSender", "RTCDTMFToneChangeEvent", "RTCDataChannel",  
      "RTCDataChannelEvent", "RTCDtlsTransport", "RTCIceCandidate", "RTCPeerConnection", "RTCPeerConnectionIceEvent",  
      "RTCRtpReceiver", "RTCRtpSender", "RTCRtpTransceiver", "RTCSessionDescription", "RTCStatsReport", "RTCTrackEvent",  
      "RadioNodeList", "Range", "RangeError", "ReadableStream", "ReferenceError", "Reflect", "RegExp", "Request",  
      "ResizeObserver", "ResizeObserverEntry", "ResizeObserverSize", "Response", "SVGAElement", "SVGAngle", "SVGAnimateElement",  
      "SVGAnimateMotionElement", "SVGAnimateTransformElement", "SVGAnimatedAngle", "SVGAnimatedBoolean",  
      "SVGAnimatedEnumeration", "SVGAnimatedInteger", "SVGAnimatedLength", "SVGAnimatedLengthList", "SVGAnimatedNumber",  
      "SVGAnimatedNumberList", "SVGAnimatedPreserveAspectRatio", "SVGAnimatedRect", "SVGAnimatedString",  
      "SVGAnimatedTransformList", "SVGAnimationElement", "SVGCircleElement", "SVGClipPathElement", "SVGComponentTransferFunctionElement", "SVGDefsElement", "SVGDescElement", "SVGElement", "SVGEllipseElement", "SVGFEBlendElement", "SVGFEColorMatrixElement", "SVGFEComponentTransferElement", "SVGFECompositeElement", "SVGFEConvolveMatrixElement", "SVGFEDiffuseLightingElement", "SVGFEDisplacementMapElement", "SVGFEDistantLightElement", "SVGFEDropShadowElement", "SVGFEFloodElement", "SVGFEFuncAElement", "SVGFEFuncBElement", "SVGFEFuncGElement", "SVGFEFuncRElement", "SVGFEGaussianBlurElement", "SVGFEImageElement", "SVGFEMergeElement", "SVGFEMergeNodeElement", "SVGFEMorphologyElement", "SVGFEOffsetElement", "SVGFEPointLightElement", "SVGFESpecularLightingElement", "SVGFESpotLightElement", "SVGFETileElement", "SVGFETurbulenceElement", "SVGFilterElement", "SVGForeignObjectElement", "SVGGElement", "SVGGeometryElement", "SVGGradientElement", "SVGGraphicsElement", "SVGImageElement", "SVGLength", "SVGLengthList", "SVGLineElement", "SVGLinearGradientElement", "SVGMPathElement", "SVGMarkerElement", "SVGMaskElement", "SVGMatrix", "SVGMetadataElement", "SVGNumber", "SVGNumberList", "SVGPathElement", "SVGPatternElement", "SVGPoint", "SVGPointList", "SVGPolygonElement", "SVGPolylineElement", "SVGPreserveAspectRatio", "SVGRadialGradientElement", "SVGRect", "SVGRectElement", "SVGSVGElement", "SVGScriptElement", "SVGSetElement", "SVGStopElement", "SVGStringList", "SVGStyleElement", "SVGSwitchElement", "SVGSymbolElement", "SVGTSpanElement", "SVGTextContentElement", "SVGTextElement", "SVGTextPathElement", "SVGTextPositioningElement", "SVGTitleElement", "SVGTransform", "SVGTransformList", "SVGUnitTypes", "SVGUseElement", "SVGViewElement", "Screen", "ScriptProcessorNode", "SecurityPolicyViolationEvent", "Selection", "ServiceWorker", "ServiceWorkerContainer", "ServiceWorkerRegistration", "Set", "ShadowRoot", "SharedWorker", "SourceBuffer", "SourceBufferList", "SpeechSynthesisErrorEvent", "SpeechSynthesisEvent", "SpeechSynthesisUtterance", "StaticRange", "StereoPannerNode", "Storage", "StorageEvent", "StorageManager", "String", "StyleSheet", "StyleSheetList", "SubmitEvent", "SubtleCrypto", "Symbol", "SyntaxError", "Text", "TextDecoder", "TextEncoder", "TextMetrics", "TextTrack", "TextTrackCue", "TextTrackCueList", "TextTrackList", "TimeRanges", "TrackEvent", "TransformStream", "TransformStreamDefaultController", "TransitionEvent", "TreeWalker", "TypeError", "UIEvent", "URIError", "URL", "URLSearchParams", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "VTTCue", "ValidityState", "VisualViewport", "WaveShaperNode", "WeakMap", "WeakRef", "WeakSet", "WebAssembly", "WebGL2RenderingContext", "WebGLActiveInfo", "WebGLBuffer", "WebGLContextEvent", "WebGLFramebuffer", "WebGLProgram", "WebGLQuery", "WebGLRenderbuffer", "WebGLRenderingContext", "WebGLSampler", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLSync", "WebGLTexture", "WebGLTransformFeedback", "WebGLUniformLocation", "WebGLVertexArrayObject", "WebKitCSSMatrix", "WebSocket", "WheelEvent", "Window", "Worker", "Worklet", "WritableStream", "WritableStreamDefaultController", "WritableStreamDefaultWriter", "XMLDocument", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload", "XMLSerializer", "XPathEvaluator", "XPathExpression", "XPathResult", "XSLTProcessor", "alert", "atob", "blur", "btoa", "caches", "cancelAnimationFrame", "captureEvents", "clearInterval", "clearTimeout", "clientInformation", "close", "closed", "confirm", "console", "createImageBitmap", "crossOriginIsolated", "crypto", "customElements", "decodeURI", "decodeURIComponent", "devicePixelRatio", "document", "encodeURI", "encodeURIComponent", "escape", "eval", "event", "fetch", "find", "focus", "frameElement", "frames", "getComputedStyle", "getSelection", "globalThis", "history", "indexedDB", "innerHeight", "innerWidth", "isFinite", "isNaN", "isSecureContext", "length", "localStorage", "location", "locationbar", "matchMedia", "menubar", "moveBy", "moveTo", "name", "navigator", "onabort", "onafterprint", "onanimationend", "onanimationiteration", "onanimationstart", "onbeforeprint", "onbeforeunload", "onblur", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "onformdata", "ongotpointercapture", "onhashchange", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onlanguagechange", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onlostpointercapture", "onmessage", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onoffline", "ononline", "onpagehide", "onpageshow", "onpause", "onplay", "onplaying", "onpointercancel", "onpointerdown", "onpointerenter", "onpointerleave", "onpointermove", "onpointerout", "onpointerover", "onpointerup", "onpopstate", "onprogress", "onratechange", "onrejectionhandled", "onreset", "onresize", "onscroll", "onsecuritypolicyviolation", "onseeked", "onseeking", "onselect", "onselectionchange", "onselectstart", "onslotchange", "onstalled", "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "ontransitioncancel", "ontransitionend", "ontransitionrun", "ontransitionstart", "onunhandledrejection", "onunload", "onvolumechange", "onwaiting", "onwebkitanimationend", "onwebkitanimationiteration", "onwebkitanimationstart", "onwebkittransitionend", "onwheel", "open", "opener", "origin", "outerHeight", "outerWidth", "pageXOffset", "pageYOffset", "parent", "parseFloat", "parseInt", "performance", "personalbar", "postMessage", "print", "prompt", "queueMicrotask", "releaseEvents", "reportError", "requestAnimationFrame", "resizeBy", "resizeTo", "screen", "screenLeft", "screenTop", "screenX", "screenY", "scroll", "scrollBy", "scrollTo", "scrollX", "scrollY", "scrollbars", "self", "sessionStorage", "setInterval", "setTimeout", "speechSynthesis", "status", "statusbar", "stop", "structuredClone", "toolbar", "top", "undefined", "unescape", "visualViewport", "webkitURL", "window", "webkitRTCPeerConnection", "webkitMediaStream", "VirtualKeyboardGeometryChangeEvent", "UserActivation", "URLPattern", "TrustedTypePolicyFactory", "TrustedTypePolicy", "TrustedScriptURL", "TrustedScript", "TrustedHTML", "TouchList", "TouchEvent", "Touch", "TaskSignal", "TaskPriorityChangeEvent", "TaskController", "TaskAttributionTiming", "SyncManager", "StylePropertyMapReadOnly", "StylePropertyMap", "Scheduling", "Scheduler", "ReportingObserver", "RTCEncodedVideoFrame", "RTCEncodedAudioFrame", "Profiler", "PerformanceLongTaskTiming", "PerformanceElementTiming", "OffscreenCanvasRenderingContext2D", "OffscreenCanvas", "NetworkInformation", "MediaStreamTrackProcessor", "LayoutShiftAttribution", "LayoutShift", "LargestContentfulPaint", "InputDeviceInfo", "InputDeviceCapabilities", "ImageCapture", "FeaturePolicy", "External", "DecompressionStream", "DOMError", "CustomStateSet", "CompressionStream", "CanvasFilter", "CSSVariableReferenceValue", "CSSUnparsedValue", "CSSUnitValue", "CSSTranslate", "CSSTransformValue", "CSSTransformComponent", "CSSStyleValue", "CSSSkewY", "CSSSkewX", "CSSSkew", "CSSScale", "CSSRotate", "CSSPropertyRule", "CSSPositionValue", "CSSPerspective", "CSSNumericValue", "CSSNumericArray", "CSSMatrixComponent", "CSSMathValue", "CSSMathSum", "CSSMathProduct", "CSSMathNegate", "CSSMathMin", "CSSMathMax", "CSSMathInvert", "CSSMathClamp", "CSSKeywordValue", "CSSImageValue", "BeforeInstallPromptEvent", "trustedTypes", "onappinstalled", "onbeforeinstallprompt", "onbeforexrselect", "oncontextlost", "oncontextrestored", "onpointerrawupdate", "scheduler", "chrome", "cookieStore", "ondeviceorientationabsolute", "launchQueue", "onbeforematch", "AbsoluteOrientationSensor", "Accelerometer", "BatteryManager", "CookieChangeEvent", "CookieStore", "CookieStoreManager", "DeviceMotionEventAcceleration", "DeviceMotionEventRotationRate", "FederatedCredential", "GravitySensor", "Gyroscope", "Keyboard", "KeyboardLayoutMap", "LinearAccelerationSensor", "MIDIAccess", "MIDIConnectionEvent", "MIDIInput", "MIDIInputMap", "MIDIMessageEvent", "MIDIOutput", "MIDIOutputMap", "MIDIPort", "NavigatorManagedData", "OrientationSensor", "PasswordCredential", "RelativeOrientationSensor", "Sensor", "SensorErrorEvent", "VirtualKeyboard", "WebTransport", "WebTransportBidirectionalStream", "WebTransportDatagramDuplexStream", "WebTransportError", "XRDOMOverlayState", "XRLayer", "XRWebGLBinding", "AudioData", "EncodedAudioChunk", "EncodedVideoChunk", "ImageTrack", "ImageTrackList", "VideoFrame", "AudioDecoder", "AudioEncoder", "ImageDecoder", "VideoDecoder", "VideoEncoder", "BarcodeDetector", "Bluetooth", "BluetoothCharacteristicProperties", "BluetoothDevice", "BluetoothRemoteGATTCharacteristic", "BluetoothRemoteGATTDescriptor", "BluetoothRemoteGATTServer", "BluetoothRemoteGATTService", "EyeDropper", "FileSystemWritableFileStream", "FontData", "FragmentDirective", "HID", "HIDConnectionEvent", "HIDDevice", "HIDInputReportEvent", "IdleDetector", "LaunchParams", "LaunchQueue", "OTPCredential", "Presentation", "PresentationAvailability", "PresentationConnection", "PresentationConnectionAvailableEvent", "PresentationConnectionCloseEvent", "PresentationConnectionList", "PresentationReceiver", "PresentationRequest", "Sanitizer", "ScreenDetailed", "ScreenDetails", "Serial", "SerialPort", "USB", "USBAlternateInterface", "USBConfiguration", "USBConnectionEvent", "USBDevice", "USBEndpoint", "USBInTransferResult", "USBInterface", "USBIsochronousInTransferPacket", "USBIsochronousInTransferResult", "USBIsochronousOutTransferPacket", "USBIsochronousOutTransferResult", "USBOutTransferResult", "WakeLock", "WakeLockSentinel", "WindowControlsOverlay", "WindowControlsOverlayGeometryChangeEvent", "XRAnchor", "XRAnchorSet", "XRBoundedReferenceSpace", "XRFrame", "XRInputSource", "XRInputSourceArray", "XRInputSourceEvent", "XRInputSourcesChangeEvent", "XRPose", "XRReferenceSpace", "XRReferenceSpaceEvent", "XRRenderState", "XRRigidTransform", "XRSession", "XRSessionEvent", "XRSpace", "XRSystem", "XRView", "XRViewerPose", "XRViewport", "XRWebGLLayer", "XRCPUDepthInformation", "XRDepthInformation", "XRWebGLDepthInformation", "XRCamera", "XRHitTestResult", "XRHitTestSource", "XRRay", "XRTransientInputHitTestResult", "XRTransientInputHitTestSource", "XRLightEstimate", "XRLightProbe", "getScreenDetails", "queryLocalFonts", "showDirectoryPicker", "showOpenFilePicker", "showSaveFilePicker", "originAgentCluster", "navigation", "webkitStorageInfo", "BackgroundFetchManager", "BackgroundFetchRecord", "BackgroundFetchRegistration", "BluetoothUUID", "BrowserCaptureMediaStreamTrack", "CropTarget", "DelegatedInkTrailPresenter", "Ink", "Highlight", "HighlightRegistry", "MediaStreamTrackGenerator", "NavigateEvent", "Navigation", "NavigationCurrentEntryChangeEvent", "NavigationDestination", "NavigationHistoryEntry", "NavigationTransition", "NavigatorUAData", "PaymentInstruments", "PaymentManager", "PeriodicSyncManager", "webkitSpeechGrammar", "webkitSpeechGrammarList", "webkitSpeechRecognitionError", "webkitSpeechRecognitionEvent", "webkitRequestFileSystem", "webkitResolveLocalFileSystemURL", "dir", "dirxml", "profile", "profileEnd", "clear", "table", "keys", "values", "debug", "undebug", "monitor", "unmonitor", "inspect", "copy", "queryObjects", "$_", "$0", "$1", "$2", "$3", "$4", "getEventListeners", "getAccessibleName", "getAccessibleRole", "monitorEvents", "unmonitorEvents", "$", "$$", "$x"
    ]),
    chrome: new Set([
      "Object", "Function", "Array", "Number", "parseFloat", "parseInt", "Infinity", "NaN", "undefined", "Boolean", "String",  
      "Symbol", "Date", "Promise", "RegExp", "Error", "AggregateError", "EvalError", "RangeError", "ReferenceError",  
      "SyntaxError", "TypeError", "URIError", "globalThis", "JSON", "Math", "Intl", "ArrayBuffer", "Uint8Array", "Int8Array",  
      "Uint16Array", "Int16Array", "Uint32Array", "Int32Array", "Float32Array", "Float64Array", "Uint8ClampedArray",  
      "BigUint64Array", "BigInt64Array", "DataView", "Map", "BigInt", "Set", "WeakMap", "WeakSet", "Proxy", "Reflect",  
      "FinalizationRegistry", "WeakRef", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape",  
      "unescape", "eval", "isFinite", "isNaN", "console", "Option", "Image", "Audio", "webkitURL", "webkitRTCPeerConnection",  
      "webkitMediaStream", "WebKitMutationObserver", "WebKitCSSMatrix", "XSLTProcessor", "XPathResult", "XPathExpression",  
      "XPathEvaluator", "XMLSerializer", "XMLHttpRequestUpload", "XMLHttpRequestEventTarget", "XMLHttpRequest", "XMLDocument",  
      "WritableStreamDefaultWriter", "WritableStreamDefaultController", "WritableStream", "Worker", "Window", "WheelEvent",  
      "WebSocket", "WebGLVertexArrayObject", "WebGLUniformLocation", "WebGLTransformFeedback", "WebGLTexture", "WebGLSync",  
      "WebGLShaderPrecisionFormat", "WebGLShader", "WebGLSampler", "WebGLRenderingContext", "WebGLRenderbuffer", "WebGLQuery",  
      "WebGLProgram", "WebGLFramebuffer", "WebGLContextEvent", "WebGLBuffer", "WebGLActiveInfo", "WebGL2RenderingContext",  
      "WaveShaperNode", "VisualViewport", "VirtualKeyboardGeometryChangeEvent", "ValidityState", "VTTCue", "UserActivation",  
      "URLSearchParams", "URLPattern", "URL", "UIEvent", "TrustedTypePolicyFactory", "TrustedTypePolicy", "TrustedScriptURL",  
      "TrustedScript", "TrustedHTML", "TreeWalker", "TransitionEvent", "TransformStreamDefaultController", "TransformStream",  
      "TrackEvent", "TouchList", "TouchEvent", "Touch", "TimeRanges", "TextTrackList", "TextTrackCueList", "TextTrackCue",  
      "TextTrack", "TextMetrics", "TextEvent", "TextEncoderStream", "TextEncoder", "TextDecoderStream", "TextDecoder", "Text",  
      "TaskSignal", "TaskPriorityChangeEvent", "TaskController", "TaskAttributionTiming", "SyncManager", "SubmitEvent",  
      "StyleSheetList", "StyleSheet", "StylePropertyMapReadOnly", "StylePropertyMap", "StorageEvent", "Storage",  
      "StereoPannerNode", "StaticRange", "ShadowRoot", "Selection", "SecurityPolicyViolationEvent", "ScriptProcessorNode",  
      "ScreenOrientation", "Screen", "Scheduling", "Scheduler", "SVGViewElement", "SVGUseElement", "SVGUnitTypes",  
      "SVGTransformList", "SVGTransform", "SVGTitleElement", "SVGTextPositioningElement", "SVGTextPathElement", "SVGTextElement",  
      "SVGTextContentElement", "SVGTSpanElement", "SVGSymbolElement", "SVGSwitchElement", "SVGStyleElement", "SVGStringList",  
      "SVGStopElement", "SVGSetElement", "SVGScriptElement", "SVGSVGElement", "SVGRectElement", "SVGRect",  
      "SVGRadialGradientElement", "SVGPreserveAspectRatio", "SVGPolylineElement", "SVGPolygonElement", "SVGPointList",  
      "SVGPoint", "SVGPatternElement", "SVGPathElement", "SVGNumberList", "SVGNumber", "SVGMetadataElement", "SVGMatrix",  
      "SVGMaskElement", "SVGMarkerElement", "SVGMPathElement", "SVGLinearGradientElement", "SVGLineElement", "SVGLengthList",  
      "SVGLength", "SVGImageElement", "SVGGraphicsElement", "SVGGradientElement", "SVGGeometryElement", "SVGGElement",  
      "SVGForeignObjectElement", "SVGFilterElement", "SVGFETurbulenceElement", "SVGFETileElement", "SVGFESpotLightElement",  
      "SVGFESpecularLightingElement", "SVGFEPointLightElement", "SVGFEOffsetElement", "SVGFEMorphologyElement",  
      "SVGFEMergeNodeElement", "SVGFEMergeElement", "SVGFEImageElement", "SVGFEGaussianBlurElement", "SVGFEFuncRElement",  
      "SVGFEFuncGElement", "SVGFEFuncBElement", "SVGFEFuncAElement", "SVGFEFloodElement", "SVGFEDropShadowElement",  
      "SVGFEDistantLightElement", "SVGFEDisplacementMapElement", "SVGFEDiffuseLightingElement", "SVGFEConvolveMatrixElement",  
      "SVGFECompositeElement", "SVGFEComponentTransferElement", "SVGFEColorMatrixElement", "SVGFEBlendElement",  
      "SVGEllipseElement", "SVGElement", "SVGDescElement", "SVGDefsElement", "SVGComponentTransferFunctionElement",  
      "SVGClipPathElement", "SVGCircleElement", "SVGAnimationElement", "SVGAnimatedTransformList", "SVGAnimatedString",  
      "SVGAnimatedRect", "SVGAnimatedPreserveAspectRatio", "SVGAnimatedNumberList", "SVGAnimatedNumber", "SVGAnimatedLengthList",  
      "SVGAnimatedLength", "SVGAnimatedInteger", "SVGAnimatedEnumeration", "SVGAnimatedBoolean", "SVGAnimatedAngle",  
      "SVGAnimateTransformElement", "SVGAnimateMotionElement", "SVGAnimateElement", "SVGAngle", "SVGAElement", "Response",  
      "ResizeObserverSize", "ResizeObserverEntry", "ResizeObserver", "Request", "ReportingObserver",  
      "ReadableStreamDefaultReader", "ReadableStreamDefaultController", "ReadableStreamBYOBRequest", "ReadableStreamBYOBReader",  
      "ReadableStream", "ReadableByteStreamController", "Range", "RadioNodeList", "RTCTrackEvent", "RTCStatsReport",  
      "RTCSessionDescription", "RTCSctpTransport", "RTCRtpTransceiver", "RTCRtpSender", "RTCRtpReceiver",  
      "RTCPeerConnectionIceEvent", "RTCPeerConnectionIceErrorEvent", "RTCPeerConnection", "RTCIceCandidate", "RTCErrorEvent",  
      "RTCError", "RTCEncodedVideoFrame", "RTCEncodedAudioFrame", "RTCDtlsTransport", "RTCDataChannelEvent", "RTCDataChannel",  
      "RTCDTMFToneChangeEvent", "RTCDTMFSender", "RTCCertificate", "PromiseRejectionEvent", "ProgressEvent", "Profiler",  
      "ProcessingInstruction", "PopStateEvent", "PointerEvent", "PluginArray", "Plugin", "PeriodicWave", "PerformanceTiming",  
      "PerformanceServerTiming", "PerformanceResourceTiming", "PerformancePaintTiming", "PerformanceObserverEntryList",  
      "PerformanceObserver", "PerformanceNavigationTiming", "PerformanceNavigation", "PerformanceMeasure", "PerformanceMark",  
      "PerformanceLongTaskTiming", "PerformanceEventTiming", "PerformanceEntry", "PerformanceElementTiming", "Performance", 
      "Path2D", "PannerNode", "PageTransitionEvent", "OverconstrainedError", "OscillatorNode", "OffscreenCanvasRenderingContext2D", 
      "OffscreenCanvas", "OfflineAudioContext", "OfflineAudioCompletionEvent", "NodeList", "NodeIterator", "NodeFilter", "Node",  
      "NetworkInformation", "Navigator", "NamedNodeMap", "MutationRecord", "MutationObserver", "MutationEvent", "MouseEvent",  
      "MimeTypeArray", "MimeType", "MessagePort", "MessageEvent", "MessageChannel", "MediaStreamTrackProcessor",  
      "MediaStreamTrackEvent", "MediaStreamEvent", "MediaStreamAudioSourceNode", "MediaStreamAudioDestinationNode",  
      "MediaStream", "MediaRecorder", "MediaQueryListEvent", "MediaQueryList", "MediaList", "MediaError", "MediaEncryptedEvent",  
      "MediaElementAudioSourceNode", "MediaCapabilities", "Location", "LayoutShiftAttribution", "LayoutShift",  
      "LargestContentfulPaint", "KeyframeEffect", "KeyboardEvent", "IntersectionObserverEntry", "IntersectionObserver",  
      "InputEvent", "InputDeviceInfo", "InputDeviceCapabilities", "ImageData", "ImageCapture", "ImageBitmapRenderingContext",  
      "ImageBitmap", "IdleDeadline", "IIRFilterNode", "IDBVersionChangeEvent", "IDBTransaction", "IDBRequest",  
      "IDBOpenDBRequest", "IDBObjectStore", "IDBKeyRange", "IDBIndex", "IDBFactory", "IDBDatabase", "IDBCursorWithValue",  
      "IDBCursor", "History", "Headers", "HashChangeEvent", "HTMLVideoElement", "HTMLUnknownElement", "HTMLUListElement",  
      "HTMLTrackElement", "HTMLTitleElement", "HTMLTimeElement", "HTMLTextAreaElement", "HTMLTemplateElement",  
      "HTMLTableSectionElement", "HTMLTableRowElement", "HTMLTableElement", "HTMLTableColElement", "HTMLTableCellElement",  
      "HTMLTableCaptionElement", "HTMLStyleElement", "HTMLSpanElement", "HTMLSourceElement", "HTMLSlotElement",  
      "HTMLSelectElement", "HTMLScriptElement", "HTMLQuoteElement", "HTMLProgressElement", "HTMLPreElement",  
      "HTMLPictureElement", "HTMLParamElement", "HTMLParagraphElement", "HTMLOutputElement", "HTMLOptionsCollection",  
      "HTMLOptionElement", "HTMLOptGroupElement", "HTMLObjectElement", "HTMLOListElement", "HTMLModElement", "HTMLMeterElement",  
      "HTMLMetaElement", "HTMLMenuElement", "HTMLMediaElement", "HTMLMarqueeElement", "HTMLMapElement", "HTMLLinkElement",  
      "HTMLLegendElement", "HTMLLabelElement", "HTMLLIElement", "HTMLInputElement", "HTMLImageElement", "HTMLIFrameElement",  
      "HTMLHtmlElement", "HTMLHeadingElement", "HTMLHeadElement", "HTMLHRElement", "HTMLFrameSetElement", "HTMLFrameElement",  
      "HTMLFormElement", "HTMLFormControlsCollection", "HTMLFontElement", "HTMLFieldSetElement", "HTMLEmbedElement",  
      "HTMLElement", "HTMLDocument", "HTMLDivElement", "HTMLDirectoryElement", "HTMLDialogElement", "HTMLDetailsElement",  
      "HTMLDataListElement", "HTMLDataElement", "HTMLDListElement", "HTMLCollection", "HTMLCanvasElement", "HTMLButtonElement",  
      "HTMLBodyElement", "HTMLBaseElement", "HTMLBRElement", "HTMLAudioElement", "HTMLAreaElement", "HTMLAnchorElement",  
      "HTMLAllCollection", "GeolocationPositionError", "GeolocationPosition", "GeolocationCoordinates", "Geolocation",  
      "GamepadHapticActuator", "GamepadEvent", "GamepadButton", "Gamepad", "GainNode", "FormDataEvent", "FormData",  
      "FontFaceSetLoadEvent", "FontFace", "FocusEvent", "FileReader", "FileList", "File", "FeaturePolicy", "External",  
      "EventTarget", "EventSource", "EventCounts", "Event", "ErrorEvent", "ElementInternals", "Element",  
      "DynamicsCompressorNode", "DragEvent", "DocumentType", "DocumentFragment", "Document", "DelayNode", "DecompressionStream",  
      "DataTransferItemList", "DataTransferItem", "DataTransfer", "DOMTokenList", "DOMStringMap", "DOMStringList",  
      "DOMRectReadOnly", "DOMRectList", "DOMRect", "DOMQuad", "DOMPointReadOnly", "DOMPoint", "DOMParser", "DOMMatrixReadOnly",  
      "DOMMatrix", "DOMImplementation", "DOMException", "DOMError", "CustomStateSet", "CustomEvent", "CustomElementRegistry",  
      "Crypto", "CountQueuingStrategy", "ConvolverNode", "ConstantSourceNode", "CompressionStream", "CompositionEvent",  
      "Comment", "CloseEvent", "ClipboardEvent", "CharacterData", "ChannelSplitterNode", "ChannelMergerNode",  
      "CanvasRenderingContext2D", "CanvasPattern", "CanvasGradient", "CanvasFilter", "CanvasCaptureMediaStreamTrack",  
      "CSSVariableReferenceValue", "CSSUnparsedValue", "CSSUnitValue", "CSSTranslate", "CSSTransformValue",  
      "CSSTransformComponent", "CSSSupportsRule", "CSSStyleValue", "CSSStyleSheet", "CSSStyleRule", "CSSStyleDeclaration",  
      "CSSSkewY", "CSSSkewX", "CSSSkew", "CSSScale", "CSSRuleList", "CSSRule", "CSSRotate", "CSSPropertyRule",  
      "CSSPositionValue", "CSSPerspective", "CSSPageRule", "CSSNumericValue", "CSSNumericArray", "CSSNamespaceRule",  
      "CSSMediaRule", "CSSMatrixComponent", "CSSMathValue", "CSSMathSum", "CSSMathProduct", "CSSMathNegate", "CSSMathMin",  
      "CSSMathMax", "CSSMathInvert", "CSSMathClamp", "CSSLayerStatementRule", "CSSLayerBlockRule", "CSSKeywordValue",  
      "CSSKeyframesRule", "CSSKeyframeRule", "CSSImportRule", "CSSImageValue", "CSSGroupingRule", "CSSFontFaceRule",  
      "CSSCounterStyleRule", "CSSConditionRule", "CSS", "CDATASection", "ByteLengthQueuingStrategy", "BroadcastChannel",  
      "BlobEvent", "Blob", "BiquadFilterNode", "BeforeUnloadEvent", "BeforeInstallPromptEvent", "BaseAudioContext", "BarProp",  
      "AudioWorkletNode", "AudioScheduledSourceNode", "AudioProcessingEvent", "AudioParamMap", "AudioParam", "AudioNode",  
      "AudioListener", "AudioDestinationNode", "AudioContext", "AudioBufferSourceNode", "AudioBuffer", "Attr", "AnimationEvent",  
      "AnimationEffect", "Animation", "AnalyserNode", "AbstractRange", "AbortSignal", "AbortController", "window", "self",  
      "document", "name", "location", "customElements", "history", "locationbar", "menubar", "personalbar", "scrollbars",  
      "statusbar", "toolbar", "status", "closed", "frames", "length", "top", "opener", "parent", "frameElement", "navigator",  
      "origin", "external", "screen", "innerWidth", "innerHeight", "scrollX", "pageXOffset", "scrollY", "pageYOffset",  
      "visualViewport", "screenX", "screenY", "outerWidth", "outerHeight", "devicePixelRatio", "event", "clientInformation",  
      "offscreenBuffering", "screenLeft", "screenTop", "defaultStatus", "defaultstatus", "styleMedia", "onsearch",  
      "isSecureContext", "trustedTypes", "performance", "onappinstalled", "onbeforeinstallprompt", "crypto", "indexedDB",  
      "sessionStorage", "localStorage", "onbeforexrselect", "onabort", "onbeforeinput", "onblur", "oncancel", "oncanplay",  
      "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextlost", "oncontextmenu", "oncontextrestored", "oncuechange",  
      "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop",  
      "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "onformdata", "oninput", "oninvalid", "onkeydown",  
      "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmouseenter",  
      "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying",  
      "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onsecuritypolicyviolation", "onseeked", "onseeking",  
      "onselect", "onslotchange", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange",  
      "onwaiting", "onwebkitanimationend", "onwebkitanimationiteration", "onwebkitanimationstart", "onwebkittransitionend",  
      "onwheel", "onauxclick", "ongotpointercapture", "onlostpointercapture", "onpointerdown", "onpointermove",  
      "onpointerrawupdate", "onpointerup", "onpointercancel", "onpointerover", "onpointerout", "onpointerenter",  
      "onpointerleave", "onselectstart", "onselectionchange", "onanimationend", "onanimationiteration", "onanimationstart",  
      "ontransitionrun", "ontransitionstart", "ontransitionend", "ontransitioncancel", "onafterprint", "onbeforeprint",  
      "onbeforeunload", "onhashchange", "onlanguagechange", "onmessage", "onmessageerror", "onoffline", "ononline", "onpagehide",  
      "onpageshow", "onpopstate", "onrejectionhandled", "onstorage", "onunhandledrejection", "onunload", "crossOriginIsolated",  
      "scheduler", "alert", "atob", "blur", "btoa", "cancelAnimationFrame", "cancelIdleCallback", "captureEvents",  
      "clearInterval", "clearTimeout", "close", "confirm", "createImageBitmap", "fetch", "find", "focus", "getComputedStyle",  
      "getSelection", "matchMedia", "moveBy", "moveTo", "open", "postMessage", "print", "prompt", "queueMicrotask",  
      "releaseEvents", "reportError", "requestAnimationFrame", "requestIdleCallback", "resizeBy", "resizeTo", "scroll",  
      "scrollBy", "scrollTo", "setInterval", "setTimeout", "stop", "structuredClone", "webkitCancelAnimationFrame",  
      "webkitRequestAnimationFrame", "Atomics", "chrome", "WebAssembly", "caches", "cookieStore", "ondevicemotion",  
      "ondeviceorientation", "ondeviceorientationabsolute", "launchQueue", "onbeforematch", "AbsoluteOrientationSensor",  
      "Accelerometer", "AudioWorklet", "BatteryManager", "Cache", "CacheStorage", "Clipboard", "ClipboardItem",  
      "CookieChangeEvent", "CookieStore", "CookieStoreManager", "Credential", "CredentialsContainer", "CryptoKey",  
      "DeviceMotionEvent", "DeviceMotionEventAcceleration", "DeviceMotionEventRotationRate", "DeviceOrientationEvent",  
      "FederatedCredential", "GravitySensor", "Gyroscope", "Keyboard", "KeyboardLayoutMap", "LinearAccelerationSensor", "Lock",  
      "LockManager", "MIDIAccess", "MIDIConnectionEvent", "MIDIInput", "MIDIInputMap", "MIDIMessageEvent", "MIDIOutput",  
      "MIDIOutputMap", "MIDIPort", "MediaDeviceInfo", "MediaDevices", "MediaKeyMessageEvent", "MediaKeySession",  
      "MediaKeyStatusMap", "MediaKeySystemAccess", "MediaKeys", "NavigationPreloadManager", "NavigatorManagedData",  
      "OrientationSensor", "PasswordCredential", "RTCIceTransport", "RelativeOrientationSensor", "Sensor", "SensorErrorEvent",  
      "ServiceWorker", "ServiceWorkerContainer", "ServiceWorkerRegistration", "StorageManager", "SubtleCrypto",  
      "VirtualKeyboard", "WebTransport", "WebTransportBidirectionalStream", "WebTransportDatagramDuplexStream",  
      "WebTransportError", "Worklet", "XRDOMOverlayState", "XRLayer", "XRWebGLBinding", "AudioData", "EncodedAudioChunk",  
      "EncodedVideoChunk", "ImageTrack", "ImageTrackList", "VideoColorSpace", "VideoFrame", "AudioDecoder", "AudioEncoder",  
      "ImageDecoder", "VideoDecoder", "VideoEncoder", "AuthenticatorAssertionResponse", "AuthenticatorAttestationResponse",  
      "AuthenticatorResponse", "PublicKeyCredential", "BarcodeDetector", "Bluetooth", "BluetoothCharacteristicProperties",  
      "BluetoothDevice", "BluetoothRemoteGATTCharacteristic", "BluetoothRemoteGATTDescriptor", "BluetoothRemoteGATTServer",  
      "BluetoothRemoteGATTService", "EyeDropper", "FileSystemDirectoryHandle", "FileSystemFileHandle", "FileSystemHandle",  
      "FileSystemWritableFileStream", "FontData", "FragmentDirective", "HID", "HIDConnectionEvent", "HIDDevice",  
      "HIDInputReportEvent", "IdleDetector", "LaunchParams", "LaunchQueue", "OTPCredential", "PaymentAddress", "PaymentRequest",  
      "PaymentResponse", "PaymentMethodChangeEvent", "Presentation", "PresentationAvailability", "PresentationConnection",  
      "PresentationConnectionAvailableEvent", "PresentationConnectionCloseEvent", "PresentationConnectionList",  
      "PresentationReceiver", "PresentationRequest", "Sanitizer", "ScreenDetailed", "ScreenDetails", "Serial", "SerialPort",  
      "USB", "USBAlternateInterface", "USBConfiguration", "USBConnectionEvent", "USBDevice", "USBEndpoint",  
      "USBInTransferResult", "USBInterface", "USBIsochronousInTransferPacket", "USBIsochronousInTransferResult",  
      "USBIsochronousOutTransferPacket", "USBIsochronousOutTransferResult", "USBOutTransferResult", "WakeLock",  
      "WakeLockSentinel", "WindowControlsOverlay", "WindowControlsOverlayGeometryChangeEvent", "XRAnchor", "XRAnchorSet",  
      "XRBoundedReferenceSpace", "XRFrame", "XRInputSource", "XRInputSourceArray", "XRInputSourceEvent",  
      "XRInputSourcesChangeEvent", "XRPose", "XRReferenceSpace", "XRReferenceSpaceEvent", "XRRenderState", "XRRigidTransform",  
      "XRSession", "XRSessionEvent", "XRSpace", "XRSystem", "XRView", "XRViewerPose", "XRViewport", "XRWebGLLayer",  
      "XRCPUDepthInformation", "XRDepthInformation", "XRWebGLDepthInformation", "XRCamera", "XRHitTestResult", "XRHitTestSource",  
      "XRRay", "XRTransientInputHitTestResult", "XRTransientInputHitTestSource", "XRLightEstimate", "XRLightProbe",  
      "getScreenDetails", "queryLocalFonts", "showDirectoryPicker", "showOpenFilePicker", "showSaveFilePicker",  
      "originAgentCluster", "navigation", "webkitStorageInfo", "speechSynthesis", "AnimationPlaybackEvent", "AnimationTimeline",  
      "CSSAnimation", "CSSTransition", "DocumentTimeline", "BackgroundFetchManager", "BackgroundFetchRecord",  
      "BackgroundFetchRegistration", "BluetoothUUID", "BrowserCaptureMediaStreamTrack", "CropTarget", "CSSContainerRule",  
      "CSSFontPaletteValuesRule", "DelegatedInkTrailPresenter", "Ink", "Highlight", "HighlightRegistry", "MediaMetadata",  
      "MediaSession", "MediaSource", "SourceBuffer", "SourceBufferList", "MediaStreamTrack", "MediaStreamTrackGenerator",  
      "NavigateEvent", "Navigation", "NavigationCurrentEntryChangeEvent", "NavigationDestination", "NavigationHistoryEntry",  
      "NavigationTransition", "NavigatorUAData", "Notification", "PaymentInstruments", "PaymentManager",  
      "PaymentRequestUpdateEvent", "PeriodicSyncManager", "PermissionStatus", "Permissions", "PictureInPictureEvent",  
      "PictureInPictureWindow", "PushManager", "PushSubscription", "PushSubscriptionOptions", "RemotePlayback", "SharedWorker",  
      "SpeechSynthesisErrorEvent", "SpeechSynthesisEvent", "SpeechSynthesisUtterance", "VideoPlaybackQuality",  
      "webkitSpeechGrammar", "webkitSpeechGrammarList", "webkitSpeechRecognition", "webkitSpeechRecognitionError",  
      "webkitSpeechRecognitionEvent", "openDatabase", "webkitRequestFileSystem", "webkitResolveLocalFileSystemURL", "dir",  
      "dirxml", "profile", "profileEnd", "clear", "table", "keys", "values", "debug", "undebug", "monitor", "unmonitor",  
      "inspect", "copy", "queryObjects", "$_", "$0", "$1", "$2", "$3", "$4", "getEventListeners", "getAccessibleName",  
      "getAccessibleRole", "monitorEvents", "unmonitorEvents", "$", "$$", "$x"
    ]),
    safari: new Set([
      "Infinity", "document", "window", "NaN", "undefined", "self", "name", "location", "history", "customElements",  
      "locationbar", "menubar", "personalbar", "scrollbars", "statusbar", "toolbar", "status", "closed", "frames", "length",  
      "top", "opener", "parent", "frameElement", "navigator", "event", "defaultStatus", "defaultstatus", "offscreenBuffering",  
      "clientInformation", "GestureEvent", "WebKitPlaybackTargetAvailabilityEvent", "ApplePayError", "Headers", "Request",  
      "Response", "Geolocation", "GeolocationCoordinates", "GeolocationPosition", "GeolocationPositionError", "IDBCursor",  
      "IDBCursorWithValue", "IDBDatabase", "IDBFactory", "IDBIndex", "IDBKeyRange", "IDBObjectStore", "IDBOpenDBRequest",  
      "IDBRequest", "IDBTransaction", "IDBVersionChangeEvent", "MediaMetadata", "MediaSession", "CanvasCaptureMediaStreamTrack",  
      "MediaDeviceInfo", "MediaStream", "MediaStreamTrack", "MediaStreamTrackEvent", "OverconstrainedError",  
      "OverconstrainedErrorEvent", "SpeechSynthesis", "SpeechSynthesisErrorEvent", "SpeechSynthesisEvent",  
      "SpeechSynthesisUtterance", "SpeechSynthesisVoice", "ByteLengthQueuingStrategy", "CountQueuingStrategy", "ReadableStream",  
      "WritableStream", "WritableStreamDefaultController", "WritableStreamDefaultWriter", "ScriptProcessorNode",  
      "VideoColorSpace", "SQLTransaction", "CloseEvent", "AnimationEffect", "AnimationPlaybackEvent", "AnimationTimeline",  
      "CSSAnimation", "CSSTransition", "DocumentTimeline", "KeyframeEffect", "Animation", "CSSConditionRule", "CSSContainerRule",  
      "CSSFontFaceRule", "CSSFontPaletteValuesRule", "CSSGroupingRule", "CSSImportRule", "CSSKeyframeRule", "CSSKeyframesRule",  
      "CSSLayerBlockRule", "CSSLayerStatementRule", "CSSMediaRule", "CSSNamespaceRule", "CSSPageRule", "CSSRule", "CSSRuleList",  
      "CSSStyleDeclaration", "CSSStyleRule", "CSSStyleSheet", "CSSSupportsRule", "CSS", "DOMMatrix", "WebKitCSSMatrix",  
      "DOMMatrixReadOnly", "Counter", "CSSPrimitiveValue", "RGBColor", "Rect", "CSSValue", "CSSValueList", "FontFace",  
      "FontFaceSet", "MediaList", "MediaQueryList", "MediaQueryListEvent", "StyleSheet", "StyleSheetList", "AbortController",  
      "AbortSignal", "AbstractRange", "AnimationEvent", "Attr", "BeforeUnloadEvent", "CDATASection", "CharacterData",  
      "ClipboardEvent", "Comment", "CompositionEvent", "CustomElementRegistry", "CustomEvent", "DOMException",  
      "DOMImplementation", "DOMPoint", "DOMPointReadOnly", "DOMQuad", "DOMRect", "DOMRectList", "DOMRectReadOnly",  
      "DOMStringList", "DOMStringMap", "DataTransfer", "Document", "DocumentFragment", "DocumentType", "DragEvent", "Element",  
      "ErrorEvent", "Event", "EventTarget", "FocusEvent", "FormDataEvent", "HashChangeEvent", "InputEvent", "KeyboardEvent",  
      "MessageChannel", "MessageEvent", "MessagePort", "MouseEvent", "MutationEvent", "MutationObserver",  
      "WebKitMutationObserver", "MutationRecord", "NamedNodeMap", "Node", "NodeFilter", "NodeIterator", "NodeList",  
      "OverflowEvent", "PageTransitionEvent", "PopStateEvent", "ProcessingInstruction", "ProgressEvent", "PromiseRejectionEvent",  
      "Range", "SecurityPolicyViolationEvent", "ShadowRoot", "StaticRange", "Text", "TextDecoder", "TextEncoder", "TextEvent",  
      "TransitionEvent", "TreeWalker", "UIEvent", "WheelEvent", "XMLDocument", "SVGDocument", "Blob", "File", "FileList",  
      "FileReader", "FormData", "DOMTokenList", "URL", "webkitURL", "HTMLAllCollection", "HTMLAnchorElement", "HTMLAreaElement",  
      "HTMLAudioElement", "Audio", "HTMLBRElement", "HTMLBaseElement", "HTMLBodyElement", "HTMLButtonElement",  
      "HTMLCanvasElement", "HTMLCollection", "HTMLDListElement", "HTMLDataElement", "HTMLDetailsElement", "HTMLDirectoryElement",  
      "HTMLDivElement", "HTMLDocument", "HTMLElement", "HTMLEmbedElement", "HTMLFieldSetElement", "HTMLFontElement",  
      "HTMLFormControlsCollection", "HTMLFormElement", "HTMLFrameElement", "HTMLFrameSetElement", "HTMLHRElement",  
      "HTMLHeadElement", "HTMLHeadingElement", "HTMLHtmlElement", "HTMLIFrameElement", "HTMLImageElement", "Image",  
      "HTMLInputElement", "HTMLLIElement", "HTMLLabelElement", "HTMLLegendElement", "HTMLLinkElement", "HTMLMapElement",  
      "HTMLMarqueeElement", "HTMLMediaElement", "HTMLMenuElement", "HTMLMetaElement", "HTMLMeterElement", "HTMLModElement",  
      "HTMLOListElement", "HTMLObjectElement", "HTMLOptGroupElement", "HTMLOptionElement", "Option", "HTMLOptionsCollection",  
      "HTMLOutputElement", "HTMLParagraphElement", "HTMLParamElement", "HTMLPictureElement", "HTMLPreElement",  
      "HTMLProgressElement", "HTMLQuoteElement", "HTMLScriptElement", "HTMLSelectElement", "HTMLSlotElement",  
      "HTMLSourceElement", "HTMLSpanElement", "HTMLStyleElement", "HTMLTableCaptionElement", "HTMLTableCellElement",  
      "HTMLTableColElement", "HTMLTableElement", "HTMLTableRowElement", "HTMLTableSectionElement", "HTMLTemplateElement",  
      "HTMLTextAreaElement", "HTMLTimeElement", "HTMLTitleElement", "HTMLTrackElement", "HTMLUListElement", "HTMLUnknownElement",  
      "HTMLVideoElement", "ImageData", "MediaController", "MediaError", "RadioNodeList", "SubmitEvent", "TextMetrics",  
      "TimeRanges", "URLSearchParams", "ValidityState", "CanvasGradient", "CanvasPattern", "CanvasRenderingContext2D", "Path2D",  
      "AudioTrack", "AudioTrackConfiguration", "AudioTrackList", "DataCue", "TextTrack", "TextTrackCue", "TextTrackCueList",  
      "TextTrackList", "TrackEvent", "VTTCue", "VTTRegion", "VideoTrack", "VideoTrackConfiguration", "VideoTrackList", "BarProp",  
      "Crypto", "Selection", "Window", "EventSource", "History", "Location", "Navigator", "Performance", "PerformanceEntry",  
      "PerformanceMark", "PerformanceMeasure", "PerformanceNavigation", "PerformanceObserver", "PerformanceObserverEntryList",  
      "PerformanceResourceTiming", "PerformanceTiming", "ResizeObserverSize", "Screen", "UserMessageHandler",  
      "UserMessageHandlersNamespace", "WebKitNamespace", "WebKitPoint", "MimeType", "MimeTypeArray", "Plugin", "PluginArray",  
      "Storage", "StorageEvent", "SVGAElement", "SVGAltGlyphDefElement", "SVGAltGlyphElement", "SVGAltGlyphItemElement",  
      "SVGAngle", "SVGAnimateColorElement", "SVGAnimateElement", "SVGAnimateMotionElement", "SVGAnimateTransformElement",  
      "SVGAnimatedAngle", "SVGAnimatedBoolean", "SVGAnimatedEnumeration", "SVGAnimatedInteger", "SVGAnimatedLength",  
      "SVGAnimatedLengthList", "SVGAnimatedNumber", "SVGAnimatedNumberList", "SVGAnimatedPreserveAspectRatio", "SVGAnimatedRect",  
      "SVGAnimatedString", "SVGAnimatedTransformList", "SVGAnimationElement", "SVGCircleElement", "SVGClipPathElement",  
      "SVGComponentTransferFunctionElement", "SVGCursorElement", "SVGDefsElement", "SVGDescElement", "SVGElement",  
      "SVGEllipseElement", "SVGFEBlendElement", "SVGFEColorMatrixElement", "SVGFEComponentTransferElement",  
      "SVGFECompositeElement", "SVGFEConvolveMatrixElement", "SVGFEDiffuseLightingElement", "SVGFEDisplacementMapElement",  
      "SVGFEDistantLightElement", "SVGFEDropShadowElement", "SVGFEFloodElement", "SVGFEFuncAElement", "SVGFEFuncBElement",  
      "SVGFEFuncGElement", "SVGFEFuncRElement", "SVGFEGaussianBlurElement", "SVGFEImageElement", "SVGFEMergeElement",  
      "SVGFEMergeNodeElement", "SVGFEMorphologyElement", "SVGFEOffsetElement", "SVGFEPointLightElement",  
      "SVGFESpecularLightingElement", "SVGFESpotLightElement", "SVGFETileElement", "SVGFETurbulenceElement", "SVGFilterElement",  
      "SVGFontElement", "SVGFontFaceElement", "SVGFontFaceFormatElement", "SVGFontFaceNameElement", "SVGFontFaceSrcElement",  
      "SVGFontFaceUriElement", "SVGForeignObjectElement", "SVGGElement", "SVGGeometryElement", "SVGGlyphElement",  
      "SVGGlyphRefElement", "SVGGradientElement", "SVGGraphicsElement", "SVGHKernElement", "SVGImageElement", "SVGLength",  
      "SVGLengthList", "SVGLineElement", "SVGLinearGradientElement", "SVGMPathElement", "SVGMarkerElement", "SVGMaskElement",  
      "SVGMatrix", "SVGMetadataElement", "SVGMissingGlyphElement", "SVGNumber", "SVGNumberList", "SVGPathElement", "SVGPathSeg",  
      "SVGPathSegArcAbs", "SVGPathSegArcRel", "SVGPathSegClosePath", "SVGPathSegCurvetoCubicAbs", "SVGPathSegCurvetoCubicRel",  
      "SVGPathSegCurvetoCubicSmoothAbs", "SVGPathSegCurvetoCubicSmoothRel", "SVGPathSegCurvetoQuadraticAbs",  
      "SVGPathSegCurvetoQuadraticRel", "SVGPathSegCurvetoQuadraticSmoothAbs", "SVGPathSegCurvetoQuadraticSmoothRel",  
      "SVGPathSegLinetoAbs", "SVGPathSegLinetoHorizontalAbs", "SVGPathSegLinetoHorizontalRel", "SVGPathSegLinetoRel",  
      "SVGPathSegLinetoVerticalAbs", "SVGPathSegLinetoVerticalRel", "SVGPathSegList", "SVGPathSegMovetoAbs",  
      "SVGPathSegMovetoRel", "SVGPatternElement", "SVGPoint", "SVGPointList", "SVGPolygonElement", "SVGPolylineElement",  
      "SVGPreserveAspectRatio", "SVGRadialGradientElement", "SVGRect", "SVGRectElement", "SVGRenderingIntent", "SVGSVGElement",  
      "SVGScriptElement", "SVGSetElement", "SVGStopElement", "SVGStringList", "SVGStyleElement", "SVGSwitchElement",  
      "SVGSymbolElement", "SVGTRefElement", "SVGTSpanElement", "SVGTextContentElement", "SVGTextElement", "SVGTextPathElement",  
      "SVGTextPositioningElement", "SVGTitleElement", "SVGTransform", "SVGTransformList", "SVGUnitTypes", "SVGUseElement",  
      "SVGVKernElement", "SVGViewElement", "SVGViewSpec", "SVGZoomEvent", "Worker", "Worklet", "DOMParser", "XMLHttpRequest",  
      "XMLHttpRequestEventTarget", "XMLHttpRequestProgressEvent", "XMLHttpRequestUpload", "XMLSerializer", "XPathEvaluator",  
      "XPathExpression", "XPathResult", "XSLTProcessor", "speechSynthesis", "openDatabase", "onabort", "onblur", "oncancel",  
      "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag",  
      "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied",  
      "onended", "onerror", "onfocus", "onformdata", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload",  
      "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove",  
      "onmouseout", "onmouseover", "onmouseup", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset",  
      "onresize", "onscroll", "onsecuritypolicyviolation", "onseeked", "onseeking", "onselect", "onslotchange", "onstalled",  
      "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange", "onwaiting", "onwebkitanimationend",  
      "onwebkitanimationiteration", "onwebkitanimationstart", "onwebkittransitionend", "onwheel", "onmousewheel", "onsearch",  
      "onwebkitmouseforcechanged", "onwebkitmouseforcedown", "onwebkitmouseforcewillbegin", "onwebkitmouseforceup",  
      "onanimationstart", "onanimationiteration", "onanimationend", "onanimationcancel", "ontransitionrun", "ontransitionstart",  
      "ontransitionend", "ontransitioncancel", "ongotpointercapture", "onlostpointercapture", "onpointerdown", "onpointermove",  
      "onpointerup", "onpointercancel", "onpointerover", "onpointerout", "onpointerenter", "onpointerleave", "onselectstart",  
      "onselectionchange", "screen", "innerWidth", "innerHeight", "scrollX", "pageXOffset", "scrollY", "pageYOffset", "screenX",  
      "screenLeft", "screenY", "screenTop", "outerWidth", "outerHeight", "devicePixelRatio", "styleMedia", "onafterprint",  
      "onbeforeprint", "onbeforeunload", "onhashchange", "onlanguagechange", "onmessage", "onoffline", "ononline", "onpagehide",  
      "onpageshow", "onpopstate", "onrejectionhandled", "onstorage", "onunhandledrejection", "onunload", "ongamepadconnected",  
      "ongamepaddisconnected", "localStorage", "origin", "isSecureContext", "indexedDB", "webkitIndexedDB", "crypto",  
      "performance", "sessionStorage", "close", "stop", "focus", "blur", "open", "alert", "confirm", "prompt", "print",  
      "postMessage", "captureEvents", "releaseEvents", "find", "webkitRequestAnimationFrame", "webkitCancelAnimationFrame",  
      "webkitCancelRequestAnimationFrame", "getMatchedCSSRules", "webkitConvertPointFromPageToNode",  
      "webkitConvertPointFromNodeToPage", "requestAnimationFrame", "cancelAnimationFrame", "getComputedStyle", "matchMedia",  
      "moveTo", "moveBy", "resizeTo", "resizeBy", "scroll", "scrollTo", "scrollBy", "getSelection", "reportError", "atob",  
      "btoa", "setTimeout", "clearTimeout", "setInterval", "clearInterval", "queueMicrotask", "structuredClone", "fetch",  
      "isNaN", "isFinite", "escape", "unescape", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "eval",  
      "globalThis", "parseInt", "parseFloat", "ArrayBuffer", "EvalError", "RangeError", "ReferenceError", "SyntaxError",  
      "TypeError", "URIError", "AggregateError", "Proxy", "Reflect", "JSON", "Math", "console", "Int8Array", "Int16Array",  
      "Int32Array", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "Float32Array", "Float64Array",  
      "BigInt64Array", "BigUint64Array", "DataView", "Date", "Error", "Boolean", "Map", "Number", "Set", "Symbol", "WeakMap",  
      "WeakSet", "Object", "Function", "Array", "RegExp", "String", "Promise", "BigInt", "WeakRef", "FinalizationRegistry",  
      "Intl", "WebAssembly", "showModalDialog", "GPUBuffer", "GPUBufferUsage", "GPUColorWrite", "GPUCommandEncoder",  
      "GPUComputePassEncoder", "GPUMapMode", "GPUQueue", "GPURenderPassEncoder", "GPUShaderStage", "GPUTextureUsage",  
      "ApplePaySession", "ApplePaySetup", "ApplePaySetupFeature", "Clipboard", "ClipboardItem", "Cache", "CacheStorage",  
      "Credential", "CredentialsContainer", "MediaKeyMessageEvent", "MediaKeySession", "MediaKeyStatusMap",  
      "MediaKeySystemAccess", "MediaKeys", "WebKitMediaKeyMessageEvent", "WebKitMediaKeyNeededEvent", "WebKitMediaKeySession",  
      "WebKitMediaKeys", "FileSystem", "FileSystemDirectoryEntry", "FileSystemDirectoryReader", "FileSystemEntry",  
      "FileSystemFileEntry", "FileSystemDirectoryHandle", "FileSystemFileHandle", "FileSystemHandle", "Gamepad", "GamepadButton",  
      "GamepadEvent", "MediaCapabilities", "BlobEvent", "MediaRecorder", "MediaRecorderErrorEvent", "MediaSessionCoordinator",  
      "MediaSource", "SourceBuffer", "SourceBufferList", "MediaDevices", "RTCCertificate", "RTCDTMFSender",  
      "RTCDTMFToneChangeEvent", "RTCDataChannel", "RTCDataChannelEvent", "RTCDtlsTransport", "RTCError", "RTCErrorEvent",  
      "RTCIceCandidate", "RTCIceTransport", "RTCPeerConnection", "RTCPeerConnectionIceErrorEvent", "RTCPeerConnectionIceEvent",  
      "RTCRtpReceiver", "RTCRtpScriptTransform", "RTCRtpSender", "RTCRtpTransceiver", "RTCSctpTransport",  
      "RTCSessionDescription", "RTCStatsReport", "RTCTrackEvent", "Notification", "MerchantValidationEvent", "PaymentAddress",  
      "PaymentMethodChangeEvent", "PaymentRequest", "PaymentRequestUpdateEvent", "PaymentResponse", "PermissionStatus",  
      "Permissions", "PictureInPictureEvent", "PictureInPictureWindow", "PushManager", "PushSubscription",  
      "PushSubscriptionOptions", "RemotePlayback", "webkitSpeechRecognition", "SpeechRecognitionAlternative",  
      "SpeechRecognitionErrorEvent", "SpeechRecognitionEvent", "SpeechRecognitionResult", "SpeechRecognitionResultList",  
      "StorageManager", "TransformStream", "TransformStreamDefaultController", "Lock", "LockManager", "AnalyserNode",  
      "AudioBuffer", "AudioBufferSourceNode", "AudioContext", "AudioDestinationNode", "AudioListener", "AudioNode", "AudioParam",  
      "AudioParamMap", "AudioProcessingEvent", "AudioScheduledSourceNode", "AudioWorklet", "AudioWorkletNode",  
      "BaseAudioContext", "BiquadFilterNode", "ChannelMergerNode", "ChannelSplitterNode", "ConstantSourceNode", "ConvolverNode",  
      "DelayNode", "DynamicsCompressorNode", "GainNode", "IIRFilterNode", "MediaElementAudioSourceNode",  
      "MediaStreamAudioDestinationNode", "MediaStreamAudioSourceNode", "OfflineAudioCompletionEvent", "OfflineAudioContext",  
      "OscillatorNode", "PannerNode", "PeriodicWave", "StereoPannerNode", "WaveShaperNode", "AuthenticatorAssertionResponse",  
      "AuthenticatorAttestationResponse", "AuthenticatorResponse", "PublicKeyCredential", "WebSocket", "CryptoKey",  
      "SubtleCrypto", "BroadcastChannel", "DataTransferItem", "DataTransferItemList", "PointerEvent", "TextDecoderStream",  
      "TextEncoderStream", "HTMLDataListElement", "HTMLDialogElement", "ImageBitmap", "MediaEncryptedEvent",  
      "WebKitMediaKeyError", "ImageBitmapRenderingContext", "WebGL2RenderingContext", "WebGLActiveInfo", "WebGLBuffer",  
      "WebGLContextEvent", "WebGLFramebuffer", "WebGLProgram", "WebGLQuery", "WebGLRenderbuffer", "WebGLRenderingContext",  
      "WebGLSampler", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLSync", "WebGLTexture", "WebGLTransformFeedback",  
      "WebGLUniformLocation", "WebGLVertexArrayObject", "MathMLElement", "MathMLMathElement", "IntersectionObserver",  
      "IntersectionObserverEntry", "PerformanceNavigationTiming", "PerformancePaintTiming", "ResizeObserver",  
      "ResizeObserverEntry", "VisualViewport", "NavigationPreloadManager", "ServiceWorker", "ServiceWorkerContainer",  
      "ServiceWorkerRegistration", "SharedWorker", "visualViewport", "crossOriginIsolated", "caches", "createImageBitmap",  
      "browser"
    ]),
    firefox: new Set([
      "undefined", "Boolean", "JSON", "Date", "Math", "Number", "String", "RegExp", "InternalError", "AggregateError",  
      "EvalError", "RangeError", "SyntaxError", "TypeError", "URIError", "ArrayBuffer", "Int8Array", "Uint8Array", "Int16Array",  
      "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "Uint8ClampedArray", "BigInt64Array",  
      "BigUint64Array", "BigInt", "Proxy", "WeakMap", "Set", "DataView", "Symbol", "Intl", "Reflect", "WeakSet", "Atomics",  
      "WebAssembly", "FinalizationRegistry", "WeakRef", "NaN", "Infinity", "isNaN", "isFinite", "parseFloat", "parseInt",  
      "escape", "unescape", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "MessagePort",  
      "SVGFEDropShadowElement", "SVGSwitchElement", "DOMQuad", "VTTRegion", "SVGMarkerElement", "PermissionStatus",  
      "CSSMediaRule", "TrackEvent", "Comment", "SVGAnimatedPreserveAspectRatio", "DocumentFragment", "CanvasPattern",  
      "SVGFEPointLightElement", "ElementInternals", "CSSConditionRule", "SVGComponentTransferFunctionElement", "HTMLAreaElement",  
      "HTMLPictureElement", "FileReader", "MediaKeySession", "SpeechSynthesisUtterance", "SVGSymbolElement", "ReadableStream",  
      "SVGFEFloodElement", "HTMLFrameElement", "SVGDefsElement", "SVGAElement", "RTCStatsReport", "MediaRecorderErrorEvent",  
      "WebGLProgram", "TextEncoder", "MediaDevices", "SVGAngle", "PerformanceEventTiming", "PerformanceObserverEntryList",  
      "SVGAnimatedInteger", "SVGSVGElement", "Screen", "StyleSheet", "CSSFontFaceRule", "GainNode", "PeriodicWave", "VTTCue",  
      "SVGTextElement", "WebGLFramebuffer", "CanvasCaptureMediaStream", "Image", "DOMMatrixReadOnly", "RTCTrackEvent",  
      "HTMLUListElement", "ReadableStreamDefaultReader", "SVGImageElement", "HTMLFieldSetElement", "SVGFEFuncGElement",  
      "SubmitEvent", "SVGTextPathElement", "SVGUnitTypes", "ReadableByteStreamController", "OscillatorNode", "Path2D",  
      "PaintRequestList", "KeyframeEffect", "SharedWorker", "SVGFESpotLightElement", "HTMLOutputElement",  
      "PerformanceResourceTiming", "FileSystemDirectoryEntry", "CryptoKey", "DOMStringMap", "SVGGeometryElement",  
      "HTMLInputElement", "PopStateEvent", "HTMLAudioElement", "HTMLBRElement", "SVGSetElement", "SVGUseElement",  
      "BaseAudioContext", "MediaSession", "CSSSupportsRule", "DOMMatrix", "CSSPageRule", "AnimationTimeline", "Worker",  
      "GeolocationPosition", "RadioNodeList", "CSSImportRule", "WebGLShader", "SVGFETileElement", "HTMLMarqueeElement",  
      "URLSearchParams", "MediaStreamEvent", "SVGLength", "MimeType", "SVGFEFuncBElement", "SVGFEMergeElement", "Notification",  
      "HTMLFormControlsCollection", "ResizeObserver", "RTCIceCandidate", "XMLDocument", "Worklet", "MediaList",  
      "HTMLParagraphElement", "DOMPointReadOnly", "IDBFactory", "GamepadButton", "Navigator", "HTMLSelectElement",  
      "HTMLDivElement", "SourceBuffer", "XMLHttpRequest", "CustomEvent", "HTMLScriptElement", "BarProp", "SVGLengthList",  
      "SVGFEImageElement", "AudioDestinationNode", "BeforeUnloadEvent", "IDBCursor", "StorageManager", "HTMLAllCollection",  
      "MediaKeyError", "MediaError", "MutationRecord", "WebGLActiveInfo", "InputEvent", "MediaStream", "VisualViewport",  
      "HTMLAnchorElement", "mozRTCPeerConnection", "AudioBufferSourceNode", "SVGNumberList", "DataTransferItem",  
      "SVGFECompositeElement", "HTMLDataListElement", "SVGAnimatedNumberList", "PerformanceEntry", "SVGLinearGradientElement",  
      "PerformanceNavigation", "AudioBuffer", "WebGLTransformFeedback", "AudioNode", "ScreenOrientation", "Request",  
      "PerformanceObserver", "ClipboardEvent", "WebGLSampler", "SVGTextPositioningElement", "RTCRtpSender", "HTMLButtonElement",  
      "SVGStopElement", "MediaKeySystemAccess", "ConvolverNode", "PushSubscriptionOptions", "ReadableStreamBYOBRequest",  
      "StereoPannerNode", "HTMLDialogElement", "HTMLTableCellElement", "SVGAnimatedEnumeration", "HTMLStyleElement",  
      "SVGFESpecularLightingElement", "FontFace", "WebGL2RenderingContext", "MediaRecorder", "MathMLElement",  
      "FileSystemFileEntry", "VideoPlaybackQuality", "DataTransfer", "WebGLContextEvent", "Blob", "MediaCapabilities",  
      "ServiceWorker", "HTMLDataElement", "WritableStreamDefaultWriter", "AudioWorklet", "MutationEvent", "SVGAnimatedBoolean",  
      "SVGTransform", "TextDecoder", "HTMLModElement", "PerformanceMark", "HTMLVideoElement", "ErrorEvent", "IIRFilterNode",  
      "Cache", "ResizeObserverSize", "RTCRtpTransceiver", "WebGLUniformLocation", "ImageBitmap", "TransformStream",  
      "PointerEvent", "ShadowRoot", "GeolocationCoordinates", "DOMParser", "MediaStreamTrack", "NodeIterator",  
      "HTMLOptionElement", "NodeFilter", "MouseEvent", "FontFaceSetLoadEvent", "ScrollAreaEvent", "LockManager",  
      "SVGRectElement", "TextTrackCue", "SVGTextContentElement", "SVGFilterElement", "TimeEvent", "SVGAnimatedString",  
      "CredentialsContainer", "PopupBlockedEvent", "WaveShaperNode", "CSSRuleList", "OfflineAudioCompletionEvent",  
      "FileSystemEntry", "HTMLSpanElement", "SVGMetadataElement", "CSSKeyframeRule", "SVGCircleElement",  
      "WebGLShaderPrecisionFormat", "IntersectionObserverEntry", "URL", "CSSLayerStatementRule", "PerformanceNavigationTiming",  
      "SVGAnimatedNumber", "SVGGradientElement", "HTMLImageElement", "SVGPolylineElement", "SVGFEGaussianBlurElement",  
      "MimeTypeArray", "ReadableStreamBYOBReader", "MediaQueryListEvent", "CacheStorage", "CSSMozDocumentRule", "Headers",  
      "PaintRequest", "DOMImplementation", "HTMLPreElement", "HTMLBaseElement", "SVGFEDistantLightElement", "TransitionEvent",  
      "SVGElement", "CloseEvent", "RTCDataChannelEvent", "MediaQueryList", "GeolocationPositionError", "SVGStyleElement",  
      "CSSAnimation", "IDBVersionChangeEvent", "SVGPathElement", "NavigationPreloadManager", "SVGViewElement", "FormDataEvent",  
      "MediaStreamTrackAudioSourceNode", "MouseScrollEvent", "DeviceMotionEvent", "IDBObjectStore", "HTMLLIElement",  
      "HashChangeEvent", "mozRTCIceCandidate", "DOMRequest", "Range", "RTCDTMFToneChangeEvent", "HTMLEmbedElement", "Selection",  
      "HTMLIFrameElement", "SVGScriptElement", "Storage", "HTMLSlotElement", "WritableStreamDefaultController",  
      "RTCPeerConnectionIceEvent", "TextTrack", "BlobEvent", "HTMLSourceElement", "MediaKeyMessageEvent", "IDBIndex",  
      "webkitURL", "SVGGElement", "PerformanceServerTiming", "AnimationPlaybackEvent", "HTMLLabelElement", "RTCDtlsTransport",  
      "SVGFEMorphologyElement", "ChannelSplitterNode", "SVGTSpanElement", "MediaMetadata", "SVGPatternElement",  
      "CSSNamespaceRule", "HTMLQuoteElement", "HTMLTrackElement", "ServiceWorkerContainer", "MediaCapabilitiesInfo",  
      "FocusEvent", "ValidityState", "ByteLengthQueuingStrategy", "SVGPreserveAspectRatio", "SVGRect", "OfflineResourceList",  
      "XMLSerializer", "HTMLMeterElement", "TreeWalker", "SourceBufferList", "CountQueuingStrategy",  
      "SecurityPolicyViolationEvent", "AudioContext", "PerformanceMeasure", "HTMLHeadingElement", "CompositionEvent",  
      "ResizeObserverEntry", "Audio", "TextMetrics", "U2F", "MessageChannel", "History", "IntersectionObserver", "Plugin",  
      "DOMStringList", "HTMLOptGroupElement", "PublicKeyCredential", "XPathResult", "Lock", "RTCDataChannel", "Response",  
      "DOMException", "DelayNode", "TextTrackCueList", "AnimationEvent", "MediaStreamAudioDestinationNode", "HTMLTableElement",  
      "CaretPosition", "IDBTransaction", "DynamicsCompressorNode", "SVGAnimatedTransformList", "SVGFEDiffuseLightingElement",  
      "HTMLUnknownElement", "IDBDatabase", "CanvasGradient", "SVGFEColorMatrixElement", "SVGMatrix", "AudioListener",  
      "SVGAnimatedLength", "HTMLFormElement", "SVGFEMergeNodeElement", "AbortController", "RTCPeerConnection", "AnimationEffect",  
      "Permissions", "CanvasRenderingContext2D", "SVGLineElement", "MediaStreamAudioSourceNode", "CSSKeyframesRule", "Directory",  
      "WebGLRenderbuffer", "MediaKeys", "WebGLTexture", "SVGMPathElement", "WritableStream", "CSSGroupingRule",  
      "BroadcastChannel", "StorageEvent", "HTMLMediaElement", "SubtleCrypto", "AuthenticatorAssertionResponse",  
      "HTMLTableSectionElement", "SVGMaskElement", "File", "CSSStyleSheet", "AnalyserNode", "SVGStringList",  
      "SVGAnimateMotionElement", "SVGAnimateTransformElement", "SVGEllipseElement", "Crypto", "HTMLHRElement",  
      "MediaStreamTrackEvent", "Credential", "FontFaceSet", "SVGPointList", "XPathExpression", "IDBRequest", "DragEvent",  
      "IDBOpenDBRequest", "KeyEvent", "WebGLBuffer", "SVGFEDisplacementMapElement", "DeviceOrientationEvent",  
      "AuthenticatorResponse", "OfflineAudioContext", "MediaElementAudioSourceNode", "HTMLTextAreaElement", "ImageData",  
      "SpeechSynthesisVoice", "GamepadEvent", "AudioParamMap", "MediaDeviceInfo", "CSSTransition", "CSSFontFeatureValuesRule",  
      "ChannelMergerNode", "AudioProcessingEvent", "HTMLProgressElement", "SVGGraphicsElement", "AudioScheduledSourceNode",  
      "WebKitCSSMatrix", "FileSystemDirectoryReader", "Gamepad", "Geolocation", "GamepadHapticActuator", "HTMLTableColElement",  
      "CSSRule", "SVGFETurbulenceElement", "PushSubscription", "RTCCertificate", "AudioParam", "HTMLMenuElement",  
      "ServiceWorkerRegistration", "SVGAnimatedAngle", "SVGClipPathElement", "TextTrackList", "ImageBitmapRenderingContext",  
      "GamepadPose", "WheelEvent", "HTMLParamElement", "HTMLOptionsCollection", "SVGAnimationElement",  
      "SpeechSynthesisErrorEvent", "HTMLOListElement", "SVGFEConvolveMatrixElement", "SVGFEFuncAElement", "HTMLCanvasElement",  
      "SpeechSynthesisEvent", "HTMLDListElement", "ProgressEvent", "HTMLDetailsElement", "HTMLTitleElement", "XPathEvaluator",  
      "SVGForeignObjectElement", "RTCDTMFSender", "SVGFEOffsetElement", "XSLTProcessor", "IDBKeyRange",  
      "ReadableStreamDefaultController", "WebGLSync", "mozRTCSessionDescription", "MediaEncryptedEvent",  
      "SVGFEComponentTransferElement", "AuthenticatorAttestationResponse", "RTCSessionDescription", "CDATASection",  
      "CSSStyleRule", "StaticRange", "HTMLLegendElement", "BiquadFilterNode", "PerformancePaintTiming", "SVGPoint",  
      "HTMLTimeElement", "HTMLFontElement", "DOMPoint", "DataTransferItemList", "DOMTokenList", "XMLHttpRequestUpload",  
      "ProcessingInstruction", "SVGTransformList", "AbortSignal", "SVGFEFuncRElement", "Option", "ConstantSourceNode",  
      "EventSource", "CSSCounterStyleRule", "TransformStreamDefaultController", "HTMLFrameSetElement", "HTMLTableRowElement",  
      "SVGPolygonElement", "XMLHttpRequestEventTarget", "HTMLLinkElement", "HTMLMapElement", "FileList", "HTMLObjectElement",  
      "HTMLTableCaptionElement", "FileSystem", "SVGAnimatedLengthList", "AbstractRange", "MediaSource", "PromiseRejectionEvent",  
      "TimeRanges", "PluginArray", "Animation", "WebGLQuery", "RTCRtpReceiver", "SVGRadialGradientElement", "SVGAnimateElement",  
      "MediaKeyStatusMap", "DocumentTimeline", "PushManager", "SVGNumber", "PannerNode", "ScriptProcessorNode", "MessageEvent",  
      "HTMLDirectoryElement", "WebSocket", "SVGAnimatedRect", "WebGLVertexArrayObject", "SVGTitleElement", "Clipboard",  
      "IDBCursorWithValue", "AudioWorkletNode", "SpeechSynthesis", "CSSLayerBlockRule", "WebGLRenderingContext", "FormData",  
      "SVGDescElement", "SVGFEBlendElement", "Function", "Object", "eval", "EventTarget", "Window", "close", "stop", "focus",  
      "blur", "open", "alert", "confirm", "prompt", "print", "postMessage", "captureEvents", "releaseEvents", "getSelection",  
      "getComputedStyle", "matchMedia", "moveTo", "moveBy", "resizeTo", "resizeBy", "scroll", "scrollTo", "scrollBy",  
      "getDefaultComputedStyle", "scrollByLines", "scrollByPages", "sizeToContent", "updateCommands", "find", "dump",  
      "setResizable", "requestIdleCallback", "cancelIdleCallback", "requestAnimationFrame", "cancelAnimationFrame",  
      "reportError", "btoa", "atob", "setTimeout", "clearTimeout", "setInterval", "clearInterval", "queueMicrotask",  
      "createImageBitmap", "structuredClone", "fetch", "self", "name", "history", "customElements", "locationbar", "menubar",  
      "personalbar", "scrollbars", "statusbar", "toolbar", "status", "closed", "event", "frames", "length", "opener", "parent",  
      "frameElement", "navigator", "clientInformation", "external", "applicationCache", "screen", "innerWidth", "innerHeight",  
      "scrollX", "pageXOffset", "scrollY", "pageYOffset", "screenLeft", "screenTop", "screenX", "screenY", "outerWidth",  
      "outerHeight", "performance", "mozInnerScreenX", "mozInnerScreenY", "devicePixelRatio", "scrollMaxX", "scrollMaxY",  
      "fullScreen", "ondevicemotion", "ondeviceorientation", "onabsolutedeviceorientation", "InstallTrigger", "visualViewport",  
      "crypto", "onabort", "onblur", "onfocus", "onauxclick", "onbeforeinput", "oncanplay", "oncanplaythrough", "onchange",  
      "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragexit",  
      "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onformdata", "oninput",  
      "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadend",  
      "onloadstart", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup",  
      "onwheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize", "onscroll",  
      "onsecuritypolicyviolation", "onseeked", "onseeking", "onselect", "onslotchange", "onstalled", "onsubmit", "onsuspend",  
      "ontimeupdate", "onvolumechange", "onwaiting", "onselectstart", "onselectionchange", "ontoggle", "onpointercancel",  
      "onpointerdown", "onpointerup", "onpointermove", "onpointerout", "onpointerover", "onpointerenter", "onpointerleave",  
      "ongotpointercapture", "onlostpointercapture", "onmozfullscreenchange", "onmozfullscreenerror", "onanimationcancel",  
      "onanimationend", "onanimationiteration", "onanimationstart", "ontransitioncancel", "ontransitionend", "ontransitionrun",  
      "ontransitionstart", "onwebkitanimationend", "onwebkitanimationiteration", "onwebkitanimationstart",  
      "onwebkittransitionend", "u2f", "onerror", "speechSynthesis", "onafterprint", "onbeforeprint", "onbeforeunload",  
      "onhashchange", "onlanguagechange", "onmessage", "onmessageerror", "onoffline", "ononline", "onpagehide", "onpageshow",  
      "onpopstate", "onrejectionhandled", "onstorage", "onunhandledrejection", "onunload", "ongamepadconnected",  
      "ongamepaddisconnected", "localStorage", "origin", "crossOriginIsolated", "isSecureContext", "indexedDB", "caches",  
      "sessionStorage", "window", "document", "location", "top", "netscape", "Node", "Document", "HTMLDocument", "EventCounts",  
      "Map", "Performance", "Event", "Element", "HTMLElement", "HTMLHeadElement", "NodeList", "HTMLMetaElement", "Promise",  
      "PageTransitionEvent", "IdleDeadline", "StyleSheetList", "NotifyPaintEvent", "DOMRectList", "Location", "UIEvent",  
      "KeyboardEvent", "PerformanceTiming", "console", "MutationObserver", "HTMLHtmlElement", "CustomElementRegistry", "CSS",  
      "HTMLBodyElement", "CSSStyleDeclaration", "CSS2Properties", "HTMLCollection", "CharacterData", "Text", "NamedNodeMap",  
      "Attr", "HTMLTemplateElement", "DocumentType", "DOMRectReadOnly", "DOMRect", "globalThis", "Error", "ReferenceError",  
      "Array"
    ]),
    common: new Set([
      "AbortController", "AbortSignal", "AbstractRange", "AggregateError", "AnalyserNode", "Animation", "AnimationEffect",  
      "AnimationEvent", "AnimationPlaybackEvent", "AnimationTimeline", "Array", "ArrayBuffer", "Attr", "Audio", "AudioBuffer",  
      "AudioBufferSourceNode", "AudioContext", "AudioDestinationNode", "AudioListener", "AudioNode", "AudioParam",  
      "AudioParamMap", "AudioProcessingEvent", "AudioScheduledSourceNode", "AudioWorklet", "AudioWorkletNode",  
      "AuthenticatorAssertionResponse", "AuthenticatorAttestationResponse", "AuthenticatorResponse", "BarProp",  
      "BaseAudioContext", "BeforeUnloadEvent", "BigInt", "BigInt64Array", "BigUint64Array", "BiquadFilterNode", "Blob",  
      "BlobEvent", "Boolean", "BroadcastChannel", "ByteLengthQueuingStrategy", "CDATASection", "CSS", "CSSAnimation",  
      "CSSConditionRule", "CSSFontFaceRule", "CSSGroupingRule", "CSSImportRule", "CSSKeyframeRule", "CSSKeyframesRule",  
      "CSSLayerBlockRule", "CSSLayerStatementRule", "CSSMediaRule", "CSSNamespaceRule", "CSSPageRule", "CSSRule", "CSSRuleList",  
      "CSSStyleDeclaration", "CSSStyleRule", "CSSStyleSheet", "CSSSupportsRule", "CSSTransition", "Cache", "CacheStorage",  
      "CanvasGradient", "CanvasPattern", "CanvasRenderingContext2D", "ChannelMergerNode", "ChannelSplitterNode", "CharacterData",  
      "Clipboard", "ClipboardEvent", "CloseEvent", "Comment", "CompositionEvent", "ConstantSourceNode", "ConvolverNode",  
      "CountQueuingStrategy", "Credential", "CredentialsContainer", "Crypto", "CryptoKey", "CustomElementRegistry",  
      "CustomEvent", "DOMException", "DOMImplementation", "DOMMatrix", "DOMMatrixReadOnly", "DOMParser", "DOMPoint",  
      "DOMPointReadOnly", "DOMQuad", "DOMRect", "DOMRectList", "DOMRectReadOnly", "DOMStringList", "DOMStringMap",  
      "DOMTokenList", "DataTransfer", "DataTransferItem", "DataTransferItemList", "DataView", "Date", "DelayNode", "Document",  
      "DocumentFragment", "DocumentTimeline", "DocumentType", "DragEvent", "DynamicsCompressorNode", "Element", "Error",  
      "ErrorEvent", "EvalError", "Event", "EventSource", "EventTarget", "File", "FileList", "FileReader", "FinalizationRegistry",  
      "Float32Array", "Float64Array", "FocusEvent", "FontFace", "FormData", "FormDataEvent", "Function", "GainNode", "Gamepad",  
      "GamepadButton", "GamepadEvent", "Geolocation", "GeolocationCoordinates", "GeolocationPosition",  
      "GeolocationPositionError", "HTMLAllCollection", "HTMLAnchorElement", "HTMLAreaElement", "HTMLAudioElement",  
      "HTMLBRElement", "HTMLBaseElement", "HTMLBodyElement", "HTMLButtonElement", "HTMLCanvasElement", "HTMLCollection",  
      "HTMLDListElement", "HTMLDataElement", "HTMLDataListElement", "HTMLDetailsElement", "HTMLDialogElement",  
      "HTMLDirectoryElement", "HTMLDivElement", "HTMLDocument", "HTMLElement", "HTMLEmbedElement", "HTMLFieldSetElement",  
      "HTMLFontElement", "HTMLFormControlsCollection", "HTMLFormElement", "HTMLFrameElement", "HTMLFrameSetElement",  
      "HTMLHRElement", "HTMLHeadElement", "HTMLHeadingElement", "HTMLHtmlElement", "HTMLIFrameElement", "HTMLImageElement",  
      "HTMLInputElement", "HTMLLIElement", "HTMLLabelElement", "HTMLLegendElement", "HTMLLinkElement", "HTMLMapElement",  
      "HTMLMarqueeElement", "HTMLMediaElement", "HTMLMenuElement", "HTMLMetaElement", "HTMLMeterElement", "HTMLModElement",  
      "HTMLOListElement", "HTMLObjectElement", "HTMLOptGroupElement", "HTMLOptionElement", "HTMLOptionsCollection",  
      "HTMLOutputElement", "HTMLParagraphElement", "HTMLParamElement", "HTMLPictureElement", "HTMLPreElement",  
      "HTMLProgressElement", "HTMLQuoteElement", "HTMLScriptElement", "HTMLSelectElement", "HTMLSlotElement",  
      "HTMLSourceElement", "HTMLSpanElement", "HTMLStyleElement", "HTMLTableCaptionElement", "HTMLTableCellElement",  
      "HTMLTableColElement", "HTMLTableElement", "HTMLTableRowElement", "HTMLTableSectionElement", "HTMLTemplateElement",  
      "HTMLTextAreaElement", "HTMLTimeElement", "HTMLTitleElement", "HTMLTrackElement", "HTMLUListElement", "HTMLUnknownElement",  
      "HTMLVideoElement", "HashChangeEvent", "Headers", "History", "IDBCursor", "IDBCursorWithValue", "IDBDatabase",  
      "IDBFactory", "IDBIndex", "IDBKeyRange", "IDBObjectStore", "IDBOpenDBRequest", "IDBRequest", "IDBTransaction",  
      "IDBVersionChangeEvent", "IIRFilterNode", "Image", "ImageBitmap", "ImageBitmapRenderingContext", "ImageData", "Infinity",  
      "InputEvent", "Int16Array", "Int32Array", "Int8Array", "IntersectionObserver", "IntersectionObserverEntry", "Intl", "JSON",  
      "KeyboardEvent", "KeyframeEffect", "Location", "Lock", "LockManager", "Map", "Math", "MediaCapabilities",  
      "MediaDeviceInfo", "MediaDevices", "MediaElementAudioSourceNode", "MediaEncryptedEvent", "MediaError",  
      "MediaKeyMessageEvent", "MediaKeySession", "MediaKeyStatusMap", "MediaKeySystemAccess", "MediaKeys", "MediaList",  
      "MediaMetadata", "MediaQueryList", "MediaQueryListEvent", "MediaRecorder", "MediaSession", "MediaSource", "MediaStream",  
      "MediaStreamAudioDestinationNode", "MediaStreamAudioSourceNode", "MediaStreamTrack", "MediaStreamTrackEvent",  
      "MessageChannel", "MessageEvent", "MessagePort", "MimeType", "MimeTypeArray", "MouseEvent", "MutationEvent",  
      "MutationObserver", "MutationRecord", "NaN", "NamedNodeMap", "NavigationPreloadManager", "Navigator", "Node", "NodeFilter",  
      "NodeIterator", "NodeList", "Notification", "Number", "Object", "OfflineAudioCompletionEvent", "OfflineAudioContext",  
      "Option", "OscillatorNode", "PageTransitionEvent", "PannerNode", "Path2D", "Performance", "PerformanceEntry",  
      "PerformanceMark", "PerformanceMeasure", "PerformanceNavigation", "PerformanceNavigationTiming", "PerformanceObserver",  
      "PerformanceObserverEntryList", "PerformancePaintTiming", "PerformanceResourceTiming", "PerformanceTiming", "PeriodicWave",  
      "PermissionStatus", "Permissions", "Plugin", "PluginArray", "PointerEvent", "PopStateEvent", "ProcessingInstruction",  
      "ProgressEvent", "Promise", "PromiseRejectionEvent", "Proxy", "PublicKeyCredential", "PushManager", "PushSubscription",  
      "PushSubscriptionOptions", "RTCCertificate", "RTCDTMFSender", "RTCDTMFToneChangeEvent", "RTCDataChannel",  
      "RTCDataChannelEvent", "RTCDtlsTransport", "RTCIceCandidate", "RTCPeerConnection", "RTCPeerConnectionIceEvent",  
      "RTCRtpReceiver", "RTCRtpSender", "RTCRtpTransceiver", "RTCSessionDescription", "RTCStatsReport", "RTCTrackEvent",  
      "RadioNodeList", "Range", "RangeError", "ReadableStream", "ReferenceError", "Reflect", "RegExp", "Request",  
      "ResizeObserver", "ResizeObserverEntry", "ResizeObserverSize", "Response", "SVGAElement", "SVGAngle", "SVGAnimateElement",  
      "SVGAnimateMotionElement", "SVGAnimateTransformElement", "SVGAnimatedAngle", "SVGAnimatedBoolean",  
      "SVGAnimatedEnumeration", "SVGAnimatedInteger", "SVGAnimatedLength", "SVGAnimatedLengthList", "SVGAnimatedNumber",  
      "SVGAnimatedNumberList", "SVGAnimatedPreserveAspectRatio", "SVGAnimatedRect", "SVGAnimatedString",  
      "SVGAnimatedTransformList", "SVGAnimationElement", "SVGCircleElement", "SVGClipPathElement", "SVGComponentTransferFunctionElement", 
      "SVGDefsElement", "SVGDescElement", "SVGElement", "SVGEllipseElement", "SVGFEBlendElement", "SVGFEColorMatrixElement",  
      "SVGFEComponentTransferElement", "SVGFECompositeElement", "SVGFEConvolveMatrixElement", "SVGFEDiffuseLightingElement",  
      "SVGFEDisplacementMapElement", "SVGFEDistantLightElement", "SVGFEDropShadowElement", "SVGFEFloodElement",  
      "SVGFEFuncAElement", "SVGFEFuncBElement", "SVGFEFuncGElement", "SVGFEFuncRElement", "SVGFEGaussianBlurElement",  
      "SVGFEImageElement", "SVGFEMergeElement", "SVGFEMergeNodeElement", "SVGFEMorphologyElement", "SVGFEOffsetElement",  
      "SVGFEPointLightElement", "SVGFESpecularLightingElement", "SVGFESpotLightElement", "SVGFETileElement",  
      "SVGFETurbulenceElement", "SVGFilterElement", "SVGForeignObjectElement", "SVGGElement", "SVGGeometryElement",  
      "SVGGradientElement", "SVGGraphicsElement", "SVGImageElement", "SVGLength", "SVGLengthList", "SVGLineElement",  
      "SVGLinearGradientElement", "SVGMPathElement", "SVGMarkerElement", "SVGMaskElement", "SVGMatrix", "SVGMetadataElement",  
      "SVGNumber", "SVGNumberList", "SVGPathElement", "SVGPatternElement", "SVGPoint", "SVGPointList", "SVGPolygonElement",  
      "SVGPolylineElement", "SVGPreserveAspectRatio", "SVGRadialGradientElement", "SVGRect", "SVGRectElement", "SVGSVGElement",  
      "SVGScriptElement", "SVGSetElement", "SVGStopElement", "SVGStringList", "SVGStyleElement", "SVGSwitchElement",  
      "SVGSymbolElement", "SVGTSpanElement", "SVGTextContentElement", "SVGTextElement", "SVGTextPathElement",  
      "SVGTextPositioningElement", "SVGTitleElement", "SVGTransform", "SVGTransformList", "SVGUnitTypes", "SVGUseElement",  
      "SVGViewElement", "Screen", "ScriptProcessorNode", "SecurityPolicyViolationEvent", "Selection", "ServiceWorker",  
      "ServiceWorkerContainer", "ServiceWorkerRegistration", "Set", "ShadowRoot", "SharedWorker", "SourceBuffer",  
      "SourceBufferList", "SpeechSynthesisErrorEvent", "SpeechSynthesisEvent", "SpeechSynthesisUtterance", "StaticRange",  
      "StereoPannerNode", "Storage", "StorageEvent", "StorageManager", "String", "StyleSheet", "StyleSheetList", "SubmitEvent",  
      "SubtleCrypto", "Symbol", "SyntaxError", "Text", "TextDecoder", "TextEncoder", "TextMetrics", "TextTrack", "TextTrackCue",  
      "TextTrackCueList", "TextTrackList", "TimeRanges", "TrackEvent", "TransformStream", "TransformStreamDefaultController",  
      "TransitionEvent", "TreeWalker", "TypeError", "UIEvent", "URIError", "URL", "URLSearchParams", "Uint16Array",  
      "Uint32Array", "Uint8Array", "Uint8ClampedArray", "VTTCue", "ValidityState", "VisualViewport", "WaveShaperNode", "WeakMap",  
      "WeakRef", "WeakSet", "WebAssembly", "WebGL2RenderingContext", "WebGLActiveInfo", "WebGLBuffer", "WebGLContextEvent",  
      "WebGLFramebuffer", "WebGLProgram", "WebGLQuery", "WebGLRenderbuffer", "WebGLRenderingContext", "WebGLSampler",  
      "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLSync", "WebGLTexture", "WebGLTransformFeedback", "WebGLUniformLocation",  
      "WebGLVertexArrayObject", "WebKitCSSMatrix", "WebSocket", "WheelEvent", "Window", "Worker", "Worklet", "WritableStream",  
      "WritableStreamDefaultController", "WritableStreamDefaultWriter", "XMLDocument", "XMLHttpRequest",  
      "XMLHttpRequestEventTarget", "XMLHttpRequestUpload", "XMLSerializer", "XPathEvaluator", "XPathExpression", "XPathResult",  
      "XSLTProcessor", "alert", "atob", "blur", "btoa", "caches", "cancelAnimationFrame", "captureEvents", "clearInterval",  
      "clearTimeout", "clientInformation", "close", "closed", "confirm", "console", "createImageBitmap", "crossOriginIsolated",  
      "crypto", "customElements", "decodeURI", "decodeURIComponent", "devicePixelRatio", "document", "encodeURI",  
      "encodeURIComponent", "escape", "eval", "event", "fetch", "find", "focus", "frameElement", "frames", "getComputedStyle",  
      "getSelection", "globalThis", "history", "indexedDB", "innerHeight", "innerWidth", "isFinite", "isNaN", "isSecureContext",  
      "length", "localStorage", "location", "locationbar", "matchMedia", "menubar", "moveBy", "moveTo", "name", "navigator",  
      "onabort", "onafterprint", "onanimationend", "onanimationiteration", "onanimationstart", "onbeforeprint", "onbeforeunload",  
      "onblur", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick",  
      "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange",  
      "onemptied", "onended", "onerror", "onfocus", "onformdata", "ongotpointercapture", "onhashchange", "oninput", "oninvalid",  
      "onkeydown", "onkeypress", "onkeyup", "onlanguagechange", "onload", "onloadeddata", "onloadedmetadata", "onloadstart",  
      "onlostpointercapture", "onmessage", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout",  
      "onmouseover", "onmouseup", "onoffline", "ononline", "onpagehide", "onpageshow", "onpause", "onplay", "onplaying",  
      "onpointercancel", "onpointerdown", "onpointerenter", "onpointerleave", "onpointermove", "onpointerout", "onpointerover",  
      "onpointerup", "onpopstate", "onprogress", "onratechange", "onrejectionhandled", "onreset", "onresize", "onscroll",  
      "onsecuritypolicyviolation", "onseeked", "onseeking", "onselect", "onselectionchange", "onselectstart", "onslotchange",  
      "onstalled", "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "ontransitioncancel", "ontransitionend",  
      "ontransitionrun", "ontransitionstart", "onunhandledrejection", "onunload", "onvolumechange", "onwaiting",  
      "onwebkitanimationend", "onwebkitanimationiteration", "onwebkitanimationstart", "onwebkittransitionend", "onwheel", "open",  
      "opener", "origin", "outerHeight", "outerWidth", "pageXOffset", "pageYOffset", "parent", "parseFloat", "parseInt",  
      "performance", "personalbar", "postMessage", "print", "prompt", "queueMicrotask", "releaseEvents", "reportError",  
      "requestAnimationFrame", "resizeBy", "resizeTo", "screen", "screenLeft", "screenTop", "screenX", "screenY", "scroll",  
      "scrollBy", "scrollTo", "scrollX", "scrollY", "scrollbars", "self", "sessionStorage", "setInterval", "setTimeout",  
      "speechSynthesis", "status", "statusbar", "stop", "structuredClone", "toolbar", "top", "undefined", "unescape",  
      "visualViewport", "webkitURL", "window"
    ]),
    chrome_additions: new Set([
      "$", "$$", "$0", "$1", "$2", "$3", "$4", "$_", "$x", "AbsoluteOrientationSensor", "Accelerometer", "AudioData",  
      "AudioDecoder", "AudioEncoder", "BackgroundFetchManager", "BackgroundFetchRecord", "BackgroundFetchRegistration",  
      "BarcodeDetector", "BatteryManager", "BeforeInstallPromptEvent", "Bluetooth", "BluetoothCharacteristicProperties",  
      "BluetoothDevice", "BluetoothRemoteGATTCharacteristic", "BluetoothRemoteGATTDescriptor", "BluetoothRemoteGATTServer",  
      "BluetoothRemoteGATTService", "BluetoothUUID", "BrowserCaptureMediaStreamTrack", "CSSImageValue", "CSSKeywordValue",  
      "CSSMathClamp", "CSSMathInvert", "CSSMathMax", "CSSMathMin", "CSSMathNegate", "CSSMathProduct", "CSSMathSum",  
      "CSSMathValue", "CSSMatrixComponent", "CSSNumericArray", "CSSNumericValue", "CSSPerspective", "CSSPositionValue",  
      "CSSPropertyRule", "CSSRotate", "CSSScale", "CSSSkew", "CSSSkewX", "CSSSkewY", "CSSStyleValue", "CSSTransformComponent",  
      "CSSTransformValue", "CSSTranslate", "CSSUnitValue", "CSSUnparsedValue", "CSSVariableReferenceValue", "CanvasFilter",  
      "CompressionStream", "CookieChangeEvent", "CookieStore", "CookieStoreManager", "CropTarget", "CustomStateSet", "DOMError",  
      "DecompressionStream", "DelegatedInkTrailPresenter", "DeviceMotionEventAcceleration", "DeviceMotionEventRotationRate",  
      "EncodedAudioChunk", "EncodedVideoChunk", "External", "EyeDropper", "FeaturePolicy", "FederatedCredential",  
      "FileSystemWritableFileStream", "FontData", "FragmentDirective", "GravitySensor", "Gyroscope", "HID", "HIDConnectionEvent",  
      "HIDDevice", "HIDInputReportEvent", "Highlight", "HighlightRegistry", "IdleDetector", "ImageCapture", "ImageDecoder",  
      "ImageTrack", "ImageTrackList", "Ink", "InputDeviceCapabilities", "InputDeviceInfo", "Keyboard", "KeyboardLayoutMap",  
      "LargestContentfulPaint", "LaunchParams", "LaunchQueue", "LayoutShift", "LayoutShiftAttribution",  
      "LinearAccelerationSensor", "MIDIAccess", "MIDIConnectionEvent", "MIDIInput", "MIDIInputMap", "MIDIMessageEvent",  
      "MIDIOutput", "MIDIOutputMap", "MIDIPort", "MediaStreamTrackGenerator", "MediaStreamTrackProcessor", "NavigateEvent",  
      "Navigation", "NavigationCurrentEntryChangeEvent", "NavigationDestination", "NavigationHistoryEntry",  
      "NavigationTransition", "NavigatorManagedData", "NavigatorUAData", "NetworkInformation", "OTPCredential",  
      "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "OrientationSensor", "PasswordCredential", "PaymentInstruments",  
      "PaymentManager", "PerformanceElementTiming", "PerformanceLongTaskTiming", "PeriodicSyncManager", "Presentation",  
      "PresentationAvailability", "PresentationConnection", "PresentationConnectionAvailableEvent",  
      "PresentationConnectionCloseEvent", "PresentationConnectionList", "PresentationReceiver", "PresentationRequest",  
      "Profiler", "RTCEncodedAudioFrame", "RTCEncodedVideoFrame", "RelativeOrientationSensor", "ReportingObserver", "Sanitizer",  
      "Scheduler", "Scheduling", "ScreenDetailed", "ScreenDetails", "Sensor", "SensorErrorEvent", "Serial", "SerialPort",  
      "StylePropertyMap", "StylePropertyMapReadOnly", "SyncManager", "TaskAttributionTiming", "TaskController",  
      "TaskPriorityChangeEvent", "TaskSignal", "Touch", "TouchEvent", "TouchList", "TrustedHTML", "TrustedScript",  
      "TrustedScriptURL", "TrustedTypePolicy", "TrustedTypePolicyFactory", "URLPattern", "USB", "USBAlternateInterface",  
      "USBConfiguration", "USBConnectionEvent", "USBDevice", "USBEndpoint", "USBInTransferResult", "USBInterface",  
      "USBIsochronousInTransferPacket", "USBIsochronousInTransferResult", "USBIsochronousOutTransferPacket",  
      "USBIsochronousOutTransferResult", "USBOutTransferResult", "UserActivation", "VideoDecoder", "VideoEncoder", "VideoFrame",  
      "VirtualKeyboard", "VirtualKeyboardGeometryChangeEvent", "WakeLock", "WakeLockSentinel", "WebTransport",  
      "WebTransportBidirectionalStream", "WebTransportDatagramDuplexStream", "WebTransportError", "WindowControlsOverlay",  
      "WindowControlsOverlayGeometryChangeEvent", "XRAnchor", "XRAnchorSet", "XRBoundedReferenceSpace", "XRCPUDepthInformation",  
      "XRCamera", "XRDOMOverlayState", "XRDepthInformation", "XRFrame", "XRHitTestResult", "XRHitTestSource", "XRInputSource",  
      "XRInputSourceArray", "XRInputSourceEvent", "XRInputSourcesChangeEvent", "XRLayer", "XRLightEstimate", "XRLightProbe",  
      "XRPose", "XRRay", "XRReferenceSpace", "XRReferenceSpaceEvent", "XRRenderState", "XRRigidTransform", "XRSession",  
      "XRSessionEvent", "XRSpace", "XRSystem", "XRTransientInputHitTestResult", "XRTransientInputHitTestSource", "XRView",  
      "XRViewerPose", "XRViewport", "XRWebGLBinding", "XRWebGLDepthInformation", "XRWebGLLayer", "chrome", "clear",  
      "cookieStore", "copy", "debug", "dir", "dirxml", "getAccessibleName", "getAccessibleRole", "getEventListeners",  
      "getScreenDetails", "inspect", "keys", "launchQueue", "monitor", "monitorEvents", "navigation", "onappinstalled",  
      "onbeforeinstallprompt", "onbeforematch", "onbeforexrselect", "oncontextlost", "oncontextrestored",  
      "ondeviceorientationabsolute", "onpointerrawupdate", "originAgentCluster", "profile", "profileEnd", "queryLocalFonts",  
      "queryObjects", "scheduler", "showDirectoryPicker", "showOpenFilePicker", "showSaveFilePicker", "table", "trustedTypes",  
      "undebug", "unmonitor", "unmonitorEvents", "values", "webkitMediaStream", "webkitRTCPeerConnection",  
      "webkitRequestFileSystem", "webkitResolveLocalFileSystemURL", "webkitSpeechGrammar", "webkitSpeechGrammarList",  
      "webkitSpeechRecognitionError", "webkitSpeechRecognitionEvent", "webkitStorageInfo"
    ]),
    safari_additions: new Set([
      "$", "$$", "$0", "$1", "$2", "$3", "$4", "$_", "$x", "AbsoluteOrientationSensor", "Accelerometer", "AudioData",  
      "AudioDecoder", "AudioEncoder", "BackgroundFetchManager", "BackgroundFetchRecord", "BackgroundFetchRegistration",  
      "BarcodeDetector", "BatteryManager", "BeforeInstallPromptEvent", "Bluetooth", "BluetoothCharacteristicProperties",  
      "BluetoothDevice", "BluetoothRemoteGATTCharacteristic", "BluetoothRemoteGATTDescriptor", "BluetoothRemoteGATTServer",  
      "BluetoothRemoteGATTService", "BluetoothUUID", "BrowserCaptureMediaStreamTrack", "CSSImageValue", "CSSKeywordValue",  
      "CSSMathClamp", "CSSMathInvert", "CSSMathMax", "CSSMathMin", "CSSMathNegate", "CSSMathProduct", "CSSMathSum",  
      "CSSMathValue", "CSSMatrixComponent", "CSSNumericArray", "CSSNumericValue", "CSSPerspective", "CSSPositionValue",  
      "CSSPropertyRule", "CSSRotate", "CSSScale", "CSSSkew", "CSSSkewX", "CSSSkewY", "CSSStyleValue", "CSSTransformComponent",  
      "CSSTransformValue", "CSSTranslate", "CSSUnitValue", "CSSUnparsedValue", "CSSVariableReferenceValue", "CanvasFilter",  
      "CompressionStream", "CookieChangeEvent", "CookieStore", "CookieStoreManager", "CropTarget", "CustomStateSet", "DOMError",  
      "DecompressionStream", "DelegatedInkTrailPresenter", "DeviceMotionEventAcceleration", "DeviceMotionEventRotationRate",  
      "EncodedAudioChunk", "EncodedVideoChunk", "External", "EyeDropper", "FeaturePolicy", "FederatedCredential",  
      "FileSystemWritableFileStream", "FontData", "FragmentDirective", "GravitySensor", "Gyroscope", "HID", "HIDConnectionEvent",  
      "HIDDevice", "HIDInputReportEvent", "Highlight", "HighlightRegistry", "IdleDetector", "ImageCapture", "ImageDecoder",  
      "ImageTrack", "ImageTrackList", "Ink", "InputDeviceCapabilities", "InputDeviceInfo", "Keyboard", "KeyboardLayoutMap",  
      "LargestContentfulPaint", "LaunchParams", "LaunchQueue", "LayoutShift", "LayoutShiftAttribution",  
      "LinearAccelerationSensor", "MIDIAccess", "MIDIConnectionEvent", "MIDIInput", "MIDIInputMap", "MIDIMessageEvent",  
      "MIDIOutput", "MIDIOutputMap", "MIDIPort", "MediaStreamTrackGenerator", "MediaStreamTrackProcessor", "NavigateEvent",  
      "Navigation", "NavigationCurrentEntryChangeEvent", "NavigationDestination", "NavigationHistoryEntry",  
      "NavigationTransition", "NavigatorManagedData", "NavigatorUAData", "NetworkInformation", "OTPCredential",  
      "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "OrientationSensor", "PasswordCredential", "PaymentInstruments",  
      "PaymentManager", "PerformanceElementTiming", "PerformanceLongTaskTiming", "PeriodicSyncManager", "Presentation",  
      "PresentationAvailability", "PresentationConnection", "PresentationConnectionAvailableEvent",  
      "PresentationConnectionCloseEvent", "PresentationConnectionList", "PresentationReceiver", "PresentationRequest",  
      "Profiler", "RTCEncodedAudioFrame", "RTCEncodedVideoFrame", "RelativeOrientationSensor", "ReportingObserver", "Sanitizer",  
      "Scheduler", "Scheduling", "ScreenDetailed", "ScreenDetails", "Sensor", "SensorErrorEvent", "Serial", "SerialPort",  
      "StylePropertyMap", "StylePropertyMapReadOnly", "SyncManager", "TaskAttributionTiming", "TaskController",  
      "TaskPriorityChangeEvent", "TaskSignal", "Touch", "TouchEvent", "TouchList", "TrustedHTML", "TrustedScript",  
      "TrustedScriptURL", "TrustedTypePolicy", "TrustedTypePolicyFactory", "URLPattern", "USB", "USBAlternateInterface",  
      "USBConfiguration", "USBConnectionEvent", "USBDevice", "USBEndpoint", "USBInTransferResult", "USBInterface",  
      "USBIsochronousInTransferPacket", "USBIsochronousInTransferResult", "USBIsochronousOutTransferPacket",  
      "USBIsochronousOutTransferResult", "USBOutTransferResult", "UserActivation", "VideoDecoder", "VideoEncoder", "VideoFrame",  
      "VirtualKeyboard", "VirtualKeyboardGeometryChangeEvent", "WakeLock", "WakeLockSentinel", "WebTransport",  
      "WebTransportBidirectionalStream", "WebTransportDatagramDuplexStream", "WebTransportError", "WindowControlsOverlay",  
      "WindowControlsOverlayGeometryChangeEvent", "XRAnchor", "XRAnchorSet", "XRBoundedReferenceSpace", "XRCPUDepthInformation",  
      "XRCamera", "XRDOMOverlayState", "XRDepthInformation", "XRFrame", "XRHitTestResult", "XRHitTestSource", "XRInputSource",  
      "XRInputSourceArray", "XRInputSourceEvent", "XRInputSourcesChangeEvent", "XRLayer", "XRLightEstimate", "XRLightProbe",  
      "XRPose", "XRRay", "XRReferenceSpace", "XRReferenceSpaceEvent", "XRRenderState", "XRRigidTransform", "XRSession",  
      "XRSessionEvent", "XRSpace", "XRSystem", "XRTransientInputHitTestResult", "XRTransientInputHitTestSource", "XRView",  
      "XRViewerPose", "XRViewport", "XRWebGLBinding", "XRWebGLDepthInformation", "XRWebGLLayer", "chrome", "clear",  
      "cookieStore", "copy", "debug", "dir", "dirxml", "getAccessibleName", "getAccessibleRole", "getEventListeners",  
      "getScreenDetails", "inspect", "keys", "launchQueue", "monitor", "monitorEvents", "navigation", "onappinstalled",  
      "onbeforeinstallprompt", "onbeforematch", "onbeforexrselect", "oncontextlost", "oncontextrestored",  
      "ondeviceorientationabsolute", "onpointerrawupdate", "originAgentCluster", "profile", "profileEnd", "queryLocalFonts",  
      "queryObjects", "scheduler", "showDirectoryPicker", "showOpenFilePicker", "showSaveFilePicker", "table", "trustedTypes",  
      "undebug", "unmonitor", "unmonitorEvents", "values", "webkitMediaStream", "webkitRTCPeerConnection",  
      "webkitRequestFileSystem", "webkitResolveLocalFileSystemURL", "webkitSpeechGrammar", "webkitSpeechGrammarList",  
      "webkitSpeechRecognitionError", "webkitSpeechRecognitionEvent", "webkitStorageInfo"
    ]),
    firefox_additions: new Set([
      "$", "$$", "$0", "$1", "$2", "$3", "$4", "$_", "$x", "AbsoluteOrientationSensor", "Accelerometer", "AudioData",  
      "AudioDecoder", "AudioEncoder", "BackgroundFetchManager", "BackgroundFetchRecord", "BackgroundFetchRegistration",  
      "BarcodeDetector", "BatteryManager", "BeforeInstallPromptEvent", "Bluetooth", "BluetoothCharacteristicProperties",  
      "BluetoothDevice", "BluetoothRemoteGATTCharacteristic", "BluetoothRemoteGATTDescriptor", "BluetoothRemoteGATTServer",  
      "BluetoothRemoteGATTService", "BluetoothUUID", "BrowserCaptureMediaStreamTrack", "CSSImageValue", "CSSKeywordValue",  
      "CSSMathClamp", "CSSMathInvert", "CSSMathMax", "CSSMathMin", "CSSMathNegate", "CSSMathProduct", "CSSMathSum",  
      "CSSMathValue", "CSSMatrixComponent", "CSSNumericArray", "CSSNumericValue", "CSSPerspective", "CSSPositionValue",  
      "CSSPropertyRule", "CSSRotate", "CSSScale", "CSSSkew", "CSSSkewX", "CSSSkewY", "CSSStyleValue", "CSSTransformComponent",  
      "CSSTransformValue", "CSSTranslate", "CSSUnitValue", "CSSUnparsedValue", "CSSVariableReferenceValue", "CanvasFilter",  
      "CompressionStream", "CookieChangeEvent", "CookieStore", "CookieStoreManager", "CropTarget", "CustomStateSet", "DOMError",  
      "DecompressionStream", "DelegatedInkTrailPresenter", "DeviceMotionEventAcceleration", "DeviceMotionEventRotationRate",  
      "EncodedAudioChunk", "EncodedVideoChunk", "External", "EyeDropper", "FeaturePolicy", "FederatedCredential",  
      "FileSystemWritableFileStream", "FontData", "FragmentDirective", "GravitySensor", "Gyroscope", "HID", "HIDConnectionEvent",  
      "HIDDevice", "HIDInputReportEvent", "Highlight", "HighlightRegistry", "IdleDetector", "ImageCapture", "ImageDecoder",  
      "ImageTrack", "ImageTrackList", "Ink", "InputDeviceCapabilities", "InputDeviceInfo", "Keyboard", "KeyboardLayoutMap",  
      "LargestContentfulPaint", "LaunchParams", "LaunchQueue", "LayoutShift", "LayoutShiftAttribution",  
      "LinearAccelerationSensor", "MIDIAccess", "MIDIConnectionEvent", "MIDIInput", "MIDIInputMap", "MIDIMessageEvent",  
      "MIDIOutput", "MIDIOutputMap", "MIDIPort", "MediaStreamTrackGenerator", "MediaStreamTrackProcessor", "NavigateEvent",  
      "Navigation", "NavigationCurrentEntryChangeEvent", "NavigationDestination", "NavigationHistoryEntry",  
      "NavigationTransition", "NavigatorManagedData", "NavigatorUAData", "NetworkInformation", "OTPCredential",  
      "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "OrientationSensor", "PasswordCredential", "PaymentInstruments",  
      "PaymentManager", "PerformanceElementTiming", "PerformanceLongTaskTiming", "PeriodicSyncManager", "Presentation",  
      "PresentationAvailability", "PresentationConnection", "PresentationConnectionAvailableEvent",  
      "PresentationConnectionCloseEvent", "PresentationConnectionList", "PresentationReceiver", "PresentationRequest",  
      "Profiler", "RTCEncodedAudioFrame", "RTCEncodedVideoFrame", "RelativeOrientationSensor", "ReportingObserver", "Sanitizer",  
      "Scheduler", "Scheduling", "ScreenDetailed", "ScreenDetails", "Sensor", "SensorErrorEvent", "Serial", "SerialPort",  
      "StylePropertyMap", "StylePropertyMapReadOnly", "SyncManager", "TaskAttributionTiming", "TaskController",  
      "TaskPriorityChangeEvent", "TaskSignal", "Touch", "TouchEvent", "TouchList", "TrustedHTML", "TrustedScript",  
      "TrustedScriptURL", "TrustedTypePolicy", "TrustedTypePolicyFactory", "URLPattern", "USB", "USBAlternateInterface",  
      "USBConfiguration", "USBConnectionEvent", "USBDevice", "USBEndpoint", "USBInTransferResult", "USBInterface",  
      "USBIsochronousInTransferPacket", "USBIsochronousInTransferResult", "USBIsochronousOutTransferPacket",  
      "USBIsochronousOutTransferResult", "USBOutTransferResult", "UserActivation", "VideoDecoder", "VideoEncoder", "VideoFrame",  
      "VirtualKeyboard", "VirtualKeyboardGeometryChangeEvent", "WakeLock", "WakeLockSentinel", "WebTransport",  
      "WebTransportBidirectionalStream", "WebTransportDatagramDuplexStream", "WebTransportError", "WindowControlsOverlay",  
      "WindowControlsOverlayGeometryChangeEvent", "XRAnchor", "XRAnchorSet", "XRBoundedReferenceSpace", "XRCPUDepthInformation",  
      "XRCamera", "XRDOMOverlayState", "XRDepthInformation", "XRFrame", "XRHitTestResult", "XRHitTestSource", "XRInputSource",  
      "XRInputSourceArray", "XRInputSourceEvent", "XRInputSourcesChangeEvent", "XRLayer", "XRLightEstimate", "XRLightProbe",  
      "XRPose", "XRRay", "XRReferenceSpace", "XRReferenceSpaceEvent", "XRRenderState", "XRRigidTransform", "XRSession",  
      "XRSessionEvent", "XRSpace", "XRSystem", "XRTransientInputHitTestResult", "XRTransientInputHitTestSource", "XRView",  
      "XRViewerPose", "XRViewport", "XRWebGLBinding", "XRWebGLDepthInformation", "XRWebGLLayer", "chrome", "clear",  
      "cookieStore", "copy", "debug", "dir", "dirxml", "getAccessibleName", "getAccessibleRole", "getEventListeners",  
      "getScreenDetails", "inspect", "keys", "launchQueue", "monitor", "monitorEvents", "navigation", "onappinstalled",  
      "onbeforeinstallprompt", "onbeforematch", "onbeforexrselect", "oncontextlost", "oncontextrestored",  
      "ondeviceorientationabsolute", "onpointerrawupdate", "originAgentCluster", "profile", "profileEnd", "queryLocalFonts",  
      "queryObjects", "scheduler", "showDirectoryPicker", "showOpenFilePicker", "showSaveFilePicker", "table", "trustedTypes",  
      "undebug", "unmonitor", "unmonitorEvents", "values", "webkitMediaStream", "webkitRTCPeerConnection",  
      "webkitRequestFileSystem", "webkitResolveLocalFileSystemURL", "webkitSpeechGrammar", "webkitSpeechGrammarList",  
      "webkitSpeechRecognitionError", "webkitSpeechRecognitionEvent", "webkitStorageInfo"
    ]),
  }
);


