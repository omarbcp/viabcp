
    let formCancelacionProducto = new Formulario(document.querySelector('#formCancelacionProductos'), { geolocation: true });       
    let strNombreProducto = formCancelacionProducto.elementForm.getAttribute('nomProducto');
    let tipo_form_elemento = formCancelacionProducto.elementForm.getAttribute('tipoplantilla');
    let elementForm = formCancelacionProducto.elementForm.querySelector('.bcp_form_integrado');
    let id_form_elemento = formCancelacionProducto.elementForm.querySelector('#formSolicitalo');
    let comboTipoDocumento =  formCancelacionProducto.elementForm.querySelectorAll('#bcp_tipo_nro_documento .bcp_cbo_lst_opciones .bcp_cbo_scroll li');
    for(let i =0; li = comboTipoDocumento[i]; i++) { if(li.innerText === 'RUC') li.parentNode.removeChild(li);}

    formCancelacionProducto.elementForm.querySelectorAll(" #correo_domain_list-correo .bcp_cbo_email_domains .bcp_cbo_scroll .item").forEach(emailDomain => {
        emailDomain.addEventListener("click", (event) => {             
            let selectedEmailDomain = event.target.innerHTML;            
            let ulEmailDomains = document.querySelector('#correo_domain_list-correo .bcp_cbo_email_domains');
            ulEmailDomains.classList.remove("visible");
            let inputCorreo = document.getElementById('correo');
            let inputValueSplitted = inputCorreo.value.split("@");
            inputCorreo.value = inputValueSplitted[0].concat('@',selectedEmailDomain);
            formCancelacionProducto.Validar.CampoCorreo(inputCorreo);
            
        })
    });
    formCancelacionProducto.elementForm.querySelectorAll("#tipo_tarjeta .bcp_opciones .bcp_cbo_lst_opciones .bcp_cbo_scroll .item").forEach(pregunta => {
        pregunta.addEventListener("click", (event) => {

            if (event.currentTarget.getAttribute("attr-id") == "01" || event.currentTarget.getAttribute("attr-id") == "04" || event.currentTarget.getAttribute("attr-id") == "05") {
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_tarjeta').classList.remove('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_ahorro').classList.remove('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_mensaje_ahorro').classList.remove('ocultar_motivo');
            } else {
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_tarjeta').classList.add('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_ahorro').classList.add('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_mensaje_ahorro').classList.add('ocultar_motivo');
            }

            if (event.currentTarget.getAttribute("attr-id") == "01") {
                formCancelacionProducto.elementForm.querySelector('.bcp_descripcion_tramite').classList.remove('ocultar_motivo');
            } else {
                formCancelacionProducto.elementForm.querySelector('.bcp_descripcion_tramite').classList.add('ocultar_motivo');
            }

            if (event.currentTarget.getAttribute("attr-id") == "02") {
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_cuenta').classList.remove('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_monto_credito').classList.remove('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_efectivo').classList.remove('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_radiobutton_clienteCS').classList.remove('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_titulo_efectivo').classList.remove('ocultar_motivo');
            } else {
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_cuenta').classList.add('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_monto_credito').classList.add('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_efectivo').classList.add('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_radiobutton_clienteCS').classList.add('ocultar_motivo');
                formCancelacionProducto.elementForm.querySelector('.bcp_titulo_efectivo').classList.add('ocultar_motivo');
            }

            if (event.currentTarget.getAttribute("attr-id") == "03") {
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_radiobutton_clie').classList.remove('ocultar_motivo');
            } else {
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_radiobutton_clie').classList.add('ocultar_motivo');
            }

            if (event.currentTarget.getAttribute("attr-id") == "06") {
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_cancelar').classList.remove('ocultar_motivo');
            } else {
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_cancelar').classList.add('ocultar_motivo');
            }

        })
    })
    formCancelacionProducto.elementForm.querySelectorAll("#tipo_motivo .bcp_opciones .bcp_cbo_lst_opciones .bcp_cbo_scroll .item").forEach(pregunta => {
        pregunta.addEventListener("click", (event) => {

            if (event.currentTarget.getAttribute("attr-id") == "05") {
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_comentario').classList.remove('ocultar_motivo');
            } else {
                formCancelacionProducto.elementForm.querySelector('.bcp_campo_comentario').classList.add('ocultar_motivo');
            }
        })
    })

    function fnRegistrarDatosCancelacionProducto(strTokenCaptcha) {
        try {
            let tipo_producto = formCancelacionProducto.elementForm.querySelector('#tipo_tarjeta li.active');
            let cboTipoTarjeta = formCancelacionProducto.elementForm.querySelector('#tipo_tarjeta');
            let cboTipomotivo = formCancelacionProducto.elementForm.querySelector('#tipo_motivo');
            let inputDigitos = formCancelacionProducto.elementForm.querySelector('#digitos_tarjeta')
            let inputDigitossinfondo = formCancelacionProducto.elementForm.querySelector('#ahorro_transferir')
            let inputDigitosEC = formCancelacionProducto.elementForm.querySelector('#digitos_efectivo')
            let inputDigitosEM = formCancelacionProducto.elementForm.querySelector('#monto_credito')
            let inputDigitosTC = formCancelacionProducto.elementForm.querySelector('#digitos_cancelar')

            let inputDigitos2 = formCancelacionProducto.elementForm.querySelector('#digitos_cuenta')
            // let inputCelular = formCancelacionProducto.elementForm.querySelector('#celular');
            let inputCorreo = formCancelacionProducto.elementForm.querySelector('#correo');

            let strTipoNroDocumento = formCancelacionProducto.getTipoNroDocumento();
            let strTipoDoc = formCancelacionProducto.elementForm.querySelector('#bcp_tipo_nro_documento .bcp_texto_seleccion').innerText.trim();
            let nroDoc = formCancelacionProducto.getNroDocumento();


            let cbotipomoneda = formCancelacionProducto.elementForm.querySelector('.bcp_campo_radiobutton_clienteCS');
            let cboseguro = formCancelacionProducto.elementForm.querySelector('.bcp_campo_radiobutton_clie');
            let inputComentario = formCancelacionProducto.elementForm.querySelector('#comentario_corto');

            let strTipoTarjeta = cboTipoTarjeta.querySelector('.bcp_texto_seleccion').innerText.trim();
            let strTipomotivo = cboTipomotivo.querySelector('.bcp_texto_seleccion').innerText.trim();
            let strDigitos = inputDigitos.value.trim();
            let strDigitosTC = inputDigitosTC.value.trim();
            let strDigitossinfondo = inputDigitossinfondo.value.trim();
            let strDigitoscuenta = inputDigitos2.value.trim();
            let strDigitosEC = inputDigitosEC.value.trim();

            let strDigitosEM = inputDigitosEM.value.trim();
            // let strCelular = inputCelular.value.trim();
            let strCorreo = inputCorreo.value.trim();
            let strComentario = inputComentario.value.trim();
            let strtipomoneda = formCancelacionProducto.getOpcionRadioButtonSeleccionado(cbotipomoneda);
            let strseguro = ""
            let strGCLID = getCookie("gclid");
            let leadID = formCancelacionProducto.getDatos.leadID;
            let strCoordenadas = '0,0';

            if (formCancelacionProducto.getDatos.Coordenadas != null) {
                strCoordenadas = `${formCancelacionProducto.getDatos.Coordenadas.latitude},${formCancelacionProducto.getDatos.Coordenadas.longitude}`
            }


            if (tipo_producto != null) {
                if (tipo_producto.getAttribute("attr-id") == '03') {
                    strseguro = formCancelacionProducto.getOpcionRadioButtonSeleccionado(cboseguro);

                }
            }

            if (!strtipomoneda) {
                strtipomoneda = "-";
            }
            if (!strseguro) {
                strseguro = "-";
            }
            if (!strGCLID) {
                strGCLID = '-';
            }
            if (!strComentario) {
                strComentario = '-';
            }

            let jsonRequest_v2 = {
                "leadId": leadID,
                "producto": strNombreProducto,
                "tipoFormulario": "CANCELPRODUCTOS",
                "tipoProducto": strNombreProducto,
                "captchaToken": strTokenCaptcha,
                "data": {

                    GCLID: strGCLID,
                    tipodocumento: strTipoDoc,
                    documento: nroDoc,
                    celular: "999999999",
                    email: strCorreo,
                    tipoproducto: strTipoTarjeta,
                    dijitosahorro: strDigitos,
                    dijitosefectivo: strDigitoscuenta,
                    tipomonedas: strtipomoneda,
                    tiposeguro: strseguro,
                    tipomotivo: strTipomotivo,
                    otromotivo: strComentario,
                    cuentafondos: strDigitossinfondo,
                    creditocancelar: strDigitosEC,
                    montocredito: strDigitosEM,
                    tarjetacancelar: strDigitosTC,
                    coordenadas: strCoordenadas

                }
            };

            formCancelacionProducto.send_apiv2_migrado(jsonRequest_v2, strTokenCaptcha);

            formCancelacionProducto.elementForm.querySelector('.bcp_campo_radiobutton_clie').classList.add('ocultar_motivo');
            formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_tarjeta').classList.add('ocultar_motivo');
            formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_ahorro').classList.add('ocultar_motivo');
            formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_cuenta').classList.add('ocultar_motivo');
            formCancelacionProducto.elementForm.querySelector('.bcp_campo_monto_credito').classList.add('ocultar_motivo');
            formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_efectivo').classList.add('ocultar_motivo');
            formCancelacionProducto.elementForm.querySelector('.bcp_campo_radiobutton_clienteCS').classList.add('ocultar_motivo');
            formCancelacionProducto.elementForm.querySelector('.bcp_campo_digitos_cancelar').classList.add('ocultar_motivo');
            formCancelacionProducto.elementForm.querySelector('.bcp_campo_mensaje_ahorro').classList.add('ocultar_motivo');
            formCancelacionProducto.elementForm.querySelector('.bcp_titulo_efectivo').classList.add('ocultar_motivo');
        } catch (error) {
            console.error(error)
        }
    }


    formCancelacionProducto.elementForm.querySelector(".bcp_btn_enviar_form").addEventListener('click', (event) => {

        event.preventDefault();

        let inputDocumento = formCancelacionProducto.elementForm.querySelector('#bcp_tipo_nro_documento');
        // let inputCelular = formCancelacionProducto.elementForm.querySelector('#celular');
        let inputCorreo = formCancelacionProducto.elementForm.querySelector('#correo');

        let cboTipoTarjeta = formCancelacionProducto.elementForm.querySelector('#tipo_tarjeta');
        let cboTipoTarjetamotivo = formCancelacionProducto.elementForm.querySelector('#tipo_motivo');

        //Validar Cuenta de Ahorros - 01
        let tipo_producto = formCancelacionProducto.elementForm.querySelector('#tipo_tarjeta li.active');
        let selectorDigitosCA = formCancelacionProducto.elementForm.querySelector('#digitos_tarjeta');
        let selectorDigitosCE = formCancelacionProducto.elementForm.querySelector('#digitos_cuenta');
        let selectorDigitosCEC = formCancelacionProducto.elementForm.querySelector('#digitos_efectivo');
        let selectorDigitosTC = formCancelacionProducto.elementForm.querySelector('#digitos_cancelar');
        let selectorDigitosCEM = formCancelacionProducto.elementForm.querySelector('#monto_credito');
        let radioTipomoneda = formCancelacionProducto.elementForm.querySelector('.bcp_campo_radiobutton_clienteCS');
        let radioTiseguro = formCancelacionProducto.elementForm.querySelector('.bcp_campo_radiobutton_clie');


        let boolValidarProducto = true;
        let boolValidarProductoradio = true;
        let boolValidarProductoEC = true;
        let boolValidarProductoECM = true;
        if (tipo_producto != null) {
            if (tipo_producto.getAttribute("attr-id") == '01') {
                boolValidarProducto = formCancelacionProducto.Validar.CampoNumerico(selectorDigitosCA);
            } else if (tipo_producto.getAttribute("attr-id") == '02') {

                boolValidarProductoradio = formCancelacionProducto.Validar.CampoRadioButton(radioTipomoneda)
                boolValidarProducto = formCancelacionProducto.Validar.CampoNumerico(selectorDigitosCE);
                boolValidarProductoEC = formCancelacionProducto.Validar.CampoNumerico(selectorDigitosCEC);
                boolValidarProductoECM = formCancelacionProducto.Validar.CampoNumerico(selectorDigitosCEM)
            }
            else if (tipo_producto.getAttribute("attr-id") == '03') {
                boolValidarProductoradio = formCancelacionProducto.Validar.CampoRadioButton(radioTiseguro)
            }
            else if (tipo_producto.getAttribute("attr-id") == '04') {
                boolValidarProducto = formCancelacionProducto.Validar.CampoNumerico(selectorDigitosCA);
            }
            else if (tipo_producto.getAttribute("attr-id") == '05') {
                boolValidarProducto = formCancelacionProducto.Validar.CampoNumerico(selectorDigitosCA);
            }
            else if (tipo_producto.getAttribute("attr-id") == '06') {
                boolValidarProducto = formCancelacionProducto.Validar.CampoNumerico(selectorDigitosTC);
            }
        }

        if (formCancelacionProducto.Validar.TipoNroDocumento(inputDocumento) == true
            & formCancelacionProducto.Validar.CampoCorreo(inputCorreo) == true
            & formCancelacionProducto.Validar.CampoCombo(cboTipoTarjeta) == true
            & formCancelacionProducto.Validar.CampoCombo(cboTipoTarjetamotivo) == true
            & boolValidarProducto == true & boolValidarProductoEC == true & boolValidarProductoECM == true & boolValidarProductoradio == true) {
            grecaptcha.execute(formCancelacionProducto.Captcha.getAttribute('index'));
        }
    });
