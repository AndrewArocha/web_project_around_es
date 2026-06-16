// POPUP
export class Popup {
    popupElement;
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
    }
    open(name, link) {
        this.popupElement.classList.add('popup_is-opened');
        document.addEventListener('keydown', this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this.handleEscClose);
    }
    handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    };
    setEventListeners() {
        const closeButton = this.popupElement.querySelector('.popup__close');
        closeButton.addEventListener('click', () => this.close());
        this.popupElement.addEventListener('click', (event) => {
            if (event.target ===
                this.popupElement) {
                this.close();
            }
        });
    }
}
//# sourceMappingURL=Popup.js.map