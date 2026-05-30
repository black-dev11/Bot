const { cmd } = require('../lib/command');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require('path');

cmd({
    pattern: "tourl",
    alias: ["imgtourl", "imgurl", "upload"],
    desc: "Upload media to Catbox",
    category: "tools",
    react: "☁️"
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted || (!quoted.imageMessage && !quoted.videoMessage && !quoted.documentMessage)) {
            return reply(`📌 *Reply to an image/video/file with .tourl*`);
        }

        await reply(`⏳ Uploading to Catbox...`);

        // Download media
        let buffer;
        if (quoted.imageMessage?.url || quoted.videoMessage?.url || quoted.documentMessage?.url) {
            const mediaUrl = quoted.imageMessage?.url || quoted.videoMessage?.url || quoted.documentMessage?.url;
            const res = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
            buffer = Buffer.from(res.data);
        } else {
            const media = await conn.downloadMediaMessage(mek);
            buffer = Buffer.concat(media);
        }

        // Get file extension
        let ext = '.jpg';
        if (quoted.videoMessage) ext = '.mp4';
        else if (quoted.documentMessage) ext = '.pdf';
        else if (quoted.imageMessage?.mimetype?.includes('png')) ext = '.png';
        else if (quoted.imageMessage?.mimetype?.includes('webp')) ext = '.webp';

        const tempPath = path.join(os.tmpdir(), `catbox_${Date.now()}${ext}`);
        fs.writeFileSync(tempPath, buffer);

        // Upload to Catbox with correct reqtype
        const form = new FormData();
        form.append('reqtype', 'fileupload');
        form.append('fileToUpload', fs.createReadStream(tempPath));

        const { data } = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: form.getHeaders(),
            timeout: 60000
        });

        fs.unlinkSync(tempPath);

        if (data && !data.includes('error') && data.startsWith('https://')) {
            const size = buffer.length < 1048576 
                ? `${(buffer.length / 1024).toFixed(1)} KB` 
                : `${(buffer.length / 1048576).toFixed(2)} MB`;

            let icon = '🖼️';
            if (quoted.videoMessage) icon = '🎬';
            else if (quoted.documentMessage) icon = '📄';
            else if (quoted.audioMessage) icon = '🎵';

            reply(`╭━━━━━━━━━━━━━━━━━━━━╮
┃   ☁️ *UPLOAD COMPLETE*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
${icon} *Type:* ${icon}
📦 *Size:* ${size}
◈━━━━━━━━━━━━━━━━━━◈

🔗 *URL:* ${data}

⚡ SHEHBAZ-MD`);
        } else {
            throw new Error(data || 'Upload failed');
        }
    } catch (err) {
        console.error('Upload error:', err);
        reply(`❌ Upload failed: ${err.message}`);
    }
});
