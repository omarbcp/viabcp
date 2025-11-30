
    let bcp_banner_carousel_vertical = document.querySelector('.bcp_banner_carousel_vertical');

    var swiper_banner_vertical = new Swiper('.bcp_banner_carousel_vertical', {
        loop: true,
        speed: 1000,
        watchSlidesProgress: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.bcp_nro_pagina',
            clickable: true,
        },
        navigation: {
            nextEl: '.bcp_boton_next',
            prevEl: '.bcp_boton_prev',
        },
        on: {
            init: function (slides) {


            },
            slideChange: function (slide) {
               
            },
            slideNextTransitionEnd: function () {
               
            },
            slidePrevTransitionEnd: function () {
               
            },
            slideChangeTransitionStart: function (slide) {
            },
            slideChangeTransitionEnd: function () {
                AnimacionTextoBotonBannerVertical();
            }
        },
    });

    swiper_banner_vertical.autoplay.stop();


    function AnimacionTextoBotonBannerVertical() {
        bcp_banner_carousel_vertical.querySelectorAll('.bcp_carousel_slide .bcp_banner').forEach((banner) => {
            banner.querySelector('.bcp_grupo_titulo_subtitulo').classList.remove('animacion');
            banner.querySelector('.banner_carrusel_boton').classList.remove('animacion');
        });
        bcp_banner_carousel_vertical.querySelector('.bcp_carousel_slide .bcp_banner.swiper-slide-active').querySelector('.bcp_grupo_titulo_subtitulo').classList.add('animacion');
        bcp_banner_carousel_vertical.querySelector('.bcp_carousel_slide .bcp_banner.swiper-slide-active').querySelector('.banner_carrusel_boton').classList.add('animacion');
    }


    function TaggeoTituloSubtituloBotonVertical(clickType) {
        var banner = bcp_banner_carousel_vertical.querySelector('.bcp_carousel_slide .bcp_banner.swiper-slide-active');
        let ScrollSeletorDestino=banner.querySelector('.banner_carrusel_boton').parentNode.getAttribute('seelctorscroll');
        if(ScrollSeletorDestino){
            if(document.querySelector(`${ScrollSeletorDestino}`)){
                document.querySelector(`${ScrollSeletorDestino}`).scrollIntoView({block: "center", behavior: "smooth"});
            }
        }
    }

    // ****** cargar imagenes 
    function loadImageBannerCarousel(url) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.addEventListener('load', e => resolve(img));
            img.addEventListener('error', () => {
                reject(new Error(`Failed to load image's URL: ${url}`));
            });
            img.src = url;
        });
    }

    async function fnLoadImgBanner(banner) {

        ///***
        var mb = banner.getAttribute('data-src-m');
        var tb = banner.getAttribute('data-src-t');
        var dk = banner.getAttribute('data-src-d');
        var id_contenido = banner.getAttribute('id-contenido');

        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent) || /chrome/i.test(userAgent)) {
            if (banner.getAttribute('data-src-m-webp').trim() != '') {
                mb = banner.getAttribute('data-src-m-webp');
            }
            if (banner.getAttribute('data-src-t-webp').trim() != '') {
                tb = banner.getAttribute('data-src-t-webp');
            }
            if (banner.getAttribute('data-src-d-webp').trim() != '') {
                dk = banner.getAttribute('data-src-d-webp');
            }
        }

        var cargar_img_vista = null;
        if (window.matchMedia("(min-width: 1280px)").matches) {
            cargar_img_vista = dk;
        } else if (window.matchMedia("(min-width: 768px)").matches) {
            cargar_img_vista = tb;
        } else if (window.matchMedia("(min-width: 1px)").matches) {
            cargar_img_vista = mb;
        }



         await loadImageBannerCarousel(cargar_img_vista)
            .then(img => {
                //moistrarmos banner
                if (!id_contenido == '' || !id_contenido == null) {
                    var stylebanner = document.createElement("STYLE");
                    var style_background_mobile = ``;
                    if (banner.getAttribute('gradiente') == 'SI') {
                        style_background_mobile = `background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%),url(${mb});`;
                    } else {
                        style_background_mobile = `background-image:url(${mb});`;
                    }
                    var querystyle = document.createTextNode(`
                                            @media (min-width: 1px) { 
                                                .bcp_banner[id-contenido="${id_contenido}"] { 
                                                ${style_background_mobile}
                                                }
                                            }
                                            @media (min-width: 768px) { 
                                                .bcp_banner[id-contenido="${id_contenido}"] { 
                                                    background-image: url(${tb});
                                                } 
                                            }
                                            @media (min-width: 992px) { 
                                                .bcp_banner[id-contenido="${id_contenido}"] { 
                                                    background-image: url(${dk});
                                                }
                                            }`);
                    stylebanner.appendChild(querystyle);
                    banner.appendChild(stylebanner);
                };
            })
            .catch(error => {

            });
    }

    document.addEventListener("DOMContentLoaded", () => {
        AnimacionTextoBotonBannerVertical();
    });

    bcp_banner_carousel_vertical.querySelectorAll('.bcp_carousel_slide .bcp_banner').forEach((banner, index) => {
        banner.addEventListener("click", (elemento) => {
            if (elemento.target.className.indexOf('banner_carrusel_title') == -1
                && elemento.target.className.indexOf('banner_carrusel_subtitle') == -1 && elemento.target.className.indexOf('banner_carrusel_boton') == -1) {

                    if(banner.querySelector('a').getAttribute('href')){
                        
                        window.open(banner.querySelector('a').getAttribute('href'), banner.querySelector('a').getAttribute('target'));
                    }
                    TaggeoTituloSubtituloBotonVertical('Imagen');

            }
        });

        fnLoadImgBanner(banner);


    });



    ///eventos
    bcp_banner_carousel_vertical.querySelectorAll('.banner_carrusel_title').forEach((titulo) => {
        titulo.addEventListener("click", (elemento) => {
            TaggeoTituloSubtituloBotonVertical('Texto');
        });
    })

    bcp_banner_carousel_vertical.querySelectorAll('.banner_carrusel_subtitle').forEach((SubTitulo) => {
        SubTitulo.addEventListener("click", (elemento) => {
            TaggeoTituloSubtituloBotonVertical('Texto');
        });
    });
    bcp_banner_carousel_vertical.querySelectorAll('.banner_carrusel_boton').forEach((btn) => {
        btn.addEventListener("click", (elemento) => {
            TaggeoTituloSubtituloBotonVertical('Botón');
        });
    });

    window.addEventListener("load", () => {
        swiper_banner_vertical.autoplay.start();
        IntCmpBannerTGAB();
    });

    function IntCmpBannerTGAB(){
        document.querySelectorAll('.bcp_grupo_texto_boton').forEach((banner)=>{
            const label = banner.getAttribute('data-name');
            const tituloBanner = prepareString(banner.querySelector('.bcp_grupo_titulo_subtitulo a').innerText);
            const btnBanner = banner.querySelector('.bcp_grupo_boton a');
            const parametros = `pcid=viabcp:${PAGE_PCID(obtenerGroup(document.title))}:${tituloBanner}:masivo:banner-principal`;
            
            agregarParemetrosGet(btnBanner,parametros,'Banner');
            
            btnBanner.addEventListener('click',()=>{
                const data = {
                    "group":obtenerGroup(document.title),
                    "category":"Banner Principal",
                    "name":"Click",
                    "label":label
                };
                eventPushTGAB('A',data);
            })
        })
    }
