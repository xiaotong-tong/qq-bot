require("dotenv").config();
const OpenAI = require("openai");

module.exports = {
	get openai() {
		return new OpenAI({
			apiKey: process.env.DASHSCOPE_API_KEY,
			baseURL: process.env.DASHSCOPE_BASE_URL
		});
	}
};
