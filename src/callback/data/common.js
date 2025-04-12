require("dotenv").config();
const dayjs = require("../../../utils/dateUtil.js");
const path = require("path");
const fs = require("fs");

const rootDir = path.resolve(__dirname, "../../../");
const silkOutputDir = process.env.sandbox ? path.join(rootDir, "output", "silk") : "/var/www/cache/silk";

// 如果没有 silkOutputDir 文件夹，就创建一个
if (!fs.existsSync(silkOutputDir)) {
	fs.mkdirSync(silkOutputDir, {
		recursive: true
	});
}

module.exports = {
	get originDay() {
		return dayjs("2024-08-29 00:00:00");
	},
	get silkOutputDir() {
		return silkOutputDir;
	}
};
