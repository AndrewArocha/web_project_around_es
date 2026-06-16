// FORM VALIDATOR

export class FormValidator {
    private form: HTMLFormElement;
    private inputSelector: string;
    private submitButtonSelector: string;
    private inactiveButtonClass: string;
    private inputErrorClass: string;
    private errorClass: string;
    private inputList: HTMLInputElement[];
    private buttonElement: HTMLButtonElement;

    constructor(
        config: {
            inputSelector:
            string;

            submitButtonSelector:
            string;

            inactiveButtonClass:
            string;

            inputErrorClass:
            string;

            errorClass:
            string;
        },

        formElement:
            HTMLFormElement
    ) {
        this.form = formElement;
        this.inputSelector = config.inputSelector;
        this.submitButtonSelector = config.submitButtonSelector;
        this.inactiveButtonClass = config.inactiveButtonClass;
        this.inputErrorClass = config.inputErrorClass;
        this.errorClass = config.errorClass;
        this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector)) as HTMLInputElement[];
        this.buttonElement = this.form.querySelector(this.submitButtonSelector) as HTMLButtonElement;
    }

    private _setEventListeners(): void {
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (evt: InputEvent) => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    private _hasInvalidInputs(): boolean {
        return this.inputList.some((inputElement) => !inputElement.validity.valid);
    }

    private _checkInputValidity(
        inputElement:
            HTMLInputElement
    ): void {

        if (
            !inputElement
                .validity
                .valid
        ) {

            let errorMessage =
                '';

            if (
                inputElement
                    .validity
                    .valueMissing
            ) {

                errorMessage =
                    'Por favor, completa este campo.';

            } else if (

                inputElement
                    .validity
                    .typeMismatch
            ) {

                errorMessage =
                    'Por favor, introduce una dirección web.';

            } else if (

                inputElement
                    .validity
                    .tooShort
            ) {

                errorMessage =
                    'El campo es demasiado corto.';

            } else if (

                inputElement
                    .validity
                    .tooLong
            ) {

                errorMessage =
                    'El campo es demasiado largo.';

            } else {

                errorMessage =
                    inputElement
                        .validationMessage;
            }

            this
                ._showInputError(
                    inputElement,
                    errorMessage
                );

        } else {

            this
                ._hideInputError(
                    inputElement
                );
        }
    }

    private _showInputError(inputElement: HTMLInputElement, errorMessage: string): void {

        const errorElement = this.form.querySelector(`#${inputElement.name}-error`) as HTMLElement;

        inputElement.classList.add(this.inputErrorClass);

        errorElement.textContent = errorMessage;

        errorElement.classList.add(this.errorClass);
    }

    private _hideInputError(inputElement: HTMLInputElement): void {
        const errorElement = this.form.querySelector(`#${inputElement.name}-error`) as HTMLElement;
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
    }

    private _toggleButtonState(): void {

        const hasInvalidInput =
            this._hasInvalidInputs();

        this.buttonElement.disabled =
            hasInvalidInput;

        if (hasInvalidInput) {
            this.buttonElement
                .classList.add(
                    this.inactiveButtonClass
                );
        } else {
            this.buttonElement
                .classList.remove(
                    this.inactiveButtonClass
                );
        }
    }

    public enableValidation(): void {
        this._setEventListeners();
    }

    public resetValidation(): void {
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
};
