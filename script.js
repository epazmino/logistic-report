document.getElementById('logisticForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const conductor = document.getElementById('conductor').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const vin = document.getElementById('vin').value;
    const ubicacion = document.getElementById('ubicacion').value;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${ubicacion}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const location = data[0];
                const map = L.map('map').setView([location.lat, location.lon], 15);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                L.marker([location.lat, location.lon]).addTo(map)
                    .bindPopup(`${location.display_name}`)
                    .openPopup();

                const reporte = `
                Nombre del conductor: ${conductor}
                Fecha de registro: ${fecha}
                Hora de registro: ${hora}
                Lugar de origen: ${origen}
                Lugar de destino: ${destino}
                VIN a transportar: ${vin}
                Ubicación: ${location.display_name}
                `;

                console.log(reporte);
                alert('Datos registrados con éxito');
            } else {
                alert('Ubicación no encontrada');
            }
        })
        .catch(error => console.error('Error:', error));
});
