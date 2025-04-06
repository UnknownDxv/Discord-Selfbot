import { Client, Message } from 'discord.js-selfbot-v13';

const LoveRate = {
    name: 'loverate',
    description: 'Calculates the love compatibility between two users!',
    usage: 'loverate <user1> <user2>',
    aliases: ['love', 'ship'],
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
            let users = message.mentions.users.map(u => u) || [];
            
            if (users.length < 2) {
                return await message.channel.send('❎ | Please mention two users to calculate love compatibility!');
            }

            let lovePercentage = Math.floor(Math.random() * 101); 
            let loveBar = '❤️'.repeat(Math.round(lovePercentage / 10)) + '♡'.repeat(10 - Math.round(lovePercentage / 10));

            await message.channel.send(`💖 | **${users[0].username}** ❤️ **${users[1].username}**\nLove Compatibility: **${lovePercentage}%**\n${loveBar}`);
        } catch (error) {
            return await message.channel.send('❎ | Error calculating love compatibility!');
        }
    }
};

export default LoveRate;