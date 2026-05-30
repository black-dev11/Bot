const { cmd } = require('../lib/command');
const axios = require('axios');

cmd({
    pattern: "weather",
    alias: ["climate", "mosam"],
    desc: "Premium weather with area support",
    category: "tools",
    react: "🌤️"
},
async (conn, mek, m, { from, q, reply }) => {
    if (!q) return reply("🌤️ *Usage:* .weather Karachi/Lyari");

    // Send loading message
    const load = await conn.sendMessage(from, { text: `⏳ *Fetching Weather for ${q}...*` }, { quoted: m });

    try {
        // Support for area like "Karachi/Lyari"
        let location = q;
        if (q.includes('/')) {
            location = q.split('/')[0];
        }

        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`
        );

        // Delete loading message safely
        if (load && load.key) {
            await conn.sendMessage(from, { delete: load.key });
        }

        const condition = data.weather[0].description;
        let icon = "🌤️";
        if (condition.includes("rain")) icon = "🌧️";
        else if (condition.includes("cloud")) icon = "☁️";
        else if (condition.includes("clear")) icon = "☀️";
        else if (condition.includes("thunder")) icon = "⛈️";
        else if (condition.includes("snow")) icon = "❄️";
        else if (condition.includes("mist") || condition.includes("fog")) icon = "🌫️";

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const date = new Date().toLocaleDateString();

        // Premium Interface Design Match Layout
        const caption = `╭━━━〔 *𝗦𝗛𝗘𝗛𝗕𝗔𝗭-𝗠𝗗* 〕━━━┈⊷
┃ 📍 *LOCATION:* ${data.name.toUpperCase()}, ${data.sys.country}
┃ 📅 *DATE:* ${date}
┃ ⏰ *TIME:* ${time}
╰━━━━━━━━━━━━━━━━━━┈⊷

╭━━━〔 *𝗪𝗘𝗔𝗧𝗛𝗘𝗥 𝗜𝗡𝗙𝗢* 〕━━━┈⊷
┃ 🌡️ *Temp:* ${data.main.temp}°C
┃ 🔥 *Feels Like:* ${data.main.feels_like}°C
┃ 📈 *Min/Max:* ${data.main.temp_min}°C / ${data.main.temp_max}°C
┃ 💧 *Humidity:* ${data.main.humidity}%
┃ 💨 *Wind Speed:* ${data.wind.speed} km/h
┃ ${icon} *Condition:* ${condition.toUpperCase()}
╰━━━━━━━━━━━━━━━━━━┈⊷

⚡ *POWERED BY:* SHEHBAZ-MD`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/zl26f9.jpg" },
            caption: caption
        }, { quoted: m });

    } catch (err) {
        // Safely delete loading message
        if (load && load.key) {
            await conn.sendMessage(from, { delete: load.key });
        }
        
        if (err.response?.status === 404) {
            reply(`❌ *Location not found!*\n"${q}" is not valid.`);
        } else {
            reply(`❌ *Error:* ${err.message}`);
        }
    }
});

