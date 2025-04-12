const { topic, quotesCount, list } = require("@xtt-nami/days-quotes");

module.exports = {
	get topic() {
		return topic;
	},
	get quotesCount() {
		return quotesCount;
	},
	get list() {
		return list;
	}
};
