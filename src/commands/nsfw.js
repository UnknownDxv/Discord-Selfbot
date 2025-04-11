import { Client, Message } from 'discord.js-selfbot-v13';
import axios from 'axios';

const NSFW = {
    name: 'nsfw',
    description: 'Get NSFW images of various types',
    usage: 'nsfw <type>',
    aliases: ['hentai', 'lewd'],
    args: true,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        const types = [
            'hass',
            'hmidriff',
            'pgif',
            '4k',
            'hentai',
            'holo',
            'hneko',
            'neko',
            'hkitsune',
            'kemonomimi',
            'anal',
            'hanal',
            'gonewild',
            'kanna',
            'ass',
            'pussy',
            'thigh',
            'hthigh',
            'gah',
            'coffee',
            'food',
            'paizuri',
            'tentacle',
            'boobs',
            'hboobs',
            'yaoi',
        ];

        const type = args[0]?.toLowerCase();

        if (!types.includes(type)) {
            return message.channel.send(`Invalid type! Available Types: \`${types.join(', ')}\``);
        }

        const api = `https://nekobot.xyz/api/image?type=${type}`;

        try {
            const response = await axios.get(api);
            if (!response.data.success) {
                return message.channel.send('Failed to fetch image.');
            } else {
                const imageUrl = response.data.message;
                await message.channel.send(imageUrl);
            }
        } catch (error) {
            return message.channel.send('Failed to fetch image.');
        }
    },
};

export default NSFW;
