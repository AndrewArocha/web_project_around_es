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
export declare class UserInfo {
    private nameElement;
    private aboutElement;
    private avatarElement;
    private userId;
    constructor(selectors: UserInfoSelectors);
    getUserInfo(): UserData;
    setUserInfo(userData: UserData): void;
}
export {};
//# sourceMappingURL=UserInfo.d.ts.map