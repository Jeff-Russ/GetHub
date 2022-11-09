"use strict";
var DisplayedResponse = /** @class */ (function () {
    function DisplayedResponse() {
    }
    // called all over but only in this file 
    DisplayedResponse.handleClickValid = function (event) {
        console.log('DisplayedResponse.handleClickValid');
        SelectedEndpoints.addValid(event.target.innerText);
    };
    // called all over but only in this file 
    DisplayedResponse.handleClickTemplate = function (event) {
        console.log('DisplayedResponse.handleClickTemplate');
        SelectedEndpoints.addTemplate(event.target.innerText);
    };
    DisplayedResponse.linkify = function (handleClickValid, handleClickTemplate) {
        console.log('DisplayedResponse.linkify');
        function runLinkify(handleClickValid, handleClickTemplate) {
            var editableLinkColor = 'background-color:' + '#000000' + '; ';
            var editableLinkBbColor = 'color:' + '#2e9ae6' + '; ';
            var editableLinkBorder = 'border: 1px solid ' + '#999999' + '; border-radius: 2px; ';
            var editableLinkStyle = "".concat(editableLinkColor).concat(editableLinkBbColor, "; ").concat(editableLinkBorder);
            // const wasUsedToSet_elem_href = (elem, orig_href) => orig_href.replace( /^(https?:\/\/)([^\s]+)$/i, `$1${elem.innerHTML}`)
            // const quoted_api_valid_url_re = /^"(https?:\/\/)(api\.github\.com)([^\s{}]+)"$/i 
            var quoted_api_valid_url_re = /^"(https?:\/\/)(api\.github\.com)([^{}]+)"$/i; // see api_valid_url_re
            var quoted_api_lax_url_re = /^"(https?:\/\/)(api\.github\.com)(.+)"$/i;
            var quoted_url_re = /^"(https?:\/\/)([^\s]+)"$/i;
            var span_str = Array.from(document.querySelectorAll("div.data-linkify span.string:not(:has(*))"));
            // console.log(`runLinkify called  with ${arguments.length} args. iterating: ${span_str.length}`)
            for (var _i = 0, span_str_1 = span_str; _i < span_str_1.length; _i++) {
                var element = span_str_1[_i];
                if (element.innerHTML.match(quoted_api_valid_url_re)) // (https://)(api.github.com)(/endpoint/without:{}})
                 { // VALID URLs for GITHUB API ENDPOINT
                    element.innerHTML = element.innerHTML.replace(quoted_api_valid_url_re, "<span>$2</span><button class=\"api-endpoint valid\">$3</button><a href=\"$1$2$3\" target=\"_blank\"></a>");
                    var btn = element.querySelector('button');
                    if (handleClickValid) {
                        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", handleClickValid, false);
                    }
                    // console.log(`  found a valid api-endpoint, now set to: ${element.innerHTML}`)
                }
                else if (element.innerHTML.match(quoted_api_lax_url_re)) // (https://)(api.github.com)(/endpoint/can/have:{})
                 { // GITHUB API ENDPOINT URL TEMPLATES
                    // this is api.github.com/<endpoint/with{/variables}/anywhere{/within}>
                    // I don't like {/this} syntax. I will change them to /{this} but later?  
                    element.innerHTML = element.innerHTML.replace(quoted_api_lax_url_re, '<span>$2</span><button class="api-endpoint template">$3</button>');
                    var btn = element.querySelector('button');
                    if (handleClickTemplate) {
                        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", handleClickTemplate, false);
                    }
                    // element.addEventListener("input", event => { // "input"? not "click"??
                    //   const elem = event.target || event.srcElement;
                    //   // TODO
                    // }, false);
                    // console.log(`  found a template api-endpoint, now set to: ${element.innerHTML}`)
                }
                else if (element.innerHTML.match(quoted_url_re)) // (https://)(the.rest/of/it)
                 { // OTHER (VALID) URLs
                    // console.log(`  found a valid other-url, which was: ${element.innerHTML}`)
                    element.innerHTML = element.innerHTML.replace(quoted_url_re, '<a class="other-url valid" href="$1$2" target="_blank">$2</a>');
                    // console.log(`  and is now: ${element.innerHTML}`)
                }
            }
            // console.log(`runLinkify returning`)
        }
        runLinkify(handleClickValid, handleClickTemplate);
        // initial run is not good enough since some or all elements are not 
        // present due to being whthing a collapsed container. So we get 
        // the output from each (usually one) linkifyed div...
        var linkifieds = document.querySelectorAll('div.data-linkify');
        // console.log(linkifieds.length)
        // and re-run linkify each time it is clicked anywhere:
        linkifieds.forEach(function (linkified) {
            linkified.addEventListener('click', function () {
                setTimeout(function () {
                    // console.log(`delay over: calling runLinkify(${!!handleClickValid}, ${!!handleClickValid})`)
                    runLinkify(handleClickValid, handleClickTemplate);
                }, 40);
            }, true);
        });
    };
    return DisplayedResponse;
}());
//# sourceMappingURL=DisplayedResponse.js.map