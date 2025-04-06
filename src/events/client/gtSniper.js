import { Client, Message } from 'discord.js-selfbot-v13'
import fetch from 'node-fetch';

const GTSniper = {
    name: 'gtSniper',
    once: false,
    enable: true,
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {
        if (message.author.id !== "432610292342587392") return;

        const channelId = client.gtSniperChannelId;
        if (!channelId) return;
        if (message.channel.id !== channelId) return;

        if (message.content.includes("the winner!")) {
            client.gtSniperChannelId = null;
            return;
        }

        if (message.content.includes('Quickly type a word containing:')) {
            const match = message.content.match(/\*\*(\w{3})\*\*/);
            if (!match) return;

            const letters = match[1].toLowerCase();

            try {
                const response = await fetch(`https://api.datamuse.com/words?sp=*${letters}*&max=1000`);
                const data = await response.json();

                const filtered = data
                    .map(entry => entry.word)
                    .filter(word => word.toLowerCase().includes(letters) && /^[a-zA-Z]+$/.test(word));

                if (filtered.length > 0) {
                    await message.channel.send(filtered[0]).catch(() => null);
                }
            } catch (error) {
                console.error("API Error:", error);
            }
        }
    }
};

export default GTSniper;