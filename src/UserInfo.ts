// USER INFO

type UserInfoSelectors = {
  nameSelector: string;
  aboutSelector: string;
  avatarSelector?: string;
};

export type UserData = {
  name: string;
  about: string;
  avatar: string;
  _id: string;
};

export class UserInfo {
  private nameElement: HTMLElement;
  private aboutElement: HTMLElement;
  private avatarElement: HTMLImageElement | null;
  private userId: string;

  constructor(selectors: UserInfoSelectors) {
    this.nameElement = document.querySelector(
      selectors.nameSelector,
    ) as HTMLElement;

    this.aboutElement = document.querySelector(
      selectors.aboutSelector,
    ) as HTMLElement;

    this.avatarElement = selectors.avatarSelector
      ? (document.querySelector(selectors.avatarSelector) as HTMLImageElement)
      : null;

    this.userId = "";
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent || "",
      about: this.aboutElement.textContent || "",
      avatar: this.avatarElement?.src || "",
      _id: this.userId,
    };
  }

  public setUserInfo(userData: UserData): void {
    this.nameElement.textContent = userData.name;
    this.aboutElement.textContent = userData.about;

    if (this.avatarElement) {
      this.avatarElement.src = userData.avatar;
    }

    this.userId = userData._id;
  }
}
