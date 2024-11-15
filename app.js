// Función para registrar el usuario
function registrarUsuario() {
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const contacto1 = document.getElementById("contacto1").value.trim();
    const contacto2 = document.getElementById("contacto2").value.trim();

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
    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();

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

function recuperarPassword(event) {
    event.preventDefault();

    const emailRecuperar = document.getElementById("emailRecuperar").value.trim();
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    // Verificar si el correo es válido y está registrado
    if (!usuarioGuardado || usuarioGuardado.email !== emailRecuperar) {
        alert("El correo ingresado no está registrado. Por favor, verifica e intenta nuevamente.");
        return;
    }

    // Si el correo es válido, redirige a la página de cambio de contraseña
    alert("Correo verificado. Ahora puedes cambiar tu contraseña.");
    window.location.href = "cambio de contraseña.html"; // Asegúrate de que esta página exista
}


// Función para cambiar contraseña
function cambiarPassword(event) {
    event.preventDefault(); // Evita recargar la página

    const nuevaPassword = document.getElementById("nuevaPassword").value.trim();
    const confirmarPassword = document.getElementById("confirmarPassword").value.trim();

    if (nuevaPassword !== confirmarPassword) {
        alert("Las contraseñas no coinciden. Inténtalo nuevamente.");
        return;
    }

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) {
        usuarioGuardado.password = nuevaPassword; // Cambiar la contraseña
        localStorage.setItem("usuario", JSON.stringify(usuarioGuardado)); // Guardar cambios
        alert("Contraseña actualizada con éxito. Por favor, inicia sesión.");
        window.location.href = "login.html"; // Redirige al inicio de sesión
    } else {
        alert("Ocurrió un error. Inténtalo nuevamente.");
    }
}

// Función para activar el botón de pánico
function activarPanico() {
    alert("¡Botón de Pánico Activado! Notificando emergencia grave...");
}

// Función para evaluar la situación de emergencia
function evaluarSituacion() {
    const descripcion = document.getElementById("descripcion").value.trim();

    if (!descripcion) {
        alert("Por favor, describe la situación para evaluar.");
        return;
    }

    if (descripcion.toLowerCase().includes("grave") || descripcion.toLowerCase().includes("crítico")) {
        alert("Situación crítica detectada. Activando recursos prioritarios.");
    } else {
        alert("Situación evaluada como moderada. Se tomará acción según el protocolo.");
    }
}

// Verificación al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("emergencia.html")) {
        verificarAutenticacion();
    }
});
