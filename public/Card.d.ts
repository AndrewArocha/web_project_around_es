export interface CardData {
    name: string;
    link: string;
    _id: string;
    isLiked?: boolean;
}
export declare class Card {
    private name;
    private link;
    private cardData;
    private handleCardClick;
    private handleDeleteClick;
    private handleLikeClick;
    private templateSelector;
    constructor(cardData: CardData, templateSelector: string, handleCardClick: (name: string, link: string) => void, handleDeleteClick: (cardData: CardData, cardElement: HTMLElement) => void, handleLikeClick: (cardData: CardData, cardElement: HTMLElement) => void);
    private _setEventListeners;
    private _getTemplate;
    setLikeState(isLiked: boolean, cardElement: HTMLElement): void;
    generateCard(): HTMLElement;
}
//# sourceMappingURL=Card.d.ts.map