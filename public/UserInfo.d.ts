type UserInfoSelectors = {
    nameSelector: string;
    descriptionSelector: string;
};
type UserData = {
    name: string;
    description: string;
};
export declare class UserInfo {
    private nameElement;
    private descriptionElement;
    constructor(selectors: UserInfoSelectors);
    getUserInfo(): UserData;
    setUserInfo(userData: UserData): void;
}
export {};
//# sourceMappingURL=UserInfo.d.ts.map