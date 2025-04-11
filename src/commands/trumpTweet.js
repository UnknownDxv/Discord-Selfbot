import { Client, Message } from 'discord.js-selfbot-v13';
import axios from 'axios';

const TrumpTweet = {
    name: 'trumptweet',
    description: 'Generate a Trump tweet image',
    usage: 'trumptweet <text>',
    aliases: ['trump', 'tweet'],
    args: true,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        const text = args.join(' ') || 'Make America Great Again!';
        const api = `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${encodeURIComponent(text)}`;

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

export default TrumpTweet;
