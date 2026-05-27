import { Popup } from './Popup.js';
type FormSubmitCallback = (inputValues: Record<string, string>) => void;
export declare class PopupWithForm extends Popup {
    private formElement;
    private submitCallback;
    private inputList;
    constructor(popupSelector: string, submitCallback: FormSubmitCallback);
    private getInputValues;
    setEventListeners(): void;
    close(): void;
}
export {};
//# sourceMappingURL=PopupWithForm.d.ts.map