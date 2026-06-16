import { Popup } from './Popup.js';
type FormSubmitCallback = (inputValues: Record<string, string>) => void;
export declare class PopupWithForm extends Popup {
    private formElement;
    private submitCallback;
    private inputList;
    private submitButton;
    private originalButtonText;
    constructor(popupSelector: string, submitCallback: FormSubmitCallback);
    private getInputValues;
    renderLoading(isLoading: boolean, loadingText?: string): void;
    setEventListeners(): void;
    close(): void;
}
export {};
//# sourceMappingURL=PopupWithForm.d.ts.map