export declare class FormValidator {
    private form;
    private inputSelector;
    private submitButtonSelector;
    private inactiveButtonClass;
    private inputErrorClass;
    private errorClass;
    private inputList;
    private buttonElement;
    constructor(config: {
        inputSelector: string;
        submitButtonSelector: string;
        inactiveButtonClass: string;
        inputErrorClass: string;
        errorClass: string;
    }, formElement: HTMLFormElement);
    private _setEventListeners;
    private _hasInvalidInputs;
    private _checkInputValidity;
    private _showInputError;
    private _hideInputError;
    private _toggleButtonState;
    enableValidation(): void;
    resetValidation(): void;
}
//# sourceMappingURL=FormValidator.d.ts.map