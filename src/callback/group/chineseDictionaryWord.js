const Import = require("../../index.js");
const { random } = require("xtt-utils");
const { topic } = require("@xtt-nami/days-quotes");
const openai = require("../../../utils/openai.js");

async function doShareChineseDictionaryWordImage(d) {
	if (d.content.trim() === "/三题故事") {
		// 随机获取三项
		const cnWords = [];
		const jpWords = [];
		cnWords.push(
			topic.cn.list[random(0, topic.cn.count)],
			topic.cn.list[random(0, topic.cn.count)],
			topic.cn.list[random(0, topic.cn.count)]
		);
		jpWords.push(
			topic.jp.list[random(0, topic.jp.count)],
			topic.jp.list[random(0, topic.jp.count)],
			topic.jp.list[random(0, topic.jp.count)]
		);

		const content = `呼呼，这次的三题点心主题是 “${cnWords[0].word}”、“${cnWords[1].word}” 和 “${cnWords[2].word}” 哦~ 不知能以此做出什么味道的美味呢？\nもし日本語でやれば、「${jpWords[0].word}」、「${jpWords[1].word}」と「${jpWords[2].word}」はどうでしょうか、どんな美味しいものを作れるだろう`;

		Import.sendGroupMessage(d.group_openid, {
			content: content,
			msg_type: 0,
			msg_seq: 1,
			msg_id: d.id // 必填，用来确认是被动回复的标志
		});

		try {
			const completion = await openai.chat.completions.create({
				model: "deepseek-v3",
				messages: [
					{
						role: "user",
						content: `可以用“${cnWords[0].word}”、“${cnWords[1].word}” 和 “${cnWords[2].word}” 三个词语为题目，写一篇三题故事吗？请直接返回故事内容，不需要返回故事梗概和结语。`
					}
				]
			});

			Import.sendGroupMessage(d.group_openid, {
				content: completion.choices[0].message.content,
				msg_type: 0,
				msg_seq: 2,
				msg_id: d.id // 必填，用来确认是被动回复的标志
			});
		} catch (e) {
			console.error(e);
		}
	}
}

Import.groupCallbackList.push(doShareChineseDictionaryWordImage);
