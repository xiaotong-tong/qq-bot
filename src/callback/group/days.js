const Import = require("../../index.js");
const dayjs = require("../../../utils/dateUtil.js");
const { encode, getWavFileInfo } = require("silk-wasm");
const fs = require("fs");
const path = require("path");

const quotesList = require("@xtt-nami/days-quotes");
const originDay = dayjs("2024-08-29 00:00:00");

const rootDir = path.resolve(__dirname, "../../../");
const outputDir = process.env.sandbox ? path.join(rootDir, "output", "silk") : "/var/www/cache/silk";

// 如果没有 outputDir 文件夹，就创建一个
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, {
		recursive: true
	});
}

async function doShareDaysQuotesImage(d) {
	if (d.content.trim() === "/今日日语") {
		let key = dayjs().diff(originDay, "day");

		if (key > quotesList.quotesCount) {
			key = key % quotesList.quotesCount;
		}

		const data = quotesList.list[key - 1];

		Import.sendGroupMessage(d.group_openid, {
			content: data.sentence,
			msg_type: 0,
			msg_id: d.id, // 必填，用来确认是被动回复的标志
			msg_seq: 1
		});

		if (data.sound) {
			fetch(data.sound)
				.then((res) => res.arrayBuffer())
				.then((wav) => {
					// const info = getWavFileInfo(wav);
					// const sampleRate = info.fmt.sampleRate;
					encode(wav, 24000).then((silk) => {
						fs.writeFileSync(path.join(outputDir, data.key + ".silk"), silk.data);

						Import.sendGroupMessage(d.group_openid, {
							type: 1,
							file_type: 3,
							url: `https://data.myfilegal.cn/qq/silk/${data.key}.silk`,
							srv_send_msg: false,
							msg_id: d.id, // 必填，用来确认是被动回复的标志
							msg_seq: 2
						});
					});
				});
		}
	}
}

Import.groupCallbackList.push(doShareDaysQuotesImage);
