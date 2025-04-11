import { Client, Message } from 'discord.js-selfbot-v13';
import axios from 'axios';

const Threats = {
    name: 'threats',
    description: 'Generate a threats meme image',
    usage: 'threats [user]',
    aliases: ['threat'],
    args: false,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        const user = message.mentions.users.first() || message.author;
        const avatar = user.displayAvatarURL({ format: 'png', size: 1024 });
        const api = `https://nekobot.xyz/api/imagegen?type=threats&url=${encodeURIComponent(avatar)}`;

        try {
            const response = await axios.get(api);
            if (!response.data.success) {
                return message.channel.send('Failed to generate image.');
            } else {
                const imageUrl = response.data.message;
                await message.channel.send(imageUrl);
            }
        } catch (error) {
            return message.channel.send('Failed to generate image.');
        }
    },
};

export default Threats;
