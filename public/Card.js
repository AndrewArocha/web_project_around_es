// CARD STRUCTURE
export class Card {
    name;
    link;
    cardData;
    handleCardClick;
    handleDeleteClick;
    handleLikeClick;
    templateSelector;
    constructor(cardData, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this.name = cardData.name;
        this.link = cardData.link;
        this.cardData = cardData;
        this.handleCardClick = handleCardClick;
        this.handleDeleteClick = handleDeleteClick;
        this.handleLikeClick = handleLikeClick;
        this.templateSelector = templateSelector;
    }
    _setEventListeners(cardElement) {
        const cardImage = cardElement.querySelector(".card__image");
        const cardLikeButton = cardElement.querySelector(".card__like-button");
        const cardDeleteButton = cardElement.querySelector(".card__delete-button");
        cardLikeButton.addEventListener("click", () => {
            this.handleLikeClick(this.cardData, cardElement);
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
    setLikeState(isLiked, cardElement) {
        this.cardData.isLiked = isLiked;
        const cardLikeButton = cardElement.querySelector(".card__like-button");
        if (isLiked) {
            cardLikeButton.classList.add("card__like-button_is-active");
        }
        else {
            cardLikeButton.classList.remove("card__like-button_is-active");
        }
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
        if (this.cardData.isLiked) {
            const cardLikeButton = cardElement.querySelector(".card__like-button");
            cardLikeButton.classList.add("card__like-button_is-active");
        }
        this._setEventListeners(cardElement);
        return cardElement;
    }
}
//# sourceMappingURL=Card.js.map