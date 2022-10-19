function makeListEditable(list_elem, make_all_draggable=true, make_all_deletable=true) {
  // adapted from: https://codepen.io/retrofuturistic/pen/DJWYBv
  // But this is safe to be run multiple times on the same list_elem and you 
  // would do this each time a new <li> is added. (makeListEditable needs the 
  // entire list each time so that's the best way to do it, for now.)

  if (make_all_draggable) { list_elem.classList.add('draggable_list_items'); }
  if (make_all_deletable) { list_elem.classList.add('deletable_list_items'); }


  var items = list_elem.querySelectorAll('li'); // DO NOT RENAME items
  
  if (list_elem.classList.contains('draggable_list_items')) {
    [].forEach.call(items, addDraggableButton);
    [].forEach.call(items, addDnDHandlers);
    
  }

  if (list_elem.classList.contains('deletable_list_items')) {
    [].forEach.call(items, addDeleteButton);

  }

  function addDeleteButton(li) {
    const result = li.querySelector('button[deletable]')
    if (!li.querySelector('button[deletable]')) {
      // console.log(`no delete button found for ${li.innerText}: ${result}`)
      const btn = document.createElement('button');
      btn.setAttribute('deletable', 'true');
      li.appendChild(btn);
      btn.addEventListener('click', e => {
        console.log('removing', e.target.parentNode)
        e.target.parentNode.remove();
      })
    }
    // else console.log(`${li.innerText} already had delete button`);
  }

  function addDraggableButton(li) {
    if (!li.querySelector('button[draggable]')) {
      const btn = document.createElement('button');
      btn.setAttribute('draggable', 'true');
      li.appendChild(btn);
    }
    // else console.log(`${li.innerText} already had drag button`);
  }

  // function addDeleteButton(li) {
  //   function handleClickDelete(e) {
  //     console.log('removing', e.target.parentNode)
  //     e.target.parentNode.remove();
  //   }
  //   const btn = document.createElement('button');
  //   btn.setAttribute('deletable', 'true');
  //   li.appendChild(btn);
  //   btn.addEventListener('click', handleClickDelete)
  // }
  

  function addDnDHandlers(li, add_draggable_button=true, reset=true) {
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

  
  var dragSrcEl = null;

  function handleDragStart(e) {
    dragSrcEl = this; // Target (this) element is the source node.
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    this.classList.add('dragElem'); // .dragElem identifies element being moved.
  }

  function handleDragOver(e) {
    if (e.preventDefault) { e.preventDefault();  } // Necessary. Allows us to drop.

    this.classList.add('over'); // .over added to element dragged over (where dragElem can be moved before)
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
  }

  function handleDragEnter(e) {
    // this / e.target is the current hover target.
  }

  function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  }

  function handleDrop(e) {
    if (e.stopPropagation) { e.stopPropagation();  } // Stops some browsers from redirecting.

    // Don't do anything if dropping the same movable we're dragging.
    if (dragSrcEl != this) { // this/e.target is current target element.
      // Set the source movable's HTML to the HTML of the movable we dropped on.
      this.parentNode.removeChild(dragSrcEl);
      var dropHTML = e.dataTransfer.getData('text/html');
      this.insertAdjacentHTML('beforebegin',dropHTML);
      var dropElem = this.previousSibling;

      dropElem.classList.add('drop-confirm')
      setTimeout(() => { dropElem.classList.remove('drop-confirm'); }, 1000)

      addDnDHandlers(dropElem, false, false);
    }
    this.classList.remove('over');
    return false;
  }

  function handleDragEnd(e) {  
    this.classList.remove('over'); // this/e.target is the source node.

    [].forEach.call(items, function (li) {
      li.classList.remove('dragElem');
      li.classList.remove('over');
      setTimeout(() => {
        li.classList.remove('dragElem');
        li.classList.remove('over');
      }, 200)
    });

  }
}
