const crearTag = (custom)=> {
    const parameterDefault = {
        tagName: 'div',
        attributes: {},
        content: ''
    }
    const paramenter = Object.assign(parameterDefault, custom);
    const {tagName, attributes, content} = paramenter;
    const element = document.createElement(tagName);
    // Asignar atributos
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    // Asignar contenido
    if (typeof content === 'string') {
        element.innerHTML = content;
    } else if (content instanceof Node) {
        element.appendChild(content);
    } else if (Array.isArray(content)) {
        content.forEach(child => {
            if (child instanceof Node) {
                element.appendChild(child);
            }
        });
    }
    return element;
}
const imgSlider = [
    '<div class="carrusel-item"><img src="https://www.viabcp.com/wcm/connect/1023101f-ecf5-4bd0-bfa9-5e3bba2aa0ab/CyberSOAT_1.png?MOD=AJPERES&attachment=true&id=1730907442601" alt="Imagen 1"></div>',
    '<div class="carrusel-item"><img src="https://www.viabcp.com/wcm/connect/5f8d0702-8f44-42cc-90e1-4d5d784c01af/Llantas_2.png?MOD=AJPERES&attachment=true&id=1730907481195" alt="Imagen 2"></div>',
    '<div class="carrusel-item"><img src="https://www.viabcp.com/wcm/connect/67db8ffb-5ece-4022-9b93-84977e488757/Bater%C3%ADas_3.png?MOD=AJPERES&attachment=true&id=1730907547516" alt="Imagen 3"></div>',
]
const imgArrows = {
    prev:`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.5704 31.574C24.1432 31.0059 24.1432 30.085 23.5704 29.5169L9.94085 16L23.5704 2.48306C24.1432 1.91503 24.1432 0.994062 23.5704 0.426025C22.9977 -0.14201 22.069 -0.14201 21.4962 0.426025L6.82958 14.9715C6.25681 15.5395 6.25681 16.4605 6.82958 17.0285L21.4962 31.574C22.069 32.142 22.9977 32.142 23.5704 31.574Z" fill="white"></path>
</svg>`,
    next:`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.42952 31.574C7.85675 31.0059 7.85675 30.085 8.42952 29.5169L22.0591 16L8.42951 2.48306C7.85675 1.91503 7.85675 0.994062 8.42951 0.426025C9.00228 -0.14201 9.93093 -0.14201 10.5037 0.426025L25.1704 14.9715C25.7431 15.5395 25.7431 16.4605 25.1704 17.0285L10.5037 31.574C9.93093 32.142 9.00228 32.142 8.42952 31.574Z" fill="white"></path>
            </svg>`
}
const createListCarrousel = (e) => e.toString().replace(/,/g, '')
const carruselContenido = crearTag({attributes:{class:'carrusel-contenido'},content:createListCarrousel(imgSlider)});
const buttons = [
    crearTag({tagName:'button',attributes: {id:'prev',class:'active'},content:imgArrows.prev}),
    crearTag({tagName:'button',attributes:{id:'next',class:'active'},content:imgArrows.next})
]
const carruselButtons = crearTag({attributes:{class:'carrusel-controles'},content:buttons});
const carrusel = crearTag({attributes:{class:'carrusel'},content:[carruselContenido, carruselButtons]});
const containerExperiment = document.querySelector('main section > div:nth-child(2) > div');
const containerDestiny = document.querySelector('main section > div:nth-child(1)');
const nodoReferencia = containerDestiny.children[0];
containerExperiment.innerHTML = ''
//containerExperiment.appendChild(carrusel);
containerDestiny.insertBefore(carrusel, nodoReferencia)
const changeLoopFeel=()=>{
    try {
        const nodoTxtSlide = containerDestiny.children[2]
        nodoTxtSlide.style.display = 'none'
        //nodoTxtSlide.setAttribute('id','txtSlide')
        
        const txtPrimary = nodoReferencia.children[0]
        txtPrimary.classList.remove('tablet:text-[65px]','lg1:text-[70px]')
    } catch (error) {
        console.log(error)
    }
}
const totalItems = imgSlider.length;
let index = 0;
function updateActiveItem() {
    const items = document.querySelectorAll('.carrusel-item');
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}
function nextSlide() {
    index = (index + 1) % totalItems;
    carruselContenido.style.transform = `translateX(-${index * 100}%)`;
    updateActiveItem();
}
function prevSlide() {
    index = (index - 1 + totalItems) % totalItems;
    carruselContenido.style.transform = `translateX(-${index * 100}%)`;
    updateActiveItem();
}
function handleResize(val) {
    const width = window.innerWidth;
    if(width < val){
        containerDestiny.insertBefore(carrusel, nodoReferencia);
    } else {
        containerExperiment.appendChild(carrusel);
    }
}
buttons[1].addEventListener('click', nextSlide);
buttons[0].addEventListener('click', prevSlide);
// Configurar la transición automática
const intervalTime = 3000; // Tiempo en milisegundos
let autoSlide = setInterval(nextSlide, intervalTime);
carrusel.addEventListener('mouseover', () => {clearInterval(autoSlide)});
carrusel.addEventListener('mouseout', () => {autoSlide = setInterval(nextSlide, intervalTime)});
//window.addEventListener('resize', handleResize);
//handleResize(860);
changeLoopFeel()
//updateActiveItem()