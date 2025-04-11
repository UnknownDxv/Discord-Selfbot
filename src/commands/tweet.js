import { Client, Message } from 'discord.js-selfbot-v13';
import axios from 'axios';

const Tweet = {
    name: 'tweet',
    description: 'Generate a fake tweet image',
    usage: 'tweet [user] <text>',
    aliases: ['twitter', 'fakeTweet'],
    args: true,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        const user = message.mentions.users.first() || message.author;
        const text = args.slice(1)?.join(' ') || 'Just another tweet!';
        const avatar = user.displayAvatarURL({ format: 'png', size: 1024 });

        const api = `https://nekobot.xyz/api/imagegen?type=tweet&username=${encodeURIComponent(user.username)}&text=${encodeURIComponent(text)}`;

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

export default Tweet;
