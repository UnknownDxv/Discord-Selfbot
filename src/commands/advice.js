import { Client, Message } from 'discord.js-selfbot-v13';
import axios from 'axios';

const Advice = {
    name: 'advice',
    description: 'Get a random advice',
    usage: 'advice',
    aliases: ['adv'],
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
            const response = await axios.get('https://api.adviceslip.com/advice');
            const advice = response.data.slip.advice;

            await message.channel.send(`😼 **Advice:** ${advice}`);
        } catch (error) {
            console.error('Error fetching random advice:', error);
            await message.channel.send(`${client.config.emoji.cross} | Could not fetch a random advice!`);
        }
    }
};

export default Advice;