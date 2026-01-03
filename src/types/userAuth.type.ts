export interface UserLoginRequest {
    username: string;
    password: string;
}

export interface UserLoginResponse {
    username: string;
    refresh: string;
    access: string;
}

export interface RefreshTokenResponse {
    username: string;
    refresh: string;
    access: string;
}