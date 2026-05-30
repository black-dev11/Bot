const { cmd } = require('../lib/command');

cmd({
    pattern: "getjids",
    alias: ["groupjids", "membersids", "jids"],
    desc: "Get all group members JIDs",
    category: "group",
    react: "📋",
    use: ".getjids"
},
async (conn, mek, m, { from, isGroup, reply, groupMetadata, participants }) => {
    try {
        // React with clock emoji
        await conn.sendMessage(from, { react: { text: '🕐', key: mek.key } });

        // Check if in group
        if (!isGroup) {
            return reply(`❌ *This command can only be used in a group chat.*`);
        }

        // Get group metadata
        const metadata = groupMetadata || await conn.groupMetadata(from);
        
        if (!metadata) {
            return reply(`❌ *Unable to fetch group metadata.*`);
        }

        const groupName = metadata.subject || 'Unknown Group';
        const participantsList = metadata.participants || participants || [];

        if (participantsList.length === 0) {
            return reply(`❌ *No members found in this group.*`);
        }

        // Collect member details with mentions
        let memberDetails = [];
        let mentions = [];
        let count = 1;

        for (let participant of participantsList) {
            const jid = participant.id;
            memberDetails.push(`*${count++}.* @${jid.split('@')[0]}`);
            mentions.push(jid);
        }

        // Compose message
        const messageContent = `╭━━━━━━━━━━━━━━━━━━━━╮
┃   📋 *GROUP MEMBERS JIDS*   
╰━━━━━━━━━━━━━━━━━━━━╯

◈━━━━━━━━━━━━━━━━━━◈
📛 *Group:* ${groupName}
🆔 *Group JID:* ${from}
👥 *Total Members:* ${participantsList.length}
◈━━━━━━━━━━━━━━━━━━◈

📌 *Members List:*
${memberDetails.join('\n')}

◈━━━━━━━━━━━━━━━━━━◈
⚡ *SHEHBAZ-MD*`;

        // Send message with mentions
        await conn.sendMessage(from, {
            text: messageContent,
            mentions: mentions
        }, { quoted: m });

        // React with checkmark
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (error) {
        console.error('GetJIDs Error:', error);
        reply(`❌ *Error:* ${error.message}`);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
});
