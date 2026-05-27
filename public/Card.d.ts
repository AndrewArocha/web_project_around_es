export interface CardData {
    name: string;
    link: string;
}
export declare class Card {
    private name;
    private link;
    private handleCardClick;
    private templateSelector;
    constructor({ name, link }: CardData, templateSelector: string, handleCardClick: (name: string, link: string) => void);
    private _setEventListeners;
    private _getTemplate;
    generateCard(): HTMLElement;
}
//# sourceMappingURL=Card.d.ts.map