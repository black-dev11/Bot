const { cmd } = require('../lib/command');
const axios = require('axios');

cmd({
    pattern: "imagine",
    alias: ["generate", "aiimage", "img", "draw"],
    desc: "Generate AI image from text prompt",
    category: "ai",
    react: "🎨",
    use: ".imagine <prompt>"
},
async (conn, mek, m, { from, q, reply }) => {
    if (!q) {
        return reply(`╭━━━━━━━━━━━━━━━━━━━━╮
┃   🎨 *AI IMAGE GEN*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
📌 *Usage:* .imagine <prompt>
📝 *Example:* .imagine a lion wearing a crown

◈━━━━━━━━━━━━━━━━━━◈
⚡ *SHEHBAZ-MD*`);
    }

    await reply(`🎨 *Generating: "${q}"*\n⏳ Please wait...`);

    try {
        const seed = Math.floor(Math.random() * 999999);
        const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(q)}?width=1024&height=1024&seed=${seed}&nologo=true`;

        const res = await axios.get(imgUrl, { responseType: 'arraybuffer', timeout: 60000 });

        await conn.sendMessage(from, {
            image: Buffer.from(res.data),
            caption: `╭━━━━━━━━━━━━━━━━━━━━╮
┃   🎨 *AI GENERATED*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
📝 *Prompt:* ${q}
🎲 *Seed:* ${seed}
◈━━━━━━━━━━━━━━━━━━◈

⚡ *SHEHBAZ-MD*`
        }, { quoted: m });

    } catch (err) {
        reply(`❌ *Failed:* ${err.message}`);
    }
});
