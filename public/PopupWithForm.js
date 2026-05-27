// PopupWithForm.ts
import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    formElement;
    submitCallback;
    inputList;
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this.formElement =
            this.popupElement.querySelector('form');
        this.submitCallback =
            submitCallback;
        this.inputList =
            this.formElement.querySelectorAll('.popup__input');
    }
    getInputValues() {
        const inputValues = {};
        this.inputList.forEach((input) => {
            inputValues[input.name] =
                input.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.submitCallback(this.getInputValues());
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
//# sourceMappingURL=PopupWithForm.js.map