const send_btn = document.querySelector('#enviar');
const reset_btn = document.querySelector('#resetBtn');
const email = document.querySelector('#email');
const subject = document.querySelector('#asunto');
const message = document.querySelector('#mensaje');
const form = document.querySelector('#enviar-mail');
let email_validation = false;

function eventListeners() {
  document.addEventListener('DOMContentLoaded', startApp);
  email.addEventListener('blur', validateForm);
  subject.addEventListener('blur', validateForm);
  message.addEventListener('blur', validateForm);
  form.addEventListener('submit', sendEmail);
  reset_btn.addEventListener('click', resetForm);
}

function startApp() {
  send_btn.disabled = true;
  send_btn.classList.add('cursor-not-allowed', 'opacity-50');
}

function validateForm(e) {
  if(e.target.value.length > 0) {
    removeErrorMessage();

    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
  } else {
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');
    showError('Todos los campos son obligatorios');
  }

  if(e.target.type === 'email') email_validation = validateEmail(e);

  if(email_validation && subject.value !== '' && message.value !== '') {
    send_btn.disabled = false;
    send_btn.classList.remove('cursor-not-allowed', 'opacity-50');
  } else {
    startApp();
  }
}

function removeErrorMessage() {
  const error_message = document.querySelector('p.message-error');
  if(error_message) error_message.remove();
}

function validateEmail(event) {
  let validation = false;
  const regular_expression = 	
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(regular_expression.test(event.target.value)) {
    event.target.classList.add('border', 'border-green-500');
    validation = true;
  } else {
    event.target.classList.remove('border', 'border-green-500');
    event.target.classList.add('border', 'border-red-500');
    showError('El correo debe ser válido');
  }

  return validation;
}

function sendEmail(e) {
  e.preventDefault();
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex';
  
  setTimeout(() => {
    spinner.style.display = 'none';

    const email_send_text = document.createElement('p');
    email_send_text.textContent = 'Mensaje enviado correctamente';
    email_send_text.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

    form.insertBefore(email_send_text, spinner);

    setTimeout(() => {
      email_send_text.remove();
      resetForm();
    }, 3500);
  }, 3500);
}

function showError(message) {
  const error_message = document.createElement('p');
  const validation_errors = document.querySelectorAll('.message-error');

  error_message.textContent = message;
  error_message.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'message-error');
  
  if(validation_errors.length === 0) {
    form.appendChild(error_message);
  }
}

function resetForm() {
  form.reset();
  startApp();
}

eventListeners();