export interface ApiOptions {
    baseUrl: string;
    headers: Record<string, string>;
}
export declare class Api {
    private _baseUrl;
    private _headers;
    constructor(options: ApiOptions);
    private _checkResponse;
    getUserInfo<T>(): Promise<T>;
    getInitialCards<T>(): Promise<T>;
    updateUserInfo<T>(name: string, about: string): Promise<T>;
    addNewCard<T>(name: string, link: string): Promise<T>;
    deleteCard<T>(cardId: string): Promise<T>;
    changeLikeStatus<T>(cardId: string, isLiked: boolean): Promise<T>;
    updateAvatar<T>(avatarUrl: string): Promise<T>;
}
//# sourceMappingURL=Api.d.ts.map