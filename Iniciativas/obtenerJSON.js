async function obtenerDatos(url) {
    try {
        
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            cache: 'no-cache'
        }
        const respuesta = await fetch(url,requestOptions);
        //console.log(respuesta);
        if (!respuesta.ok) {
            throw new Error('Error al obtener los datos');
        }
        const datos = await respuesta.json();
        console.log(datos)
        // Aquí puedes usar los datos como prefieras
    } catch (error) {
        throw new Error(`Hubo un problema con la petición Fetch:${error}`);
    }
}

const generarVersion = ()=>{
    const timestamp = new Date().getTime().toString();
    const codigoOperacion = timestamp.substring(timestamp.length - 6);
    return codigoOperacion;
}

const urlJSON = `https://www.viabcp.com/wcm/connect/586d06db-2f8f-4a2c-b812-97386ef00c1e/price.json?MOD=AJPERES&attachment=true&id=1725057589555&v=${generarVersion()}`
obtenerDatos(urlJSON)
