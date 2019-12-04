const DOMNodeCollection = require('./dom_node_collection.js');

const _docReadyCallbacks = [];
let _docReady = false;

window.$l = (arg) => {
    switch (typeof arg) {
        case "function":
            return registerDocReadyCallback(arg);
        case "string":
            return getNodesFromDom(arg);
        case "object":
            if(arg instanceof HTMLElement){
                return new DOMNodeCollection([arg]);
            }
    }
};

$l.extend = (base, ...otherObjs) => {
    otherObjs.forEach((obj) => {
        for (const prop in obj) {
            base[prop] = obj[prop];
        }
    });
    return base;
}

$l.ajax = (options) => {
    const request = new XMLHttpRequest();
    const defaults = {
        method: 'GET',
        url: "",
        success: () => {},
        error: () => {},
        data: {},
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    options = $l.extend(defaults, options);
    options.method = options.method.toUpperCase();

    request.open(options.method, options.url, true);
    request.onload = (e) => {
        if (request.status === 200) {
            options.success(request.response);
        } else {
            options.error(request.response);
        }
    };
    request.setRequestHeader("Access-Control-Allow-Origin", '*');
    request.send(JSON.stringify(options.data));
};

registerDocReadyCallback = (func)=>{
    if(!_docReady){
        _docReadyCallbacks.push(func);
    }else{
        func();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    _docReady = true;
    _docReadyCallbacks.forEach(func => func());
});

getNodesFromDom = (selector) => {
    const nodes = document.querySelectorAll(selector);
    const nodesArray = Array.from(nodes);

    return new DOMNodeCollection(nodesArray);
};