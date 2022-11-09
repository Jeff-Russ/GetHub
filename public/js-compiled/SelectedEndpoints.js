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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var SelectedEndpoints = /** @class */ (function () {
    function SelectedEndpoints() {
    }
    // called in index.html and in this file
    SelectedEndpoints.addValid = function (endpoint) {
        // const endpoint = (typeof btn === 'string') ? btn : btn.innerText;
        console.log("SelectedEndpoints.addValid on \"".concat(endpoint, "\""));
        var endpointGET_ol = document.getElementById('endpoints_get_list');
        var endpoint_preview = SelectedEndpoints.endpointPreview(endpoint);
        // console.log(endpoint_preview)
        endpointGET_ol.insertAdjacentHTML('beforeend', "<li endpoint=\"".concat(endpoint, "\"><span class=\"endpoint\">").concat(endpoint, "<span contenteditable> </span></span>").concat(endpoint_preview, "</li>"));
        SelectedEndpoints.makeListEditable(endpointGET_ol);
    };
    // called in index.html and in this file
    SelectedEndpoints.addTemplate = function (endpoint) {
        // const text = (typeof btn === 'string') ? btn : btn.innerText
        endpoint = endpoint.replace(/{([^a-zA-Z0-9+])/, '$1{');
        console.log("SelectedEndpoints.addTemplate on \"".concat(endpoint, "\""));
        var endpoint_html = endpoint.split(/(\{.*?\})/g).reduce(function (a, s) { return (s[0] !== '{' ? a + s : "".concat(a, "<span contenteditable orig=").concat(s, ">").concat(s, "</span>")); }, '');
        var endpoint_preview = SelectedEndpoints.endpointPreview(endpoint);
        // console.log(endpoint_preview)
        var endpointGET_ol = document.getElementById('endpoints_get_list');
        endpointGET_ol.insertAdjacentHTML('beforeend', "<li endpoint=\"".concat(endpoint, "\"><span class=\"endpoint\">").concat(endpoint_html, "<span contenteditable> </span></span>").concat(endpoint_preview, "</li>"));
        SelectedEndpoints.makeListEditable(endpointGET_ol);
    };
    // SelectedEndpoints.handleClickGET is called by JS as handler and by my code! This could be a problem!
    SelectedEndpoints.handleClickGET = function (event /*ignored*/, update_query_string) {
        if (update_query_string === void 0) { update_query_string = true; }
        return __awaiter(this, void 0, void 0, function () {
            function flashContentAndCSSClass(element, temp_content, temp_css_class, ms) {
                if (ms === void 0) { ms = 1000; }
                var original_text = element.innerHTML;
                if (temp_content) {
                    element.innerHTML = temp_content;
                }
                if (temp_css_class) {
                    element.classList.add(temp_css_class);
                }
                setTimeout(function () {
                    if (temp_content) {
                        element.innerHTML = original_text;
                    }
                    if (temp_css_class) {
                        element.classList.remove(temp_css_class);
                    }
                }, ms);
            }
            var endpoints_list, endpoint_spans, _a, res_error, api_response_el, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        endpoints_list = document.getElementById('endpoints_get_list');
                        endpoint_spans = Array.from(endpoints_list.querySelectorAll('span.endpoint'));
                        window.selected_URLs = endpoint_spans.map(function (span) { return "https://api.github.com".concat(span.innerText.trim()); });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        // const errors = [];
                        _a = window;
                        return [4 /*yield*/, Promise.all(// (<any>window).responses is global
                            window.selected_URLs.map(function (endpoint) { return (fetch(endpoint).then(function (res) { return res.ok ? res.json() : { ERROR: res.status }; })); }))];
                    case 2:
                        // const errors = [];
                        _a.responses = _b.sent();
                        res_error = false;
                        window.rendered_json = // (<any>window).rendered_json is global
                            window.responses.reduce(function (ob, res, idx) {
                                var _a;
                                if ("ERROR" in res) {
                                    res_error = true;
                                    var bad_li = document.querySelector("#endpoints_get_list > li:nth-child(".concat(idx + 1, ")"));
                                    // const bad_li_sizing = bad_li.getBoundingClientRect()
                                    // document.getElementById('endpoints_get_list')
                                    flashContentAndCSSClass.apply(void 0, [bad_li, , 'flash-fail', 2000]);
                                    return ob;
                                }
                                return __assign(__assign({}, ob), (_a = {}, _a["".concat(idx, " ").concat(window.selected_URLs[idx].slice(22))] = CollectionUtils.objectifyArray(res), _a));
                            }, {});
                        if (!res_error) {
                            api_response_el = document.getElementById("api-response");
                            api_response_el.innerHTML = '';
                            renderjson.set_icons("▶", "▼");
                            renderjson.set_show_to_level(3);
                            api_response_el.appendChild(renderjson(window.rendered_json));
                            DisplayedResponse.linkify(DisplayedResponse.handleClickValid, DisplayedResponse.handleClickTemplate);
                            // if (errors.length) throw new AggregateError(errors, "fetch failed!");
                            // SelectedEndpoints.toQueryString(endpoints_list?:HTMLElement, pushState=true) 
                            if (update_query_string) {
                                // TODO: convince typescript that this function, defined in index.html, exists (or will exist).
                                // @ts-ignore
                                SelectedEndpoints.toQueryString();
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.error("WE GOT an ERROR", err_1);
                        flashContentAndCSSClass.apply(void 0, [document.getElementById('endpoints_get_list'), , 'flash-fail', 2000]);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SelectedEndpoints.makeSelectors = function (max_sorts) {
        // this must be called after EndpointsMenu.settings is called (and EndpointsMenu.settings.options are set)
        // and should not be called more than once!
        // About max_sorts: there are actually 4 possible (EndpointsMenu.settings.options.Sort.length). TODO: try with 4
        if (max_sorts === void 0) { max_sorts = 3; }
        var select = {
            Sort_by: document.getElementById('Sort_by_select'),
            Sort_dir: document.getElementById('Sort_dir_select'),
            'Show.Category': document.getElementById('show_categories_select'),
            'Show.API': document.getElementById('show_apis_select'),
            'Show.Parameters.selections': document.getElementById('show_params_select'),
            'Show.Parameters.Require': document.getElementById('require_params_select'),
        };
        appendSortOptions(max_sorts);
        appendShowOptions();
        var _loop_1 = function (key) {
            select[key].addEventListener('change', function (event) {
                // const htmlCollection = event.target.selectedOptions; // does not work with this (in JS)
                var htmlCollection = select[key].selectedOptions;
                var selected_obj = {};
                if (htmlCollection) {
                    var selected = Array.from(htmlCollection).map(function (option_el) { return option_el.innerText; });
                    // get the right place in EndpointsMenu.settings.selected 
                    var ksplit = key.split('_'); // to put selected_options:
                    if (ksplit.length === 2) { // EndpointsMenu.settings.selected['Sort']
                        var sort_setting = __spreadArray([], EndpointsMenu.settings.selected.Sort, true);
                        var selected_sorts = selected[0].trim().split(/\s+/);
                        var len = Math.min(selected.length, sort_setting.length);
                        if (ksplit[1] === 'by') {
                            for (var i = 0; i < len; i++) {
                                sort_setting[i] = selected_sorts[i] + sort_setting[i].slice(-2);
                            }
                        }
                        else { //if (ksplit[1] === 'dir') {
                            for (var i = 0; i < len; i++) {
                                sort_setting[i] = sort_setting[i].slice(0, -1) + selected_sorts[i];
                            }
                        }
                        selected_obj.Sort = sort_setting;
                        console.log("currently:\n".concat(__spreadArray([], EndpointsMenu.settings.selected.Sort, true), " Sort by change to:\n").concat(sort_setting));
                    }
                    else { // EndpointsMenu.settings.selected['Show.*']
                        selected_obj[key] = selected;
                        // console.log('selected_obj:',JSON.stringify(selected_obj, null, 2))
                    }
                }
                EndpointsMenu.refreshContents(selected_obj);
                EndpointsMenu.makeCollapsible();
                EndpointsMenu.setupSelection(SelectedEndpoints.addValid, SelectedEndpoints.addTemplate);
                SelectedEndpoints.makeListEditable(document.getElementById('endpoints_get_list'));
            });
        };
        for (var key in select) {
            _loop_1(key);
        }
        function appendSortOptions(max_sorts) {
            if (max_sorts === void 0) { max_sorts = 3; }
            // About max_sorts: there are actually 4 possible (EndpointsMenu.settings.options.Sort.length). TODO: try with 4
            var directions = [
                CollectionUtils.bisect(EndpointsMenu.settings.options.Sort[0][0], 0, 1)[1],
                CollectionUtils.bisect(EndpointsMenu.settings.options.Sort[0][1], 0, 1)[1]
            ];
            var sortables = EndpointsMenu.settings.options.Sort.map(function (option) { return option[0].slice(0, -2); });
            var preventSectionHell = function (perm) {
                var sliced = perm.slice(0, 2).join('');
                var include = !perm.slice(0, 2).join('').includes('Endpoint');
                // console.log(`${perm} = sliced: ${sliced} ? ${include}`)
                return include;
            };
            var sort_options_data = CollectionUtils.permuteChooseR(sortables, max_sorts, preventSectionHell).sort().reverse();
            ;
            var direction_options_data = CollectionUtils.combinationsWithReps(directions, 4);
            // console.log(direction_options_data)
            var sort_options_html = sort_options_data.map(function (sorts) {
                // const selected_by_default = 
                return "<option>" + sorts.join(' ') + "</option>";
            });
            var direction_options_html = direction_options_data.map(function (dirs) {
                return "<option>&nbsp;&nbsp;" + dirs.join('&nbsp;'.repeat(10)) + "</option>";
            });
            // console.log(Array.isArray(sort_options_html))
            // console.log(direction_options_html)
            select.Sort_by.innerHTML = sort_options_html.join('\n');
            select.Sort_dir.innerHTML = direction_options_html.join('\n');
        }
        function appendShowOptions() {
            var _a = EndpointsMenu.settings.options, categories = _a["Show.Category"], apis = _a["Show.API"], params = _a["Show.Parameters.selections"], params_require = _a["Show.Parameters.Require"];
            var option = function (opt) { return "<option>".concat(opt, "</option>"); };
            select['Show.Category'].innerHTML = categories.map(function (opt) { return option(opt); }).join('\n');
            select['Show.API'].innerHTML = apis.map(function (opt) { return option(opt); }).join('\n');
            select['Show.Parameters.selections'].innerHTML = params.map(function (opt) { return option(opt); }).join('\n');
            select['Show.Parameters.Require'].innerHTML = params_require.map(function (opt) { return option(opt); }).join('\n');
        }
    };
    SelectedEndpoints.makeListEditable = function (list_elem, make_all_draggable, make_all_deletable) {
        // adapted from: https://codepen.io/retrofuturistic/pen/DJWYBv
        // But this is safe to be run multiple times on the same list_elem and you 
        // would do this each time a new <li> is added. (SelectedEndpoints.makeListEditable needs the 
        // entire list each time so that's the best way to do it, for now.)
        if (make_all_draggable === void 0) { make_all_draggable = true; }
        if (make_all_deletable === void 0) { make_all_deletable = true; }
        if (make_all_draggable) {
            list_elem.classList.add('draggable_list_items');
        }
        if (make_all_deletable) {
            list_elem.classList.add('deletable_list_items');
        }
        var items = list_elem.querySelectorAll('li'); // DO NOT RENAME items
        if (list_elem.classList.contains('draggable_list_items')) {
            [].forEach.call(items, addDraggableButton);
            [].forEach.call(items, function (item) { return addDnDHandlers(item); });
        }
        if (list_elem.classList.contains('deletable_list_items')) {
            [].forEach.call(items, addDeleteButton);
        }
        function addDeleteButton(li) {
            if (!li.querySelector('button[deletable]')) {
                // console.log(`no delete button found for ${li.innerText}: ${result}`)
                var btn = document.createElement('button');
                btn.setAttribute('deletable', 'true');
                li.appendChild(btn);
                btn.addEventListener('click', function (e) {
                    console.log('removing', li);
                    li.remove();
                });
            }
            // else console.log(`${li.innerText} already had delete button`);
        }
        function addDraggableButton(li) {
            if (!li.querySelector('button[draggable]')) {
                var btn = document.createElement('button');
                btn.setAttribute('draggable', 'true');
                li.appendChild(btn);
            }
            // else console.log(`${li.innerText} already had drag button`);
        }
        function addDnDHandlers(li, add_draggable_button, reset) {
            if (add_draggable_button === void 0) { add_draggable_button = true; }
            if (reset === void 0) { reset = true; }
            /* Argument of type
            '(li: HTMLLIElement, add_draggable_button?: boolean, reset?: boolean) => void'
            is not assignable to parameter of type
            '(value: never, index: number, array: never[]) => void'.
            Types of parameters 'add_draggable_button' and 'index' are incompatible.
              Type 'number' is not assignable to type 'boolean | undefined'.ts(2345) */
            if (add_draggable_button && !li.querySelector('button[draggable]')) {
                var btn = document.createElement('button');
                btn.setAttribute('draggable', 'true');
                li.appendChild(btn);
            }
            if (reset)
                li.removeEventListener('dragstart', handleDragStart, false);
            li.addEventListener('dragstart', handleDragStart, false);
            if (reset)
                li.removeEventListener('dragenter', handleDragEnter, false);
            li.addEventListener('dragenter', handleDragEnter, false);
            if (reset)
                li.removeEventListener('dragover', handleDragOver, false);
            li.addEventListener('dragover', handleDragOver, false);
            if (reset)
                li.removeEventListener('dragleave', handleDragLeave, false);
            li.addEventListener('dragleave', handleDragLeave, false);
            if (reset)
                li.removeEventListener('drop', handleDrop, false);
            li.addEventListener('drop', handleDrop, false);
            if (reset)
                li.removeEventListener('dragend', handleDragEnd, false);
            li.addEventListener('dragend', handleDragEnd, false);
        }
        var dragSrcEl = null;
        function handleDragStart(e) {
            var _a;
            dragSrcEl = this; // Target (this) element is the source node.
            e.dataTransfer.effectAllowed = 'move';
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/html', this.outerHTML);
            this.classList.add('dragElem'); // .dragElem identifies element being moved.
        }
        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            } // Necessary. Allows us to drop.
            this.classList.add('over'); // .over added to element dragged over (where dragElem can be moved before)
            e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
            return false;
        }
        function handleDragEnter() {
            // this / e.target is the current hover target.
        }
        function handleDragLeave() {
            this.classList.remove('over'); // this / e.target is previous target element.
        }
        function handleDrop(e) {
            var _a;
            if (e.stopPropagation) {
                e.stopPropagation();
            } // Stops some browsers from redirecting.
            // Don't do anything if dropping the same movable we're dragging.
            if (dragSrcEl != this && dragSrcEl !== null) { // this/e.target is current target element.
                // Set the source movable's HTML to the HTML of the movable we dropped on.
                (_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(dragSrcEl);
                var dropHTML = e.dataTransfer.getData('text/html');
                this.insertAdjacentHTML('beforebegin', dropHTML);
                var dropElem_1 = this.previousSibling;
                dropElem_1.classList.add('drop-confirm');
                setTimeout(function () { dropElem_1.classList.remove('drop-confirm'); }, 1000);
                addDnDHandlers(dropElem_1, false, false);
            }
            this.classList.remove('over');
            return false;
        }
        function handleDragEnd(e) {
            this.classList.remove('over'); // this/e.target is the source node.
            [].forEach.call(items, function (li) {
                li.classList.remove('dragElem');
                li.classList.remove('over');
                setTimeout(function () {
                    li.classList.remove('dragElem');
                    li.classList.remove('over');
                }, 200);
            });
        }
    };
    SelectedEndpoints.toQueryString = function (endpoints_list, pushState) {
        if (pushState === void 0) { pushState = true; }
        // needs pushQueryString (in helpers.js)
        endpoints_list !== null && endpoints_list !== void 0 ? endpoints_list : (endpoints_list = document.getElementById('endpoints_get_list'));
        var query_string = '?endpoint=' + __spreadArray([], Array.from(endpoints_list.querySelectorAll('li')), true).map(function (li) {
            var user_values = __spreadArray([], Array.from(li.querySelectorAll('span > span[contenteditable')), true).map(function (editable) {
                return "\"".concat(editable.innerText, "\"");
            }).join(',');
            return "".concat(li.getAttribute('endpoint'), "(").concat(user_values, ")");
        }).join('&endpoint=');
        if (query_string.length > 10) {
            if (pushState)
                QueryStringUtils.push(query_string);
            return query_string;
        }
        return '';
    };
    SelectedEndpoints.fromQueryString = function (list_el_to_populate, get) {
        if (list_el_to_populate === void 0) { list_el_to_populate = false; }
        if (get === void 0) { get = false; }
        // needs parseQueryMixed (in helpers.js) and (various) (in endpoints.js)
        // console.log(`SelectedEndpoints.fromQueryString(${list_el_to_populate}, ${get})`)
        if (!window.location.search)
            return;
        var endpts = QueryStringUtils.parseMixed(window.location.search).endpoint;
        if (!Array.isArray(endpts)) {
            endpts = [endpts];
        }
        endpts = endpts.map(function (endpt) {
            var _a = endpt.split(/\("|","|"\)/).filter(Boolean), endpoint = _a[0], editables = _a.slice(1);
            return { endpoint: endpoint, editables: __spreadArray([], editables, true), is_template: !!editables.join('').trim() };
        });
        if (list_el_to_populate) {
            // console.log('populating endpoints to GET list')
            if (list_el_to_populate === true) {
                list_el_to_populate = document.getElementById('endpoints_get_list'); // default if true
            }
            var _loop_2 = function (endpt) {
                if (endpt.is_template) {
                    SelectedEndpoints.addTemplate(endpt.endpoint);
                    var editables = list_el_to_populate.querySelectorAll("li:last-of-type > span.endpoint > span[contenteditable]");
                    editables.forEach(function (editable, idx) {
                        editable.innerText = endpt.editables[idx] || '';
                    });
                }
                else
                    SelectedEndpoints.addValid(endpt.endpoint);
            };
            for (var _i = 0, endpts_1 = endpts; _i < endpts_1.length; _i++) {
                var endpt = endpts_1[_i];
                _loop_2(endpt);
            }
            if (get) {
                // TODO: remember how to convince TS to do this!
                // @ts-ignore
                SelectedEndpoints.handleClickGET.apply(SelectedEndpoints, [, false]); // false means don't update query string
            }
        }
        // console.log(JSON.stringify(endpts,null,2))
        return endpts;
    };
    // called in  SelectedEndpoints.addValid and SelectedEndpoints.addTemplate (both in this file only)
    SelectedEndpoints.endpointPreview = function (endpoint) {
        return "<a class=\"endpoint-preview\" href=\"https://api.github.com".concat(endpoint, "\" target=\"_blank\"><a>");
    };
    return SelectedEndpoints;
}());
//# sourceMappingURL=SelectedEndpoints.js.map