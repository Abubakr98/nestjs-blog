import jwt_decode from "jwt-decode";

export const isAuthenticated = (): boolean => {
    let token = localStorage.getItem("accessToken") as string;
    if (!token) {
        return false;
    }
    const jwt = jwt_decode(token) as { exp: number, name: string };
    return !(jwt.exp < Date.now() / 1000);
};

export const storage = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
}

export const restore = () => {
    localStorage.removeItem('accessToken');
}

export const getAccessToken = () => {
    localStorage.getItem('accessToken');
}