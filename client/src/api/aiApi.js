import api from './axios';

export const chat = (message) => api.post('ai/chat', { message });
export const summarize = (text) => api.post('ai/summarize', { text });
