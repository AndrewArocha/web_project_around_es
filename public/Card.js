export class Card {
    name;
    link;
    cardData;
    handleCardClick;
    handleDeleteClick;
    templateSelector;
    constructor(cardData, templateSelector, handleCardClick, handleDeleteClick) {
        this.name = cardData.name;
        this.link = cardData.link;
        this.cardData = cardData;
        this.handleCardClick = handleCardClick;
        this.handleDeleteClick = handleDeleteClick;
        this.templateSelector = templateSelector;
    }
    _setEventListeners(cardElement) {
        const cardImage = cardElement.querySelector(".card__image");
        const cardLikeButton = cardElement.querySelector(".card__like-button");
        const cardDeleteButton = cardElement.querySelector(".card__delete-button");
        cardLikeButton.addEventListener("click", () => {
            cardLikeButton.classList.toggle("card__like-button_is-active");
        });
        cardDeleteButton.addEventListener("click", () => {
            this.handleDeleteClick(this.cardData, cardElement);
        });
        cardImage.addEventListener("click", () => {
            this.handleCardClick(this.name, this.link);
        });
    }
    _getTemplate() {
        const template = document.querySelector(this.templateSelector);
        return template.content.firstElementChild.cloneNode(true);
    }
    generateCard() {
        const cardElement = this._getTemplate();
        const cardImage = cardElement.querySelector('.card__image');
        const cardTitle = cardElement.querySelector('.card__title');
        cardImage.src = this.link;
        cardImage.alt = this.name;
        cardTitle.textContent = this.name;
        if (!this.link) {
            cardImage.src = 'https://via.placeholder.com/150';
        }
        if (!this.name) {
            cardTitle.textContent = 'Sin título';
        }
        this._setEventListeners(cardElement);
        return cardElement;
    }
}
//# sourceMappingURL=Card.js.map