import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
    imageElement;
    captionElement;
    constructor(popupSelector) {
        super(popupSelector);
        this.imageElement =
            this.popupElement.querySelector('.popup__image');
        this.captionElement =
            this.popupElement.querySelector('.popup__caption');
    }
    open(name, link) {
        this.imageElement.src = link;
        this.imageElement.alt = name;
        this.captionElement.textContent =
            name || '';
        super.open();
    }
}
//# sourceMappingURL=PopupWithImage.js.map