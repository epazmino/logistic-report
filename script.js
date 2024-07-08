document.getElementById('logisticForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const conductor = document.getElementById('conductor').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const vin = document.getElementById('vin').value;
    const ubicacion = document.getElementById('ubicacion').value;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${ubicacion}&key=AIzaSyDyMsmi-4ohYkyV7Ui7Ndu2rSM0ZqDKCkA`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: location,
                    zoom: 15
                });
                new google.maps.Marker({
                    position: location,
                    map: map
                });
            } else {
                alert('Ubicación no encontrada');
            }
        })
        .catch(error => console.error('Error:', error));

    console.log(`Conductor: ${conductor}, Fecha: ${fecha}, Hora: ${hora}, Origen: ${origen}, Destino: ${destino}, VIN: ${vin}, Ubicación: ${ubicacion}`);
});

function initMap() {
    // This function is required by the Google Maps API but is not used here
}
