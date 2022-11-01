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
async function fetchGET(url:string) {
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
const explode = (array:any[], key:string, ...rest:string[]):object => 
  array.reduce((acc, item) => (
    {
      ...acc,
      [item[key]]: rest.length ? {
        ...acc[item[key]],
        ...explode([item], rest[0], ...(rest.slice(1)))
      } : item
    }
  ), {})



function objectifyArray (obj_or_arr:object | any[]) {
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


function interpolate(str:string, params:object) {
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
function parseJSONLike(json:string, retain_backticks_in_keys=false, retain_backticks_in_vals=true) {
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


function flashContentAndCSSClass(element:HTMLElement, temp_content?:string, temp_css_class?:string, ms=1000) {
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


function appendParentWithMessage(element:HTMLElement, message:string) {
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

function unappendParentMessage(element:HTMLElement) {
  const parent_node = element.parentNode
  if (parent_node) {
    parent_node.querySelectorAll('.appendParentWithMessage').forEach(e => {
      console.log(`removing ${e}`)
      e.remove()
    })
  }
}


function resizeElementToContents(element:HTMLElement, extra_height=2, extra_width=2) {
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

function resizeElementWhileTyping(element:HTMLElement, extra_height=2, extra_width=2) {
  element.addEventListener('keydown', (event:Event) => {
    if (event.target !== null && event.target instanceof HTMLElement) {
      const target:HTMLElement = event.target
      setTimeout(()=>resizeElementToContents(target, extra_height, extra_width), 20)
    }
  });
}  

function saveAndLoadPageState(element_id:string) {
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
saveAndLoadPageState.reset = function (){
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
function parseQuery(query_string:string, result:Record<string, any>) {
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
function parseQueryMixed(query_string:string, result: Record<string, any>={} ) {
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


function parseQueryMixed_test() {
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

function unparseQueryMixed(obj:Record<string, any>={}) {
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



function unparseQueryMixed_test() {
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

function pushQueryString(query_string:string) {
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
function multiCriteriaSort(array_of_objects:Record<string, any>[], ...ordered_criteria:[string|Function, string|number][]) {
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
const sumArray = (array:[]) => array.reduce((sum:number, n:number) => sum + n, 0);

function multiCriteriaSort_test() {

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
function htmlToElement(html:string) :Node{ // THIS MAY NOT WORK WELL
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
function htmlToElements(html:string) :NodeListOf<ChildNode>{ // THIS ALSO MAY NOT WORK WELL
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
}


// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable(arr:any[], values_are_html_elements=false) {

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


function getSelectValues(select:HTMLSelectElement) {
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
const bisect = (arr_or_str:any[]|string, size0:number, size1:number) => [
  size0 === 1 ? arr_or_str[0] : arr_or_str.slice(0, size0),
  size1 === 1 ? arr_or_str[arr_or_str.length-1] : arr_or_str.slice(-size1)
]

/**
 * @param {Node|string} child (optional) Node or html string to be added within new element
 * @returns newly created HTMLUListElement
 */
function ul(child:(string|HTMLElement|undefined)=undefined)  {
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
function li(child:Node|string) {
  const node = document.createElement('li')
  if (typeof child === 'string')
    node.insertAdjacentHTML('beforeend', child);
  else if (child)
    node.appendChild(child)
  return node;
}


function factorial(num:number) {
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
function permute(array:any[]) {
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
function permuteChooseR(array:any[], r:number, include_test:Function) {
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
function combinationsWithReps(array:any[], r:number) {
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



