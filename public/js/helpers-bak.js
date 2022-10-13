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


function objectifyArray (obj_or_arr) {
  if (!Array.isArray(obj_or_arr)) {
    result = {}
    for (const [key, val] of Object.entries(obj_or_arr)) {
      if (Array.isArray(val)) result[key] = objectifyArray(val)
      else result[key] = val
    }
    return result
  }
  else {
    var result = {}
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


function interpolate(string, params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  const func = new Function(...names, `return \`${string}\`;`)(...vals);
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

/**
 * DANGER: NOT DONE AND NOT WORKING! This is intended to be a sandboxed "jail" function
 * @param {string} callable 
 * @param {object} params to be passed to callable
 * @returns 
 */
function callWithParams(callable, params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  const func = new Function(`return ${callable(...params)};`)(...params);
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

/**
* parseJSONLike is a more lax version of JSON.parse, allowing for single and backtick quotes in 
* keys and values as as well as commas after last items in arrays and objects. 
*
* @param {string} json - A JSON or JSON-like string
* @param {boolean} [retain_backticks_in_keys=false] If true `tplt ${v}` becomes "`tplt ${v}`" else "tplt ${v}"
* @param {boolean} [retain_backticks_in_vals=true] Same as retain_backticks_in_keys but for values
* @return {object} An object or array derived from json
*/
function parseJSONLike(json, retain_backticks_in_keys=false, retain_backticks_in_vals=true) {
  // The following replace functions separated by blank lines are applied in order to the string.
  // The replace functions not separated by blank lines are two choices, as decided by the 2nd + 3rd args.

  const doublequote_from_singlequote_keys = (str) => str.replace(/([{\[,][\n\r\s]*)'([^'\n\r:]+)':/gm, '$1"$2":');

  const doublequote_template_keys = (str) => str.replace(/([{\[,][\n\r\s]*)(`[^`\n\r:]+`):/gm, '$1"$2":');
  const doublequote_from_template_keys = (str) => str.replace(/([{\[,][\n\r\s]*)`([^`\n\r:]+)`:/gm, '$1"$2":');
  
  const doublequote_unquote_keys = (str) => str.replace(/([{\[,][\n\r\s]*)([^"][^\n\r:]+[^"]):/gm, '$1"$2":');

  const remove_last_commas = (str) => str.replace(/,([\n\r\s]*[}\]])/gm, '$1');

  const doublequote_from_singlequote_values = (str) => str.replace(/([:,][\n\r\s]*)'([^'\n\r,]+)'/gm, '$1"$2"');

  const doublequote_template_values = (str) => str.replace(/([:,][\n\r\s]*)(`[^`\n\r,]+`)/gm, '$1"$2"');
  const doublequote_from_template_values = (str) => str.replace(/([:,][\n\r\s]*)`([^'\n\r,]+)`/gm, '$1"$2"');
  
  const doublequote_object_values = (str) => str.replace(/(: )([^"\[{\n][^\n",]*)(,?)/gm, '$1"$2"$3')
  // At this point we might want to try unquoting allowed value types

  const doublequote_array_values = (str) => str.replace(/(\n *)([^\]\[{}",]+)(,)/gm, '$1"$2"$3')
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
  let result, backtrack_json;

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

  const unquote_allowed_valuetypes = (str) => str.replace(/"((?:true|false|-?\d+\.\d+|-?\d+|null))"/gm, '$1')
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


function parseJSONLike_Test(json) {

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


function flashContentAndCSSClass(element, temp_content, temp_css_class, ms=1000) {
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

function appendParentWithMessage(element, message) {
  const parent_node = element.parentNode
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

function unappendParentMessage(element) {
  const parent_node = element.parentNode
  parent_node.querySelectorAll('.appendParentWithMessage').forEach(e => {
    console.log(`removing ${e}`)
    e.remove()
  })
}


function resizeElementToContents(element, extra_height=2, extra_width=2) {
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

function resizeElementWhileTyping(element, extra_height=2, extra_width=2) {
  element.addEventListener('keydown', (event) => {
    setTimeout(()=>resizeElementToContents(event.target, extra_height, extra_width), 20)
  });
}



  

function saveAndLoadPageState(element_id) {
  // https://gist.github.com/jhammann/6000755

  var content = document.getElementById('element_id');

  // this line isn't really necessary here but you have to append this attribute to the element you want the html stored of.
  content.setAttribute("contenteditable", "true")

  // save the page's state after you're done with editing and clicked outside the content
  content.addEventListener("blur", () => {
    console.log("in blur")
    localStorage.setItem('page_html', this.innerHTML);
  });

  // pretty logical, getItem retrieves your local storage data
  if (localStorage.getItem('page_html')) {
    content.innerHTML = localStorage.getItem('page_html');
  }


  // this function resets the localstorage and thus resets the page back to it's original state.
  saveAndLoadPageState.reset = function (){
    localStorage.clear();
    window.location = window.location;
  }
}

