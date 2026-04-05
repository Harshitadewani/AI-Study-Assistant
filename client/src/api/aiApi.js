import api from './axios';

export const chat = (message) => api.post('/api/ai/chat', { message });
export const summarize = (text) => api.post('/api/ai/summarize', { text });