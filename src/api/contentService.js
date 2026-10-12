import client from './client';
import { SERVER_URL } from '../config/env';

const byNewest = (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0);

// Public endpoints (no login needed)
export const fetchPublicContent = (type) =>
  client.get('/public-content').then((res) => {
    const items = Array.isArray(res.data) ? res.data : [];
    return (type ? items.filter((item) => item.type === type) : items).sort(byNewest);
  });

export const fetchPublicContentById = (id) => client.get(`/public-content/${id}`).then((res) => res.data);

// Admin endpoints (multipart because of the optional attachment)
const toFormData = ({ title, description, type, attachment }) => {
  const form = new FormData();
  form.append('title', title);
  form.append('description', description);
  form.append('type', type);
  if (attachment) form.append('attachment', attachment);
  return form;
};

const multipart = { headers: { 'Content-Type': 'multipart/form-data' } };

export const createContent = (content) =>
  client.post('/admin/public-content', toFormData(content), multipart).then((res) => res.data);

export const updateContent = (id, content) =>
  client.put(`/admin/public-content/${id}`, toFormData(content), multipart).then((res) => res.data);

export const deleteContent = (id) => client.delete(`/admin/public-content/${id}`);

// attachmentUrl is server-relative (e.g. /api/public/uploads/x.jpg)
export const assetUrl = (path) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SERVER_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

export const isImage = (path) => /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(path || '');
