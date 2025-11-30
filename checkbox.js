    let formRecaudacion = new Formulario(document.querySelector('#bcp-formulario_recaudacion'), { geolocation: false });

    function fnRegistrarRecaudacion(strTokenCaptcha) {

        try {

            let nomProducto = formRecaudacion.elementForm.getAttribute('nomProducto');

            let inputRuc = formRecaudacion.elementForm.querySelector('#ruc');
            let inputNombreComercial = formRecaudacion.elementForm.querySelector('#nombre_comercial');
            let inputCorreo = formRecaudacion.elementForm.querySelector('#correo');
            let inputCobranza = formRecaudacion.elementForm.querySelector('#cobranza');
            let chkMontoCliente = formRecaudacion.elementForm.querySelector('#checkbox_montocliente');
            let chkInformacion = formRecaudacion.elementForm.querySelector('#checkbox_informacion');
            let inputComentario = formRecaudacion.elementForm.querySelector('#comentario');
            let chkModalidadCliente = formRecaudacion.elementForm.querySelector('#checkbox_modalidad');
            let inputCanales = formRecaudacion.elementForm.querySelector('#canales');
            let inputPagosMes = formRecaudacion.elementForm.querySelector('#pagos_mes');
            let inputConsultaOtros = formRecaudacion.elementForm.querySelector('#consulta_otros');

            let boolValidarComentario = true;
            if (formRecaudacion.elementForm.querySelector('#checkbox_informacion #checkbox_informacion4').checked == true) {
                boolValidarComentario = formRecaudacion.Validar.CampoTexto(inputComentario);
            }

            let strRucComercial = inputRuc.value.trim();
            let strNombreComenrcial = inputNombreComercial.value.trim();
            let strCorreo = inputCorreo.value.trim();
            let strCobranza = inputCobranza.value.trim();
            let strMontocliente = formRecaudacion.getOpcionCheckButtonSeleccionado(chkMontoCliente);
            let strInformacion = formRecaudacion.getOpcionCheckButtonSeleccionado(chkInformacion);
            let strMotivoIdentificar = inputComentario.value.trim();
            let strModalidadCliente = formRecaudacion.getOpcionCheckButtonSeleccionado(chkModalidadCliente);
            let strCanalCobranza = inputCanales.value.trim();
            let strPagoCobranza = inputPagosMes.value.trim();
            let strConsultaCobranza = inputConsultaOtros.value.trim();

            let leadID = formRecaudacion.getDatos.leadID;

            let jsonRequest_v2 = {
                "leadId": leadID,
                "producto": nomProducto,
                "tipoFormulario": "RECAUDACIONESEMPRESA",
                "tipoProducto": nomProducto,
                "captchaToken": strTokenCaptcha,
                "data": {
                    ruc: strRucComercial,
                    nombrecomercial: strNombreComenrcial,
                    email: strCorreo,
                    consultacobranzas: strCobranza,
                    montocliente: strMontocliente,
                    identificarcliente: strInformacion,
                    consultaotros: strMotivoIdentificar,
                    modalidadcliente: strModalidadCliente,
                    consultacanales: strCanalCobranza,
                    consultacantidadpagos: strPagoCobranza,
                    consultageneral: strConsultaCobranza
                }
            };

            formRecaudacion.send_apiv2_migrado(jsonRequest_v2, strTokenCaptcha);

        } catch (error) {
            console.error(error)
        }

    }

    document.addEventListener("DOMContentLoaded", () => {

        formRecaudacion.elementForm.querySelector('#checkbox_informacion #checkbox_informacion4').addEventListener('click', (event) => {
            if (event.currentTarget.checked == true) {
                formRecaudacion.elementForm.querySelector('.bcp_otros_motivo').classList.remove('ocultar_motivo');
            } else {
                formRecaudacion.elementForm.querySelector('.bcp_otros_motivo').classList.add('ocultar_motivo');
            }
        });

        //btn Continuar
        formRecaudacion.elementForm.querySelector('#btn_enviar_continuar').addEventListener("click", () => {

            let inputRuc = formRecaudacion.elementForm.querySelector('#ruc');
            let inputNombreComercial = formRecaudacion.elementForm.querySelector('#nombre_comercial');
            let inputCorreo = formRecaudacion.elementForm.querySelector('#correo');
            let inputCobranza = formRecaudacion.elementForm.querySelector('#cobranza');
            let chkMontoCliente = formRecaudacion.elementForm.querySelector('#checkbox_montocliente');
            let chkInformacion = formRecaudacion.elementForm.querySelector('#checkbox_informacion');
            let inputComentario = formRecaudacion.elementForm.querySelector('#comentario');


            if (formRecaudacion.Validar.CampoNumerico(inputRuc) == true & formRecaudacion.Validar.CampoTexto(inputNombreComercial) == true &
                formRecaudacion.Validar.CampoCorreo(inputCorreo) == true & formRecaudacion.Validar.CampoTexto(inputCobranza) == true &
                formRecaudacion.Validar.CampoCheckButton(chkMontoCliente) == true & formRecaudacion.Validar.CampoCheckButton(chkInformacion) == true &
                formRecaudacion.Validar.CampoTexto(inputComentario) == true) {
                formRecaudacion.FlujoPaso('continuar');
            }
        });

        formRecaudacion.elementForm.querySelector(".bcp_btn_enviar_form").addEventListener('click', (event) => {
            event.preventDefault();

            let chkModalidadCliente = formRecaudacion.elementForm.querySelector('#checkbox_modalidad');

            if (formRecaudacion.Validar.CampoCheckButton(chkModalidadCliente) == true) {
                grecaptcha.execute(formRecaudacion.Captcha.getAttribute('index'));
            }

        });

    });
