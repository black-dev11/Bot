const { cmd } = require('../lib/command');
const os = require('os');
const axios = require('axios');

const { runtime } = require('../lib/functions');
const bot = require('../lib/bot');
const config = require('../setting');

//================================================== ABOUT ==================================================
cmd({
    pattern: "about",
    react: "👑",
    desc: "Bot information",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply, contextInfo }) => {
    try {

        const time = new Date().toLocaleTimeString('en-US', {
            timeZone: 'Asia/Colombo'
        });

        const date = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const madeMenu = `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
       SHEHBAZ—MD
┗━━━━━━━━━━━━━━━━━━━━━━━┛

👋 HI, ${pushname}

╭──────────────◆
│ 📅 Date : ${date}
│ ⏰ Time : ${time}
╰──────────────◆

╭──────────────◆
│ Hello, I am
│ Shehbaz—Dev 👑
╰──────────────◆

${bot.COPYRIGHT}
`;

        await conn.sendMessage(from, {
            image: { url: bot.ALIVE_IMG },
            caption: madeMenu,
            contextInfo
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

//================================================== ALIVE ==================================================
cmd({
    pattern: "alive",
    alias: ["status", "system"],
    react: "⚡",
    desc: "Check bot status",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply, contextInfo }) => {

    try {

        const workMode = config.MODE?.toUpperCase() || "PUBLIC";

        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalRam = (os.totalmem() / 1024 / 1024).toFixed(0);

        const aliveText = `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
       SHEHBAZ—MD
┗━━━━━━━━━━━━━━━━━━━━━━━┛

STATUS  : SUCCESS
SERVER  : ONLINE
SYSTEM  : STABLE
ACCESS  : VERIFIED

═══════════════════════

👤 USER    : ${pushname}
⚙️ MODE    : ${workMode}
🧬 VERSION : ${bot.VERSION}

═══════════════════════

💾 RAM     : ${ramUsed}MB / ${totalRam}MB
⏳ UPTIME  : ${runtime(process.uptime())}

═══════════════════════

✓ Pairing Completed
✓ Session Created
✓ WhatsApp Connected

═══════════════════════

⚡ POWERED BY SHEHBAZ—DEV
`;

        await conn.sendMessage(from, {
            image: { url: bot.ALIVE_IMG },
            caption: aliveText,
            contextInfo
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error : ${e.message}`);
    }
});

//================================================== MENU ==================================================
function isEnabled(value) {
    return String(value).toLowerCase() === "true";
}

cmd({
    pattern: "menu",
    react: "🛸",
    alias: ["help", "list", "commands"],
    desc: "Bot command list",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply, contextInfo }) => {

    try {

        const workMode = config.MODE?.toUpperCase() || "PUBLIC";

        const cleanMenu = `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
       SHEHBAZ—MD
┗━━━━━━━━━━━━━━━━━━━━━━━┛

👤 USER   : ${pushname}
⚙️ MODE   : ${workMode}
🤖 STATUS : ONLINE

═══════════════════════

〔 USER COMMANDS 〕

➤ ${config.PREFIX}menu
➤ ${config.PREFIX}alive
➤ ${config.PREFIX}about
➤ ${config.PREFIX}ping
➤ ${config.PREFIX}owner

═══════════════════════

〔 FEATURES STATUS 〕

✓ AUTO STATUS : ${isEnabled(config.AUTO_READ_STATUS) ? "ON" : "OFF"}
✓ AUTO REACT  : ${isEnabled(config.AUTO_REACT) ? "ON" : "OFF"}
✓ AUTO REPLY  : ${isEnabled(config.AUTO_REPLY) ? "ON" : "OFF"}
✓ ANTI LINK   : ${isEnabled(config.ANTI_LINK) ? "ON" : "OFF"}
✓ ANTI BAD    : ${isEnabled(config.ANTI_BAD) ? "ON" : "OFF"}

═══════════════════════

CHANNEL :
https://whatsapp.com/channel/0029VbD4UbdCRs1mNQPRZt2F

═══════════════════════

${bot.COPYRIGHT || "SHEHBAZ—MD"}
`;

        await conn.sendMessage(from, {
            image: { url: bot.ALIVE_IMG },
            caption: cleanMenu,
            contextInfo
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

//================================================== OWNER ==================================================
cmd({
    pattern: "owner",
    react: "👑",
    alias: ["ow", "user"],
    desc: "Get owner contact",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {

    try {

        const ownerNumber = "923212844383";
        const ownerName = "Shehbaz";
        const organization = "Shehbaz CODERS";

        const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
ORG:${organization}
TEL;type=CELL;type=VOICE;waid=${ownerNumber}:+${ownerNumber}
END:VCARD`;

        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ Failed to send owner contact");
    }
});

//================================================== PING ==================================================
cmd({
    pattern: "ping",
    react: "⚡",
    alias: ["speed", "pong"],
    desc: "Bot speed",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {

    try {

        const start = Date.now();

        const msg = await conn.sendMessage(from, {
            text: "⚡ Testing Speed..."
        }, { quoted: mek });

        const end = Date.now();

        await conn.sendMessage(from, {
            delete: msg.key
        });

        await conn.sendMessage(from, {
            text: `🏓 Pong : ${end - start}ms`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ Error");
    }
});

//================================================== AUTO BIO ==================================================
let autoBioInterval;

cmd({
    on: "body"
},
async () => {

    try {

        if (config.AUTO_BIO === "true") {

            if (autoBioInterval) clearInterval(autoBioInterval);

            autoBioInterval = setInterval(async () => {

                const bioText = `${bot.BIO_TEXT} | ${runtime(process.uptime())}`;

                await conn.updateProfileStatus(bioText);

            }, 60000);
        }

    } catch (e) {
        console.log(e);
    }
});

//================================================== PRESENCE ==================================================
cmd({ on: "body" }, async (conn, mek, m, { from }) => {

    try {

        if (config.AUTO_TYPING === "true") {
            await conn.sendPresenceUpdate("composing", from);
        }

        if (config.AUTO_RECORDING === "true") {
            await conn.sendPresenceUpdate("recording", from);
        }

        if (config.ALWAYS_ONLINE === "true") {
            await conn.sendPresenceUpdate("available", from);
        }

    } catch {}
});

//================================================== AUTO REPLY ==================================================
cmd({
    on: "body"
},
async (conn, mek, m, { body, isOwner }) => {

    try {

        if (config.AUTO_REPLY !== "true" || isOwner) return;

        const res = await axios.get(bot.BOT_URL);
        const data = res.data.reply;

        for (const text in data) {

            if (body.toLowerCase() === text.toLowerCase()) {
                return await m.reply(data[text]);
            }
        }

    } catch {}
});

//================================================== SECURITY ==================================================
const badWords = [
    "porno",
    "porn",
    "xnxx",
    "sex",
    "xxx",
    "fuck"
];

cmd({
    on: "body"
},
async (conn, mek, m, {
    from,
    body,
    isGroup,
    isAdmins,
    isBotAdmins,
    sender
}) => {

    try {

        if (!isGroup) return;
        if (isAdmins) return;
        if (!isBotAdmins) return;

        // Anti Bad
        if (config.ANTI_BAD === "true") {

            const lower = body.toLowerCase();

            const detected = badWords.some(word =>
                lower.includes(word)
            );

            if (detected) {

                await conn.sendMessage(from, {
                    delete: mek.key
                });

                await conn.sendMessage(from, {
                    text: `🚫 Bad words are not allowed\n@${sender.split("@")[0]}`,
                    mentions: [sender]
                });
            }
        }

        // Anti Link
        if (config.ANTI_LINK === "true") {

            const linkRegex =
            /https?:\/\/|chat\.whatsapp\.com|wa\.me|t\.me/gi;

            if (linkRegex.test(body)) {

                await conn.sendMessage(from, {
                    delete: mek.key
                });

                await conn.sendMessage(from, {
                    text: `⚠️ Links are not allowed.\n@${sender.split("@")[0]} removed.`,
                    mentions: [sender]
                });

                await conn.groupParticipantsUpdate(
                    from,
                    [sender],
                    "remove"
                );
            }
        }

    } catch (e) {
        console.log(e);
    }
});
