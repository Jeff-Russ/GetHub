// function addEndpointSelectionListener(button_el) {
//   /**
//    * addEndpointSelectionListener should be called with each `button.api-endpoint` in 
//    * order to addEventListener on it which, if clicked, adds a <li> to #endpointGET-ol 
//    * with content from button_el.innerText and unhides the #endpointGET container if hidden.
//    * 
//    * TOO: THIS SHOULD ALSO ADD THE HANDLER TO THE SUBMIT BUTTON UPON FIRST CALL
//    * 
//    * each button should be either `button.api-endpoint valid`, 
//    * i.e.:
//    * <button class="picker-select-btn api-endpoint valid">/app</button>
//    * or, from the previous api results:
//    * <button class="api-endpoint valid">/repos/edx/.github</button>
//    * 
//    * 
//    * or the button should be `button.api-endpoint template`, 
//    * i.e.:
//    * <button class="picker-select-btn api-endpoint template" id="endpoint-selected">/orgs/{org}/actions/cache/usage</button>
//    *  or, from the previous api results:
//    * <button class="api-endpoint template">/repos/edx/.github/keys{/key_id}</button>
//    * 
//    * In the later case #endpointGET will have a sequence of editable and non-editable
//    * text inserted within split between segements of the button_el.innerText 
//    * that are and aren't editable (surrounded by { }). 
//    * 
//    * In the former case: only one non-ediable text element take from button_el.innerText 
//    */

//   if (button_el.getAttribute('listening') === 'true') {
//     console.warn(`addEndpointSelectionListener already called ${button_el.innerText}`)
//     return
//   }
  
//   if (!button_el.classList.contains('api-endpoint')) {
//     console.warn(`addEndpointSelectionListener called with ${button_el.innerText}, which is not a .api-endpoint`)
//     return
//   }
//   const new_li = document.createElement('li');
//   const endpointGET_ol = document.getElementById('endpointGET-ol')

//   if (button_el.classList.contains('valid')) {
//     button_el.addEventListener('click', function(e) {
//       const btn = e.target;
//       console.log(btn)


//       btn.setAttribute('listening', 'true');
//     });

//   } else if (button_el.classList.contains('template')) {
//     const btn = e.target;
//     console.log(btn)
//   } else {
//     console.warn(`addEndpointSelectionListener requires passed element to have either .template or .valid`)
//     return
//   }
//   const container = document.getElementById('endpointGET')
  



// }



const colors = {
  opened_bg: '#6494b6', // should match hovered / navigated button color in css
  closed_bg: '#707070'  // should match default button color set in css
}


function makeEndpointsMenuCollapsible() {
  // This should probably be a resuable, recursive function to make nested 
  // lists of arbitray length collapsible But for now,  it's just 
  // for a single use with a list that has two layers of collapsibles
  const menu_list_items = document.querySelectorAll('div#endpoints-menu > ul > li')

  menu_list_items.forEach((menu_li, menu_idx) => { // there are three of them
    // each menu_li is a <button> and another <ul> comprise of <li> which are submenu items
    // the button should always and should toggle the visibility of the submenu ul that comes
    // it. If toggled on all OTHER menu_li's submenu ul's should be toggled off

    const menu_li_sel_btn = menu_li.querySelector('button.picker-menu-btn') // not endpoints

    menu_li_sel_btn.addEventListener("click", function(event)
    {
      // console.log(`event listener called from part 1 of makeEndpointsMenuCollapsible`)

      if (document.getElementById('endpoint-selected')) {
        // endpoints-menu is locked
        console.log("endpoints-menu is locked. Deselect the selected endpoint to navigate other endpoints")
        return
      }
      const submenu = menu_li.querySelector('ul')

      if (!submenu.style.display || submenu.style.display === 'none') {
        // open menu
        submenu.style.display = 'block'
        menu_li_sel_btn.style.backgroundColor = colors.opened_bg

        menu_list_items.forEach((other_menu_li, other_menu_idx) => {
          if (other_menu_idx !== menu_idx) {
            const other_submenu = other_menu_li.querySelector('ul')
            if (other_submenu) other_submenu.style.display = 'none'
            const other_submenu_btn = other_menu_li.querySelector('button.picker-menu-btn')
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
    const sublist_btns = menu_li.querySelectorAll('button.picker-submenu-btn')

    sublist_items.forEach((sublist_item, sublist_item_idx) => {
      const sublist_btn = sublist_item.querySelector('button.picker-submenu-btn')


      sublist_btn.addEventListener("click", function(event)
      {
        // console.log(`event listener called from part 2 of makeEndpointsMenuCollapsible`)

        if (document.getElementById('endpoint-selected')) {
          // endpoints-menu is locked
          console.log("endpoints-menu is locked. Deselect the selected endpoint to navigate other endpoints")
          return
        }
        const submenu = sublist_item.querySelector('ul')

        if (!submenu.style.display || submenu.style.display === 'none') {
          submenu.style.display = 'block'
          sublist_btn.style.backgroundColor = colors.opened_bg

          sublist_items.forEach((other_menu_li, other_menu_idx) => {
            if (other_menu_idx !== sublist_item_idx) {
              const other_submenu = other_menu_li.querySelector('ul')
              if (other_submenu) other_submenu.style.display = 'none'
              const other_submenu_btn = other_menu_li.querySelector('button.picker-submenu-btn')
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

function setupEndpointsMenuSelection(clickApiEndpointValid, clickApiEndpointTemplate) {

  

  const parents = document.querySelectorAll('div#endpoints-menu > ul > li > ul > li')
  parents.forEach((parent_li) => 
  {
    const select_btns = parent_li.querySelectorAll('button.picker-select-btn') // these are actual endpoints

    select_btns.forEach(select_btn => {
      select_btn.addEventListener("click", function(event)
      { 
        console.log(`event listener called from setupEndpointsMenuSelection`)
        function setDisplayOnBtnsListSiblings(select_btn, display) {
        /*<ul>
            <li><button class="picker-menu-btn"><strong>Additional Endpoints</strong></button> 
            <ul> <!-- great_ul -->
              <li><button class="picker-submenu-btn">activity</button>&nbsp<a href="https://docs.github.com/en/rest/activity" target="_blank"></a>
                <ul> !-- outer_ul -->
                  <li> <!-- parent_li or sibling_li-->
                    <button class="picker-select-btn">/events</button>&nbsp */
          const parent_li = select_btn.parentElement
          const outer_ul = parent_li.parentElement
          const sibling_items = Array.from(outer_ul.children)

          sibling_items.forEach(sibling_li => {
            if (sibling_li !== parent_li) {
              // console.log("setting others to", display)
              sibling_li.style.display = display
            }
          })
          const grand_li = outer_ul.parentElement
          const great_ul = grand_li.parentElement
          const grand_siblings = Array.from(great_ul.children)

          grand_siblings.forEach(grand_sibling => {
            if (grand_sibling !== grand_li) {
              grand_sibling.style.display = display
            }
          })

          const great_li = great_ul.parentElement
          const ggreat_ul = great_li.parentElement
          const ggrand_siblings = Array.from(ggreat_ul.children)

          ggrand_siblings.forEach(ggrand_sibling => {
            if (ggrand_sibling !== great_li) {
              ggrand_sibling.style.display = display
            }
          })
          
        }
        
        const selected_btn = document.getElementById('endpoint-selected')
        const endpoints_menu = document.getElementById('endpoints-menu')

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
            if (select_btn.classList.contains('valid') && clickApiEndpointValid) {
              clickApiEndpointValid(select_btn)

            } else if ((select_btn.classList.contains('template') && clickApiEndpointTemplate)) {
              clickApiEndpointTemplate(select_btn)
            }
          }
        }
      })
    })
  })
}


// document.addEventListener("DOMContentLoaded", function(){
//   makeEndpointsMenuCollapsible()
//   setupEndpointsMenuSelection()
  
// });