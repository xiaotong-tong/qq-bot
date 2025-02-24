const OpenAI = require("openai");

const openai = new OpenAI({
	apiKey: process.env.DASHSCOPE_API_KEY,
	baseURL: process.env.DASHSCOPE_BASE_URL
});

module.exports = openai;
