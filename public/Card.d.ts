export interface CardData {
    name: string;
    link: string;
    _id: string;
}
export declare class Card {
    private name;
    private link;
    private cardData;
    private handleCardClick;
    private handleDeleteClick;
    private templateSelector;
    constructor(cardData: CardData, templateSelector: string, handleCardClick: (name: string, link: string) => void, handleDeleteClick: (cardData: CardData, cardElement: HTMLElement) => void);
    private _setEventListeners;
    private _getTemplate;
    generateCard(): HTMLElement;
}
//# sourceMappingURL=Card.d.ts.map