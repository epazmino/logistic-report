document.getElementById('logisticForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const conductor = document.getElementById('conductor').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const vin = document.getElementById('vin').value;
    const ubicacion = document.getElementById('ubicacion').value;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${ubicacion}&key=AIzaSyCEyW26jg40kObtm79ejulre3hmWM3es0w`)
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

                const reporte = `
                Nombre del conductor: ${conductor}
                Fecha de registro: ${fecha}
                Hora de registro: ${hora}
                Lugar de origen: ${origen}
                Lugar de destino: ${destino}
                VIN a transportar: ${vin}
                Ubicación: ${data.results[0].formatted_address}
                `;

                console.log(reporte);
                alert('Datos registrados con éxito');
            } else {
                alert('Ubicación no encontrada');
            }
        })
        .catch(error => console.error('Error:', error));
});
