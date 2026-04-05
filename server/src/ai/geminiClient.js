const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config');

const genAI = config.googleAiKey
  ? new GoogleGenerativeAI(config.googleAiKey)
  : null;

const getModel = () => {
  if (!genAI) throw new Error('GOOGLE_AI_API_KEY is not configured');
  return genAI.getGenerativeModel({ model: config.geminiModel });
};

module.exports = { getModel };
