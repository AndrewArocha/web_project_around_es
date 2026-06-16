export declare class Popup {
    protected popupElement: HTMLElement;
    constructor(popupSelector: string);
    open(name?: string, link?: string): void;
    close(): void;
    private handleEscClose;
    setEventListeners(): void;
}
//# sourceMappingURL=Popup.d.ts.map