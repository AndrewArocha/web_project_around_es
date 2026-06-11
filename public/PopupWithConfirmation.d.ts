import { Popup } from "./Popup.js";
export declare class PopupWithConfirmation extends Popup {
    private form;
    private submitCallback;
    constructor(popupSelector: string);
    setSubmitCallback(callback: () => void): void;
    setEventListeners(): void;
}
//# sourceMappingURL=PopupWithConfirmation.d.ts.map