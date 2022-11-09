"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var EndpointsMenu = /** @class */ (function () {
    function EndpointsMenu() {
    }
    // called in index.html
    EndpointsMenu.makeCollapsible = function () {
        var colors = {
            opened_bg: '#3d6480',
            closed_bg: '#5c5858' // should match default button color set in css
        };
        // This should probably be a resuable, recursive function to make nested 
        // lists of arbitray length collapsible But for now, it's just 
        // for a single use with a list that has two layers of collapsibles
        var menu_list_items = document.querySelectorAll('div#endpoints-menu > ul > li');
        menu_list_items.forEach(function (menu_li, menu_idx) {
            // each menu_li is a <button> and another <ul> comprise of <li> which are submenu items
            // the button should always and should toggle the visibility of the submenu ul that comes
            // it. If toggled on all OTHER menu_li's submenu ul's should be toggled off
            var menu_li_sel_btn = menu_li.querySelector('button.picker-menu-btn'); // not endpoints
            menu_li_sel_btn === null || menu_li_sel_btn === void 0 ? void 0 : menu_li_sel_btn.addEventListener("click", function (e) {
                // console.log(`event listener called from part 1 of EndpointsMenu.makeCollapsible`)
                if (document.getElementById('endpoint-selected')) {
                    // endpoints-menu is locked
                    console.log("endpoints-menu is locked. Deselect the selected endpoint to navigate other endpoints");
                    return;
                }
                var submenu = menu_li.querySelector('ul');
                if (!(submenu === null || submenu === void 0 ? void 0 : submenu.style.display) || (submenu === null || submenu === void 0 ? void 0 : submenu.style.display) === 'none') {
                    // open menu
                    submenu.style.display = 'block';
                    menu_li_sel_btn.style.backgroundColor = colors.opened_bg;
                    menu_list_items.forEach(function (other_menu_li, other_menu_idx) {
                        if (other_menu_idx !== menu_idx) {
                            var other_submenu = other_menu_li.querySelector('ul');
                            if (other_submenu)
                                other_submenu.style.display = 'none';
                            var other_submenu_btn = other_menu_li.querySelector('button.picker-menu-btn');
                            if (other_submenu_btn)
                                other_submenu_btn.style.backgroundColor = colors.closed_bg;
                        }
                    });
                }
                else {
                    // close menu
                    submenu.style.display = 'none';
                    menu_li_sel_btn.style.backgroundColor = colors.closed_bg;
                }
            });
            var sublist_items = menu_li.querySelectorAll('li:has(button.picker-submenu-btn)');
            // const sublist_btns = menu_li.querySelectorAll('button.picker-submenu-btn')
            sublist_items.forEach(function (sublist_item, sublist_item_idx) {
                var sublist_btn = sublist_item.querySelector('button.picker-submenu-btn');
                sublist_btn.addEventListener("click", function (e) {
                    // console.log(`event listener called from part 2 of EndpointsMenu.makeCollapsible`)
                    if (document.getElementById('endpoint-selected')) {
                        // endpoints-menu is locked
                        console.log("endpoints-menu is locked. Deselect the selected endpoint to navigate other endpoints");
                        return;
                    }
                    var submenu = sublist_item.querySelector('ul');
                    if (!submenu.style.display || submenu.style.display === 'none') {
                        submenu.style.display = 'block';
                        sublist_btn.style.backgroundColor = colors.opened_bg;
                        sublist_items.forEach(function (other_menu_li, other_menu_idx) {
                            if (other_menu_idx !== sublist_item_idx) {
                                var other_submenu = other_menu_li.querySelector('ul');
                                if (other_submenu)
                                    other_submenu.style.display = 'none';
                                var other_submenu_btn = other_menu_li.querySelector('button.picker-submenu-btn');
                                if (other_submenu_btn)
                                    other_submenu_btn.style.backgroundColor = colors.closed_bg;
                            }
                        });
                    }
                    else {
                        submenu.style.display = 'none';
                        sublist_btn.style.backgroundColor = colors.closed_bg;
                    }
                });
            });
        });
    };
    // called in index.html
    EndpointsMenu.setupSelection = function (addValid, addTemplate) {
        var parents = Array.from(document.querySelectorAll('div#endpoints-menu > ul > li > ul > li'));
        parents.forEach(function (parent_li) {
            // these are actual endpoints:
            var select_btns = Array.from(parent_li.querySelectorAll('button.picker-select-btn'));
            select_btns.forEach(function (select_btn) {
                select_btn.addEventListener("click", function (event) {
                    console.log("event listener called from EndpointsMenu.setupSelection");
                    function setDisplayOnBtnsListSiblings(select_btn, display) {
                        /*<ul>
                            <li><button class="picker-menu-btn">Additional Endpoints</button>
                            <ul> <!-- great_ul -->
                              <li><button class="picker-submenu-btn">activity</button>&nbsp<a href="https://docs.github.com/en/rest/activity" target="_blank"></a>
                                <ul> !-- outer_ul -->
                                  <li> <!-- parent_li or sibling_li-->
                                    <button class="picker-select-btn">/events</button>&nbsp */
                        var parent_li = select_btn.parentElement;
                        var outer_ul = parent_li === null || parent_li === void 0 ? void 0 : parent_li.parentElement;
                        var sibling_items = Array.from(outer_ul.children);
                        sibling_items.forEach(function (sibling_li) {
                            if (sibling_li !== parent_li && sibling_li instanceof HTMLElement) {
                                // console.log("setting others to", display)
                                sibling_li.style.display = display;
                            }
                        });
                        var grand_li = outer_ul === null || outer_ul === void 0 ? void 0 : outer_ul.parentElement;
                        var great_ul = grand_li === null || grand_li === void 0 ? void 0 : grand_li.parentElement;
                        var grand_siblings = Array.from(great_ul.children);
                        grand_siblings.forEach(function (grand_sibling) {
                            if (grand_sibling !== grand_li && grand_sibling instanceof HTMLElement) {
                                grand_sibling.style.display = display;
                            }
                        });
                        var great_li = great_ul === null || great_ul === void 0 ? void 0 : great_ul.parentElement;
                        var ggreat_ul = great_li === null || great_li === void 0 ? void 0 : great_li.parentElement;
                        var ggrand_siblings = Array.from(ggreat_ul.children);
                        ggrand_siblings.forEach(function (ggrand_sibling) {
                            if (ggrand_sibling !== great_li && ggrand_sibling instanceof HTMLElement) {
                                ggrand_sibling.style.display = display;
                            }
                        });
                    }
                    var selected_btn = document.getElementById('endpoint-selected');
                    var endpoints_menu = document.getElementById('endpoints-menu');
                    if (select_btn === selected_btn) {
                        // console.log('button unselected')
                        select_btn.removeAttribute('id');
                        // TODO: hide siblings and parents siblings, populate search field and maybe reload the page
                        setDisplayOnBtnsListSiblings(select_btn, 'block');
                        // Unlock the menu to allow reveal on hover:
                        endpoints_menu.classList.remove("endpoint-selected-mode");
                    }
                    else {
                        console.log("endpoint selected from menu button ".concat(select_btn.innerHTML));
                        if (selected_btn)
                            selected_btn.removeAttribute('id');
                        select_btn.setAttribute('id', 'endpoint-selected');
                        setDisplayOnBtnsListSiblings(select_btn, 'none');
                        // lock the menu from revealing on hover:
                        endpoints_menu.classList.add("endpoint-selected-mode");
                        if (select_btn.classList.contains('api-endpoint')) {
                            if (select_btn.classList.contains('valid') && addValid) {
                                addValid(select_btn.innerText);
                            }
                            else if ((select_btn.classList.contains('template') && addTemplate)) {
                                addTemplate(select_btn.innerText);
                            }
                        }
                    }
                });
            });
        });
    };
    EndpointsMenu.refreshContents = function (selected) {
        // because TS does not hoist const arrow function, and selectEndpoints has to 
        // be just that I have to put the executable part of EndpointsMenu.refreshContents 
        // at the bottom of EndpointsMenu.refreshContents. So scroll down and see what's up.
        var selectEndpoints = Object.assign(function () {
            // uses EndpointsMenu.settings to set selectEndpoints.endpoints global
            // must be called after EndpointsMenu.settings is set, which should be called after user or query string
            // has defined selections, or just defaults are set.
            // const { Show, Sort } = EndpointsMenu.settings.selected;
            // console.log('sorting and filtering endpoints')
            var s = EndpointsMenu.settings.selected;
            var all_params = s['Show.Parameters.Require'][0] === 'All';
            var allow_no_params = s['Show.Parameters.selections'].includes('Show endpoints with no parameters');
            var shown_params = __spreadArray([], s['Show.Parameters.selections'], true);
            if (all_params) {
                if (allow_no_params)
                    shown_params.shift(); // get rid of "Show endpoints with no parameters" (MUST BE ZEROTH)
                shown_params = JSON.stringify(shown_params.sort());
            }
            // const shown_params = all_params ? JSON.stringify([...s['Show.Parameters.selections']].sort()) : s['Show.Parameters.selections']
            var sort_criteria = s.Sort.map(function (cri) {
                var prop = cri.slice(0, -2).toLowerCase();
                var direction = cri.slice(-1) === '▼' ? 1 : -1;
                if (prop === 'parameters') {
                    return [function (el) { return el.parameters.length; }, direction]; // TODO: specify, not any
                }
                else {
                    return [prop, direction];
                }
            });
            selectEndpoints.endpoints = CollectionUtils.multiCriteriaSort.apply(CollectionUtils, __spreadArray([window.endpoints_json.endpoints.filter(function (endp) {
                    if (!(s['Show.Category'].includes(endp.category))) {
                        // console.log(`${endp.category} was not in ${s['Show.Category']}`)
                        return false;
                    }
                    if (!(s['Show.API'].includes(endp.api)))
                        return false;
                    if (all_params) {
                        if (endp.parameters.length === 0 && endp.parameters.length !== 0) {
                            return false;
                        }
                        else if (shown_params !== JSON.stringify(__spreadArray([], endp.parameters, true).sort())) {
                            return false;
                        }
                    }
                    else if (!all_params) {
                        if (endp.parameters.length === 0) {
                            if (!allow_no_params)
                                return false;
                        }
                        else {
                            var found = false;
                            for (var _i = 0, shown_params_1 = shown_params; _i < shown_params_1.length; _i++) {
                                var param = shown_params_1[_i];
                                if (endp.parameters.includes(param)) {
                                    // console.log(`found ${param}`)
                                    found = true;
                                    break;
                                }
                            }
                            if (!found)
                                return false;
                        }
                    }
                    return true;
                })], sort_criteria, false));
            //   return selectEndpoints.endpoints; // just for good measure
        });
        function displayEndpoints() {
            // for initial display on first call, then subsequent calls 
            // update view from EndpointsMenu.settings.selected
            if (!EndpointsMenu.settings || !EndpointsMenu.settings.selected) {
                EndpointsMenu.settings(); // with user EndpointsMenu.settings? 
            }
            if (!selectEndpoints.endpoints) {
                selectEndpoints();
            }
            var ext_link = function (url, name) { return "<a href=\"".concat(url, "\" target=\"_blank\">").concat(name ? name : '', "</a>"); };
            var _a = CollectionUtils.bisect(EndpointsMenu.settings.selected.Sort.map(function (cri) { return cri.slice(0, -2); }), 2, 1), sections_order = _a[0], sort = _a[1];
            var make_api_links = !sections_order.includes('API');
            // we won't bother with category buttons since that's just a thing I made up anyway.
            var get = { menu: {}, submenu: {} };
            var _loop_1 = function (i, section) {
                var menu = i ? 'submenu' : 'menu';
                if (sections_order[i] === 'Parameters') {
                    get[section].picker = function (endp) { return "<button class=\"picker-".concat(menu, "-btn\">").concat(endp.parameters.length, " Parameters</button>"); };
                    get[section].current = function (endp) { return endp.parameters.length; };
                }
                else if (sections_order[i] === 'Category') {
                    get[section].picker = function (endp) { return "<button class=\"picker-".concat(menu, "-btn\">").concat(endp.category, "</button>"); };
                    get[section].current = function (endp) { return endp.category; };
                }
                else if (sections_order[i] === 'API') {
                    get[section].picker = function (endp) { return "<button class=\"picker-".concat(menu, "-btn\">").concat(endp.api, "</button>&nbsp;").concat(ext_link(endp.api_doc_link, 'docs')); };
                    get[section].current = function (endp) { return endp.api; };
                }
            };
            for (var _i = 0, _b = Array.from(Object.keys(get).entries()); _i < _b.length; _i++) {
                var _c = _b[_i], i = _c[0], section = _c[1];
                _loop_1(i, section);
            }
            /**
             * @param {Node|string} child (optional) Node or html string to be added within new element
             * @returns newly created HTMLUListElement
             */
            function ul(child) {
                if (child === void 0) { child = undefined; }
                var node = document.createElement('ul');
                if (typeof child === 'string')
                    node.insertAdjacentHTML('beforeend', child);
                else if (child)
                    node.appendChild(child);
                return node;
            }
            /**
            * @param {Node|string} child (optional) Node or html string to be added within new element
            * @returns newly created HTMLLIElement
            */
            function li(child) {
                var node = document.createElement('li');
                if (typeof child === 'string')
                    node.insertAdjacentHTML('beforeend', child);
                else if (child)
                    node.appendChild(child);
                return node;
            }
            var current_menu_li, current_menu_li_ul, current_submenu_li, current_submenu_li_ul;
            var endpoints_ul = ul();
            var endpointHtml = function (endp, make_api_links) {
                var is_valid = endp.parameters.length === 0;
                var type = is_valid ? 'valid' : 'template';
                var preview = is_valid ? ('&nbsp;' + ext_link("https://api.github.com".concat(endp.endpoint))) : '';
                var endp_doc = ext_link(endp.endpoint_doc_link, 'docs');
                var api_doc = make_api_links
                    ? ('&nbsp;' + ext_link(endp.api_doc_link, "".concat(endp.api, " docs"))) : '';
                return "<button class=\"picker-select-btn api-endpoint ".concat(type, "\">").concat(endp.endpoint, "</button>").concat(preview, "&nbsp;").concat(endp_doc).concat(api_doc);
            };
            for (var _d = 0, _e = selectEndpoints.endpoints; _d < _e.length; _d++) {
                var endpoint = _e[_d];
                var new_menu = get.menu.current(endpoint) !== get.menu.previous;
                if (new_menu) {
                    current_menu_li = li(get.menu.picker(endpoint));
                    // current_menu_li.insertAdjacentHTML('beforeend', );
                    current_menu_li_ul = ul();
                    current_menu_li.appendChild(current_menu_li_ul);
                    endpoints_ul.appendChild(current_menu_li);
                    get.menu.previous = get.menu.current(endpoint);
                }
                var new_submenu = get.submenu.current(endpoint) !== get.submenu.previous;
                if (new_menu || new_submenu) {
                    current_submenu_li = li(get.submenu.picker(endpoint));
                    current_submenu_li_ul = ul();
                    current_submenu_li.appendChild(current_submenu_li_ul);
                    current_menu_li_ul === null || current_menu_li_ul === void 0 ? void 0 : current_menu_li_ul.appendChild(current_submenu_li);
                    get.submenu.previous = get.submenu.current(endpoint);
                }
                current_submenu_li_ul === null || current_submenu_li_ul === void 0 ? void 0 : current_submenu_li_ul.appendChild(li(endpointHtml(endpoint, make_api_links)));
            }
            document.getElementById('endpoints-menu').innerHTML = '';
            document.getElementById('endpoints-menu').appendChild(endpoints_ul);
            document.getElementById('endpoint_count').innerText = "Now showing ".concat(selectEndpoints.endpoints.length, " endpoints.");
        }
        if (EndpointsMenu.settings(selected) !== false) {
            selectEndpoints();
            displayEndpoints();
        }
        else {
            console.log('no need to refresh');
        }
    };
    /*** Endpoints Menu Settings (#endpoints_selectors) **************************************************/
    /**
    * initalizes EndpointsMenu.settings  if needed and sets the current selection within it to
    * selected argument, if provided. Otherwise the current selection is set to Default.
    * IMPORTANT: first call, if selected is provided, also acts to permanently set the defaults to selected
    * IMPORTANT: first call, if selected not provided,  permanently set the defaults to fallback_defaults.
    *
    * @param {object} selected If not provided, EndpointsMenu.settings.selected = EndpointsMenu.settings.defaults
    * @returns EndpointsMenu.settings
    */
    EndpointsMenu.settings = Object.assign(function (selected) {
        // (<any>window).settings = EndpointsMenu.settings; // does this need to go outside of settings? Needed at all?
        var prev_selected = typeof EndpointsMenu.settings.selected === 'object'
            ? JSON.stringify(EndpointsMenu.settings.selected)
            : "";
        EndpointsMenu.settings.ALL = {
            'Show.Category': __spreadArray([], window.endpoints_json.categories, true),
            'Show.API': __spreadArray([], Object.keys(window.endpoints_json.apis), true),
            'Show.Parameters.selections': __spreadArray(['Show endpoints with no parameters'], window.endpoints_json.parameters, true),
            'Show.Parameters.Require': ['Any'],
            'Sort': ['Category ▲', 'Parameters ▼', 'API ▼', 'Endpoint ▼'],
        };
        if (!EndpointsMenu.settings.options) {
            EndpointsMenu.settings.options = {
                'Show.Category': __spreadArray([], window.endpoints_json.categories, true),
                'Show.API': __spreadArray([], Object.keys(window.endpoints_json.apis), true),
                'Show.Parameters.selections': __spreadArray(['Show endpoints with no parameters'], window.endpoints_json.parameters, true),
                // above: an array: multiple selections, allow all and none Show endpoints with no parameters MUST BE ZEROTH
                'Show.Parameters.Require': ['Any', 'All'],
                'Sort': [
                    ['Category ▼', 'Category ▲'],
                    ['API ▼', 'API ▲'],
                    ['Parameters ▼', 'Parameters ▲'],
                    ['Endpoint ▼', 'Endpoint ▲'] // alphanum by endpoint string. THIS CAN ONLY BE THE THIRD SELECTION
                ],
            };
        }
        var fallback_defaults = __assign({}, EndpointsMenu.settings.ALL);
        if (selected) {
            if (EndpointsMenu.settings.selected) {
                // selections are already set, we are just changing some or all of them
                EndpointsMenu.settings.selected = __assign(__assign({}, EndpointsMenu.settings.selected), selected);
            }
            else if (EndpointsMenu.settings.defaults) {
                // selections never set but defaults were, so we set all to selections or mix with defaults 
                EndpointsMenu.settings.selected = __assign(__assign({}, EndpointsMenu.settings.defaults), selected);
            }
            else {
                // first call: nothing's set and we have EndpointsMenu.settings. So fill out all missing in selected 
                // with fallback_defaults and use that to be both the current EndpointsMenu.settings and the defaults.
                EndpointsMenu.settings.selected = __assign(__assign({}, fallback_defaults), selected);
                EndpointsMenu.settings.defaults = __assign({}, EndpointsMenu.settings.selected);
            }
        }
        else {
            if (!EndpointsMenu.settings.defaults) {
                EndpointsMenu.settings.defaults = __assign({}, fallback_defaults);
            }
            if (!EndpointsMenu.settings.selected) {
                EndpointsMenu.settings.selected = __assign({}, EndpointsMenu.settings.defaults);
            }
        }
        if (prev_selected === JSON.stringify(EndpointsMenu.settings.selected))
            return false; // no change so no need to regenerate new html!
        return EndpointsMenu.settings;
    });
    return EndpointsMenu;
}());
//# sourceMappingURL=EndpointsMenu.js.map