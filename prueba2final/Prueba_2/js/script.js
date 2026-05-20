// ===============================
// Registro - JavaScript (simple)
// ===============================

const arrAficiones = [];

function agregarAficion() {
  // AFICIONES (simple y funcional)

  const input = document.getElementById("hobby");
  const divMsg = document.getElementById("hobby-msg");

  const hobby = (input.value || "").trim();

  if (hobby == "") {
    divMsg.innerText = "Debe ingresar una afición";
    divMsg.className = "text-danger";
    return;
  }

  // Mantén esto simple: límite corto para no romper diseño
  if (hobby.length > 30) {
    divMsg.innerText = "La afición no debe superar 30 caracteres";
    divMsg.className = "text-danger";
    return;
  }

  if(arrAficiones.includes(hobby)){
    divMsg.innerText = "Esa afición ya fue agregada";
    divMsg.className = "form-text msg text-danger";
    return;
  }

  arrAficiones.push(hobby);
  actualizarLista();
  input.value = "";
  divMsg.innerText = "";
  divMsg.className = "form-text msg";
  validar();
}

function actualizarLista() {
  const ul = document.getElementById("hobby-list");
  ul.innerHTML = "";

  for (let i = 0; i < arrAficiones.length; i++) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const span = document.createElement("span");
    span.innerText = arrAficiones[i];

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-sm btn-outline-danger ms-2";
    btn.innerText = "Quitar";
    btn.addEventListener("click", function () {
      arrAficiones.splice(i, 1);
      actualizarLista();
      validar();
    });

    li.appendChild(span);
    li.appendChild(btn);
    ul.appendChild(li);
  }
}

function resetFormulario(event) {
  event.preventDefault();

  const form = document.getElementById("registro-form");
  if (form) form.reset();

  arrAficiones.splice(0, arrAficiones.length);
  actualizarLista();

  const ids = [
    "username-msg",
    "password-msg",
    "re-password-msg",
    "direccion-msg",
    "comuna-msg",
    "telefono-msg",
    "web-msg",
    "hobby-msg",
  ];

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerText = "";
      el.className = "form-text msg";
    }
  });
}

function setError(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerText = text;
  el.className = "form-text msg text-danger";
}

function clearError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerText = "";
  el.className = "form-text msg";
}

function validar() {

  const retUsername = validarUsername();

  const retPassword = validarContraseña();

  const retRePassword = validarRePassword();

  const retDireccion = validarDireccion();

  const retComuna = validarComuna();

  const retTelefono = validarTelefono();

  const retWeb = validarWeb();

  const retHobby = validarHobbies();

  return retUsername &&
           retPassword &&
           retRePassword &&
           retDireccion &&
           retComuna &&
           retTelefono &&
           retWeb &&
           retHobby;
}


// ---------- Helpers simples (sin regex) ----------

function esLetra(ch) {
  const c = ch.charCodeAt(0);
  return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
}

function esDigito(ch) {
  const c = ch.charCodeAt(0);
  return c >= 48 && c <= 57;
}


// ---------- Validaciones ----------

function validarUsername() {

  const inputUsername =
      document.getElementById("username");

  const divMsg =
      document.getElementById("username-msg");

  const username = (inputUsername.value || "").trim();

  if (username == "") {

    divMsg.innerText =
        "Debe ingresar un nombre de usuario";

    divMsg.className = "text-danger";

    return false;

  }

  if (username.length < 5 ||
      username.length > 10) {

    divMsg.innerText =
        "Debe tener entre 5 y 10 caracteres";

    divMsg.className = "text-danger";

    return false;

  }

  const primera = username.charAt(0);

  const esLetra =
      (primera >= "A" && primera <= "Z") ||
      (primera >= "a" && primera <= "z");

  if (!esLetra) {

    divMsg.innerText =
        "Debe comenzar con una letra";

    divMsg.className = "text-danger";

    return false;

  }

  let encontroNumero = false;

  for (let i = 0; i < username.length; i++) {

    const caracter = username.charAt(i);

    const letra =
        (caracter >= "A" && caracter <= "Z") ||
        (caracter >= "a" && caracter <= "z");

    const numero =
        caracter >= "0" && caracter <= "9";

    if (!letra && !numero) {

      divMsg.innerText =
          "No puede tener símbolos ni acentos";

      divMsg.className = "text-danger";

      return false;

    }

    if (numero) {
      encontroNumero = true;
    }

    if (encontroNumero && letra) {

      divMsg.innerText =
          "Los números solo pueden ir al final";

      divMsg.className = "text-danger";

      return false;

    }

  }

  divMsg.innerText = "";

  divMsg.className = "form-text msg";

  return true;
}


function validarContraseña() {
  const input = document.getElementById("password");
  const pass = input.value || "";
  const username = ((document.getElementById("username").value || "").trim());

  if (!pass) {
    setError("password-msg", "La contraseña es obligatoria.");
    return false;
  }

  if (pass.length < 3 || pass.length > 6) {
    setError("password-msg", "La contraseña debe tener entre 3 y 6 caracteres.");
    return false;
  }

  // No puede contener el nombre de usuario
  // Sin toLowerCase: chequeo simple (asume mismo casing)
  if (username && pass.indexOf(username) !== -1) {
    setError("password-msg", "La contraseña no puede contener el nombre de usuario.");
    return false;
  }

  // Debe tener al menos una letra y un dígito
  let tieneLetra = false;
  let tieneDigito = false;

  // No puede traer símbolos: solo letras y dígitos (sin espacios)
  for (let i = 0; i < pass.length; i++) {
    const ch = pass.charAt(i);

    if (esLetra(ch)) tieneLetra = true;
    else if (esDigito(ch)) tieneDigito = true;
    else {
      setError("password-msg", "La contraseña solo puede contener letras A-Z y dígitos 0-9.");
      return false;
    }
  }

  if (!tieneLetra || !tieneDigito) {
    setError("password-msg", "La contraseña debe tener al menos una letra y un dígito.");
    return false;
  }

  clearError("password-msg");
  return true;
}

function validarRePassword() {
  const pass = document.getElementById("password").value || "";
  const re = document.getElementById("re-password").value || "";

  if (!re) {
    setError("re-password-msg", "Debes confirmar la contraseña.");
    return false;
  }

  if (re !== pass) {
    setError("re-password-msg", "La confirmación no coincide con la contraseña.");
    return false;
  }

  clearError("re-password-msg");
  return true;
}

function validarDireccion() {
  const v = (document.getElementById("direccion").value || "").trim();

  if (!v) {
    setError("direccion-msg", "La dirección es obligatoria.");
    return false;
  }

  clearError("direccion-msg");
  return true;
}

function validarComuna() {
  const v = document.getElementById("comuna").value;

  if (!v) {
    setError("comuna-msg", "Debes seleccionar una comuna.");
    return false;
  }

  clearError("comuna-msg");
  return true;
}

function validarTelefono() {
  const raw = (document.getElementById("telefono").value || "").trim();

  if (!raw) {
    setError("telefono-msg", "El número de teléfono es obligatorio.");
    return false;
  }

  // Acepta formato chileno con +569 o solo dígitos.
  // En Chile móvil suele ser +569XXXXXXXX o 9XXXXXXXX (9 dígitos de celular).
  let v = raw;
  if (v.startsWith("+")) {
    if (!v.startsWith("+569")) {
      setError("telefono-msg", "El teléfono debe ser un número chileno (+569 o 9XXXXXXXX)." );
      return false;
    }
    v = v.slice(1); // quita el '+'
  }

  // Si después de quitar '+' queda empezando con 569, lo dejamos como 569...
  // Si queda empezando con 9, lo consideramos chileno local (9XXXXXXXX).
  if (v.startsWith("569")) {
    // Debe tener 12 caracteres total (569 + 9 dígitos = 12)
    // Ej: 56991234567
    if (v.length !== 12) {
      setError("telefono-msg", "El teléfono (+569) debe tener 12 caracteres (569 + 9 dígitos)." );
      return false;
    }
  } else {
    // Aceptar 9XXXXXXXX (9 dígitos)
    if (!v.startsWith("9")) {
      setError("telefono-msg", "El teléfono debe ser un número chileno (+569 o 9XXXXXXXX)." );
      return false;
    }
    if (v.length !== 9) {
      setError("telefono-msg", "El teléfono debe tener 9 dígitos (9XXXXXXXX)." );
      return false;
    }
  }

  // Solo dígitos
  for (let i = 0; i < v.length; i++) {
    if (!esDigito(v.charAt(i))) {
      setError("telefono-msg", "El teléfono debe contener solo dígitos (sin espacios ni guiones)." );
      return false;
    }
  }

  clearError("telefono-msg");
  return true;
}

function validarWeb() {
  const v = (document.getElementById("web").value || "").trim();

  // Según consigna se pide validar formato: entonces bloqueamos si está vacío
  if (!v) {
    setError("web-msg", "Debes ingresar una URL para tu página web.");
    return false;
  }

  // Sin regex: http:// o https://
  // Validación simple sin toLowerCase()
  // Acepta solo si empieza exactamente con http:// o https:// en minúscula
  const okProto = (v.indexOf("http://") === 0) || (v.indexOf("https://") === 0);
  if (!okProto) {
    setError("web-msg", "La URL debe comenzar con http:// o https://.");
    return false;
  }

  // No espacios
  for (let i = 0; i < v.length; i++) {
    const ch = v.charAt(i);
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      setError("web-msg", "La URL no puede contener espacios.");
      return false;
    }
  }

  // Debe existir dominio con punto
  // Quitar el protocolo
  let rest = v;
  if (rest.toLowerCase().startsWith("https://")) rest = rest.slice(8);
  else if (rest.toLowerCase().startsWith("http://")) rest = rest.slice(7);

  const dot = rest.indexOf(".");
  if (dot <= 0 || dot === rest.length - 1) {
    setError("web-msg", "La URL debe tener un dominio con punto (ej: dominio.com)." );
    return false;
  }

  clearError("web-msg");
  return true;
}

function validarHobbies() {
  const divMsg = document.getElementById("hobby-msg");

  if (arrAficiones.length < 2) {
    divMsg.innerText = "Debe ingresar al menos 2 aficiones";
    divMsg.className = "text-danger";
    return false;
  }

  divMsg.innerText = "";
  return true;
}


