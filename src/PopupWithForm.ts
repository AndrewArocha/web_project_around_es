// PopupWithForm.ts
import { Popup } from './Popup.js';

type FormSubmitCallback = (
    inputValues: Record<string, string>
) => void;

export class PopupWithForm extends Popup {
    private formElement: HTMLFormElement;
    private submitCallback: FormSubmitCallback;
    private inputList: NodeListOf<HTMLInputElement>;

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

    public override setEventListeners(): void {
        super.setEventListeners();

        this.formElement.addEventListener(
            'submit',
            (event: SubmitEvent) => {
                event.preventDefault();

                this.submitCallback(
                    this.getInputValues()
                );
            }
        );
    }

    public override close(): void {
        super.close();

        this.formElement.reset();

        
    }
}