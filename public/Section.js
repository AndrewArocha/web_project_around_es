export class Section {
    items;
    renderer;
    container;
    constructor({ items, renderer, }, containerSelector) {
        this.items =
            items;
        this.renderer =
            renderer;
        this.container =
            document.querySelector(containerSelector);
    }
    renderItems() {
        this.clear();
        this.items.forEach((item) => {
            const element = this.renderer(item);
            this.addItem(element);
        });
    }
    addItem(element) {
        this.container
            .prepend(element);
    }
    clear() {
        this.container
            .innerHTML = "";
    }
}
//# sourceMappingURL=Section.js.map