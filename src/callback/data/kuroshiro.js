const KuroshiroFactory = require("kuroshiro");
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");

const kuroshiro = new KuroshiroFactory.default();
kuroshiro.init(new KuromojiAnalyzer());

module.exports = {
	get kuroshiro() {
		return kuroshiro;
	},
	get KuroshiroFactory() {
		return KuroshiroFactory;
	}
};
