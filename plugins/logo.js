const { cmd } = require('../lib/command');
const axios = require('axios');

// TextPro.me effects (one input)
const textProEffects = {
    denim: "https://textpro.me/denim-text-effect-online-919.html",
    steel: "https://textpro.me/steel-text-effect-online-921.html",
    thunder: "https://textpro.me/online-thunder-text-effect-generator-1031.html",
    transformer: "https://textpro.me/create-a-transformer-text-effect-online-1035.html",
    metallic: "https://textpro.me/create-a-metallic-text-effect-free-online-1041.html",
    greenneon: "https://textpro.me/green-neon-text-effect-874.html",
    gold: "https://textpro.me/abstra-gold-text-effect-859.html",
    wood: "https://textpro.me/wood-text-effect-856.html",
    blmetal: "https://textpro.me/blue-metal-text-effect-831.html",
    silver: "https://textpro.me/3d-chrome-text-effect-827.html",
    rock: "https://textpro.me/rock-text-effect-online-915.html",
    road: "https://textpro.me/road-warning-text-effect-878.html",
    honey: "https://textpro.me/honey-text-effect-868.html",
    blgem: "https://textpro.me/blue-gem-text-effect-830.html",
    carbon: "https://textpro.me/carbon-text-effect-833.html",
    marble: "https://textpro.me/marble-text-effect-863.html",
    rusty: "https://textpro.me/rusty-metal-text-effect-860.html",
    neon4: "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html",
    neon5: "https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html",
    blackmetal: "https://textpro.me/black-metal-text-effect-829.html"
};

// Two input effects
const textProTwoEffects = {
    glitch: "https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html"
};

// ePhoto360 effects
const ephotoEffects = {
    queen: { url: "https://en.ephoto360.com/create-a-personalized-queen-card-avatar-730.html", ids: ["13f68546-fc62-4278-9e4c-dd9340130946", "8ddd2a19-a5b5-4429-b23e-0c80dafa7979"] },
    starwars: { url: "https://en.ephoto360.com/create-a-star-wars-character-mascot-logo-online-707.html", ids: ["a79c02b0-dc75-468d-8c6f-f7500a8b8b4a", "bb305a62-e4da-4c2b-901e-dbe68d249fc1", "94ce6bc3-9e58-461b-92d2-55f26bfe89a1", "aa156ca8-cb63-4bf5-93ac-c1fd761ef809", "81030a7f-8a4a-4aa3-9b50-71dda7c00d38", "69273836-a06c-4da5-a876-5cac60e2e7c1"] },
    gamelogo: { url: "https://en.ephoto360.com/make-team-logo-online-free-432.html", ids: ["r4o5wsey1", "7y0rq5qji", "d8f5f0x19", "8miaqbk79", "k0xovjhox", "df9c5iu0o", "g2cnx1qud", "8rewm9ker", "orlnd1jpd", "494bu708o", "3aw18jsse", "kocz6xf9m", "uz62srd8q", "0j4l6yol1", "1t4dpbbeb", "0e5xhjwqa", "jnh4t0t1t", "u0jzc2s0m", "mni1bkp11", "oz439yy9v", "vkxpnful6", "rxplur13r", "lwgwjfz43", "4bltauy76", "n44ofsn5a", "6jnveqwxq", "rc3mgmhml", "t79vujrpa", "uhuih0n20", "2nnaamkp1", "0g71vg2s8", "xzwh7qpus"] },
    logoneon: { url: "https://en.ephoto360.com/create-blue-neon-logo-online-507.html", ids: ["2cb0949e-9e73-4e46-b149-e7e3927ba535", "6e80d164-85bd-412f-ae4b-36c09a9fc6ad", "f81ef052-83f9-46a3-bbbc-4ce2653f735e", "2bea561a-1130-4a3e-bd4b-1533cd0675d1", "63e2a3f2-85ce-4973-bdcb-cf294542a8f2", "b50e6618-0079-4acd-a097-aeb44315c29a"] },
    signneon: { url: "https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html", ids: ["188eb364-5a04-446e-a779-0e2f427b7bc3", "a35d8b0d-bb89-4718-8723-71c5a9e9de4a", "3938db27-c48c-4d96-ab60-f1bd1e312abf", "6bf8fced-bb7f-4373-ad07-5e95fd30e10e", "aa66248c-328c-447f-8862-ef49e1a73bc0", "7647ec5b-f47c-4dab-91b6-db3afef6c980"] },
    pubgbg: { url: "https://en.ephoto360.com/colorful-pubg-logo-maker-online-613.html", ids: ["f469ed11-98c3-4b29-997e-68e9460faf6b", "f8651caa-f7e4-40ac-b7df-b1db5fcf9b57", "3a613eab-80b6-413e-a724-9040e6316f2d", "907301c5-478b-4529-bfa3-0741531cbc54", "0b39d4ae-8b49-42a9-af5b-faca306f5600", "11bd64b3-a2ec-4090-9d94-0fcb1958f697"] },
    gamelg: { url: "https://en.ephoto360.com/free-gaming-logo-maker-for-fps-game-team-546.html", ids: ["d6ca8483-d182-4a52-b5af-e534ad3070e3", "eafc98ed-6ba6-4a30-88e1-e73b059eeca1", "5acf5c52-5c1d-4e05-b7d0-ba674a524685", "a2983d77-ca9d-4d95-b5fe-06c65f59f8cd", "a381c3b1-7505-4299-9d8a-a6c92f6ef228", "f53b5da9-5e99-4874-a634-d06ae81a2b09", "89af5387-168a-4924-a49d-f938e061b7ba", "9424ca60-11e4-4904-86b9-10ecf2442f5c", "91d03a5f-52f9-4bac-a763-9be838f83288", "bb937ed8-6ace-4fb6-bc63-2e90a737e32c", "98de991a-e305-4d37-869a-4f345fb07427", "a9e6d954-bf8a-4e97-b840-8ae786fe9aa9"] },
    logometal: { url: "https://en.ephoto360.com/metal-mascots-logo-maker-486.html", ids: ["206bc58d-00cc-4442-bc00-dcf221b40aa0", "de5f4f9c-95f0-411d-9ac9-5086409ad09a", "657a0d32-84f6-4d6b-aab3-0b6768d27d0e", "da3a694a-8d60-47db-b132-13a21caee580", "ea7dac3f-a47f-4ece-8c36-05d322a611e3", "37a43193-248c-43e0-8475-b65fa47b99ff", "bebc512b-04e1-44eb-a6b4-284b0a3674f4", "2f5e2dac-add7-4810-ad65-b8e5a79bf963", "e56ad45a-6ed9-4087-ae7e-28415d7a9af8", "8ea108a5-8e72-49a9-b8d8-b69aa371e8f2", "e10e110e-ee11-4f71-b7b5-8e49855bef0f", "3fad023e-830e-4763-b0ca-17bb26047f83", "d723f734-86d1-46c0-9af5-635b4f7a4840"] },
    angelwing: { url: "https://en.ephoto360.com/create-colorful-angel-wing-avatars-731.html", ids: ["4d1e64fd-6601-4fd1-acfd-dbdad36c401a", "6ac134d1-f593-499d-8641-e7ce45af680e", "a60760ea-f266-4064-bde0-8d02f174254d", "c542dab0-ea54-44a5-9976-c6af66f71d9c", "7cdb6c7b-1c37-41c6-b50d-500c6111833d", "868cf218-c4c9-432a-b737-8d43ecdc580c", "df2d7c1e-7319-4157-a02c-0c7f71f41cc3"] },
    angelgrwing: { url: "https://en.ephoto360.com/the-effect-of-galaxy-angel-wings-289.html", ids: ["fjepjdv06", "y2huxjqk4", "pz2zhvfsw", "cziool681", "03wpap4au", "dqrczzygi", "o1j1rf9j2", "szxjz7l95", "zbpetfwaf", "hkqzrqwla", "tfofq0day"] }
};

async function textProMe(url, text) {
    try {
        const response = await axios.get(url);
        const cookie = response.headers['set-cookie']?.join('; ') || '';
        const tokenMatch = response.data.match(/name="authenticity_token" value="([^"]+)"/);
        const token = tokenMatch ? tokenMatch[1] : '';
        
        const form = new URLSearchParams();
        form.append('authenticity_token', token);
        form.append('text', text);
        form.append('commit', 'Go');
        
        const result = await axios.post(url, form, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': cookie
            },
            maxRedirects: 0,
            validateStatus: status => status === 302
        });
        
        const imageUrl = result.headers.location;
        return { status: true, url: imageUrl };
    } catch (error) {
        return { status: false, error: error.message };
    }
}

async function ePhotoDownload(url, text, ids) {
    const id = ids[Math.floor(Math.random() * ids.length)];
    const response = await axios.get(`${url}?${id}=${encodeURIComponent(text)}`);
    const match = response.data.match(/id="image-source" src="([^"]+)"/);
    if (match) {
        return { status: true, url: match[1] };
    }
    return { status: false };
}

// Generate commands dynamically
for (const [effect, effectUrl] of Object.entries(textProEffects)) {
    cmd({
        pattern: effect,
        dontAddCommandList: true,
        desc: `${effect} text effect logo`,
        category: "logo",
        react: "🎨"
    }, async (conn, mek, m, { from, q, reply }) => {
        if (!q) return reply(`🎨 *${effect.toUpperCase()} LOGO*\n\nUsage: .${effect} <text>\nExample: .${effect} SHEHBAZ`);
        await reply(`⏳ Creating ${effect} logo...`);
        const { status, url, error } = await textProMe(effectUrl, q);
        if (!status) return reply(`❌ Failed: ${error}`);
        await conn.sendMessage(from, { image: { url }, caption: `🎨 *${effect.toUpperCase()}*\n📝 ${q}` }, { quoted: m });
    });
}

for (const [effect, data] of Object.entries(ephotoEffects)) {
    cmd({
        pattern: effect,
        dontAddCommandList: true,
        desc: `${effect} style logo`,
        category: "logo",
        react: "🎨"
    }, async (conn, mek, m, { from, q, reply }) => {
        if (!q) return reply(`🎨 *${effect.toUpperCase()} LOGO*\n\nUsage: .${effect} <text>`);
        await reply(`⏳ Creating ${effect} logo...`);
        const res = await ePhotoDownload(data.url, q, data.ids);
        if (!res.status) return reply(`❌ Failed to generate`);
        await conn.sendMessage(from, { image: { url: res.url }, caption: `🎨 *${effect.toUpperCase()}*\n📝 ${q}` }, { quoted: m });
    });
}

// Logo list command
cmd({
    pattern: "logolist",
    desc: "Show all logo styles",
    category: "logo",
    react: "📋"
}, async (conn, mek, m, { from, reply }) => {
    const textEffects = Object.keys(textProEffects).join(', ');
    const photoEffects = Object.keys(ephotoEffects).join(', ');
    reply(`╭━━━━━━━━━━━━━━━━━━━━╮
┃   🎨 *LOGO STYLES*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
📌 *TEXTPRO EFFECTS:*
${textEffects}

◈━━━━━━━━━━━━━━━━━━◈
📌 *EPHOTO360 EFFECTS:*
${photoEffects}

◈━━━━━━━━━━━━━━━━━━◈
📝 *Usage:* .[style] <text>
Example: .gold SHEHBAZ

⚡ SHEHBAZ-MD`);
});
