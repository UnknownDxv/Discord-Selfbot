import { Client, Message } from 'discord.js-selfbot-v13';
import ytSearch from 'yt-search';

const YTSearch = {
    name: 'ytsearch',
    description: 'Searches YouTube and returns the top result.',
    usage: 'ytsearch <query>',
    aliases: ['yt', 'search'],
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
            return message.channel.send('> ❎ **Please provide a search query.**').then((m) => setTimeout(() => m.delete().catch(() => null), 5000));
        }

        let query = args.join(' ');

        try {
            let results = await ytSearch(query);
            let video = results.videos[0];

            if (!video) {
                return message.channel
                    .send('> ❎ **No results found for your query.**')
                    .then((m) => setTimeout(() => m.delete().catch(() => null), 5000));
            }

            message.channel.send(
                `>>> 🎥 **YouTube Search Result**\n📌 **Title:** ${video.title}\n📅 **Uploaded:** ${video.ago}\n🏬 **Author:** ${video.author.name}\n👀 **Views:** ${video.views.toLocaleString()}\n🔗 **Link:** ${video.url}`
            );
        } catch (error) {
            console.error(error);
            return message.channel
                .send('> ❎ **Failed to fetch YouTube results. Please try again later.**')
                .then((m) => setTimeout(() => m.delete().catch(() => null), 5000));
        }
    },
};

export default YTSearch;
