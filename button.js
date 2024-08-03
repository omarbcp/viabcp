class QMButtons {
    constructor(parametrosCustom) {
        const parametrosDefault = {
            container:'wrap-section-buttons',
            buttons:[
                {type:'primary', label:'Lo quiero', size: 'big'}
            ]
        }
        const container = this.createElement()
        container.this.addClass()
    }
    createElement(tagName){
        const elemento = document.createElement(tagName)
        return elemento
    }
    addChild(listElement){
        listElement.forEach((e)=>{
            this.element.appendChild(e)
        })
        return this;
    }
    addClass(data) {
        if(typeof data == 'string'){
            this.element.classList.add(data);
        } else {
            data.forEach((className)=>{
                this.element.classList.add(className);
            })
        }
        return this;
    }
    setAttribute(attribute, value) {
        this.element.setAttribute(attribute, value);
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
        if (child instanceof HTMLElement) {
            this.element.appendChild(child.element);
        } else if (child instanceof Node) {
            this.element.appendChild(child);
        } else {
            throw new Error("El hijo debe ser una instancia de HTMLElement o Node.");
        }
        return this;
    }
    appendTo(parent) {
        if (parent instanceof HTMLElement) {
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