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
(function () {
    // adapted from https://github.com/admirhodzic/multiselect-dropdown to be dark mode
    var style = document.createElement('style');
    style.setAttribute("id", "multiselect_dropdown_styles");
    style.innerHTML = "\n  .multiselect-dropdown{\n    display: inline-block;\n    padding: 0px;\n    border-radius: 4px;\n    border: solid 1px rgba(147, 198, 191, 0.1);\n    background-color: #5c5858;\n    position: relative;\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\");\n    background-repeat: no-repeat;\n    background-position: right .1rem center;\n    background-size: 13px 10px;\n  }\n  .multiselect-dropdown span.optext, .multiselect-dropdown span.placeholder{\n    color: #e2e3dc;\n    margin-right:0.5em; \n    border-radius: 4px; \n    display:inline-block;\n  }\n  .multiselect-dropdown span.optext{\n    background-color: #5c5858;;\n    padding-left: 4px; \n  }\n  .multiselect-dropdown span.optext .optdel {\n    float: right;\n    margin: 0 -5px -2px 1px;\n    font-size: 1.3em;\n    margin-top: 2px;\n    cursor: pointer;\n    color: #888;\n  }\n  .multiselect-dropdown span.optext .optdel:hover {\n    color: #c66;\n  }\n  .multiselect-dropdown span.placeholder{\n    color: #e2e3dc;\n    padding-left: 3px;\n\n\n  }\n  .multiselect-dropdown-list-wrapper{\n    box-shadow: gray 0 3px 8px;\n    z-index: 100;\n    padding:2px;\n    border-radius: 4px;\n    border: solid 1px #ced4da;\n    display: none;\n    margin: -1px;\n    position: absolute;\n    top:0;\n    left: 0;\n    right: 0;\n    background: rgb(52, 51, 47);\n  }\n  .multiselect-dropdown-list-wrapper .multiselect-dropdown-search{\n    margin-bottom:5px;\n  }\n  .multiselect-dropdown-list{\n    padding:2px;\n    height: 15rem;\n    overflow-y:auto;\n    overflow-x: hidden;\n  }\n  .multiselect-dropdown-list::-webkit-scrollbar {\n    width: 6px;\n  }\n  .multiselect-dropdown-list::-webkit-scrollbar-thumb {\n    background-color: #bec4ca;\n    border-radius:3px;\n  }\n\n  .multiselect-dropdown-list div{\n    padding: 5px;\n  }\n  .multiselect-dropdown-list input{\n    height: 1.15em;\n    width: 1.15em;\n    margin-right: 0.35em;  \n  }\n  .multiselect-dropdown-list div.checked{\n  }\n  .multiselect-dropdown-list div:hover{\n    background-color: rgb(32, 31, 27);;\n  }\n  .multiselect-dropdown span.maxselected {width:100%;}\n  .multiselect-dropdown-all-selector {border-bottom:solid 1px #999;}\n  ";
    document.head.appendChild(style);
    function MultiselectDropdown(options) {
        var config = __assign({ search: true, height: '15rem', placeholder: 'select', txtSelected: 'selected', txtAll: 'All', txtRemove: 'Remove', txtSearch: 'search' }, options);
        function newEl(tag, attrs) {
            var e = document.createElement(tag);
            if (attrs !== undefined)
                Object.keys(attrs).forEach(function (k) {
                    if (k === 'class') {
                        Array.isArray(attrs[k]) ? attrs[k].forEach(function (o) { return o !== '' ? e.classList.add(o) : 0; }) : (attrs[k] !== '' ? e.classList.add(attrs[k]) : 0);
                    }
                    else if (k === 'style') {
                        Object.keys(attrs[k]).forEach(function (ks) {
                            e.style[ks] = attrs[k][ks];
                        });
                    }
                    else if (k === 'text') {
                        attrs[k] === '' ? e.innerHTML = '&nbsp;' : e.innerText = attrs[k];
                    }
                    else
                        e[k] = attrs[k];
                });
            return e;
        }
        document.querySelectorAll("select[multiple]").forEach(function (el, k) {
            var _a, _b, _c, _d, _e, _f, _g;
            var div = newEl('div', { class: 'multiselect-dropdown', style: { width: (_b = (_a = config.style) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : el.clientWidth + 'px', padding: (_d = (_c = config.style) === null || _c === void 0 ? void 0 : _c.padding) !== null && _d !== void 0 ? _d : '' } });
            el.style.display = 'none';
            el.parentNode.insertBefore(div, el.nextSibling);
            var listWrap = newEl('div', { class: 'multiselect-dropdown-list-wrapper' });
            var list = newEl('div', { class: 'multiselect-dropdown-list', style: { height: config.height } });
            var search = newEl('input', { class: ['multiselect-dropdown-search'].concat([(_f = (_e = config.searchInput) === null || _e === void 0 ? void 0 : _e.class) !== null && _f !== void 0 ? _f : 'form-control']), style: { width: '100%', display: ((_g = el.attributes['multiselect-search']) === null || _g === void 0 ? void 0 : _g.value) === 'true' ? 'block' : 'none' }, placeholder: config.txtSearch });
            listWrap.appendChild(search);
            div.appendChild(listWrap);
            listWrap.appendChild(list);
            el.loadOptions = function () {
                var _a;
                list.innerHTML = '';
                if (((_a = el.attributes['multiselect-select-all']) === null || _a === void 0 ? void 0 : _a.value) == 'true') {
                    var op = newEl('div', { class: 'multiselect-dropdown-all-selector' });
                    var ic = newEl('input', { type: 'checkbox' });
                    op.appendChild(ic);
                    op.appendChild(newEl('label', { text: config.txtAll }));
                    op.addEventListener('click', function () {
                        op.classList.toggle('checked');
                        op.querySelector("input").checked = !op.querySelector("input").checked;
                        var ch = op.querySelector("input").checked;
                        list.querySelectorAll(":scope > div:not(.multiselect-dropdown-all-selector)")
                            .forEach(function (i) { if (i.style.display !== 'none') {
                            i.querySelector("input").checked = ch;
                            i.optEl.selected = ch;
                        } });
                        el.dispatchEvent(new Event('change'));
                    });
                    ic.addEventListener('click', function (ev) {
                        ic.checked = !ic.checked;
                    });
                    list.appendChild(op);
                }
                Array.from(el.options).map(function (o) {
                    var op = newEl('div', { class: o.selected ? 'checked' : '', optEl: o });
                    var ic = newEl('input', { type: 'checkbox', checked: o.selected });
                    op.appendChild(ic);
                    op.appendChild(newEl('label', { text: o.text }));
                    op.addEventListener('click', function () {
                        // console.log("main click listener")
                        op.classList.toggle('checked');
                        op.querySelector("input").checked = !op.querySelector("input").checked;
                        op.optEl.selected = !op.optEl.selected;
                        el.dispatchEvent(new Event('change'));
                    });
                    ic.addEventListener('click', function (ev) {
                        // console.log(`clicked 'input',{type:'checkbox',checked:o.selected})`)
                        ic.checked = !ic.checked;
                    });
                    o.listitemEl = op;
                    list.appendChild(op);
                });
                div.listEl = listWrap;
                div.refresh = function () {
                    var _a, _b, _c, _d;
                    div.querySelectorAll('span.optext, span.placeholder').forEach(function (t) { return div.removeChild(t); });
                    var sels = Array.from(el.selectedOptions);
                    if (sels.length > ((_b = (_a = el.attributes['multiselect-max-items']) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 5)) {
                        div.appendChild(newEl('span', { class: ['optext', 'maxselected'], text: sels.length + ' ' + config.txtSelected }));
                    }
                    else {
                        sels.map(function (x) {
                            var _a;
                            var c = newEl('span', { class: 'optext', text: x.text, srcOption: x });
                            if ((((_a = el.attributes['multiselect-hide-x']) === null || _a === void 0 ? void 0 : _a.value) !== 'true'))
                                c.appendChild(newEl('span', { class: 'optdel', text: '✖', title: config.txtRemove,
                                    onclick: function (ev) {
                                        // console.log("onClick")
                                        c.srcOption.listitemEl.dispatchEvent(new Event('click'));
                                        div.refresh();
                                        ev.stopPropagation();
                                    } }));
                            div.appendChild(c);
                        });
                    }
                    if (0 == el.selectedOptions.length)
                        div.appendChild(newEl('span', { class: 'placeholder', text: (_d = (_c = el.attributes['placeholder']) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : config.placeholder }));
                };
                div.refresh();
            };
            el.loadOptions();
            search.addEventListener('input', function () {
                // console.log('input listener')
                list.querySelectorAll(":scope div:not(.multiselect-dropdown-all-selector)").forEach(function (d) {
                    var txt = d.querySelector("label").innerText.toUpperCase();
                    d.style.display = txt.includes(search.value.toUpperCase()) ? 'block' : 'none';
                });
            });
            div.addEventListener('click', function () {
                div.listEl.style.display = 'block';
                search.focus();
                search.select();
            });
            document.addEventListener('click', function (event) {
                // console.log("document click")
                if (!div.contains(event.target)) {
                    listWrap.style.display = 'none';
                    div.refresh();
                }
            });
        });
    }
    window.addEventListener('load', function () {
        MultiselectDropdown(window.MultiselectDropdownOptions);
    });
})();
//# sourceMappingURL=multiselect-dropdown.js.map