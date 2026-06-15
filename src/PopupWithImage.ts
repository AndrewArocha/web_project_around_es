// POPUP WITH IMAGE

import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    private imageElement: HTMLImageElement;
    private captionElement: HTMLElement;

    constructor(popupSelector: string) {
        super(popupSelector);

        this.imageElement =
            this.popupElement.querySelector(
                '.popup__image'
            ) as HTMLImageElement;

        this.captionElement =
            this.popupElement.querySelector(
                '.popup__caption'
            ) as HTMLElement;
    }

    public open(
        name: string,
        link: string
    ): void {
        this.imageElement.src = link;
        this.imageElement.alt = name;
        this.captionElement.textContent =
            name || '';

        super.open();
    }
}