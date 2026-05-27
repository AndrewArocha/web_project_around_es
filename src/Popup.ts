// Popup.ts
export class Popup {
    protected popupElement: HTMLElement;

    constructor(popupSelector: string) {
        this.popupElement = document.querySelector(
            popupSelector
        ) as HTMLElement;
    }

    public open(name?: string, link?: string): void {
        this.popupElement.classList.add('popup_is-opened');

        document.addEventListener(
            'keydown',
            this.handleEscClose
        );
    }

    public close(): void {
        this.popupElement.classList.remove('popup_is-opened');

        document.removeEventListener(
            'keydown',
            this.handleEscClose
        );
    }

    private handleEscClose = (
        event: KeyboardEvent
    ): void => {
        if (event.key === 'Escape') {
            this.close();
        }
    };

    public setEventListeners(): void {
        const closeButton =
            this.popupElement.querySelector(
                '.popup__close'
            ) as HTMLButtonElement;

        closeButton.addEventListener(
            'click',
            () => this.close()
        );

        this.popupElement.addEventListener(
            'click',
            (event) => {
                if (
                    event.target ===
                    this.popupElement
                ) {
                    this.close();
                }
            }
        );
    }
}