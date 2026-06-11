export declare class Section<T> {
    private items;
    private renderer;
    private container;
    constructor({ items, renderer, }: {
        items: T[];
        renderer: (item: T) => HTMLElement;
    }, containerSelector: string);
    setItems(items: T[]): void;
    renderItems(): void;
    addItem(element: HTMLElement): void;
    clear(): void;
}
//# sourceMappingURL=Section.d.ts.map