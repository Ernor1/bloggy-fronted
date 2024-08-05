import { api, AuthApi, backend } from "./api"

export type Tag = {
    name: string
    description: string
    id: string

}
export const createTag = async (tag: Tag) => {

    try {
        const response = await AuthApi.post(`${backend}/tag/create`, tag);
        return response.data;

    } catch (err) {
        throw err

    }
}
export const getAllTags = async () => {
    try {
        const response = await api.get(`${backend}/tag/all`);
        return response.data.data;
    } catch (err) {
        throw err
    }
}
export const getTagsByPostId = async (id: string) => {
    try {
        const response = await AuthApi.get(`${backend}/tag/all/by-blog/${id}`);
        return response.data.data;
    } catch (err) {
        throw err;
    }
}

export const updateTag = async (id: string, tag: Tag) => {
    try {
        const response = await AuthApi.put(`${backend}/tag/update/${id}`, tag);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const deleteTag = async (id: string) => {
    try {
        const response = await AuthApi.delete(`${backend}/tag/delete/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getTag = async (id: string) => {
    try {
        const response = await AuthApi.get(`${backend}/tag/get/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

