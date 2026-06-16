export class Api {
    _baseUrl;
    _headers;
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    // Centralized helper method to check API responses and handle errors
    async _checkResponse(res) {
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    // 1. GET data 
    async getUserInfo() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        });
        return await this._checkResponse(res);
    }
    // 2. Initialize gallery
    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        });
        return await this._checkResponse(res);
    }
    // 3. Edit profile
    async updateUserInfo(name, about) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, about }),
        });
        return await this._checkResponse(res);
    }
    // 4. Add card
    async addNewCard(name, link) {
        const res = await fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link }),
        });
        return await this._checkResponse(res);
    }
    // 5. Delete card
    async deleteCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
        return await this._checkResponse(res);
    }
    // 6. Like/Unlike 
    async changeLikeStatus(cardId, isLiked) {
        const method = isLiked ? "DELETE" : "PUT";
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: method,
            headers: this._headers,
        });
        return await this._checkResponse(res);
    }
    // 7. Update avatar
    async updateAvatar(avatarUrl) {
        const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar: avatarUrl }),
        });
        return await this._checkResponse(res);
    }
}
//# sourceMappingURL=Api.js.map