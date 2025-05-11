// Obtener elementos
var loginForm = document.getElementById("login-form");
var registroForm = document.getElementById("registro-form");

var linkRegistro = document.getElementById("cambiar-registro");
var linkLogin = document.getElementById("volver-login");


// Ocultar todo excepto login al inicio
registroForm.setAttribute("style", "display:none;");
loginForm.setAttribute("style", "display:block;");

// Mostrar registro
linkRegistro.onclick = function() {
    loginForm.setAttribute("style", "display:none;");
    registroForm.setAttribute("style", "display:block;");
    return false;
};

// Volver al login
linkLogin.onclick = function() {
    registroForm.setAttribute("style", "display:none;");
    loginForm.setAttribute("style", "display:block;");
    return false;
};


