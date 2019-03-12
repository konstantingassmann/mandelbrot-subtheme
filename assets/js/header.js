(function () {
  var suggestList = null;
  var element = null;
  var input = null;
  var components = {};
  
  var htmlTag = function (tag, atts) {
    atts = typeof atts == 'undefined'? {} : atts;
    var elem = window.document.createElement(tag);
    
    for(var att in atts) {
      var directAtts = ['innerHTML', 'className'];
      if(!atts.hasOwnProperty(att)) {
        continue;
      }
      
      if(directAtts.indexOf(att) !== -1) {
        elem[att] = atts[att];
        continue;
      }
      elem.setAttribute(att, atts[att]);
      
    }
    return elem;
  }
  
  var clickItem = function(e) {
    window.location.href = e.target.getAttribute('data-link');
  }
  
  var stepToItem = function(direction) {
    var newEl = document.activeElement.previousSibling;
    
    if(direction == 40) {
      newEl = document.activeElement.nextSibling;
    }
    
    if(newEl) {
      newEl.focus();
    }
    else if(direction == 38) {
      input.focus();
    }
    else {
      suggestList.children[0].focus();
    }
  }
  
  var enterItem = function(e) {
    if(e.keyCode == 13) {
      clickItem(e);
    }
    
    if(e.keyCode == 40 || e.keyCode == 38) {
      stepToItem(e.keyCode);
    }
  }
  
  var closeOverlay = function(e) {
    if(e.keyCode == 27 && suggestList) {
      suggestList.parentElement.removeChild(suggestList);
      suggestList = null;
    }
  }
    
  var filter = function(e) {
    var search = e.target.value;
    if(!search) {
      if(suggestList) {
        suggestList.innerHTML = '';
      }
      return;
    }
    
    if(e.keyCode == 40) {
      suggestList.children[0].focus();
      return;
    }
    
    if(!suggestList) {
      suggestList = htmlTag('ul', { className: 'Autosuggest-flyout' });
      element.appendChild(suggestList);
      window.addEventListener('keyup', closeOverlay);
    }
    else {
      suggestList.innerHTML = '';
    }
    
    Object.keys(components)
    .filter(name => new RegExp(`.*${search}.*`,'g').exec(name))
    .forEach(item => {
      var li = htmlTag('li', { className: 'Autosuggest-item', innerHTML: item.split('.')[0], tabindex: 0, 'data-link': components[item] });
      li.addEventListener('click', clickItem);
      li.addEventListener('keydown', enterItem);
      suggestList.appendChild(li);
    });
  }  
  
  var loaded = function() {
    
    element = document.querySelector('.Autosuggest');
    if(!element) {
      return;
    }
    
    var links = document.querySelectorAll('.Tree-entityLink');
    for(var key in links) {
      if(!links.hasOwnProperty(key)) {
        continue;
      }
      var link = links[key];
      components[link.href.split('/').pop()] = link.href;
    }
    
    input = element.querySelector('.Autosuggest-search');
    // input.addEventListener('keyup', filter);
  }

  document.addEventListener('DOMContentLoaded', loaded);

})();