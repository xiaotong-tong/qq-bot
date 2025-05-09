const Import = require("../../index.js");
const parseRoll = require("../../../utils/roll.js");

async function doShareRoll(d) {
	const content = d.formatContent;
	if (content.trim().startsWith("/骰娘")) {
		const input = content.slice(3).trimStart();

		const format = parseRoll(input);

		if (format === "" || format === undefined || format === null) {
			Import.sendFriendMessage(d.author.user_openid, {
				content: "星川涟不理解指令喵~请输入类似于“/骰娘 .r2d20+5”的指令喵~",
				msg_type: 0,
				msg_id: d.id // 必填，用来确认是被动回复的标志
			});
			return;
		}

		let resContent = `骰子结果: ${format.value}`;
		if (format.rolls.length > 0) {
			resContent += `\n详细: ${format.rolls.map((r) => r.process).join("\n")}`;
		}

		Import.sendFriendMessage(d.author.user_openid, {
			content: resContent,
			msg_type: 0,
			msg_id: d.id // 必填，用来确认是被动回复的标志
		});
	}
}

Import.friendCallbackList.push(doShareRoll);
