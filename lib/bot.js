const fs = require('fs');
if (fs.existsSync('bot.env')) require('dotenv').config({ path: './bot.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
BOT_URL: process.env.BOT_URL || "https://raw.githubusercontent.com/Shehbaz—Devofficial/ARSLAN-MD-DATA/refs/heads/main/datafile.json",
AUTO_SITE: process.env.AUTO_SITE || "https://shehbaz-api.vercel.app",
BAND_URL: process.env.BAND_URL || "https://raw.githubusercontent.com/Shehbaz—Devofficial/ARSLAN-MD-DATA/refs/heads/main/bandusers.json",
REPO_LINK: process.env.REPO_LINK || "https://github.com/shehbaz-dev/SHEHBAZ-MD",
REPO_NAME: process.env.REPO_NAME || "SHEHBAZ-MD",
BOT_NAME: process.env.BOT_NAME || "SHEHBAZ-MD",
DESCRIPTION: process.env.DESCRIPTION || "SHEHBAZ-MD PAKISTANI POWERFULL WHATSAPP BOT",
OWNER_NUMBER: process.env.OWNER_NUMBER || "923392616263",
OWNER_NAME: process.env.OWNER_NAME || "Shehbaz—Dev Official",
ST_SAVE: process.env.ST_SAVE || "SHEHBAZ-MD-STATUS-SERVER",
BIO_TEXT: process.env.BIO_TEXT || "SHEHBAZ-MD-BY-Shehbaz—Dev-OFFICIAL",
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*`STATUS SEEN BY SHEHBAZ-MD`* _*POWERD BY*_ *Shehbaz—Dev Official Whtsapp Bot*",
FOOTER: process.env.FOOTER || "SHEHBAZ-MD",
COPYRIGHT: process.env.COPYRIGHT || "*㋛ SHEHBAZ-MD *",
VERSION: process.env.VERSION || "9.0.0",
NEWSLETTER: process.env.NEWSLETTER || "120363348739987203@newsletter",
WA_CHANNEL: process.env.WA_CHANNEL || "https://whatsapp.com/channel/0029VarfjW04tRrmwfb8x306",
INSTA: process.env.INSTA || "https://Instagram.com/Shehbaz—Devofficial",
ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/zgl99v.png",
OWNER_IMG: process.env.OWNER_IMG || "https://files.catbox.moe/zgl99v.png",
CONVERT_IMG: process.env.CONVERT_IMG || "https://files.catbox.moe/zgl99v.png",
AI_IMG: process.env.AI_IMG || "https://files.catbox.moe/zgl99v.png",
SEARCH_IMG: process.env.SEARCH_IMG || "https://files.catbox.moe/zgl99v.png",
DOWNLOAD_IMG: process.env.DOWNLOAD_IMG || "https://files.catbox.moe/zgl99v.png",
MAIN_IMG: process.env.MAIN_IMG || "https://i.ibb.co/s9Cr1VSX/file-000000006d207207b33a182396f1a27f.png",
GROUP_IMG: process.env.GROUP_IMG || "https://files.catbox.moe/zgl99v.png",
FUN_IMG: process.env.FUN_IMG || "https://files.catbox.moe/zgl99v.png",
TOOLS_IMG: process.env.TOOLS_IMG || "https://files.catbox.moe/zgl99v.png",
OTHER_IMG: process.env.OTHER_IMG || "https://files.catbox.moe/zgl99v.png",
MOVIE_IMG: process.env.MOVIE_IMG || "https://files.catbox.moe/zgl99v.png",
NEWS_IMG: process.env.NEWS_IMG || "https://files.catbox.moe/zgl99v.png",
PP_IMG: process.env.PP_IMG || "https://files.catbox.moe/zgl99v.png"
};
