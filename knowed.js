'use strict'
const knowed = {
    defined: (obj) => typeof obj !== 'undefined' && obj != null && obj ? true : false,
    possible: (obj) => typeof obj !== 'undefined' && obj != null ? true : false,
    gatherParent: function (id, parent) {
        var ret = [];
        try {
            var elem = parent.getElementById(id);
            if (this.defined(elem)) { ret = [elem]; }
        }
        catch (e) { }
        return ret;
    },
    gather: function (id, parent) {
        var elem = false;
        if (!this.defined(parent)) { parent = document; }
        if (this.defined(id)) {
            if (typeof id === 'function') { id.apply(this, [this]); }
            else {
                var objFound = false;
                try {
                    var obj = typeof id === 'object';
                    if (obj && 'knowed' in id) { elem = id; }
                    else if (obj && 'nodeType' in id) { elem = [id]; }
                    else if (obj && 'originalTarget' in id && this.possible(id.originalTarget)) { elem = [id.originalTarget]; }
                    else if (obj && 'target' in id) { elem = [id.target]; }
                    if (elem) { objFound = true; }
                } catch (e) { objFound = false; }
                if (objFound) { }
                else if (id.constructor.name == 'Array') {
                    elem = [];
                    var div = null;
                    id.forEach((val) => {
                        try { div = parent.querySelector(val) || parent.getElementById(val); }
                        catch (e) { div = null; }
                        if (this.defined(div)) { elem.push(div); }
                    });
                    if (elem.length == 0) { elem = false; }
                }
                else if (id == document || id == "document" || id == "[object Document]") { elem = [document]; }
                else if (id == window || id == "window" || id == "[object Window]") { elem = [window]; }
                else if (id == document.body || id === "body") { elem = [document.body]; }
                else if (id == document.head || id === "head") { elem = [document.head]; }
                else if (typeof id === 'string') {
                    var ids = [id];
                    var ix = '', dummy = null;
                    elem = [];
                    var elems = [];
                    for (var i = 0; i < ids.length; i++) {
                        ix = ids[i];
                        try {
                            if (ix.indexOf('<') > -1 && ix.indexOf('>') > -1) {
                                if (ix.indexOf('\n') > -1 || ix.indexOf('\r') > -1 || ix.indexOf('><') > -1) {
                                    dummy = document.createElement('div');
                                    dummy.innerHTML = ix;
                                    elems = [dummy.firstChild];
                                }
                                else { elems = [document.createElement(ix.replace('<', '').replace('>', ''))]; }
                            }
                            else if (ix.indexOf(',') > -1 || ix.indexOf('#') > -1 || ix.indexOf('.') > -1 || ix.indexOf('[') > -1) {
                                if (ix.length > 1) {
                                    try { elems = parent.querySelectorAll(ix); }
                                    catch (e) { elems = []; }
                                }
                            }
                            else {
                                elems = this.gatherParent(ix, parent);
                                if (elems.length == 0) {
                                    try { elems = parent.querySelectorAll(ix); }
                                    catch (e) { elems = []; }
                                }
                            }
                        }
                        catch (e) { elems = []; }
                        if (elems.length > 0) {
                            if (ids.length == 1) { elem = elems; }
                            else { elem.push.apply(elem, Array.prototype.slice.call(elems)); }
                        }
                    }
                    if (elem.length == 0) { elem = false; }
                }
                else { elem = [id]; }
                if (elem.length == 1 && elem[0] == null) { elem = false; }
            }
        }
        if (!elem || !this.defined(elem)) { elem = []; }
        return elem;
    }
};

const knowedProto = function (id, parent) {
    this.knowed = true;
    this.nodes = knowed.gather(id, parent);
    this.length = this.nodes.length;
    this.each = (callback) => {
        if (this.length > 0) { this.nodes.forEach(callback); }
        return this;
    };
};

const knowedCore = knowedProto.prototype;
if (typeof $knowedExtend !== 'undefined') {
    $knowedExtend.forEach(extend => {
        if (extend) { Object.assign(knowedCore, extend); }
    });
}
if (typeof window !== 'undefined') { window.$knowed = (key, parent) => new knowedProto(key, parent); }
else if (typeof module !== 'undefined') { module.exports = knowedCore; }