import { Client } from 'discord.js-selfbot-v13';
import { sendToWebhook } from '../../utils/webhook.js';
import * as fs from 'node:fs';

const ReadyEvent = {
    name: 'ready',
    once: true,
    enable: true,
    /**
     *
     * @param {Client} client
     */
    async execute(client) {
        if (!process.env.WEBHOOK_URL) {
            throw new Error('Webhook URL is not provided in the environment variables.');
        }

        const embed = {
            author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL({ dynamic: true }),
            },
            color: 0x00ff00,
            title: `${client.user.displayName} Selfbot`,
            description: `\`\`\`prolog\nPrefix: ${process.env.PREFIX}\nPing: ${Math.round(client.ws.ping)}ms\nUsers: ${client.users.cache.size}\nGuilds: ${client.guilds.cache.size}\n\`\`\``,
            timestamp: new Date().toISOString(),
        };
        let rawData = fs.readFileSync('./src/json/presence.json', 'utf8');
        let oldData = {};
        if (rawData.trim() !== '{}' && rawData.trim() !== '') {
            oldData = JSON.parse(rawData);
            client.user.setPresence(oldData);
            console.log('✅ | Presence Set From Saved JSON!');
        }
        console.log(`✅ | Logged In As ${client.user.username}!`);
        await new Promise((res) => setTimeout(res, 5000));
        return await sendToWebhook(`<@${client.user.id}>`, [embed]);
    },
};

export default ReadyEvent;
