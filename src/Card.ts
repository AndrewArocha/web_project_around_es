export interface CardData {
  name: string;
  link: string;
  _id: string;
}

export class Card {
  private name: string;
  private link: string;
  private cardData: CardData;
  private handleCardClick: (name: string, link: string) => void;
  private handleDeleteClick: (cardData: CardData, cardElement: HTMLElement) => void;
  private templateSelector: string;

  constructor(
    cardData: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void,
    handleDeleteClick: (cardData: CardData, cardElement: HTMLElement) => void
  ) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.cardData = cardData;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this.templateSelector = templateSelector;
  }

  private _setEventListeners(cardElement: HTMLElement): void {
    const cardImage = cardElement.querySelector(".card__image") as HTMLImageElement;
    const cardLikeButton = cardElement.querySelector(".card__like-button") as HTMLButtonElement;
    const cardDeleteButton = cardElement.querySelector(".card__delete-button") as HTMLButtonElement;

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
    private _getTemplate(): HTMLElement {
        const template = document.querySelector(this.templateSelector) as HTMLTemplateElement;
        return template.content.firstElementChild!.cloneNode(true) as HTMLElement;
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
        this._setEventListeners(cardElement);
        return cardElement;
    }
}