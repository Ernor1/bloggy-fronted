import { AuthApi, api, backend } from "./api"

type BlogData = {
    title: string
    content: string | any
    categories: string[]
    tags: string[]
}

export const createBlog = async (blog: BlogData) => {

    try {
        const response = await AuthApi.post(`${backend}/blog/create/by-logged-in-user`, blog);
        return response.data;

    } catch (err) {
        throw err

    }
}
export const getAllBlogs = async () => {
    try {
        const response = await AuthApi.get(`${backend}/blog/all`);
        return response.data.data;
    } catch (err) {
        throw err
    }
}

export const updateBlog = async (id: string | string[], book: BlogData) => {
    try {
        const response = await AuthApi.put(`${backend}/blog/update/${id}`, book);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const deleteBlog = async (id: string) => {
    try {
        const response = await AuthApi.delete(`${backend}/blog/delete/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getBlog = async (id: string) => {
    try {
        const response = await AuthApi.get(`${backend}/blog/get/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getBlogsByAuthor = async (id: any) => {
    try {
        const response = await AuthApi.get(`${backend}/blog/get/by-author/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}