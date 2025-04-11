import { spawn } from 'child_process';

(async () => {
    const bot = spawn('node', ['src/index.js'], {
        stdio: 'inherit',
        shell: true,
    });

    bot.on('close', (error) => {
        console.log(`⚠️ Bot exited with code ${code}. Restarting in 5 seconds...`);
        setTimeout(startBot, 5000);
    });

    bot.on('error', (error) => {
        console.error('❌ Failed to start bot process:', error);
        setTimeout(startBot, 5000);
    });
})();
