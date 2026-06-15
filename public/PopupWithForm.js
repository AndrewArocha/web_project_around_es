// POPUP WITH FORM
import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    formElement;
    submitCallback;
    inputList;
    submitButton;
    originalButtonText;
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this.formElement =
            this.popupElement.querySelector('form');
        this.submitCallback =
            submitCallback;
        this.inputList =
            this.formElement.querySelectorAll('.popup__input');
        this.submitButton =
            this.formElement.querySelector('.popup__button');
        this.originalButtonText = this.submitButton.textContent || '';
    }
    getInputValues() {
        const inputValues = {};
        this.inputList.forEach((input) => {
            inputValues[input.name] =
                input.value;
        });
        return inputValues;
    }
    renderLoading(isLoading, loadingText = "Guardando...") {
        if (isLoading) {
            this.submitButton.textContent = loadingText;
        }
        else {
            this.submitButton.textContent = this.originalButtonText;
        }
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.renderLoading(true);
            Promise.resolve(this.submitCallback(this.getInputValues())).finally(() => {
                this.renderLoading(false);
            });
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
//# sourceMappingURL=PopupWithForm.js.map