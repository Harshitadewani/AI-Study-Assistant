const aiService = require('../services/ai.service');
const { success, error } = require('../utils/response');

const chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) return error(res, 'message is required', 400);
    const text = await aiService.chat([{ role: 'user', content: message }]);
    return success(res, { reply: text });
  } catch (err) {
    return error(res, err.message || 'AI request failed', 500);
  }
};

const summarize = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) return error(res, 'text is required', 400);
    const summary = await aiService.summarize(text);
    return success(res, { summary });
  } catch (err) {
    return error(res, err.message || 'Summarization failed', 500);
  }
};

module.exports = { chat, summarize };
