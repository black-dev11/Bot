const { cmd } = require('../lib/command');

// Track users who already received teddy message
let teddyUser = {};

cmd({
    pattern: "teddy",
    desc: "Cute teddy bear animation with changing hearts",
    category: "fun",
    react: "🧸",
    use: ".teddy"
},
async (conn, mek, m, { from, reply, isGroup }) => {
    try {
        const sender = m.sender || from;
        
        // Check if user already used this command
        if (teddyUser[sender]) {
            return reply(`╭━━━━━━━━━━━━━━━━━━━━╮
┃   🧸 *TEDDY SAYS*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
💝 You already got a teddy!
Give others a chance to enjoy too.

⚡ SHEHBAZ-MD`);
        }

        teddyUser[sender] = true;

        // Array of cute emojis
        const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🤗', '😊', '🎊', '🎉', '🎁', '🎈'];

        // Send initial teddy message
        let teddyMsg = await conn.sendMessage(from, {
            text: `╭━━━━━━━━━━━━━━━━━━━━╮
┃   🧸 *TEDDY BEAR*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
(\\_/)
( •.•)
/>❤

⚡ SHEHBAZ-MD`
        }, { quoted: m });

        // Animate the heart emoji
        for (let i = 0; i < emojis.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            try {
                await conn.sendMessage(from, {
                    text: `╭━━━━━━━━━━━━━━━━━━━━╮
┃   🧸 *TEDDY BEAR*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
(\\_/)
( •.•)
/>${emojis[i]}

⚡ SHEHBAZ-MD`,
                    edit: teddyMsg.key
                });
            } catch (err) {
                // If editing fails, send new message
                if (i === emojis.length - 1) {
                    await conn.sendMessage(from, {
                        text: `╭━━━━━━━━━━━━━━━━━━━━╮
┃   🧸 *TEDDY BEAR*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
(\\_/)
( •.•)
/>${emojis[i]}

⚡ SHEHBAZ-MD`
                    }, { quoted: m });
                }
            }
        }

        // Reset after 30 seconds
        setTimeout(() => {
            delete teddyUser[sender];
        }, 30000);

    } catch (error) {
        console.error('Teddy Error:', error);
        reply(`❌ *Error:* ${error.message}`);
    }
});
