// Función para registrar el usuario
function registrarUsuario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const contacto1 = document.getElementById("contacto1").value;
    const contacto2 = document.getElementById("contacto2").value;

    // Validación del número de contacto (debe tener 9 dígitos numéricos)
    const telefonoValido1 = /^[0-9]{9}$/.test(contacto1);
    const telefonoValido2 = /^[0-9]{9}$/.test(contacto2);

    if (nombre && apellido && email && password && telefonoValido1 && telefonoValido2) {
        localStorage.setItem("usuario", JSON.stringify({ nombre, apellido, email, password, contacto1, contacto2 }));
        alert(`Usuario registrado con éxito. Ahora inicia sesión.`);
        window.location.href = "login.html";
    } else {
        alert("Por favor, completa todos los campos con datos válidos.");
    }
}

// Función para iniciar sesión
function iniciarSesion() {
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
        alert(`Bienvenido, ${usuarioGuardado.nombre}`);
        window.location.href = "emergencia.html";
    } else {
        alert("Correo o contraseña incorrectos. Intente de nuevo.");
    }
}

// Función para verificar si el usuario está autenticado
function verificarAutenticacion() {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioGuardado) {
        window.location.href = "login.html";
    }
}

// Función para mostrar mensajes de confirmación
function mostrarMensaje(mensaje, tipo = "info") {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.innerText = mensaje;
    mensajeDiv.style.display = "block";
    mensajeDiv.style.padding = "10px";
    mensajeDiv.style.margin = "10px 0";
    mensajeDiv.style.border = "1px solid";
    mensajeDiv.style.backgroundColor = tipo === "error" ? "#f8d7da" : "#d4edda";
    mensajeDiv.style.color = tipo === "error" ? "#721c24" : "#155724";

    document.body.appendChild(mensajeDiv);

    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}

// Función para mostrar campos adicionales dependiendo del tipo de emergencia
function mostrarCamposAdicionales() {
    const tipoEmergencia = document.getElementById("tipoEmergencia").value;

    document.getElementById("camposIncendio").style.display = "none";
    document.getElementById("camposAccidente").style.display = "none";
    document.getElementById("camposRescate").style.display = "none";
    document.getElementById("camposAveria").style.display = "none";

    if (tipoEmergencia === "incendio") {
        document.getElementById("camposIncendio").style.display = "block";
    } else if (tipoEmergencia === "accidente") {
        document.getElementById("camposAccidente").style.display = "block";
    } else if (tipoEmergencia === "rescate") {
        document.getElementById("camposRescate").style.display = "block";
    } else if (tipoEmergencia === "averia") {
        document.getElementById("camposAveria").style.display = "block";
    }
}

// Función para notificar una emergencia
function notificarEmergencia() {
    const tipo = document.getElementById("tipoEmergencia").value;

    let detallesEmergencia = "";
    if (tipo === "accidente") {
        const ubicacion = document.getElementById("ubicacionAccidente").value;
        const gravedad = document.getElementById("gravedadAccidente").value;
        detallesEmergencia = `Ubicación: ${ubicacion}, Gravedad: ${gravedad}`;
    } else if (tipo === "incendio") {
        const ubicacion = document.getElementById("ubicacionIncendio").value;
        detallesEmergencia = `Ubicación: ${ubicacion}`;
    } else if (tipo === "rescate") {
        const ubicacion = document.getElementById("ubicacionRescate").value;
        detallesEmergencia = `Ubicación: ${ubicacion}`;
    } else if (tipo === "averia") {
        const ubicacion = document.getElementById("ubicacionAveria").value;
        detallesEmergencia = `Ubicación: ${ubicacion}`;
    }

    alert(`Emergencia reportada: ${tipo}\nDetalles: ${detallesEmergencia}`);
}

// Función para activar el botón de pánico
function activarPanico() {
    mostrarMensaje("¡Botón de Pánico Activado! Notificando emergencia grave...", "error");
}

// Función para evaluar la situación de emergencia
function evaluarSituacion() {
    const descripcion = document.getElementById("descripcion").value.trim(); // Obtén y limpia la descripción

    // Validar si el usuario ingresó texto en el campo de descripción
    if (!descripcion) {
        mostrarMensaje("Por favor, describe la situación para evaluar.", "error");
        return;
    }

    // Evaluar la gravedad según palabras clave
    if (descripcion.toLowerCase().includes("grave") || descripcion.toLowerCase().includes("crítico")) {
        mostrarMensaje("Situación crítica detectada. Activando recursos prioritarios.", "error");
    } else {
        mostrarMensaje("Situación evaluada como moderada. Se tomará acción según el protocolo.", "info");
    }
}

// Función para mostrar mensajes en el asistente
function mostrarMensaje(mensaje, tipo = "info") {
    const mensajeEvaluacion = document.getElementById("mensajeEvaluacion");
    mensajeEvaluacion.innerText = mensaje;

    // Cambia el estilo según el tipo de mensaje
    mensajeEvaluacion.style.backgroundColor = tipo === "error" ? "#f8d7da" : "#d4edda"; // Fondo: rojo o verde
    mensajeEvaluacion.style.color = tipo === "error" ? "#721c24" : "#155724";          // Texto: rojo oscuro o verde oscuro
    mensajeEvaluacion.style.border = tipo === "error" ? "1px solid #f5c6cb" : "1px solid #c3e6cb";

    mensajeEvaluacion.style.display = "block"; // Muestra el mensaje

    // Oculta el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeEvaluacion.style.display = "none";
    }, 3000);
}

// Verificación al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("emergencia.html")) {
        verificarAutenticacion();
    }
});
