const Import = require("../../index.js");
const dayjs = require("../../../utils/dateUtil.js");
const { encode, getWavFileInfo } = require("silk-wasm");
const fs = require("fs");
const path = require("path");

const { quotesCount, list } = require("../data/days-quotes.js");
const { originDay, silkOutputDir } = require("../data/common.js");

async function doShareDaysQuotesImage(d) {
	if (d.content.trim() === "/今日日语") {
		let key = dayjs().diff(originDay, "day");

		if (key > quotesCount) {
			key = key % quotesCount;
		}

		const data = list[key - 1];

		Import.sendFriendMessage(d.author.user_openid, {
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
						fs.writeFileSync(path.join(silkOutputDir, data.key + ".silk"), silk.data);

						Import.sendFriendMessage(d.author.user_openid, {
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

Import.friendCallbackList.push(doShareDaysQuotesImage);
