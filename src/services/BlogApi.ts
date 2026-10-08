import api from "./api";

// Get Single Blog (Public)
export const getBlogById = async (id: string, token?: string) => {
    const res = await api.get(`/blogs/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data;
};

// Create Blog (Admin Only)
export const createBlog = async (
    blogData: FormData,
    token: string
) => {
    const res = await api.post("/blogs", blogData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

// Update Blog (Admin Only)
export const updateBlog = async (
    id: string,
    blogData: FormData,
    token: string
) => {
    const res = await api.put(`/blogs/${id}`, blogData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

// Delete Blog (Admin Only)
export const deleteBlog = async (id: string, token: string) => {
    const res = await api.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// Get All Blogs (Public)
export const fetchBlogs = async () => {
    const res = await api.get("/blogs");
    return res.data;
};

// Active Inactive Toggle (Admin Only)
export const toggleBlogStatus = async (id: string, token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};
