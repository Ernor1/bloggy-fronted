import { AuthApi, backend } from "./api"

type CommentData = {
    id?: string
    content: string
    user?: string
    postId: string

}

export const createComment = async (comment: any) => {

    try {
        const response = await AuthApi.post(`${backend}/comment/createByLoggedInUser`, comment);
        return response.data;

    } catch (err) {
        throw err

    }
}
export const getAllComments = async () => {
    try {
        const response = await AuthApi.get(`${backend}/comment/all`);
        return response.data.data;
    } catch (err) {
        throw err
    }
}

export const updateComment = async (id: string, comment: CommentData) => {
    try {
        const response = await AuthApi.put(`${backend}/comment/update/${id}`, comment);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const deleteComment = async (id: string) => {
    try {
        const response = await AuthApi.delete(`${backend}/comment/delete/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getComment = async (id: string) => {
    try {
        const response = await AuthApi.get(`${backend}/comment/get/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getCommentsByPostId = async (id: string) => {
    try {
        const response = await AuthApi.get(`${backend}/comment/getByBlog/${id}`);
        return response.data.data;
    } catch (err) {
        throw err;
    }
}

export const getCommentsByUserId = async (id: string) => {
    try {
        const response = await AuthApi.get(`${backend}/comment/getByUser/${id}`);
        return response.data.data;
    } catch (err) {
        throw err;
    }
}