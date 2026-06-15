// POPUP WITH CONFIRMATION
import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    form;
    submitCallback;
    constructor(popupSelector) {
        super(popupSelector);
        this.form = this.popupElement.querySelector(".popup__form");
        this.submitCallback = () => { };
    }
    setSubmitCallback(callback) {
        this.submitCallback = callback;
    }
    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.submitCallback();
        });
    }
}
//# sourceMappingURL=PopupWithConfirmation.js.map