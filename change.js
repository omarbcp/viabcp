document.addEventListener("DOMContentLoaded",()=>{
    const titleToChange = document.querySelector('.bcp_btn_solicita.bcp_boton_azul_fixed_mobile span')
    if(titleToChange){
        titleToChange.innerHTML = 'Viaja tranquilo aquí'
    } else {
        console.log('No se encontró el elemento')
    }
})
