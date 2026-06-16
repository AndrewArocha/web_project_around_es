// USER INFO
export class UserInfo {
    nameElement;
    aboutElement;
    avatarElement;
    userId;
    constructor(selectors) {
        this.nameElement = document.querySelector(selectors.nameSelector);
        this.aboutElement = document.querySelector(selectors.aboutSelector);
        this.avatarElement = selectors.avatarSelector
            ? document.querySelector(selectors.avatarSelector)
            : null;
        this.userId = "";
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || "",
            about: this.aboutElement.textContent || "",
            avatar: this.avatarElement?.src || "",
            _id: this.userId,
        };
    }
    setUserInfo(userData) {
        this.nameElement.textContent = userData.name;
        this.aboutElement.textContent = userData.about;
        if (this.avatarElement) {
            this.avatarElement.src = userData.avatar;
        }
        this.userId = userData._id;
    }
}
//# sourceMappingURL=UserInfo.js.map