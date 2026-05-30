const { fork } = require('child_process');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Bot manager port

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Active chalte hue bots ka record list
const activeBots = new Map();

// Background me dynamic bot run karne ka function
function startBotInstance(sessionId) {
    if (activeBots.has(sessionId)) {
        console.log(`[🤖 SYSTEM] Bot with session ${sessionId.substring(0,15)}... is already running.`);
        return true;
    }

    console.log(`\n=============================================`);
    console.log(`🚀 [BOT ACTIVE] Triggering new instance for user!`);
    console.log(`📦 Session ID: ${sessionId}`);
    console.log(`=============================================\n`);
    
    // index.js (Bot code) ko background me isolated run karna
    const child = fork(path.join(__dirname, 'index.js'), [sessionId], {
        env: { ...process.env, SESSION_ID: sessionId }
    });

    // Save instance reference
    activeBots.set(sessionId, child);

    // Auto-Restart logic agar bot crash ho
    child.on('exit', (code) => {
        console.log(`❌ [BOT CRASHED/STOPPED] Session exited with code ${code}. Restarting in 5s...`);
        activeBots.delete(sessionId);
        setTimeout(() => startBotInstance(sessionId), 5000);
    });

    return true;
}

/* ✅ API ENDPOINT: PAIR SYSTEM SE NEW SESSION YAHA RECEIVE HOGA */
app.post('/api/start-bot', (req, res) => {
    const sessionId = req.body.session_id;
    if (!sessionId) {
        return res.status(400).send({ success: false, error: "Session token missing" });
    }

    const started = startBotInstance(sessionId);
    if (started) {
        res.send({ success: true, message: "Bot process spawned successfully" });
    } else {
        res.status(500).send({ success: false, error: "Failed to spawn process" });
    }
});

app.get('/', (req, res) => {
    res.send({ status: "running", active_instances: activeBots.size });
});

app.listen(PORT, () => {
    console.log(`🔰 SHEHBAZ-MD Multi-Bot Deployer Active on Port ${PORT}`);
});
