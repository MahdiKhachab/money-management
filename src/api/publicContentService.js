// src/services/publicContentService.js

const API_BASE_URL = 'http://localhost:8080/ZahraaAPI/api';

export const getPublicContent = async () => {
    const response = await fetch(`${API_BASE_URL}/public-content`);
    if (!response.ok) {
        throw new Error('فشل في جلب المحتوى العام');
    }
    return response.json();
};

export const createPublicContent = async (contentData, token) => {
    const formData = new FormData();
    for (const key in contentData) {
        if (contentData[key]) {
            formData.append(key, contentData[key]);
        }
    }

    const response = await fetch(`${API_BASE_URL}/admin/public-content`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData, // FormData automatically sets the Content-Type to multipart/form-data
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'فشل في إضافة المحتوى');
    }
    return response.json();
};


/**
 * Fetches public content by its ID.
 * @param {number} id The ID of the public content to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the public content data.
 */
export const getPublicContentById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/public-content/${id}`);
        if (!response.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch public content:", error);
        throw error;
    }
};
