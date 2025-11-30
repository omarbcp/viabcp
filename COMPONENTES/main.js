class QIHTMLElement {
    constructor(tagName='div') {
        this.element = document.createElement(tagName)
    }
    addchildren(listElement){
        listElement.forEach((e)=>{e && this.element.appendChild(e)})
        return this;
    }
    addClass(data) {
        if(typeof data == 'string'){
            this.element.classList.add(data);
        } else {
            data.forEach((className)=>{this.element.classList.add(className)})
        }
        return this;
    }
    setAttribute(attributes) {
        for (const [key, value] of Object.entries(attributes)) {this.element.setAttribute(key, value)}
        return this;
    }
    setText(text) {
        this.element.textContent = text;
        return this;
    }
    setHTML(html) {
        this.element.innerHTML = html;
        return this;
    }
    appendChild(child) {
        if (child instanceof QIHTMLElement) {
            this.element.appendChild(child.element);
        } else if (child instanceof Node) {
            this.element.appendChild(child);
        } else {
            throw new Error("El hijo debe ser una instancia de HTMLElement o Node.");
        }
        return this;
    }
    appendTo(parent) {
        if (parent instanceof QIHTMLElement) {
            parent.element.appendChild(this.element);
        } else if (parent instanceof Node) {
            parent.appendChild(this.element);
        } else {
            throw new Error("El padre debe ser una instancia de HTMLElement o Node.");
        }
        return this;
    }
    getElement() {
        return this.element;
    }
}
class QIButton extends QIHTMLElement {
    constructor(data){
        super('button').addClass(data.clases).setText(data.label).getElement()
        const parametro = data.hasOwnProperty('parametro') ? data.parametro : data.label
        this.element.onclick = ()=>{data.functions(parametro)}
        return this.element
    }
    addAction(data){
        const {functions,parameters} = data
        this.element.addEventListener('click',()=>{functions(parameters)})
    }
}