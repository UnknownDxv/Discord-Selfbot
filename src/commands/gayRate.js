import { Client, Message } from 'discord.js-selfbot-v13';

const GayRate = {
    name: 'gayrate',
    description: 'Check how gay someone is!',
    usage: 'gayrate [user]',
    aliases: ['howgay'],
    args: false,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {
        try {
            let user = message.mentions.users?.first() || client.users.cache.get(args[0]) || message.author;
            let gayPercent = Math.floor(Math.random() * 101); // Random % between 0-100

            await message.channel.send(`🏳️‍🌈 | **${user.username}** is **${gayPercent}%** gay!`);
        } catch (error) {
            return await message.channel.send(`> ❌ Error calculating gay rate!`);
        }
    }
};

export default GayRate;