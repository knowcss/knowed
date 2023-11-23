window.$knowedExtend = window.$knowedExtend || [];

/* Block */
window.$knowedExtend.push({
    "display": function (val) { return this.each(elem => { elem.style.display = val; }); },
    "visibility": function (val) { return this.each(elem => { elem.style.visibility = val; }); },
    "hide": function () { return this.display("none").visibility("hidden"); },
    "show": function (val) { return this.display(val || "block").visibility("visible"); },
    "html": function (html) { return this.each(elem => { elem.innerHTML = html; }); },
    "empty": function () { return this.html(""); },
    "first": function () { return this.length > 0 ? this.nodes[0] : null; },
    "disabled": function (val) {
        return this.each(elem => {
            if (val) { elem.setAttribute("disabled", "disabled"); }
            else { elem.removeAttribute("disabled"); }
        });
    },
    "notouch": function (val) {
        return this.each(elem => {
            elem.style.pointerEvents = val ? "none" : "auto";
            elem.style.userSelect = val ? "none" : "auto";
        });
    },
    "opacity": function (val) { return this.each(elem => { elem.style.opacity = val; }); }
});

/* Events */
window.$knowedExtend.push({
    "on": function (event, callback, config) { return this.each(elem => { elem.addEventListener(event, callback, config); }); },
    "off": function (event, callback) { return this.each(elem => { elem.removeEventListener(event, callback); }); },
    "once": function (event, callback) { return this.on(event, callback, { once: true }); }
});

/* URL */
window.$knowedExtend.push({
    "jump": function (offset, motion) { window.scrollTo({ 'top': offset || 0, 'behavior': motion || "instant" }); }
});

/* Create */
window.$knowedExtend.push({
    "createElem": function (tag, attrs, onload, onerror) {
        var newElem = document.createElement(tag);
        if (attrs) {
            for (var key in attrs) {
                if (attrs.hasOwnProperty(key)) { newElem.setAttribute(key, attrs[key]); }
            }
        }
        if (onload) { newElem.onload = onload; }
        if (onerror) { newElem.onerror = onerror; }
        return this.each(elem => { elem.appendChild(newElem); });
    }
});

/* Ajax */
window.$knowedExtend.push({
    "await": async function (url, method, data, headers, type) {
        return new Promise((resolve, reject) => {
            $knowed("body").ajax(url, (res, err) => {
                if (err) { reject(err); }
                else { resolve(res); }
            }, method, data, headers, type);
        });
    },
    "ajax": function (url, callback, method, data, headers, type) {
        var xhr = new XMLHttpRequest();
        xhr.open(method || "GET", url);
        headers = headers || {};
        if (type == "json") {
            headers["Content-Type"] = "application/" + type;
            if (typeof data !== 'string') { data = JSON.stringify(data); }
        }
        for (var key in headers) { xhr.setRequestHeader(key, headers[key]); }
        xhr.send(data);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) { callback(xhr.responseText, null); }
                else { callback(null, xhr.responseText); }
                setTimeout(() => {
                    xhr.abort();
                    xhr = null;
                }, 1);
            }
        };
    }
});


/* Form Input */
window.$knowedExtend.push({
    "val": function () {
        var ret = "";
        const forThis = this;
        this.each(elem => {
            if (!ret) { ret = forThis.value(elem); }
        });
        return ret;
    },
    "value": function (elem) {
        var ret = "";
        try {
            if (elem.getAttribute('type') == "checkbox") { ret = ("checked" in elem && elem.checked) || false; }
            else if (!elem.matches(":disabled") && elem.tagName !== 'BUTTON') {
                if (elem.tagName === 'SELECT') { ret = elem.selectedIndex > -1 ? elem.options[elem.selectedIndex].value : ""; }
                else if ("value" in elem) { ret = elem.value || elem.getAttribute("value"); }
            }
        }
        catch (e) { ret = ""; }
        return ret;
    },
    "input": function (elem, ret, i) {
        var key = "";
        if ("name" in elem && elem.name) { key = elem.name; }
        else if ("id" in elem && elem.id) { key = elem.id; }
        else if (i) { key = "_field" + i; }
        if (key) { ret[key] = this.value(elem); }
        return ret;
    },
    "serialize": function () {
        var ret = {};
        const ctx = this;
        ctx.each(function (elem) {
            if ("elements" in elem) {
                var i = 0;
                Array.prototype.slice.call(elem.elements).forEach(elemChild => {
                    i++;
                    ret = ctx.input(elemChild, ret, i);
                });
            }
            else { ret = ctx.input(elem, ret); }
        });
        return ret;
    }
});
