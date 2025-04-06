import { Client, Message } from 'discord.js-selfbot-v13';
import translate from '@iamtraction/google-translate';

const Translate = {
    name: 'translate',
    description: 'Auto-detects language and translates to English.',
    usage: 'translate <text>',
    aliases: ['tr', 'ts'],
    args: false,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {

        let text = args.join(' ');

        if (!text) {
            text = await message.channel.messages.fetch(message?.reference?.id)?.content;
        }

        if (!text) return message.channel.send('❎ **Please provide text to translate.**').then(m => setTimeout(() => m.delete().catch(() => null), 5000));

        try {
            let res = await translate(text, { to: 'en' });

            message.channel.send(`>>> 🌍 **Translation (Auto-Detected)**\n📥 **Input:** ${text}\n📤 **Output:** ${res.text}\n🔍 **Detected Language:** \`${res.from.language.iso.toUpperCase()}\``);

        } catch (error) {
            console.error(error);
            return message.channel.send('❎ **Failed to translate. Please try again.**').then(m => setTimeout(() => m.delete().catch(() => null), 5000));
        }
    }
};

export default Translate;