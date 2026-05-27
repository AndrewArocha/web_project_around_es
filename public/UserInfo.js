export class UserInfo {
    nameElement;
    descriptionElement;
    constructor(selectors) {
        this.nameElement = document.querySelector(selectors.nameSelector);
        this.descriptionElement = document.querySelector(selectors.descriptionSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || '',
            description: this.descriptionElement.textContent || '',
        };
    }
    setUserInfo(userData) {
        this.nameElement.textContent =
            userData.name;
        this.descriptionElement.textContent =
            userData.description;
    }
}
;
//# sourceMappingURL=UserInfo.js.map