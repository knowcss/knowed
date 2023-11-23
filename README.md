# knowed
The No-Nonsense Query Selector

knowed.js is a powerful query selector that allows you to select, manage, and create nodes within DOM.

```
// string, comma separated strings, or array
$knowed('div').each(elem => { console.log(elem); });
$knowed(['div']).each(elem => { console.log(elem); });
$knowed('div,span').each(elem => { console.log(elem); });
$knowed(['div', 'span']).each(elem => { console.log(elem); });

// by tag, id, class, attributes, or combine all 4 as needed
$knowed('.class').each(elem => { console.log(elem); });
$knowed('#id').each(elem => { console.log(elem); });
$knowed('[data-attr]').each(elem => { console.log(elem); });
$knowed('form,.class,#id,[data-attr]').each(elem => { console.log(elem); });
$knowed(['form', '.class', '#id', '[data-attr]']).each(elem => { console.log(elem); });

// use your own callback function
const callBack = (elem) => {};
$knowed('div').each(callBack);

// selector may be window, document, body, head etc
$knowed(window).each(callBack);
$knowed(document).each(callBack);
$knowed('body').each(callBack);
$knowed('head').each(callBack);

// node or nodes or arrays of nodes
const id = document.querySelector('#id');
$knowed(id).each(elem => {});
const divs = document.querySelectorAll('div');
$knowed(divs).each(elem => {});
$knowed([id, divs]).each(elem => {});

// save to const/var/let to keep in active memory for reuse
// this will gracefully skip any nodes that have vanished since initilization
const fields = $knowed('#form select, #form input, #form textarea');
if (fields.length > 0) {
  fields.each(field => { console.log(elem); });
}

// create a new node from html block
$knowed('<div>new</div>').each(elem => {
  // append new elem to DOM here
});

// Anything that works with querySelector/querySelectorAll/getElementById/etc
$knowed('ANY VALID QUERY SELECTOR').each(elem => {});

// Extend base functionality with your own methods
window.$knowedExtend = window.$knowedExtend || [];

// display basics for nodes
window.$knowedExtend.push({
    'display': function (val) { return this.each(elem => { elem.style.display = val || 'block'; }); },
    'visibility': function (val) { return this.each(elem => { elem.style.visibility = val || 'visible'; }); }
});

// hide and show nodes
window.$knowedExtend.push({
    'hide': function () { return this.display('none').visibility('hidden'); },
    'show': function (val) { return this.display(val || 'block').visibility('visible'); },
});

// easy events
window.$knowedExtend.push({
    'on': function (event, callback, config) { return this.each(elem => { elem.addEventListener(event, callback, config); }); },
    'off': function (event, callback) { return this.each(elem => { elem.removeEventListener(event, callback); }); },
    'once': function (event, callback) { return this.on(event, callback, { once: true }); }
});
```
