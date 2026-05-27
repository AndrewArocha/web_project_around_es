type UserInfoSelectors = {
    nameSelector: string;
    descriptionSelector: string;
};

type UserData = {
    name: string;
    description: string;
};

export class UserInfo {
    private nameElement: HTMLElement;
    private descriptionElement: HTMLElement;

    constructor(selectors: UserInfoSelectors) {
        this.nameElement = document.querySelector(
            selectors.nameSelector
        ) as HTMLElement;

        this.descriptionElement = document.querySelector(
            selectors.descriptionSelector
        ) as HTMLElement;
    }

    public getUserInfo(): UserData {
        return {
            name: this.nameElement.textContent || '',
            description: this.descriptionElement.textContent || '',
        };
    }

    public setUserInfo(userData: UserData): void {
        this.nameElement.textContent =
            userData.name;

        this.descriptionElement.textContent =
            userData.description;
    }

};