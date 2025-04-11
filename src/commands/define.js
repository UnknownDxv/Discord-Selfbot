import { Client, Message } from 'discord.js-selfbot-v13';
import axios from 'axios';

const Define = {
    name: 'define',
    description: 'Gets the Urban Dictionary definition of a word.',
    usage: 'define <word>',
    aliases: ['ud', 'meaning'],
    args: true,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        if (!args.length) {
            return message.channel
                .send('> ❎ **Please provide a word to define.**')
                .then((m) => setTimeout(() => m.delete().catch(() => null), 5000));
        }

        let word = args.join(' ');

        try {
            let response = await axios.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`);

            let results = response.data.list;

            if (!results.length) {
                return message.channel
                    .send('> ❎ **No definition found for this word.**')
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 5000));
            }

            let definition = results[0];

            message.channel.send(
                `>>> 📖 **Urban Dictionary Definition**\n🔤 **Word:** ${definition.word}\n📜 **Definition:** ${definition.definition}\n💬 **Example:** ${definition.example}\n👍 **Upvotes:** ${definition.thumbs_up} | 👎 **Downvotes:** ${definition.thumbs_down}`
            );
        } catch (error) {
            console.error(error);
            return message.channel
                .send('> ❎ **Failed to fetch definition. Please try again later.**')
                .then((m) => setTimeout(() => m.delete().catch(() => null), 5000));
        }
    },
};

export default Define;
