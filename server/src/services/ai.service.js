const { getModel } = require('../ai/geminiClient');

const chat = async (messages) => {
  const model = getModel();
  const chatSession = model.startChat({ history: [] });
  const lastMsg = messages[messages.length - 1];
  if (!lastMsg?.content) throw new Error('No message content');
  const result = await chatSession.sendMessage(lastMsg.content);
  const response = await result.response;
  return response.text();
};

const summarize = async (text) => {
  const model = getModel();
  const prompt = `Summarize the following text clearly and concisely:\n\n${text}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

module.exports = { chat, summarize };
