let usuario = null;
let contactoEmergencia = null;

function registrarUsuario() {
    const nombre = document.getElementById("nombre").value;
    const contacto = document.getElementById("contacto").value;

    const telefonoValido = /^[0-9]{9}$/.test(contacto);  // Verifica que el número tenga 9 dígitos

    if (nombre && telefonoValido) {
        usuario = nombre;
        contactoEmergencia = contacto;
        alert(`Usuario ${nombre} registrado con contacto de emergencia ${contacto}`);
        window.location.href = "emergencia.html";  // Redirige a la página de emergencia
    } else {
        alert("Por favor, completa todos los campos con un nombre válido y un número de teléfono de 9 dígitos.");
    }
}


function notificarEmergencia() {
    const tipo = document.getElementById("tipoEmergencia").value;
    alert(`Emergencia reportada: ${tipo}`);
}

function activarPanico() {
    alert("¡Botón de Pánico Activado! Notificando emergencia grave...");
    if (contactoEmergencia) {
        console.log(`Enviando SMS a contacto de emergencia: ${contactoEmergencia}`);
    }
}

function evaluarSituacion() {
    const descripcion = document.getElementById("descripcion").value;
    if (descripcion.includes("grave") || descripcion.includes("crítico")) {
        alert("Situación crítica, activando recursos prioritarios.");
    } else {
        alert("Situación evaluada como moderada.");
    }
}
