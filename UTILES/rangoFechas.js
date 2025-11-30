
const rangofechas = [
    {inicio:"2024-11-25", fin:"2024-12-01", price:"39.90"},
    {inicio:"2024-12-02", fin:"2024-12-08", price:"38.50"},
    {inicio:"2024-12-09", fin:"2024-12-15", price:"41.90"},
    {inicio:"2024-12-16", fin:"2024-12-22", price:"39.90"},
    {inicio:"2024-12-23", fin:"2024-12-31", price:"38.50"}
]

const obtenerPrecioHoy = ()=>{
    let priceCurrent = "41.90"
    const fechaActual = new Date();
    rangofechas.forEach((fecha)=>{
        const inicio = new Date(fecha.inicio)
        const fin = new Date(fecha.fin)
        if (fechaActual >= inicio && fechaActual <= fin) {
            priceCurrent = fecha.price
            console.log(priceCurrent)
        }
    })
    return priceCurrent
}