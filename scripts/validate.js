// FORM VALIDATION

function showInputError(input) {
  const errorElement = input.nextElementSibling;
  if (!errorElement) return; // Just in case the HTML structure is not as expected

let errorMessage = '';
  if (input.validity.valueMissing) {
    errorMessage = 'Por favor, completa este campo.';
  }
    else if (input.validity.typeMismatch) {
    errorMessage = 'Por favor, introduce una dirección web.';
  }
    else if (input.validity.tooShort) {
    errorMessage = 'El campo es demasiado corto.';
  }
    else if (input.validity.tooLong) {
    errorMessage = 'El campo es demasiado largo.';
  }
     else {
    errorMessage = input.validationMessage;
  }

  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  input.classList.add('popup__input_type_error');
}

function hideInputError(input) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
  input.classList.remove('popup__input_type_error');
}

function checkInputValidity(input) {
  if (!input.validity.valid) {
    showInputError(input);
  } else {
    hideInputError(input);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some(input => !input.validity.valid);
}

function toggleButtonState(inputs, button) {
  button.disabled = hasInvalidInput(inputs);
}

export function setEventListeners(form) {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector('.popup__button');

  toggleButtonState(inputs, button); // initial button state

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
      toggleButtonState(inputs, button);
    });
  });
}

export function resetValidation(form) {
  const inputs = [...form.querySelectorAll('.popup__input')];
  const button = form.querySelector('.popup__button');
    inputs.forEach(input => hideInputError(input));
    toggleButtonState(inputs, button);
}
