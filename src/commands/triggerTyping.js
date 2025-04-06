import { Client, Message } from 'discord.js-selfbot-v13';
import { setTimeout } from 'timers/promises';
import * as ms from 'ms';

const TriggerTyping = {
    name: 'triggertyping',
    description: 'Trigger bot typing for a specified duration',
    usage: 'triggertyping <duration>',
    aliases: ['tt'],
    args: true,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {
        let msTime = ms(args[0]);

        if (!msTime || isNaN(msTime)) {
            return message.channel.send('❎ | Invalid duration! Please provide a valid time format (e.g., `10s`, `5m`, `1h`).');
        }

        let duration = Math.floor(msTime / 1000);

        if (duration < 300) {
            return message.channel.send('❎ | Minimum allowed duration is **300 seconds (5 minutes)**.');
        }

        if (duration > 7200) {
            return message.channel.send('❎ | Maximum allowed duration is **7200 seconds (2 hours)**.');
        }

        async function triggerNonStopTyping(message, duration) {
            const endTime = Date.now() + duration * 1000;

            while (Date.now() < endTime) {
                await message.channel.sendTyping();
                await setTimeout(5000);
            }
        }

        await triggerNonStopTyping(message, duration);
    }
};

export default TriggerTyping;