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
waitForElm('header').then((elm) => {
    //let warpperLanding = document.querySelector('.landing-autos-app');
    //let wrapperBanner = document.querySelector('header')
    let cintillo = document.querySelector('.bbss_content_cintillo_container');
    // warpperLanding.prepend(cintillo);
    setTimeout(() => {
        elm.appendChild(cintillo);
    }, 1500);
})