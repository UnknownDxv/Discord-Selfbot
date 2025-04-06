import { Client, Message } from 'discord.js-selfbot-v13';

const Spam = {
    name: 'spam',
    description: 'Spams a message multiple times.',
    usage: 'spam <count> <message>',
    aliases: ['repeat'],
    args: true,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {
        try {
            if (!args[0] || isNaN(args[0])) {
                return message.channel.send('❎ | Please provide a valid number for the spam count.')
                    .then(msg => setTimeout(() => msg.delete().catch(() => null), 5000));
            }

            let count = Math.min(parseInt(args[0]), 100);
            const spamMessage = args.slice(1).join(' ');

            if (!spamMessage) {
                return message.channel.send('❎ | Please provide a message to spam.')
                    .then(msg => setTimeout(() => msg.delete().catch(() => null), 5000));
            }

            for (let i = 0; i < count; i++) {
                await message.channel.send(spamMessage).catch(() => null);
            }
        } catch (error) {
            console.error('Error in spam command:', error);
        }
    }
};

export default Spam;