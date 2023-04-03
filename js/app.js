// Obtención de los elementos html necesarios
const contacto__formulario = document.querySelector("[data-contacto__formulario]");
const inputsFormulario = [...contacto__formulario.querySelectorAll("input")];
const contacto__boton = contacto__formulario.querySelector(".contacto__boton--enviar");

const asuntoHtml = contacto__formulario.querySelector(".contacto__input-asunto");
const textAreaHtml = contacto__formulario.querySelector(".contacto__textarea-mensaje");

const contadorAsunto = contacto__formulario.querySelector(".asunto__contador");
const contadorTextarea = contacto__formulario.querySelector(".contacto__contador");


//  inserción de eventos en los elementos html
inputsFormulario.push(textAreaHtml);
inputsFormulario.push(asuntoHtml);

inputsFormulario.forEach((input) => {
  input.addEventListener("blur", (event) => validacion(event.target));
});

contacto__boton.addEventListener("click", (event) => {
  event.preventDefault();
  inputsFormulario.forEach((input) => validacion(input));
  const mensajeEnviado = document.querySelector(".mensaje-enviado");
  if (inputsFormulario.every((input) => input.checkValidity())) {
    mensajeEnviado.style.display = "block";
  }
});

// procedimientos de validacion
function validacion(input) {
  // liberamos el valor del input de espacios para que no pase la validación si solo hay espacios vacios
  input.value = input.value.trim();
  // A elementError se le asigna el elemnto <p> que muestra el error
  const elementError = contacto__formulario.querySelector(
    `.${input.classList[0] + "-error"}`
  );
  // si no es valido el input, se muestra el mensaje de error
  if (!input.checkValidity()) {
    elementError.textContent = inputErrorMessage(input);
    elementError.style.display = "block";
  } else {
    // si el input es valido se oculta el msj de error
    elementError.style.display = "none";
  };
};

// Objeto con mensajes personalizados según el error obtenido
const messageType = {
  valueMissing: {
    nombre: "El campo no puede estar vacío",
    email: "El campo no puede estar vacío",
    asunto: "El campo no puede estar vacío",
    mensaje: "El campo mensaje no puede estar vacío",
  },
  typeMismatch: {
    email: "El dato ingresado no es un correo electrónico (ej: text@text.com)",
  },
  patternMismatch: {
    email: "El correo electrónico no es válido (ej: text@text.com)",
    nombre: "Verifique que el nombre éste bien escrito"
  },
  tooLong: {
    nombre: "El texto supera la longitud permitida (50 caracteres)",
    asunto: "El texto supera la longitud permitida (50 caracteres)",
  },
};

// Corrobora cual fue el error y quien lo tuvo, y pide el mensaje correspondiente para el usuario
function inputErrorMessage(input) {
  for (errorName in input.validity) {
    if (input.validity[errorName]) {
      return messageType[errorName][input.name];
    }
  }
}

//  Contador de caracteres para textarea
textAreaHtml.addEventListener("keyup", (event) => {
  contadorTextarea.textContent = 0 + textAreaHtml.value.length;
  if (textAreaHtml.value.length < 300) {
    contadorTextarea.style.color = "white";
  }
  else {
    contadorTextarea.style.color = "red";
  }
});

//  Contador de caracteres para asunto
asuntoHtml.addEventListener("keyup", (event) => {
  contadorAsunto.textContent = 0 + asuntoHtml.value.length;
  if (asuntoHtml.value.length < 50) {
    contadorAsunto.style.color = "white";
  }
  else {
    contadorAsunto.style.color = "red";
  }
});
