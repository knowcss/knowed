# knowed
The No-Nonsense Query Selector

```
// string, comma separated strings, or array
$knowed('div').each(elem => { console.log(elem); });
$knowed(['div']).each(elem => { console.log(elem); });
$knowed('div,span').each(elem => { console.log(elem); });
$knowed(['div','span']).each(elem => { console.log(elem); });

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
window.$knowedExtend.push({
    'display': function (val) { return this.each(elem => { elem.style.display = val || 'block'; }); },
    'visibility': function (val) { return this.each(elem => { elem.style.visibility = val || 'visible'; }); }
});
window.$knowedExtend.push({
    'hide': function () { return this.display('none').visibility('hidden'); },
    'show': function (val) { return this.display(val || 'block').visibility('visible'); },
});
```
