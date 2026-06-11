import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  private form: HTMLFormElement;
  private submitCallback: () => void;

  constructor(popupSelector: string) {
    super(popupSelector);

    this.form = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
    this.submitCallback = () => {};
  }

  public setSubmitCallback(callback: () => void): void {
    this.submitCallback = callback;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.submitCallback();
    });
  }
}