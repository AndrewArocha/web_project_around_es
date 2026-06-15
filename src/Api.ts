// API
export interface ApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

export class Api {
  private _baseUrl: string;
  private _headers: Record<string, string>;

  constructor(options: ApiOptions) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Centralized helper method to check API responses and handle errors
  private async _checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`); 
  }

  // 1. GET data 
  public async getUserInfo<T>(): Promise<T> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return await this._checkResponse<T>(res);
  }

  // 2. Initialize gallery
  public async getInitialCards<T>(): Promise<T> {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return await this._checkResponse<T>(res);
  }

  // 3. Edit profile
  public async updateUserInfo<T>(name: string, about: string): Promise<T> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
    return await this._checkResponse<T>(res);
  }

  // 4. Add card
  public async addNewCard<T>(name: string, link: string): Promise<T> {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
    return await this._checkResponse<T>(res);
  }

  // 5. Delete card
  public async deleteCard<T>(cardId: string): Promise<T> {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return await this._checkResponse<T>(res);
  }

  // 6. Like/Unlike 
  public async changeLikeStatus<T>(cardId: string, isLiked: boolean): Promise<T> {
    const method = isLiked ? "DELETE" : "PUT";
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
    });
    return await this._checkResponse<T>(res);
  }

  // 7. Update avatar
  public async updateAvatar<T>(avatarUrl: string): Promise<T> {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    });
    return await this._checkResponse<T>(res);
  }
}