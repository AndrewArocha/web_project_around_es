export interface CardData {
  name: string;
  link: string;
  _id: string;
  isLiked?: boolean;
}

export class Card {
  private name: string;
  private link: string;
  private cardData: CardData;
  private handleCardClick: (name: string, link: string) => void;
  private handleDeleteClick: (cardData: CardData, cardElement: HTMLElement) => void;
  private handleLikeClick: (cardData: CardData, cardElement: HTMLElement) => void;
  private templateSelector: string;

  constructor(
    cardData: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void,
    handleDeleteClick: (cardData: CardData, cardElement: HTMLElement) => void,
    handleLikeClick: (cardData: CardData, cardElement: HTMLElement) => void
  ) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.cardData = cardData;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
    this.templateSelector = templateSelector;
  }

  private _setEventListeners(cardElement: HTMLElement): void {
    const cardImage = cardElement.querySelector(".card__image") as HTMLImageElement;
    const cardLikeButton = cardElement.querySelector(".card__like-button") as HTMLButtonElement;
    const cardDeleteButton = cardElement.querySelector(".card__delete-button") as HTMLButtonElement;

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
    private _getTemplate(): HTMLElement {
        const template = document.querySelector(this.templateSelector) as HTMLTemplateElement;
        return template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    }

    public setLikeState(isLiked: boolean, cardElement: HTMLElement): void {
    this.cardData.isLiked = isLiked;
    const cardLikeButton = cardElement.querySelector(".card__like-button") as HTMLButtonElement;
    
    if (isLiked) {
      cardLikeButton.classList.add("card__like-button_is-active");
    } else {
      cardLikeButton.classList.remove("card__like-button_is-active");
    }
  }

    public generateCard(): HTMLElement {
        const cardElement = this._getTemplate();
        const cardImage = cardElement.querySelector('.card__image') as HTMLImageElement;
        const cardTitle = cardElement.querySelector('.card__title') as HTMLElement;
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
      const cardLikeButton = cardElement.querySelector(".card__like-button") as HTMLButtonElement;
      cardLikeButton.classList.add("card__like-button_is-active");
        }
        this._setEventListeners(cardElement);
        return cardElement;
    }
}