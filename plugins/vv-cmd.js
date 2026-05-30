const { cmd } = require('../lib/command');
const axios = require('axios');  // ✅ YEH LINE ADD KARI

cmd({
    pattern: "vv",
    alias: ["viewonce", "antivv"],
    desc: "Download view once images/videos",
    category: "tools",
    react: "👁️",
    use: ".vv (reply to view once message)"
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quotedMsg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        
        if (!quotedMsg) {
            return reply(`╭━━━━━━━━━━━━━━━━━━━━╮
┃   👁️ *VIEW ONCE*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
📌 *Usage:*
► Reply to a view once image/video
► Send: .vv

⚡ SHEHBAZ-MD`);
        }

        // Check if it's a view once message
        const isViewOnce = quotedMsg.imageMessage?.viewOnce || 
                          quotedMsg.videoMessage?.viewOnce ||
                          quotedMsg.ephemeralMessage?.message?.imageMessage?.viewOnce ||
                          quotedMsg.ephemeralMessage?.message?.videoMessage?.viewOnce;

        if (!isViewOnce) {
            return reply(`❌ *Not a view once message!*\n\nReply to a view once image/video with .vv`);
        }

        await reply(`⏳ *Downloading view once media...*`);

        let mediaBuffer;
        let isImage = false;

        let msgToDownload = quotedMsg;
        if (quotedMsg.ephemeralMessage) {
            msgToDownload = quotedMsg.ephemeralMessage.message;
        }

        if (msgToDownload.imageMessage) {
            isImage = true;
            const url = msgToDownload.imageMessage.url;
            const { data } = await axios.get(url, { responseType: 'arraybuffer' });
            mediaBuffer = Buffer.from(data);
        } else if (msgToDownload.videoMessage) {
            isImage = false;
            const url = msgToDownload.videoMessage.url;
            const { data } = await axios.get(url, { responseType: 'arraybuffer' });
            mediaBuffer = Buffer.from(data);
        } else {
            return reply(`❌ *No media found in replied message*`);
        }

        if (isImage) {
            await conn.sendMessage(from, {
                image: mediaBuffer,
                caption: `╭━━━━━━━━━━━━━━━━━━━━╮
┃   👁️ *VIEW ONCE SAVED*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
📷 *Type:* Image
⚡ SHEHBAZ-MD`
            }, { quoted: m });
        } else {
            await conn.sendMessage(from, {
                video: mediaBuffer,
                caption: `╭━━━━━━━━━━━━━━━━━━━━╮
┃   👁️ *VIEW ONCE SAVED*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
🎬 *Type:* Video
⚡ SHEHBAZ-MD`
            }, { quoted: m });
        }

    } catch (err) {
        console.error('VV Error:', err);
        reply(`❌ *Failed:* ${err.message}`);
    }
});
