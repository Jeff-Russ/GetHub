"use strict";
// function selectedEndpointsToQueryString(endpoints_list?:HTMLOListElement, pushState=true) {
//   // needs pushQueryString (in helpers.js)
//   endpoints_list ??= document.getElementById('endpoints_get_list') as HTMLOListElement
//   const query_string = '?endpoint=' + [...Array.from(endpoints_list.querySelectorAll('li'))].map(li=>{
//     const user_values = [...Array.from(li.querySelectorAll('span > span[contenteditable'))].map(editable => {
//       return `"${(<HTMLSpanElement>editable).innerText}"`
//     }).join(',')
//     return `${li.getAttribute('endpoint')}(${user_values})`
//   }).join('&endpoint=')
//   if (query_string.length > 10) {
//     if (pushState) pushQueryString(query_string)
//     return query_string
//   }
//   return ''
// }
// function parseQueryStringEndpoints(list_el_to_populate:HTMLOListElement|boolean=false, get=false) {
//   // needs parseQueryMixed (in helpers.js) and (various) (in endpoints.js)
//   // console.log(`parseQueryStringEndpoints(${list_el_to_populate}, ${get})`)
//   if (!window.location.search) return
//   let {endpoint: endpts} = parseQueryMixed(window.location.search)
//   if (!Array.isArray(endpts)) {
//     endpts = [endpts]
//   }
//   endpts = endpts.map((endpt:string) => {
//     const [endpoint, ...editables] = endpt.split(/\("|","|"\)/).filter(Boolean)
//     return { endpoint, editables: [...editables], is_template: !!editables.join('').trim()}
//   })
//   if (list_el_to_populate) {
//     // console.log('populating endpoints to GET list')
//     if (list_el_to_populate === true) {
//       list_el_to_populate = document.getElementById('endpoints_get_list') as HTMLOListElement // default if true
//     }
//     for (const endpt of endpts) {
//       if (endpt.is_template) {
//         addEndpointTemplateToGETList(endpt.endpoint)
//         const editables = list_el_to_populate.querySelectorAll(`li:last-of-type > span.endpoint > span[contenteditable]`)
//         editables.forEach((editable, idx) => {
//           (<HTMLSpanElement>editable).innerText = endpt.editables[idx] || ''
//         })
//       }
//       else addEndpointValidToGETList(endpt.endpoint)
//     }
//     if (get) {
//       // TODO: remember how to convince TS to do this!
//       // @ts-ignore
//       handleClickGET(...[,false]) // false means don't update query string
//     }
//   } 
//   // console.log(JSON.stringify(endpts,null,2))
//   return endpts
// }
// function makeEndpointsSelectors(max_sorts=3) {
//   // this must be called after endpointsMenuSettings is called (and endpointsMenuSettings.options are set)
//   // and should not be called more than once!
//   // About max_sorts: there are actually 4 possible (endpointsMenuSettings.options.Sort.length). TODO: try with 4
//   const select:Record<string, HTMLSelectElement> = {
//     Sort_by: <HTMLSelectElement>document.getElementById('Sort_by_select'), 
//     Sort_dir: <HTMLSelectElement>document.getElementById('Sort_dir_select'), 
//     'Show.Category': <HTMLSelectElement>document.getElementById('show_categories_select'),
//     'Show.API': <HTMLSelectElement>document.getElementById('show_apis_select'),
//     'Show.Parameters.selections': <HTMLSelectElement>document.getElementById('show_params_select'),
//     'Show.Parameters.Require': <HTMLSelectElement>document.getElementById('require_params_select'),
//   }
//   appendSortOptions(max_sorts)
//   appendShowOptions()
//   for (const key in select) {
//     select[key].addEventListener('change', function(this:HTMLSelectElement, event:Event)  {
//       // const htmlCollection = event.target.selectedOptions; // does not work with this (in JS)
//       const htmlCollection = select[key].selectedOptions;
//       let selected_obj:JsOb = {};
//       if (htmlCollection) {
//         let selected = Array.from(htmlCollection).map(option_el => option_el.innerText)
//         // get the right place in endpointsMenuSettings.selected 
//         const ksplit = key.split('_') // to put selected_options:
//         if (ksplit.length === 2) { // endpointsMenuSettings.selected['Sort']
//           let sort_setting = [...endpointsMenuSettings.selected.Sort]
//           const selected_sorts = selected[0].trim().split(/\s+/);
//           const len = Math.min(selected.length, sort_setting.length)
//           if (ksplit[1] === 'by') {
//             for (let i = 0; i < len; i++) {
//               sort_setting[i] =  selected_sorts[i] + sort_setting[i].slice(-2)
//             }
//           } else { //if (ksplit[1] === 'dir') {
//             for (let i = 0; i < len; i++) {
//               sort_setting[i] = sort_setting[i].slice(0, -1) + selected_sorts[i]
//             }
//           }
//           selected_obj.Sort = sort_setting
//           console.log(`currently:\n${[...endpointsMenuSettings.selected.Sort]} Sort by change to:\n${sort_setting}`);
//         }
//         else { // endpointsMenuSettings.selected['Show.*']
//             selected_obj[key] = selected;
//           // console.log('selected_obj:',JSON.stringify(selected_obj, null, 2))
//         }
//       }
//       refreshEndpointsMenuContents(selected_obj)
//       makeEndpointsMenuCollapsible()
//       setupEndpointsMenuSelection(addEndpointValidToGETList, addEndpointTemplateToGETList)
//       makeListEditable(document.getElementById('endpoints_get_list') as HTMLOListElement)
//     });
//   }
//   function appendSortOptions(max_sorts=3) {
//     // About max_sorts: there are actually 4 possible (endpointsMenuSettings.options.Sort.length). TODO: try with 4
//     const directions = [
//       bisect(endpointsMenuSettings.options.Sort[0][0], 0, 1)[1],
//       bisect(endpointsMenuSettings.options.Sort[0][1], 0, 1)[1]
//     ]
//     const sortables = endpointsMenuSettings.options.Sort.map( (option:any) =>  option[0].slice(0,-2) );
//     const preventSectionHell = (perm:any) => {
//       const sliced = perm.slice(0,2).join('')
//       const include = !perm.slice(0,2).join('').includes('Endpoint')
//       // console.log(`${perm} = sliced: ${sliced} ? ${include}`)
//       return include;
//     }
//     const sort_options_data = permuteChooseR(sortables, max_sorts, preventSectionHell).sort().reverse();;
//     const direction_options_data = combinationsWithReps(directions,4);
//     // console.log(direction_options_data)
//     let sort_options_html = sort_options_data.map( sorts => {
//       // const selected_by_default = 
//       return `<option>`+sorts.join(' ')+`</option>`
//     });
//     let direction_options_html = direction_options_data.map(dirs => {
//       return `<option>&nbsp;&nbsp;`+dirs.join('&nbsp;'.repeat(10))+`</option>`
//     });
//     // console.log(Array.isArray(sort_options_html))
//     // console.log(direction_options_html)
//     select.Sort_by.innerHTML = sort_options_html.join('\n');
//     select.Sort_dir.innerHTML = direction_options_html.join('\n');
//   }
//   function appendShowOptions() {
//     const {
//       'Show.Category': categories,
//       'Show.API': apis,
//       'Show.Parameters.selections': params,
//       'Show.Parameters.Require': params_require,
//     } = endpointsMenuSettings.options
//     const option = (opt:string) => `<option>${opt}</option>`
//     select['Show.Category'].innerHTML = categories.map((opt:any) => option(opt)).join('\n');
//     select['Show.API'].innerHTML = apis.map((opt:any) => option(opt)).join('\n');
//     select['Show.Parameters.selections'].innerHTML = params.map((opt:any) => option(opt)).join('\n');
//     select['Show.Parameters.Require'].innerHTML = params_require.map((opt:any) => option(opt)).join('\n');
//   }
// }
//# sourceMappingURL=index.js.map