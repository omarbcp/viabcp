//const digitalData = []
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
class QIModal extends QIHTMLElement {
    constructor(data){
        super('div').addClass(['qi_modal_venta']).setAttribute({id:data.id})
        const wrapper = new QIHTMLElement('div').addClass(['qi_contenedor_modal']).getElement()
        const closeButton = new QIHTMLElement('button').addClass(['qi_cerrar_modal']).setHTML('X').getElement()
        const header = new QIHTMLElement('header').addClass('bcp_modal_header').addchildren(data.header).getElement()
        const body = new QIHTMLElement('section').addClass('bcp_modal_body').addchildren(data.body).getElement()
        this.element.appendChild(header)
        this.element.appendChild(body)
        return this.element
    }
    openModal(){
        this.element.classList.add('bcp_modal_open')
    }
    closeModal(){
        this.element.classList.remove('bcp_modal_open')
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

const buildButtons = (data)=>{
    const allButtons = []
    data.content.forEach(button =>{
        const newButton = new QIButton(button)
        newButton.addEventListener('click',()=>{taggeoActionMulti (taggeoGeneric,{label:button.label})})
        allButtons.push(newButton)
    })
    const sectionButton = new QIHTMLElement().addClass(data.clase).addchildren(allButtons).getElement()
    return sectionButton
}
let taggeoGeneric = {
    product_category:"Seguros",
    channel : "ViaBCP",
    group : "ViaBCP",
    position:"",
    subflow:"",
    name: "Click",
    creative:"",
    category:"Modal Form-SOS",
    product:"SOS",
    message:'',
    event:"trackAction",
    version:'Seguros'
}
const dataModal = {
    piloto:{
        header:[
            {clase:['bcp_descripcion','familiar'],content:'<span>Seguro S.O.S. Salud</span><br>por <span>S/ 1.70</span> al día<br><b>(Inc. IGV)</b> con <span>ambulancia<br>ilimitada gratis</span>'},
            {tag:'img',clase:['img_logo','familiar'],attrib:{src:'/wcm/connect/d05ed1cb-6796-4f1f-9f41-a13fa3ba835b/Frame+1000005031%402x.png?MOD=AJPERES&attachment=false&id=1742914779488'}}
        ],
        body:{
            step1:[
                {clase:'bcp_beneficio',content:'Hasta <span>S/ 30,000</span> en cobertura para emergencias médicas.'},
                {clase:'title_form',content:'Completa tus datos y te contactaremos'},
                //{clase:'plan_sor_formulario_inputs',content:buildForm('piloto')},
                {clase:'input_declaracion',content:'Al enviar tu información, autorizas el uso de tus datos por BCP. Revísalo <a id="tycPD">aquí</a>.'},
                {clase:['bcp_grupo_botones','bcp_grupo_confirmar'],
                content:[
                    {
                        clases:'btn-primary-comprar',
                        label:'Llámenme',
                        functions:sendForm
                    },
                    {
                        clases:['bcp_boton_blanco','bcp_boton_blanco_a'],
                        label:'No, gracias',
                        functions:sendForm
                    }
                    ]
                },
                {clase:'respaldo-pacifico-wo',content:'<p class="">Con el respaldo de</p><img src="/wcm/connect/2db31610-d5e9-4a05-9f64-83bc1fa4490f/Group+%281%29.png?MOD=AJPERES&attachment=false&id=1729805654191" alt="">'}

            ],
            step2:[
                {clase:'thpg_spot',content:'<img src="/wcm/connect/82a836f8-cb4c-494e-9a94-2cfaee078567/spot_circle_m_spc_mobile_success_hand_d_l.svg?MOD=AJPERES&attachment=true&id=1722142373600" alt="">'},
                {clase:'thpg_title',content:'¡Gracias por tu interés en<br>nuestro seguro!'},
                {clase:'thpg_content',content:'Si aplicas al <span>Seguro S.O.S. Salud</span>,<br> nos comunicaremos contigo.'},
                {clase:'thpg_buttons',content:[
                    {
                        clases:'thpg_close',
                        label:'Entendido',
                        functions:sendForm                       
                    }
                ]}
            ]
        },
        taggeo:{
            version:'Seguros-1803Test'
        }      
    }
}
function taggeoActionMulti (taggeoGeneric,taggeoCustom){
    const taggeoDataDefault = taggeoGeneric
    const taggeo = {...taggeoDataDefault,...taggeoCustom}
    if(typeof digitalData !== 'undefined'){
        let dataTaggeo = {
            trackAction : {
                action: {group: taggeo.group,category: taggeo.category,name: taggeo.name,label: taggeo.label},
                metadata: {key: "Producto",value: taggeo.product},
                event: "trackAction"
            },
            trackPromotionView: {
                promotion:{name:taggeo.name,creative:taggeo.creative,position:taggeo.position},
                event:"trackPromotionView"
            },
            trackInsurancesRequests:{
                application:{product:taggeo.product,product_category:taggeo.product_category,subflow:taggeo.subflow},
                event:"trackInsurancesRequests"
            },
            trackElement: {
                element:{container:taggeo.container,type:taggeo.type,name:taggeo.name},
                event:"trackElement"
            },
            trackFormView:{
                form:{channel:taggeo.channel,name:taggeo.name,product:taggeo.product,version:taggeo.version},
                event:"trackFormView"
            },
            trackFormSubmit:{
                form:{channel:taggeo.channel,name:taggeo.name,product:taggeo.product,version:taggeo.version},
                event:"trackFormSubmit"
            },
            trackError:{
                error:{code:"VIABCP-HOME-SOS",message:taggeo.message},
                event:"trackError"
            }
        }
        if(dataTaggeo[taggeo.event]){
            digitalData.push(dataTaggeo[taggeo.event])
        } else {
            console.log('no se encontro evento de taggeo')
        }
    }
}

function sendForm(parametro){
    console.log('Enviando formulario...', parametro)
}
const containerButtons = buildButtons(dataModal.piloto.body.step1[3]);
document.getElementById('app').appendChild(containerButtons)