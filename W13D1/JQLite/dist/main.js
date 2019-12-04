/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass DOMNodeCollection{\n    constructor(nodes) {\n        this.nodes = nodes;\n    }\n\n    on(eventName, callback) {\n        this.nodes.forEach((node) => {\n            node.addEventListener(eventName, callback);\n            const eventKey = `jqliteEvent-${eventName}`;\n            if (typeof node[eventKey] === \"undefined\") {\n                node[eventKey] = [];\n            }\n            node[eventKey].push(callback);\n        });\n    }\n\n    off(eventName){\n        this.nodes.forEach((node) => {\n            const eventKey = `jqliteEvent-${eventName}`;\n            if (node[eventKey]) {\n                node[eventKey].forEach((callback) => {\n                    node.removeEventListener(eventName, callback);\n                });\n            }\n            node[eventKey] = [];\n        });\n    }\n\n    html(html) {\n        if (typeof html === \"string\") {\n            this.forEach((node) => {\n            node.innerHTML = html;\n            });\n        } else if (this.nodes.length > 0) {\n            return this.nodes[0].innerHTML;\n        }\n    }\n\n    empty() {\n        this.html(\"\");\n    }\n\n    append(children) {\n        if (this.nodes.length === 0) return;\n\n        if (typeof children === \"object\" && !(children instanceof DOMNodeCollection)) {\n            children = $l(children);\n        }\n\n        if(typeof children === \"string\"){\n            this.nodes.forEach((node)=>{\n                node.innerHTML += children;\n            });\n        }\n\n        if (children instanceof DOMNodeCollection){\n            this.nodes.forEach((node)=>{\n                children.nodes.forEach((childNode) => {\n                    node.appendChild(childNode.cloneNode(true));\n                });\n            });\n        }\n    }\n\n    attr(key, val){\n        if(typeof val === \"string\"){\n            this.nodes.forEach(node=> node.setAttribute(key,val));\n        }else{\n            return this.nodes[0].getAttribute(key);\n        }\n    }\n\n    addClass(newClass){\n        this.nodes.forEach(node => node.classList.add(newClass));\n    }\n\n    removeClass(oldClass){\n        this.nodes.forEach(node => node.classList.remove(oldClass));\n    }\n\n    children() {\n        let childNodes = [];\n\n        this.nodes.forEach((node) => {\n            const childNodeList = node.children;\n            childNodes = childNodes.concat(Array.from(childNodeList));\n        });\n\n        return new DOMNodeCollection(childNodes);\n    }\n\n    parent(){\n        const parentNodes = [];\n\n        this.nodes.forEach(({parentNode}) => {\n            if (!parentNode.visited) {\n                parentNodes.push(parentNode);\n                parentNode.visited = true;\n            }\n        });\n\n        parentNodes.forEach((node) => {\n            node.visited = false;\n        });\n\n        return new DOMNodeCollection(parentNodes);\n    }\n\n    find(selector){\n        let foundNodes = [];\n        this.nodes.forEach((node) => {\n            const nodeList = node.querySelectorAll(selector);\n            foundNodes = foundNodes.concat(Array.from(nodeList));\n        });\n        return new DOMNodeCollection(foundNodes);\n    }\n\n    remove(){\n        this.nodes.forEach(node => node.parentNode.removeChild(node));\n    }\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nconst _docReadyCallbacks = [];\nlet _docReady = false;\n\nwindow.$l = (arg) => {\n    switch (typeof arg) {\n        case \"function\":\n            return registerDocReadyCallback(arg);\n        case \"string\":\n            return getNodesFromDom(arg);\n        case \"object\":\n            if(arg instanceof HTMLElement){\n                return new DOMNodeCollection([arg]);\n            }\n    }\n};\n\n$l.extend = (base, ...otherObjs) => {\n    otherObjs.forEach((obj) => {\n        for (const prop in obj) {\n            base[prop] = obj[prop];\n        }\n    });\n    return base;\n}\n\n$l.ajax = (options) => {\n    const request = new XMLHttpRequest();\n    const defaults = {\n        method: 'GET',\n        url: \"\",\n        success: () => {},\n        error: () => {},\n        data: {},\n        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'\n    };\n    options = $l.extend(defaults, options);\n    options.method = options.method.toUpperCase();\n\n    request.open(options.method, options.url, true);\n    request.onload = (e) => {\n        if (request.status === 200) {\n            options.success(request.response);\n        } else {\n            options.error(request.response);\n        }\n    };\n    request.setRequestHeader(\"Access-Control-Allow-Origin\", '*');\n    request.send(JSON.stringify(options.data));\n};\n\nregisterDocReadyCallback = (func)=>{\n    if(!_docReady){\n        _docReadyCallbacks.push(func);\n    }else{\n        func();\n    }\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    _docReady = true;\n    _docReadyCallbacks.forEach(func => func());\n});\n\ngetNodesFromDom = (selector) => {\n    const nodes = document.querySelectorAll(selector);\n    const nodesArray = Array.from(nodes);\n\n    return new DOMNodeCollection(nodesArray);\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });