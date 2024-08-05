import { AuthApi, api, backend } from "./api"

type BlogData = {
    title: string
    content: string | any
    categories: string[]
    tags: string[]
}

export const createBlog = async (blog: BlogData, file: any) => {
    try {
        const formData = new FormData();

        // Append the blog data fields to FormData
        for (const key in blog) {
            formData.append(key, blog[key as keyof BlogData] as string);
        }

        // Append the file to FormData
        console.log(file)
        if (file) {
            formData.append("file", file);
        }

        // Make the POST request with the FormData
        const response = await AuthApi.post(`${backend}/blog/create/by-logged-in-user`, formData);

        return response.data;
    } catch (err) {
        throw err;
    }
};


export const getAllBlogs = async () => {
    try {
        const response = await api.get(`${backend}/blog/all`);
        return response.data.data;
    } catch (err) {
        throw err
    }
}
export const getAllBlogsByCategory = async (id: any) => {
    try {
        const response = await api.get(`${backend}/blog/get/by-category/${id}`);
        return response.data.data;
    } catch (err) {
        throw err
    }
}
export const getAllBlogsByTag = async (id: any) => {
    try {
        const response = await api.get(`${backend}/blog/get/by-tag/${id}`);
        return response.data.data;
    } catch (err) {
        throw err
    }
}

export const updateBlog = async (id: string | string[], blog: BlogData, file?: File) => {
    try {
        const formData = new FormData();

        // Append the blog data fields to FormData
        for (const key in blog) {
            formData.append(key, blog[key as keyof BlogData] as string);
        }

        // Append the file to FormData if it exists
        if (file) {
            formData.append("file", file);
        }

        // Make the PUT request with the FormData
        const response = await AuthApi.put(`${backend}/blog/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (err) {
        throw err;
    }
};


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
        const response = await api.get(`${backend}/blog/get/${id}`);
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