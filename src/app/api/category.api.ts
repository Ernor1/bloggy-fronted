import { AuthApi, backend } from "./api"

export type Category = {
    name: string
    description: string
    id: string

}
export const createCategory = async (category: Category) => {

    try {
        const response = await AuthApi.post(`${backend}/category/create`, category);
        return response.data;

    } catch (err) {
        throw err

    }
}
export const getAllCategories = async () => {
    try {
        const response = await AuthApi.get(`${backend}/category/all`);
        return response.data.data;
    } catch (err) {
        throw err
    }
}

export const updateCategory = async (id: string, category: Category) => {
    try {
        const response = await AuthApi.put(`${backend}/category/update/${id}`, category);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const deleteCategory = async (id: string) => {
    try {
        const response = await AuthApi.delete(`${backend}/category/delete/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}
export const getCategory = async (id: string) => {
    try {
        const response = await AuthApi.get(`${backend}/category/get/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}