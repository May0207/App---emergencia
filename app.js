// Función para registrar el usuario
function registrarUsuario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const contacto = document.getElementById("contacto").value;

    // Validación del número de contacto (debe tener 9 dígitos numéricos)
    const telefonoValido = /^[0-9]{9}$/.test(contacto);

    if (nombre && apellido && email && password && telefonoValido) {
        // Guardar los datos en el almacenamiento local (simulación)
        localStorage.setItem("usuario", JSON.stringify({ nombre, apellido, email, password, contacto }));
        alert(`Usuario registrado con éxito. Ahora inicia sesión.`);
        window.location.href = "login.html";  // Redirige a la página de inicio de sesión
    } else {
        alert("Por favor, completa todos los campos con datos válidos.");
    }
}

// Función para iniciar sesión
function iniciarSesion() {
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    // Obtener los datos guardados
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
        alert(`Bienvenido, ${usuarioGuardado.nombre}`);
        window.location.href = "emergencia.html";  // Redirige a la página principal de emergencia
    } else {
        alert("Correo o contraseña incorrectos. Intente de nuevo.");
    }
}

// Función para verificar si el usuario está autenticado
function verificarAutenticacion() {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioGuardado) {
        window.location.href = "login.html";  // Redirige al inicio de sesión si no está autenticado
    }
}

// Función para mostrar mensajes de confirmación en el contenedor de la interfaz
function mostrarMensajeConfirmacion(mensaje) {
    const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");
    mensajeConfirmacion.innerText = mensaje;
    mensajeConfirmacion.style.display = "block"; // Muestra el mensaje
    setTimeout(() => {
        mensajeConfirmacion.style.display = "none"; // Oculta el mensaje después de 3 segundos
    }, 3000);
}

// Función para notificar emergencia
function notificarEmergencia() {
    const tipo = document.getElementById("tipoEmergencia").value;
    mostrarMensajeConfirmacion(`Emergencia reportada: ${tipo}`);
}

// Función para activar el botón de pánico
function activarPanico() {
    mostrarMensajeConfirmacion("¡Botón de Pánico Activado! Notificando emergencia grave...");
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado && usuarioGuardado.contacto) {
        console.log(`Enviando SMS a contacto de emergencia: ${usuarioGuardado.contacto}`);
    }
}

// Verificación de autenticación para cada página de la aplicación después del inicio de sesión
// (esto se puede incluir en las páginas a las que solo deben acceder usuarios autenticados)
verificarAutenticacion();
