const { topic, quotesCount, list } = require("@xtt-nami/days-quotes");

const soundUrlPrefix = "https://file.xtt.cool";
const soundFormatList = list.map((item) => {
	if (item.sound) {
		item.sound = soundUrlPrefix + item.sound;
	}
	return item;
});

console.log(soundFormatList);

module.exports = {
	get topic() {
		return topic;
	},
	get quotesCount() {
		return quotesCount;
	},
	get list() {
		return soundFormatList;
	}
};
