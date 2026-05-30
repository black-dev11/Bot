const { cmd } = require('../lib/command');

global.autoReply = {
    enabled: false,
    start: "00:00",
    end: "00:00",
    message: ""
};

//=======================================
// TIME CHECK
//=======================================
function checkTime(start, end) {

    const now = new Date(
        new Date().toLocaleString(
            "en-US",
            { timeZone: "Asia/Karachi" }
        )
    );

    const current =
        now.getHours() * 60 +
        now.getMinutes();

    const [sH, sM] =
        start.split(':').map(Number);

    const [eH, eM] =
        end.split(':').map(Number);

    const startMin =
        sH * 60 + sM;

    const endMin =
        eH * 60 + eM;

    if (startMin <= endMin) {

        return (
            current >= startMin &&
            current <= endMin
        );
    }

    return (
        current >= startMin ||
        current <= endMin
    );
}

//=======================================
// SET AUTO REPLY
//=======================================
cmd({
    pattern: "autoreply",
    react: "⏰",
    category: "tools",
    desc: "Set auto reply"
},
async(conn, mek, m, {
    q,
    reply
}) => {

    if (!q) {

        return reply(
`.autoreply 17:00 23:00 Busy hoon`
        );
    }

    const args = q.split(" ");

    const start = args[0];
    const end = args[1];

    const msg =
        args.slice(2).join(" ") ||
        "I'm busy now.";

    global.autoReply = {
        enabled: true,
        start,
        end,
        message: msg
    };

    reply(
`✅ AUTO REPLY ENABLED

🕐 ${start} → ${end}

💬 ${msg}`
    );
});

//=======================================
// OFF
//=======================================
cmd({
    pattern: "awayoff",
    react: "❌",
    category: "tools"
},
async(conn, mek, m, {
    reply
}) => {

    global.autoReply.enabled = false;

    reply("✅ Auto Reply Disabled");
});

//=======================================
// MAIN AUTO REPLY
//=======================================
cmd({
    on: "body"
},
async(conn, mek, m, {
    from,
    body,
    isGroup,
    fromMe
}) => {

    try {

        if (!body) return;

        // Ignore groups
        if (isGroup) return;

        // Ignore bot messages
        if (fromMe) return;

        // Check enabled
        if (!global.autoReply.enabled)
            return;

        // Check time
        const active = checkTime(
            global.autoReply.start,
            global.autoReply.end
        );

        if (!active) return;

        // Typing
        await conn.sendPresenceUpdate(
            'composing',
            from
        );

        // Delay
        await new Promise(r =>
            setTimeout(r, 1500)
        );

        // Reply
        await conn.sendMessage(
            from,
            {
                text:
`┏━━━━━━━━━━━━━━━━━━━━━━━┓
       AUTO REPLY
┗━━━━━━━━━━━━━━━━━━━━━━━┛

${global.autoReply.message}

⏰ I am currently away`
            },
            { quoted: mek }
        );

    } catch (e) {

        console.log(
            "AUTO REPLY ERROR:",
            e
        );
    }
});
