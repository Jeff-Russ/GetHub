////  Endpoints Menu (#endpoints-menu) ////////////////////////////////////////////////////////////


// called in index.html
function makeEndpointsMenuCollapsible() {
  const colors = {
    opened_bg: '#3d6480', // should match hovered / navigated button color in css
    closed_bg: '#5c5858'  // should match default button color set in css
  }
  
  // This should probably be a resuable, recursive function to make nested 
  // lists of arbitray length collapsible But for now, it's just 
  // for a single use with a list that has two layers of collapsibles
  const menu_list_items = document.querySelectorAll('div#endpoints-menu > ul > li')

  menu_list_items.forEach((menu_li, menu_idx) => { // there are three of them
    // each menu_li is a <button> and another <ul> comprise of <li> which are submenu items
    // the button should always and should toggle the visibility of the submenu ul that comes
    // it. If toggled on all OTHER menu_li's submenu ul's should be toggled off

    const menu_li_sel_btn = menu_li.querySelector('button.picker-menu-btn') as HTMLButtonElement // not endpoints

    menu_li_sel_btn?.addEventListener("click", function(this: HTMLElement, e:Event)
    {
      // console.log(`event listener called from part 1 of makeEndpointsMenuCollapsible`)

      if (document.getElementById('endpoint-selected')) {
        // endpoints-menu is locked
        console.log("endpoints-menu is locked. Deselect the selected endpoint to navigate other endpoints")
        return
      }
      const submenu = menu_li.querySelector('ul') as HTMLUListElement

      if (!submenu?.style.display || submenu?.style.display === 'none') {
        // open menu
        submenu.style.display = 'block'
        menu_li_sel_btn.style.backgroundColor = colors.opened_bg

        menu_list_items.forEach((other_menu_li, other_menu_idx) => {
          if (other_menu_idx !== menu_idx) {
            const other_submenu = other_menu_li.querySelector('ul') as HTMLUListElement
            if (other_submenu) other_submenu.style.display = 'none'
            const other_submenu_btn = other_menu_li.querySelector('button.picker-menu-btn') as HTMLButtonElement
            if (other_submenu_btn) other_submenu_btn.style.backgroundColor = colors.closed_bg
          }
        })
      } else {
        // close menu
        submenu.style.display = 'none'
        menu_li_sel_btn.style.backgroundColor = colors.closed_bg
      }
    })

    const sublist_items = menu_li.querySelectorAll('li:has(button.picker-submenu-btn)')
    // const sublist_btns = menu_li.querySelectorAll('button.picker-submenu-btn')

    sublist_items.forEach((sublist_item, sublist_item_idx) => {
      const sublist_btn = sublist_item.querySelector('button.picker-submenu-btn') as HTMLButtonElement


      sublist_btn.addEventListener("click", function(this: HTMLElement, e:Event)
      {
        // console.log(`event listener called from part 2 of makeEndpointsMenuCollapsible`)

        if (document.getElementById('endpoint-selected')) {
          // endpoints-menu is locked
          console.log("endpoints-menu is locked. Deselect the selected endpoint to navigate other endpoints")
          return
        }
        const submenu = sublist_item.querySelector('ul') as HTMLUListElement

        if (!submenu.style.display || submenu.style.display === 'none') {
          submenu.style.display = 'block'
          sublist_btn.style.backgroundColor = colors.opened_bg

          sublist_items.forEach((other_menu_li, other_menu_idx) => {
            if (other_menu_idx !== sublist_item_idx) {
              const other_submenu = other_menu_li.querySelector('ul') as HTMLUListElement
              if (other_submenu) other_submenu.style.display = 'none'
              const other_submenu_btn = other_menu_li.querySelector('button.picker-submenu-btn') as HTMLButtonElement
              if (other_submenu_btn) other_submenu_btn.style.backgroundColor = colors.closed_bg
            }
          })
        } else {
          submenu.style.display = 'none'
          sublist_btn.style.backgroundColor = colors.closed_bg
        }
      })
    })

  })
}


// called in index.html
function setupEndpointsMenuSelection(addEndpointValidToGETList:addEndpoint_, addEndpointTemplateToGETList:addEndpoint_) {

  const parents:HTMLLIElement[] = Array.from(document.querySelectorAll('div#endpoints-menu > ul > li > ul > li'))
  parents.forEach((parent_li) => {
    // these are actual endpoints:
    const select_btns:HTMLButtonElement[] = Array.from(parent_li.querySelectorAll('button.picker-select-btn'))

    select_btns.forEach((select_btn) =>  {
      select_btn.addEventListener("click", function(this: HTMLElement, event:Event)
      { 
        console.log(`event listener called from setupEndpointsMenuSelection`)
        function setDisplayOnBtnsListSiblings(select_btn:HTMLButtonElement, display:string) {
        /*<ul>
            <li><button class="picker-menu-btn">Additional Endpoints</button> 
            <ul> <!-- great_ul -->
              <li><button class="picker-submenu-btn">activity</button>&nbsp<a href="https://docs.github.com/en/rest/activity" target="_blank"></a>
                <ul> !-- outer_ul -->
                  <li> <!-- parent_li or sibling_li-->
                    <button class="picker-select-btn">/events</button>&nbsp */
          const parent_li = select_btn.parentElement
          const outer_ul = parent_li?.parentElement
          const sibling_items = Array.from(outer_ul!.children)

          sibling_items.forEach((sibling_li) => {
            if (sibling_li !== parent_li && sibling_li instanceof HTMLElement) {
              // console.log("setting others to", display)
              sibling_li.style.display = display
            }
          })
          const grand_li = outer_ul?.parentElement
          const great_ul = grand_li?.parentElement
          const grand_siblings = Array.from(great_ul!.children)

          grand_siblings.forEach(grand_sibling => {
            if (grand_sibling !== grand_li && grand_sibling instanceof HTMLElement) {
              grand_sibling.style.display = display
            }
          })

          const great_li = great_ul?.parentElement
          const ggreat_ul = great_li?.parentElement
          const ggrand_siblings = Array.from(ggreat_ul!.children)

          ggrand_siblings.forEach(ggrand_sibling => {
            if (ggrand_sibling !== great_li && ggrand_sibling instanceof HTMLElement) {
              ggrand_sibling.style.display = display
            }
          })
          
        }
        
        const selected_btn = document.getElementById('endpoint-selected')
        const endpoints_menu = document.getElementById('endpoints-menu') as HTMLDivElement

        if (select_btn === selected_btn) {
          // console.log('button unselected')

          select_btn.removeAttribute('id');
          // TODO: hide siblings and parents siblings, populate search field and maybe reload the page
          setDisplayOnBtnsListSiblings(select_btn, 'block')
          
          // Unlock the menu to allow reveal on hover:
          endpoints_menu.classList.remove("endpoint-selected-mode");
        }
        else {
          console.log(`endpoint selected from menu button ${select_btn.innerHTML}`)

          if (selected_btn) selected_btn.removeAttribute('id');
          select_btn.setAttribute('id', 'endpoint-selected');
          setDisplayOnBtnsListSiblings(select_btn, 'none')

          // lock the menu from revealing on hover:
          endpoints_menu.classList.add("endpoint-selected-mode");
        
          if (select_btn.classList.contains('api-endpoint')) {
            if (select_btn.classList.contains('valid') && addEndpointValidToGETList) {
              addEndpointValidToGETList(select_btn.innerText)

            } else if ((select_btn.classList.contains('template') && addEndpointTemplateToGETList)) {
              addEndpointTemplateToGETList(select_btn.innerText)
            }
          }
        }
      })
    })
  })
}

// called in  addEndpointValidToGETList and addEndpointTemplateToGETList (both in this file only)
const endpointPreview = (endpoint:string) => 
  `<a class="endpoint-preview" href="https://api.github.com${endpoint}" target="_blank"><a>`



// called in index.html and in this file
function addEndpointValidToGETList(endpoint:string): void {
  // const endpoint = (typeof btn === 'string') ? btn : btn.innerText;
  console.log(`addEndpointValidToGETList on "${endpoint}"`)
  const endpointGET_ol = document.getElementById('endpoints_get_list') as HTMLOListElement
  
  const endpoint_preview = endpointPreview(endpoint)
  // console.log(endpoint_preview)
  endpointGET_ol.insertAdjacentHTML( 'beforeend', `<li endpoint="${endpoint}"><span class="endpoint">${endpoint}<span contenteditable> </span></span>${endpoint_preview}</li>` );
  makeListEditable(endpointGET_ol)
}


// called in index.html and in this file
function addEndpointTemplateToGETList(endpoint:string): void  {
  // const text = (typeof btn === 'string') ? btn : btn.innerText
  endpoint = endpoint.replace(/{([^a-zA-Z0-9+])/, '$1{');
  console.log(`addEndpointTemplateToGETList on "${endpoint}"`)
  const endpoint_html = endpoint.split(/(\{.*?\})/g).reduce(
    (a,s)=> (s[0] !== '{' ? a+s : `${a}<span contenteditable orig=${s}>${s}</span>`),
    ''
  );
  const endpoint_preview = endpointPreview(endpoint)
  // console.log(endpoint_preview)
  const endpointGET_ol = document.getElementById('endpoints_get_list') as HTMLOListElement
  endpointGET_ol.insertAdjacentHTML( 'beforeend', `<li endpoint="${endpoint}"><span class="endpoint">${endpoint_html}<span contenteditable> </span></span>${endpoint_preview}</li>` );
  makeListEditable(endpointGET_ol)
}



// called all over but only in this file 
function handleClickApiEndpointValid(this: HTMLElement, event:MouseEvent) { // only called by JS as handler
  console.log('handleClickApiEndpointValid')
  addEndpointValidToGETList((event.target as HTMLElement).innerText)
}

// called all over but only in this file 
function handleClickApiEndpointTemplate(this: HTMLElement, event:MouseEvent) {  // only called by JS as handler
  console.log('handleClickApiEndpointTemplate')
  addEndpointTemplateToGETList((event.target as HTMLElement).innerText)  
}


                            // handleClickGET is called by JS as handler and by my code! This could be a problem!
async function handleClickGET(this: HTMLElement/*ignored*/, event:MouseEvent/*ignored*/, update_query_string=true) { 
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
      return  {...ob, [`${idx} ${(<any>window).selected_URLs[idx].slice(22)}`]: objectifyArray(res)}
    }, {});
    if (!res_error) {
      const api_response_el = document.getElementById("api-response") as HTMLDivElement
      api_response_el.innerHTML = '';
      renderjson.set_icons("▶", "▼")
      renderjson.set_show_to_level(3)
      api_response_el.appendChild(renderjson((<any>window).rendered_json));
      linkify(handleClickApiEndpointValid, handleClickApiEndpointTemplate);
      // if (errors.length) throw new AggregateError(errors, "fetch failed!");


      // selectedEndpointsToQueryString(endpoints_list?:HTMLElement, pushState=true) 
      if (update_query_string) {
        // TODO: convince typescript that this function, defined in index.html, exists (or will exist).
        // @ts-ignore
        selectedEndpointsToQueryString()
      }
    }
  }
  catch(err) {
    console.error("WE GOT an ERROR", err);
    flashContentAndCSSClass(...[document.getElementById('endpoints_get_list') as HTMLOListElement, , 'flash-fail', 2000] as const);
  }
}


////  Endpoints Menu Settings (#endpoints_selectors) ////////////////////////////////////////////////////////////


/**
* initalizes endpointsMenuSettings global if needed and sets the current selection within it to
* selected argument, if provided. Otherwise the current selection is set to Default.
* IMPORTANT: first call, if selected is provided, also acts to permanently set the defaults to selected
* IMPORTANT: first call, if selected not provided,  permanently set the defaults to fallback_defaults.
* 
* @param {object} selected If not provided, endpointsMenuSettings.selected = endpointsMenuSettings.defaults
* @returns endpointsMenuSettings (global, which it also writes to directly)
*/
const endpointsMenuSettings = Object.assign((selected?:JsOb) => {
  const prev_selected = 
    typeof endpointsMenuSettings.selected === 'object'
      ? JSON.stringify(endpointsMenuSettings!.selected)
      : "";

  endpointsMenuSettings.ALL = {
    'Show.Category': [...(<any>window).endpoints_json.categories],
    'Show.API': [...Object.keys((<any>window).endpoints_json.apis)],
    'Show.Parameters.selections': ['Show endpoints with no parameters',...(<any>window).endpoints_json.parameters],
    'Show.Parameters.Require': ['Any'],
    'Sort': [ 'Category ▲', 'Parameters ▼', 'API ▼', 'Endpoint ▼'],
  };
  if (!endpointsMenuSettings.options) {
    endpointsMenuSettings.options = { 
      'Show.Category': [...(<any>window).endpoints_json.categories],  // an array: multiple selections but not none
      'Show.API': [...Object.keys((<any>window).endpoints_json.apis)],// an array: multiple selections but not none
      'Show.Parameters.selections': ['Show endpoints with no parameters',...(<any>window).endpoints_json.parameters],
      // above: an array: multiple selections, allow all and none Show endpoints with no parameters MUST BE ZEROTH
      'Show.Parameters.Require': ['Any', 'All'], // user picks one, still an array, but 1DIMENSION
      'Sort': [ // array: user selects (rearranges) two or more of these (no dups) and only one from each of two.
        [ 'Category ▼',   'Category ▲' ], 
        [ 'API ▼' ,       'API ▲' ],
        [ 'Parameters ▼', 'Parameters ▲' ], // this is the number of parameters
        [ 'Endpoint ▼',   'Endpoint ▲' ] // alphanum by endpoint string. THIS CAN ONLY BE THE THIRD SELECTION
      ],
    };
  }
  const fallback_defaults = {...endpointsMenuSettings.ALL};

  if (selected) {
    if (endpointsMenuSettings.selected) {
      // selections are already set, we are just changing some or all of them
      endpointsMenuSettings.selected = {...endpointsMenuSettings.selected, ...selected};
    } else if (endpointsMenuSettings.defaults) {
      // selections never set but defaults were, so we set all to selections or mix with defaults 
      endpointsMenuSettings.selected = {...endpointsMenuSettings.defaults, ...selected};
    } else {
      // first call: nothing's set and we have settings. So fill out all missing in selected 
      // with fallback_defaults and use that to be both the current settings and the defaults.
      endpointsMenuSettings.selected = {...fallback_defaults, ...selected};
      endpointsMenuSettings.defaults = {...endpointsMenuSettings.selected};
    }

  } else {
    if (!endpointsMenuSettings.defaults) {
      endpointsMenuSettings.defaults = { ...fallback_defaults };
    }
    if (!endpointsMenuSettings.selected) {
      endpointsMenuSettings.selected = {...endpointsMenuSettings.defaults}
    }
  }

  if (prev_selected === JSON.stringify(endpointsMenuSettings.selected))
    return false; // no change so no need to regenerate new html!
  return endpointsMenuSettings
});

// This has to go after endpointsMenuSettings is defined (if it even is needed)
(<any>window).endpointsMenuSettings = endpointsMenuSettings; 




function refreshEndpointsMenuContents(selected?:JsOb) {
  // because TS does not hoist const arrow function, and selectEndpoints has to 
  // be just that I have to put the executable part of refreshEndpointsMenuContents 
  // at the bottom of refreshEndpointsMenuContents. So scroll down and see what's up.

  
  
  const selectEndpoints = Object.assign(() => { // resist the urge nest this function anywhere!
    // uses endpointsMenuSettings to set selectEndpoints.endpoints global
    // must be called after endpointsMenuSettings is set, which should be called after user or query string
    // has defined selections, or just defaults are set.

    // const { Show, Sort } = endpointsMenuSettings.selected;
    // console.log('sorting and filtering endpoints')
    const s = endpointsMenuSettings.selected;

    const all_params = s['Show.Parameters.Require'][0] === 'All';
    const allow_no_params = s['Show.Parameters.selections'].includes('Show endpoints with no parameters')
    let shown_params:string[]|string = [...s['Show.Parameters.selections']]
    if (all_params) {
      if (allow_no_params) shown_params.shift(); // get rid of "Show endpoints with no parameters" (MUST BE ZEROTH)
      shown_params = JSON.stringify(shown_params.sort())
    } 

    // const shown_params = all_params ? JSON.stringify([...s['Show.Parameters.selections']].sort()) : s['Show.Parameters.selections']
    const sort_criteria = s.Sort.map( (cri:any) => {    // TODO: specify, not any
      const prop = cri.slice(0, -2).toLowerCase();
      const direction = cri.slice(-1) === '▼' ? 1 : -1;
      if (prop === 'parameters') {
        return [(el:any)=>el.parameters.length, direction ]  // TODO: specify, not any
      } else {
        return [prop, direction]
      }
    })

    selectEndpoints.endpoints = multiCriteriaSort(
      (<any>window).endpoints_json.endpoints.filter((endp:JsOb) => {
        if (!(s['Show.Category'].includes(endp.category))) {
          // console.log(`${endp.category} was not in ${s['Show.Category']}`)
          return false;
        }      
        if (!(s['Show.API'].includes(endp.api))) return false;

        if (all_params) {
          if (endp.parameters.length === 0 && endp.parameters.length !== 0) {
            return false;
          } else if(shown_params !== JSON.stringify([...endp.parameters].sort())){
            return false;
          }
        } 
        else if (!all_params) {
          
          if (endp.parameters.length === 0) {
            if (!allow_no_params) return false
          } 
          else {
            let found = false;
            for (let param of shown_params) {
              if (endp.parameters.includes(param)) {
                // console.log(`found ${param}`)
                found = true;
                break;
              }
            }
            if (!found) return false
          }
        }
        return true;
      }),
      ...sort_criteria
    );

  //   return selectEndpoints.endpoints; // just for good measure
  });




  function displayEndpoints() {
    // for initial display on first call, then subsequent calls 
    // update view from endpointsMenuSettings.selected

    if (!endpointsMenuSettings || !endpointsMenuSettings.selected) {
      endpointsMenuSettings(); // with user settings? 
    }
    if (!selectEndpoints.endpoints) {
      selectEndpoints();
    }

    const ext_link = (url:string, name?:string) => `<a href="${url}" target="_blank">${name ? name : ''}</a>`

    const [sections_order, sort] = bisect(
      endpointsMenuSettings.selected.Sort.map( (cri:(any[]|string)) => cri.slice(0, -2) ),
      2, 1);

    const make_api_links = !sections_order.includes('API')
    // we won't bother with category buttons since that's just a thing I made up anyway.
    const get:JsOb = {menu: {}, submenu: {}}


    for (let [i, section] of Array.from(Object.keys(get).entries())) {
      const menu = i ? 'submenu' : 'menu'

      if (sections_order[i] === 'Parameters') {
        get[section].picker = (endp:JsOb) => `<button class="picker-${menu}-btn">${endp.parameters.length} Parameters</button>`;
        get[section].current = (endp:JsOb) => endp.parameters.length;
      }
      else if (sections_order[i] === 'Category') {
        get[section].picker = (endp:JsOb) => `<button class="picker-${menu}-btn">${endp.category}</button>`;
        get[section].current = (endp:JsOb) => endp.category;
      }
      else if (sections_order[i] === 'API') {
        get[section].picker = (endp:JsOb) => `<button class="picker-${menu}-btn">${endp.api}</button>&nbsp;${ext_link(endp.api_doc_link, 'docs')}`;
        get[section].current = (endp:JsOb) => endp.api;
      }
    }

    /**
     * @param {Node|string} child (optional) Node or html string to be added within new element
     * @returns newly created HTMLUListElement
     */
     function ul(child:(string|HTMLElement|undefined)=undefined)  { // used in endpoints.ts
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
    function li(child:Node|string) { // used in endpoints.ts
      const node = document.createElement('li')
      if (typeof child === 'string')
        node.insertAdjacentHTML('beforeend', child);
      else if (child)
        node.appendChild(child)
      return node;
    }

    let current_menu_li, current_menu_li_ul, 
        current_submenu_li, current_submenu_li_ul;

    const endpoints_ul = ul();

    const endpointHtml = (endp:JsOb, make_api_links:boolean) => {
      const is_valid = endp.parameters.length === 0
      const type = is_valid ? 'valid' : 'template';
      const preview = is_valid ? ('&nbsp;'+ext_link(`https://api.github.com${endp.endpoint}`)) : ''
      const endp_doc = ext_link(endp.endpoint_doc_link, 'docs');
      const api_doc = make_api_links 
        ? ('&nbsp;'+ext_link(endp.api_doc_link, `${endp.api} docs`)) : ''
      return `<button class="picker-select-btn api-endpoint ${type}">${endp.endpoint}</button>${preview}&nbsp;${endp_doc}${api_doc}`;
    }

    for (const endpoint of selectEndpoints.endpoints) {
      const new_menu = get.menu.current(endpoint) !== get.menu.previous;
      if (new_menu) {
        current_menu_li = li(get.menu.picker(endpoint));
        // current_menu_li.insertAdjacentHTML('beforeend', );
        current_menu_li_ul = ul();
        current_menu_li.appendChild(current_menu_li_ul);
        endpoints_ul.appendChild(current_menu_li);
        get.menu.previous = get.menu.current(endpoint);
      }
      const new_submenu = get.submenu.current(endpoint) !== get.submenu.previous;
      if (new_menu || new_submenu) {
        current_submenu_li = li(get.submenu.picker(endpoint));
        current_submenu_li_ul = ul();
        current_submenu_li.appendChild(current_submenu_li_ul);
        current_menu_li_ul?.appendChild(current_submenu_li);
        get.submenu.previous = get.submenu.current(endpoint);
      }
      current_submenu_li_ul?.appendChild(li(endpointHtml(endpoint, make_api_links)));
    }
  
    document.getElementById('endpoints-menu')!.innerHTML = ''
    document.getElementById('endpoints-menu')!.appendChild(endpoints_ul)
    document.getElementById('endpoint_count')!.innerText = `Now showing ${selectEndpoints.endpoints.length} endpoints.`
  }

  if (endpointsMenuSettings(selected) !== false) {
    selectEndpoints()
    displayEndpoints()
  } else {
    console.log('no need to refresh')
  }
}


function linkify(handleClickApiEndpointValid:ClickHander, handleClickApiEndpointTemplate:ClickHander) {
  
  function runLinkify(handleClickApiEndpointValid:ClickHander, handleClickApiEndpointTemplate:ClickHander) {
    const editableLinkColor = 'background-color:'+'#000000'+'; '
    const editableLinkBbColor = 'color:'+'#2e9ae6'+'; '
    const editableLinkBorder = 'border: 1px solid '+'#999999'+ '; border-radius: 2px; '
    const editableLinkStyle = `${editableLinkColor}${editableLinkBbColor}; ${editableLinkBorder}`
    // const wasUsedToSet_elem_href = (elem, orig_href) => orig_href.replace( /^(https?:\/\/)([^\s]+)$/i, `$1${elem.innerHTML}`)

    // const quoted_api_valid_url_re = /^"(https?:\/\/)(api\.github\.com)([^\s{}]+)"$/i 
    const quoted_api_valid_url_re = /^"(https?:\/\/)(api\.github\.com)([^{}]+)"$/i // see api_valid_url_re
    const quoted_api_lax_url_re = /^"(https?:\/\/)(api\.github\.com)(.+)"$/i
    const quoted_url_re = /^"(https?:\/\/)([^\s]+)"$/i 

    const span_str = Array.from(document.querySelectorAll("div.data-linkify span.string:not(:has(*))")) as HTMLSpanElement[]
    // console.log(`runLinkify called  with ${arguments.length} args. iterating: ${span_str.length}`)
    for (const element of span_str)
    {
      
      if (element.innerHTML.match(quoted_api_valid_url_re))  // (https://)(api.github.com)(/endpoint/without:{}})
      { // VALID URLs for GITHUB API ENDPOINT
        element.innerHTML = element.innerHTML.replace(
          quoted_api_valid_url_re,
          `<span>$2</span><button class="api-endpoint valid">$3</button><a href="$1$2$3" target="_blank"></a>`
        );

        const btn = element.querySelector('button')
        if (handleClickApiEndpointValid) {
          btn?.addEventListener("click", handleClickApiEndpointValid, false);
        }
        // console.log(`  found a valid api-endpoint, now set to: ${element.innerHTML}`)
      }
      else if (element.innerHTML.match(quoted_api_lax_url_re)) // (https://)(api.github.com)(/endpoint/can/have:{})
      { // GITHUB API ENDPOINT URL TEMPLATES
        // this is api.github.com/<endpoint/with{/variables}/anywhere{/within}>
        // I don't like {/this} syntax. I will change them to /{this} but later?  
        element.innerHTML = element.innerHTML.replace(
          quoted_api_lax_url_re,
          '<span>$2</span><button class="api-endpoint template">$3</button>'
        );

        const btn = element.querySelector('button')
        if (handleClickApiEndpointTemplate) {
          btn?.addEventListener("click", handleClickApiEndpointTemplate, false);
        }
        
        // element.addEventListener("input", event => { // "input"? not "click"??
        //   const elem = event.target || event.srcElement;
        //   // TODO
        // }, false);

        // console.log(`  found a template api-endpoint, now set to: ${element.innerHTML}`)
      }
      else if (element.innerHTML.match(quoted_url_re))  // (https://)(the.rest/of/it)
      { // OTHER (VALID) URLs
        // console.log(`  found a valid other-url, which was: ${element.innerHTML}`)
        element.innerHTML = element.innerHTML.replace(
          quoted_url_re,
          '<a class="other-url valid" href="$1$2" target="_blank">$2</a>'
        );
        // console.log(`  and is now: ${element.innerHTML}`)
      }
      
    }
    // console.log(`runLinkify returning`)
  }
  runLinkify(handleClickApiEndpointValid, handleClickApiEndpointTemplate)
  // initial run is not good enough since some or all elements are not 
  // present due to being whthing a collapsed container. So we get 
  // the output from each (usually one) linkifyed div...
  const linkifieds = document.querySelectorAll('div.data-linkify');
  // console.log(linkifieds.length)
  // and re-run linkify each time it is clicked anywhere:
  linkifieds.forEach(linkified => {
    linkified.addEventListener('click', function () {
        setTimeout( () => {
          // console.log(`delay over: calling runLinkify(${!!handleClickApiEndpointValid}, ${!!handleClickApiEndpointValid})`)
          runLinkify(handleClickApiEndpointValid, handleClickApiEndpointTemplate)
          }, 40 )
      }, true);
    }
  );
}