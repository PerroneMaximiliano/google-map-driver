var contador = (localStorage.getItem("contador") == null) ? 0 : localStorage.getItem("contador");
var tipo = document.getElementById('tipo');

var comercio1 = { id: 1, lat: -32.8833, lng: -68.8167 };
var comercio2 = { id: 2, lat: -66.8533, lng: -33.8167 };
var comercios = [];
comercios.push(comercio1);
comercios.push(comercio2);
var conductor1 = { id: 1, lat: -31.5375, lng: -68.53639, ocupado: false };
var conductor2 = { id: 2, lat: -22.8666700, lng: -62.9333300, ocupado: false };
var conductor3 = { id: 3, lat: -32.9667, lng: -68.7833, ocupado: false };
var conductores = [];
conductores.push(conductor1);
conductores.push(conductor2);
conductores.push(conductor3);

function pedido() {
    generarEvento();
    const comercioId = 1;
    // aca se busca por id el comercio que hizo el pedido
    const comercioActual = comercios.find(element => element.id === comercioId);
    if (comercioActual != null) {
        // se obtiene la posicion del conductor mas cercano
        const position = buscarConductor(comercioActual);
        conductores[position].ocupado = true;
    }
}

function buscarConductor(comercioActual) {
    let conductorMasCeranoId = 0;
    let mayor = 99999;
    conductores.forEach(function (item, index) {
        const lalitud = item.lat - comercioActual.lat;
        const longitud = item.lng - comercioActual.lng;
        const distancia = Math.sqrt( lalitud*lalitud + longitud*longitud );
        if (distancia < mayor) {
            mayor = distancia;
            conductorMasCeranoId = index;
        }
    });
    return conductorMasCeranoId;
}

function solicitarConductor() {
    conductores.forEach(function (item) {
        if (tipo.value === "conductor" && item.ocupado) {
            var respuesta = confirm("Desea tomar este pedido?");
            if (respuesta) {
                console.log("dibujar el polyline");
            } else {
                console.log("logica para buscar un nuevo conductor");
            }
        }
    });
}

function generarEvento() {
    contador++;
    localStorage.setItem("event-" + tipo.value + contador, contador);
}

window.addEventListener('storage', () => {
    console.log("hi");
    solicitarConductor();
});
