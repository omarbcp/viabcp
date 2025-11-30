function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
(function(){
    try {
        //const buttonForm = document.querySelector('form > button')
        //const buttomWS = document.querySelector('.contact-button a div')
        //const imgWS = 'https://www.viabcp.com/wcm/connect/324fb59f-4b5f-43cb-8253-6869bd93cdc9/main.svg?MOD=AJPERES&attachment=true&id=1733426800620'

        waitForElm('form > button').then((buttonForm) => {
            buttonForm.removeAttribute('disabled')
            buttonForm.textContent = 'Cotiza ahora'
        })

        waitForElm('.contact-button a div').then((buttomWS) => {
           buttomWS.classList.remove('contact-button__image')
           buttomWS.classList.add('custom-ws')
        })
    } catch (error) {
        console.log(error)
    }
})()
