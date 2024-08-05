import { deleteCookie, setCookie } from "cookies-next";
import { AuthApi, api, backend } from "./api";
import { useRouter } from "next/navigation";

type Credentials = {
    email: string;
    password: string;
};

type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
};

async function saveAuthToken(token: string) {
    try {
        setCookie('token', token, { maxAge: 60 * 60 * 24 });
    } catch (error) {
        console.error('Error storing auth token:', error);
        throw error
    }
}

export async function removeAuthToken() {
    try {
        deleteCookie('token');
    } catch (error) {
        console.error('Error removing auth token:', error);
        throw error
    }
}

export const login = async (cred: Credentials) => {
    try {
        const response = await api.post(`${backend}/auth/login`, cred);
        await saveAuthToken(response.data.data.token);
        return response.data;
    } catch (error) {
        console.log("error response");
        console.log(error);
        throw error;
    }
};

export const getProfile = async () => {
    try {
        console.log("here");
        const response = await AuthApi.get(`${backend}/auth/profile`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const signUp = async (user: User) => {
    try {
        const response = await api.post(`${backend}/users/create`, user, {
            params: {
                role: "USER",
            }
        });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Pass the router instance as a parameter to this function
export const logout = async (router: ReturnType<typeof useRouter>) => {
    try {
        await removeAuthToken();
        router.replace('/signin');
    } catch (error) {
        throw error;
    }
};


