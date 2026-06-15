// SECTION STRUCTURE

export class Section<T> {
    private items: T[];
    private renderer:
        (item: T) => HTMLElement;

    private container:
        HTMLElement;

    constructor(
        {
            items,
            renderer,
        }: {
            items: T[];
            renderer:
            (item: T) => HTMLElement;
        },

        containerSelector:
            string
    ) {

        this.items =
            items;

        this.renderer =
            renderer;

        this.container =
            document.querySelector(
                containerSelector
            ) as HTMLElement;
    }

    public setItems(
        items: T[]
    ): void {
        this.items = items;
    }

    public renderItems():
        void {

        this.clear();

        this.items.reverse().forEach(
            (item) => {

                const element =
                    this.renderer(
                        item
                    );

                this.addItem(
                    element
                );
            }
        );
    }

    public addItem(
        element:
            HTMLElement
    ): void {

        this.container
            .prepend(
                element
            );
    }

    public clear():
        void {

        this.container
            .innerHTML = "";
    }
}