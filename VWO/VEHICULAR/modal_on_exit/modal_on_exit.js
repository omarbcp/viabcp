const moeModal = document.querySelector('.modal-on-exit')
const btnClose = document.querySelector('.moe-btn-close')
const btnPrimary = document.querySelector('.moe-btn-primary')
const btnSecundary = document.querySelector('.moe-btn-secundary')
const urlWS = 'https://api.whatsapp.com/send/?phone=+51975135000&text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20el%20Seguro%20Vehicular%20de%20Pac%C3%ADfico%20para%20clientes%20BCP '
const closeModal = ()=>{
    moeModal.classList.remove('mostrar')
    moeModal.classList.add('cerrar')
}
//ACTION
btnClose.onclick = ()=>{closeModal()}
btnSecundary.onclick = ()=>{closeModal()}
btnPrimary.onclick = ()=>{window.open(urlWS,'_blank')}