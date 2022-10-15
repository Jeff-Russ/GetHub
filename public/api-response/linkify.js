

function linkify(handleClickApiEndpointValid, handleClickApiEndpointTemplate) {
  
  function runLinkify(handleClickApiEndpointValid, handleClickApiEndpointTemplate) {
    const editableLinkColor = 'background-color:'+'#000000'+'; '
    const editableLinkBbColor = 'color:'+'#2e9ae6'+'; '
    const editableLinkBorder = 'border: 1px solid '+'#999999'+ '; border-radius: 2px; '
    const editableLinkStyle = `${editableLinkColor}${editableLinkBbColor}; ${editableLinkBorder}`
    // const wasUsedToSet_elem_href = (elem, orig_href) => orig_href.replace( /^(https?:\/\/)([^\s]+)$/i, `$1${elem.innerHTML}`)

    // const quoted_api_valid_url_re = /^"(https?:\/\/)(api\.github\.com)([^\s{}]+)"$/i 
    const quoted_api_valid_url_re = /^"(https?:\/\/)(api\.github\.com)([^{}]+)"$/i // see api_valid_url_re
    const quoted_api_lax_url_re = /^"(https?:\/\/)(api\.github\.com)(.+)"$/i
    const quoted_url_re = /^"(https?:\/\/)([^\s]+)"$/i 

    const span_str = document.querySelectorAll("div.data-linkify span.string:not(:has(*))")
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
          btn.addEventListener("click", handleClickApiEndpointValid, false);
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
          btn.addEventListener("click", handleClickApiEndpointTemplate, false);
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