class SelectedEndpoints {


  // called in  SelectedEndpoints.addValid and SelectedEndpoints.addTemplate (both in this file only)
  static readonly endpointPreview = (endpoint:string) => 
  `<a class="endpoint-preview" href="https://api.github.com${endpoint}" target="_blank"><a>`

  
  // called in index.html and in this file
  static addValid(endpoint:string): void {
    // const endpoint = (typeof btn === 'string') ? btn : btn.innerText;
    console.log(`SelectedEndpoints.addValid on "${endpoint}"`)
    const endpointGET_ol = document.getElementById('endpoints_get_list') as HTMLOListElement
    
    const endpoint_preview = SelectedEndpoints.endpointPreview(endpoint)
    // console.log(endpoint_preview)
    endpointGET_ol.insertAdjacentHTML( 'beforeend', `<li endpoint="${endpoint}"><span class="endpoint">${endpoint}<span contenteditable> </span></span>${endpoint_preview}</li>` );
    SelectedEndpoints.makeListEditable(endpointGET_ol)
  }


  // called in index.html and in this file
  static addTemplate(endpoint:string): void  {
    // const text = (typeof btn === 'string') ? btn : btn.innerText
    endpoint = endpoint.replace(/{([^a-zA-Z0-9+])/, '$1{');
    console.log(`SelectedEndpoints.addTemplate on "${endpoint}"`)
    const endpoint_html = endpoint.split(/(\{.*?\})/g).reduce(
      (a,s)=> (s[0] !== '{' ? a+s : `${a}<span contenteditable orig=${s}>${s}</span>`),
      ''
    );
    const endpoint_preview = SelectedEndpoints.endpointPreview(endpoint)
    // console.log(endpoint_preview)
    const endpointGET_ol = document.getElementById('endpoints_get_list') as HTMLOListElement
    endpointGET_ol.insertAdjacentHTML( 'beforeend', `<li endpoint="${endpoint}"><span class="endpoint">${endpoint_html}<span contenteditable> </span></span>${endpoint_preview}</li>` );
    SelectedEndpoints.makeListEditable(endpointGET_ol)
  }



                              // SelectedEndpoints.handleClickGET is called by JS as handler and by my code! This could be a problem!
  static async handleClickGET(this: HTMLElement/*ignored*/, event:MouseEvent/*ignored*/, update_query_string=true) { 
    const endpoints_list = document.getElementById('endpoints_get_list') as HTMLOListElement

    const endpoint_spans = Array.from(endpoints_list.querySelectorAll('span.endpoint')) as HTMLSpanElement[]
    (<any>window).selected_URLs = endpoint_spans.map(span => `https://api.github.com${(span as HTMLElement).innerText.trim()}`) 

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


    try {
      // const errors = [];
      
      (<any>window).responses = await Promise.all( // (<any>window).responses is global
      (<any>window).selected_URLs.map((endpoint:string) => (
          fetch(endpoint).then(res => res.ok ? res.json() : {ERROR: res.status})
        )
      ));
      var res_error = false;
      (<any>window).rendered_json = // (<any>window).rendered_json is global
      (<any>window).responses.reduce((ob:JsOb, res:JsOb, idx:number) => { 
        if ("ERROR" in res) {
          res_error = true;

          const bad_li = document.querySelector(`#endpoints_get_list > li:nth-child(${idx+1})`) as HTMLLIElement;
          // const bad_li_sizing = bad_li.getBoundingClientRect()
          // document.getElementById('endpoints_get_list')

          flashContentAndCSSClass(...[bad_li, , 'flash-fail', 2000] as const);
          return ob
        }
        return  {...ob, [`${idx} ${(<any>window).selected_URLs[idx].slice(22)}`]: CollectionUtils.objectifyArray(res)}
      }, {});
      if (!res_error) {
        const api_response_el = document.getElementById("api-response") as HTMLDivElement
        api_response_el.innerHTML = '';
        renderjson.set_icons("▶", "▼")
        renderjson.set_show_to_level(3)
        api_response_el.appendChild(renderjson((<any>window).rendered_json));
        DisplayedResponse.linkify(DisplayedResponse.handleClickValid, DisplayedResponse.handleClickTemplate);
        // if (errors.length) throw new AggregateError(errors, "fetch failed!");


        // SelectedEndpoints.toQueryString(endpoints_list?:HTMLElement, pushState=true) 
        if (update_query_string) {
          // TODO: convince typescript that this function, defined in index.html, exists (or will exist).
          // @ts-ignore
          SelectedEndpoints.toQueryString()
        }
      }
    }
    catch(err) {
      console.error("WE GOT an ERROR", err);
      flashContentAndCSSClass(...[document.getElementById('endpoints_get_list') as HTMLOListElement, , 'flash-fail', 2000] as const);
    }
  }


  static makeSelectors(max_sorts=3) {
    // this must be called after EndpointsMenu.settings is called (and EndpointsMenu.settings.options are set)
    // and should not be called more than once!
    // About max_sorts: there are actually 4 possible (EndpointsMenu.settings.options.Sort.length). TODO: try with 4


    const select:Record<string, HTMLSelectElement> = {
      Sort_by: <HTMLSelectElement>document.getElementById('Sort_by_select'), 
      Sort_dir: <HTMLSelectElement>document.getElementById('Sort_dir_select'), 
      'Show.Category': <HTMLSelectElement>document.getElementById('show_categories_select'),
      'Show.API': <HTMLSelectElement>document.getElementById('show_apis_select'),
      'Show.Parameters.selections': <HTMLSelectElement>document.getElementById('show_params_select'),
      'Show.Parameters.Require': <HTMLSelectElement>document.getElementById('require_params_select'),
    }


    appendSortOptions(max_sorts)
    appendShowOptions()


    for (const key in select) {

      select[key].addEventListener('change', function(this:HTMLSelectElement, event:Event)  {
        // const htmlCollection = event.target.selectedOptions; // does not work with this (in JS)
        const htmlCollection = select[key].selectedOptions;
        let selected_obj:JsOb = {};

        if (htmlCollection) {
          let selected = Array.from(htmlCollection).map(option_el => option_el.innerText)

          // get the right place in EndpointsMenu.settings.selected 
          const ksplit = key.split('_') // to put selected_options:

          if (ksplit.length === 2) { // EndpointsMenu.settings.selected['Sort']
            let sort_setting = [...EndpointsMenu.settings.selected.Sort]
            const selected_sorts = selected[0].trim().split(/\s+/);
            const len = Math.min(selected.length, sort_setting.length)
            if (ksplit[1] === 'by') {
              for (let i = 0; i < len; i++) {
                sort_setting[i] =  selected_sorts[i] + sort_setting[i].slice(-2)
              }
            } else { //if (ksplit[1] === 'dir') {
              for (let i = 0; i < len; i++) {
                sort_setting[i] = sort_setting[i].slice(0, -1) + selected_sorts[i]
              }
            }
            selected_obj.Sort = sort_setting
            console.log(`currently:\n${[...EndpointsMenu.settings.selected.Sort]} Sort by change to:\n${sort_setting}`);
          }
          else { // EndpointsMenu.settings.selected['Show.*']
              selected_obj[key] = selected;
            // console.log('selected_obj:',JSON.stringify(selected_obj, null, 2))
          }
        }
        EndpointsMenu.refreshContents(selected_obj)
        EndpointsMenu.makeCollapsible()
        EndpointsMenu.setupSelection(SelectedEndpoints.addValid, SelectedEndpoints.addTemplate)
        SelectedEndpoints.makeListEditable(document.getElementById('endpoints_get_list') as HTMLOListElement)

      });

    }


    function appendSortOptions(max_sorts=3) {
      // About max_sorts: there are actually 4 possible (EndpointsMenu.settings.options.Sort.length). TODO: try with 4
      const directions = [
        CollectionUtils.bisect(EndpointsMenu.settings.options.Sort[0][0], 0, 1)[1],
        CollectionUtils.bisect(EndpointsMenu.settings.options.Sort[0][1], 0, 1)[1]
      ]
      const sortables = EndpointsMenu.settings.options.Sort.map( (option:any) =>  option[0].slice(0,-2) );
      const preventSectionHell = (perm:any) => {
        const sliced = perm.slice(0,2).join('')
        const include = !perm.slice(0,2).join('').includes('Endpoint')
        // console.log(`${perm} = sliced: ${sliced} ? ${include}`)
        return include;
      }

      const sort_options_data = CollectionUtils.permuteChooseR(sortables, max_sorts, preventSectionHell).sort().reverse();;
      const direction_options_data = CollectionUtils.combinationsWithReps(directions,4);
      // console.log(direction_options_data)

      let sort_options_html = sort_options_data.map( sorts => {
        // const selected_by_default = 
        return `<option>`+sorts.join(' ')+`</option>`
      });

      let direction_options_html = direction_options_data.map(dirs => {
        return `<option>&nbsp;&nbsp;`+dirs.join('&nbsp;'.repeat(10))+`</option>`
      });
      // console.log(Array.isArray(sort_options_html))
      // console.log(direction_options_html)



      select.Sort_by.innerHTML = sort_options_html.join('\n');
      select.Sort_dir.innerHTML = direction_options_html.join('\n');

    }

    function appendShowOptions() {

      const {
        'Show.Category': categories,
        'Show.API': apis,
        'Show.Parameters.selections': params,
        'Show.Parameters.Require': params_require,
      } = EndpointsMenu.settings.options

      const option = (opt:string) => `<option>${opt}</option>`

      select['Show.Category'].innerHTML = categories.map((opt:any) => option(opt)).join('\n');
      select['Show.API'].innerHTML = apis.map((opt:any) => option(opt)).join('\n');
      select['Show.Parameters.selections'].innerHTML = params.map((opt:any) => option(opt)).join('\n');
      select['Show.Parameters.Require'].innerHTML = params_require.map((opt:any) => option(opt)).join('\n');
    }

  }



  static makeListEditable(list_elem:HTMLOListElement, make_all_draggable=true, make_all_deletable=true) {
    // adapted from: https://codepen.io/retrofuturistic/pen/DJWYBv
    // But this is safe to be run multiple times on the same list_elem and you 
    // would do this each time a new <li> is added. (SelectedEndpoints.makeListEditable needs the 
    // entire list each time so that's the best way to do it, for now.)

    if (make_all_draggable) { list_elem.classList.add('draggable_list_items'); }
    if (make_all_deletable) { list_elem.classList.add('deletable_list_items'); }

    var items:NodeListOf<HTMLLIElement> = list_elem.querySelectorAll('li'); // DO NOT RENAME items

    if (list_elem.classList.contains('draggable_list_items')) {
      [].forEach.call(items, addDraggableButton);
      [].forEach.call(items, (item) => addDnDHandlers(item));

    }

    if (list_elem.classList.contains('deletable_list_items')) {
      [].forEach.call(items, addDeleteButton);

    }

    function addDeleteButton(li:HTMLLIElement) {
      if (!li.querySelector('button[deletable]')) {
        // console.log(`no delete button found for ${li.innerText}: ${result}`)
        const btn = document.createElement('button');
        btn.setAttribute('deletable', 'true');
        li.appendChild(btn);
        btn.addEventListener('click', e => {
          console.log('removing', li)
          li.remove(); 
        })
      }
      // else console.log(`${li.innerText} already had delete button`);
    }


    function addDraggableButton(li:HTMLLIElement) {
      if (!li.querySelector('button[draggable]')) {
        const btn = document.createElement('button');
        btn.setAttribute('draggable', 'true');
        li.appendChild(btn);
      }
      // else console.log(`${li.innerText} already had drag button`);
    }


    function addDnDHandlers(li:HTMLLIElement, add_draggable_button=true, reset=true): void  {
      /* Argument of type 
      '(li: HTMLLIElement, add_draggable_button?: boolean, reset?: boolean) => void' 
      is not assignable to parameter of type 
      '(value: never, index: number, array: never[]) => void'.
      Types of parameters 'add_draggable_button' and 'index' are incompatible.
        Type 'number' is not assignable to type 'boolean | undefined'.ts(2345) */
      if (add_draggable_button && !li.querySelector('button[draggable]')) {
        const btn = document.createElement('button');
        btn.setAttribute('draggable', 'true');
        li.appendChild(btn);
      }

      if (reset) li.removeEventListener('dragstart', handleDragStart, false);
      li.addEventListener('dragstart', handleDragStart, false);

      if (reset) li.removeEventListener('dragenter', handleDragEnter, false);
      li.addEventListener('dragenter', handleDragEnter, false);

      if (reset) li.removeEventListener('dragover', handleDragOver, false);
      li.addEventListener('dragover', handleDragOver, false);

      if (reset) li.removeEventListener('dragleave', handleDragLeave, false);
      li.addEventListener('dragleave', handleDragLeave, false);

      if (reset) li.removeEventListener('drop', handleDrop, false);
      li.addEventListener('drop', handleDrop, false);

      if (reset) li.removeEventListener('dragend', handleDragEnd, false);
      li.addEventListener('dragend', handleDragEnd, false);
    }


    var dragSrcEl:any = null;

    function handleDragStart(this: HTMLElement, e: DragEvent) {
        dragSrcEl = this; // Target (this) element is the source node.
        e.dataTransfer!.effectAllowed = 'move';
        e.dataTransfer?.setData('text/html', this.outerHTML);
        this.classList.add('dragElem'); // .dragElem identifies element being moved.
    }

    function handleDragOver(this: HTMLElement, e: DragEvent) {
      if (e.preventDefault) { e.preventDefault();  } // Necessary. Allows us to drop.

      this.classList.add('over'); // .over added to element dragged over (where dragElem can be moved before)
      e.dataTransfer!.dropEffect = 'move';  // See the section on the DataTransfer object.

      return false;
    }

    function handleDragEnter(this: HTMLElement) {
      // this / e.target is the current hover target.
    }

    function handleDragLeave(this: HTMLElement) {
      this.classList.remove('over');  // this / e.target is previous target element.
    }

    function handleDrop(this: HTMLElement, e: DragEvent) {
      if (e.stopPropagation) { e.stopPropagation();  } // Stops some browsers from redirecting.

      // Don't do anything if dropping the same movable we're dragging.
      if (dragSrcEl != this && dragSrcEl !== null) { // this/e.target is current target element.
        // Set the source movable's HTML to the HTML of the movable we dropped on.
        this.parentNode?.removeChild(dragSrcEl);
        const dropHTML = e.dataTransfer!.getData('text/html');
        this.insertAdjacentHTML('beforebegin',dropHTML);
        const dropElem:HTMLLIElement = this.previousSibling as HTMLLIElement;
        dropElem.classList.add('drop-confirm')
        setTimeout(() => { dropElem.classList.remove('drop-confirm'); }, 1000)
        addDnDHandlers(dropElem, false, false);

      }
      this.classList.remove('over');
      return false;
    }

    function handleDragEnd(this: HTMLElement, e: DragEvent){  
      this.classList.remove('over'); // this/e.target is the source node.

      [].forEach.call(items, function (li:HTMLLIElement) {
        li.classList.remove('dragElem');
        li.classList.remove('over');
        setTimeout(() => {
          li.classList.remove('dragElem');
          li.classList.remove('over');
        }, 200)
      });
    }
  }

  static toQueryString(endpoints_list?:HTMLOListElement, pushState=true) {
    // needs pushQueryString (in helpers.js)
    endpoints_list ??= document.getElementById('endpoints_get_list') as HTMLOListElement
    const query_string = '?endpoint=' + [...Array.from(endpoints_list.querySelectorAll('li'))].map(li=>{
      const user_values = [...Array.from(li.querySelectorAll('span > span[contenteditable'))].map(editable => {
        return `"${(<HTMLSpanElement>editable).innerText}"`
      }).join(',')
      return `${li.getAttribute('endpoint')}(${user_values})`

    }).join('&endpoint=')
    if (query_string.length > 10) {
      if (pushState) QueryStringUtils.push(query_string)
      return query_string
    }
    return ''
  }

  static fromQueryString(list_el_to_populate:HTMLOListElement|boolean=false, get=false) {
    // needs parseQueryMixed (in helpers.js) and (various) (in endpoints.js)
    // console.log(`SelectedEndpoints.fromQueryString(${list_el_to_populate}, ${get})`)
    if (!window.location.search) return
    let {endpoint: endpts} = QueryStringUtils.parseMixed(window.location.search)
    if (!Array.isArray(endpts)) {
      endpts = [endpts]
    }
    endpts = endpts.map((endpt:string) => {
      const [endpoint, ...editables] = endpt.split(/\("|","|"\)/).filter(Boolean)
      return { endpoint, editables: [...editables], is_template: !!editables.join('').trim()}
    })

    if (list_el_to_populate) {
      // console.log('populating endpoints to GET list')
      if (list_el_to_populate === true) {
        list_el_to_populate = document.getElementById('endpoints_get_list') as HTMLOListElement // default if true
      }
      for (const endpt of endpts) {
        if (endpt.is_template) {
          SelectedEndpoints.addTemplate(endpt.endpoint)
          const editables = list_el_to_populate.querySelectorAll(`li:last-of-type > span.endpoint > span[contenteditable]`)
          editables.forEach((editable, idx) => {
            (<HTMLSpanElement>editable).innerText = endpt.editables[idx] || ''
          })
        }
        else SelectedEndpoints.addValid(endpt.endpoint)
      }
      if (get) {
        // TODO: remember how to convince TS to do this!
        // @ts-ignore
        SelectedEndpoints.handleClickGET(...[,false]) // false means don't update query string
      }
    } 
    // console.log(JSON.stringify(endpts,null,2))
    return endpts
  }

}
