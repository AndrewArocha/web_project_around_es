// POPUP WITH FORM

import { Popup } from './Popup.js';

type FormSubmitCallback = (
    inputValues: Record<string, string>
) => void;

export class PopupWithForm extends Popup {
    private formElement: HTMLFormElement;
    private submitCallback: FormSubmitCallback;
    private inputList: NodeListOf<HTMLInputElement>;
    private submitButton: HTMLButtonElement;
    private originalButtonText: string;

    constructor(
        popupSelector: string,
        submitCallback: FormSubmitCallback
    ) {
        super(popupSelector);

        this.formElement =
            this.popupElement.querySelector(
                'form'
            ) as HTMLFormElement;

        this.submitCallback =
            submitCallback;

        this.inputList =
            this.formElement.querySelectorAll(
                '.popup__input'
            );
        this.submitButton =
            this.formElement.querySelector(
                '.popup__button'
            ) as HTMLButtonElement;

        this.originalButtonText = this.submitButton.textContent || '';
    }

    private getInputValues():
        Record<string, string> {
        const inputValues:
            Record<string, string> = {};

        this.inputList.forEach(
            (input) => {
                inputValues[input.name] =
                    input.value;
            }
        );

        return inputValues;
    }

    public renderLoading(isLoading: boolean, loadingText: string = "Guardando..."): void {
        if (isLoading) {
            this.submitButton.textContent = loadingText;
        } else {
            this.submitButton.textContent = this.originalButtonText;
        }
    }

    public override setEventListeners(): void {
        super.setEventListeners();

        this.formElement.addEventListener('submit', (event: SubmitEvent) => {
            event.preventDefault();
            this.submitCallback(this.getInputValues());
        });
    }

    public override close(): void {
        super.close();
        this.formElement.reset();
    }
}