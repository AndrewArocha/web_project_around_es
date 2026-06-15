// FORM VALIDATOR
export class FormValidator {
    form;
    inputSelector;
    submitButtonSelector;
    inactiveButtonClass;
    inputErrorClass;
    errorClass;
    inputList;
    buttonElement;
    constructor(config, formElement) {
        this.form = formElement;
        this.inputSelector = config.inputSelector;
        this.submitButtonSelector = config.submitButtonSelector;
        this.inactiveButtonClass = config.inactiveButtonClass;
        this.inputErrorClass = config.inputErrorClass;
        this.errorClass = config.errorClass;
        this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
        this.buttonElement = this.form.querySelector(this.submitButtonSelector);
    }
    _setEventListeners() {
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (evt) => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
    _hasInvalidInputs() {
        return this.inputList.some((inputElement) => !inputElement.validity.valid);
    }
    _checkInputValidity(inputElement) {
        if (!inputElement
            .validity
            .valid) {
            let errorMessage = '';
            if (inputElement
                .validity
                .valueMissing) {
                errorMessage =
                    'Por favor, completa este campo.';
            }
            else if (inputElement
                .validity
                .typeMismatch) {
                errorMessage =
                    'Por favor, introduce una dirección web.';
            }
            else if (inputElement
                .validity
                .tooShort) {
                errorMessage =
                    'El campo es demasiado corto.';
            }
            else if (inputElement
                .validity
                .tooLong) {
                errorMessage =
                    'El campo es demasiado largo.';
            }
            else {
                errorMessage =
                    inputElement
                        .validationMessage;
            }
            this
                ._showInputError(inputElement, errorMessage);
        }
        else {
            this
                ._hideInputError(inputElement);
        }
    }
    _showInputError(inputElement, errorMessage) {
        const errorElement = this.form.querySelector(`#${inputElement.name}-error`);
        console.log(inputElement.name, errorElement);
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
    }
    _hideInputError(inputElement) {
        const errorElement = this.form.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
    }
    _toggleButtonState() {
        const hasInvalidInput = this._hasInvalidInputs();
        this.buttonElement.disabled =
            hasInvalidInput;
        if (hasInvalidInput) {
            this.buttonElement
                .classList.add(this.inactiveButtonClass);
        }
        else {
            this.buttonElement
                .classList.remove(this.inactiveButtonClass);
        }
    }
    enableValidation() {
        this._setEventListeners();
    }
    resetValidation() {
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}
;
//# sourceMappingURL=FormValidator.js.map