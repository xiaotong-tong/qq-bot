const { read } = require("jimp");
const jsQR = require("jsqr");

module.exports = {
	get read() {
		return read;
	},
	get jsQR() {
		return jsQR;
	}
};
