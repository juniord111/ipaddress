let input = document.querySelector("input");
let button = document.querySelector(".button");

// Inicializar mapa
//  Inicializar el mapa
var map = L.map('map').setView([51.505, -0.09], 13);

//  Agregar el mapa con OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//  Ajustar el zoom según el dispositivo
if (window.innerWidth < 768) {
    map.setView([51.505, -0.09], 10);
} else {
    map.setView([51.505, -0.09], 13);
}

//  Ajustar el tamaño del mapa al cambiar la pantalla
window.addEventListener("resize", function () {
    setTimeout(function () {
        map.invalidateSize();
    }, 500);
});

//  Crear un icono personalizado con  logo SVG
var customIcon = L.icon({
    iconUrl: 'images/icon-location.svg', //  ruta del logo SVG
    iconSize: [50, 50], // Ajusta el tamaño del icono (ancho, alto)
    iconAnchor: [25, 50], // Centra el icono correctamente en el marcador
    popupAnchor: [0, -50] // Ajusta la posición del popup (si usas uno)
});

// marcador con el icono personalizado
var marker = L.marker([51.5, -0.09], { icon: customIcon }).addTo(map);


// Evento al hacer clic en el botón
button.addEventListener("click", function () {
    let ipIngresada = input.value;

    if (ipIngresada === "") {
        alert("Por favor, ingresa una dirección IP.");
        return;
    }

    buscarIP(ipIngresada);
});

function buscarIP(ip) {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_vH19rCd5XI5p0CCmSMLtaqy4jRz80&ipAddress=${ip}`)
    .then(response => response.json())
    .then(data => {
        mostrarDatos(data);
    })
    .catch(error => {
        console.error("Error al obtener los datos de la IP:", error);
    });
}

function mostrarDatos(data) {
    document.querySelector(".ip-address").textContent = data.ip;
    document.querySelector(".location").textContent = `${data.location.country}, ${data.location.region}`;
    document.querySelector(".timezone").textContent = `UTC ${data.location.timezone}`;
    document.querySelector(".isp").textContent = data.isp;

    actualizarMapa(data.location.lat, data.location.lng);
}

function actualizarMapa(lat, lng) {
    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]);
}
