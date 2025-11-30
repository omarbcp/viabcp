const urlJSON = 'https://www.viabcp.com/wcm/connect/586d06db-2f8f-4a2c-b812-97386ef00c1e/price.json?MOD=AJPERES&attachment=true&id=1732220129339'
const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
function obtenerJSON(url,options,callback) {
    fetch(url,options)
        .then(response => {
            // 3. Convertir la respuesta a JSON
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // 4. Llamar a la función de callback con los datos obtenidos
            callback(data);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud Fetch:', error);
        });
}
 
function procesarDatos(data) {
    console.log('Datos obtenidos:', data);
}


obtenerJSON(url,requestOptions, procesarDatos);