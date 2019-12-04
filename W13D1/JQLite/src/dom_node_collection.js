
class DOMNodeCollection{
    constructor(nodes) {
        this.nodes = nodes;
    }

    on(eventName, callback) {
        this.nodes.forEach((node) => {
            node.addEventListener(eventName, callback);
            const eventKey = `jqliteEvent-${eventName}`;
            if (typeof node[eventKey] === "undefined") {
                node[eventKey] = [];
            }
            node[eventKey].push(callback);
        });
    }

    off(eventName){
        this.nodes.forEach((node) => {
            const eventKey = `jqliteEvent-${eventName}`;
            if (node[eventKey]) {
                node[eventKey].forEach((callback) => {
                    node.removeEventListener(eventName, callback);
                });
            }
            node[eventKey] = [];
        });
    }

    html(html) {
        if (typeof html === "string") {
            this.forEach((node) => {
            node.innerHTML = html;
            });
        } else if (this.nodes.length > 0) {
            return this.nodes[0].innerHTML;
        }
    }

    empty() {
        this.html("");
    }

    append(children) {
        if (this.nodes.length === 0) return;

        if (typeof children === "object" && !(children instanceof DOMNodeCollection)) {
            children = $l(children);
        }

        if(typeof children === "string"){
            this.nodes.forEach((node)=>{
                node.innerHTML += children;
            });
        }

        if (children instanceof DOMNodeCollection){
            this.nodes.forEach((node)=>{
                children.nodes.forEach((childNode) => {
                    node.appendChild(childNode.cloneNode(true));
                });
            });
        }
    }

    attr(key, val){
        if(typeof val === "string"){
            this.nodes.forEach(node=> node.setAttribute(key,val));
        }else{
            return this.nodes[0].getAttribute(key);
        }
    }

    addClass(newClass){
        this.nodes.forEach(node => node.classList.add(newClass));
    }

    removeClass(oldClass){
        this.nodes.forEach(node => node.classList.remove(oldClass));
    }

    children() {
        let childNodes = [];

        this.nodes.forEach((node) => {
            const childNodeList = node.children;
            childNodes = childNodes.concat(Array.from(childNodeList));
        });

        return new DOMNodeCollection(childNodes);
    }

    parent(){
        const parentNodes = [];

        this.nodes.forEach(({parentNode}) => {
            if (!parentNode.visited) {
                parentNodes.push(parentNode);
                parentNode.visited = true;
            }
        });

        parentNodes.forEach((node) => {
            node.visited = false;
        });

        return new DOMNodeCollection(parentNodes);
    }

    find(selector){
        let foundNodes = [];
        this.nodes.forEach((node) => {
            const nodeList = node.querySelectorAll(selector);
            foundNodes = foundNodes.concat(Array.from(nodeList));
        });
        return new DOMNodeCollection(foundNodes);
    }

    remove(){
        this.nodes.forEach(node => node.parentNode.removeChild(node));
    }
}

module.exports = DOMNodeCollection;