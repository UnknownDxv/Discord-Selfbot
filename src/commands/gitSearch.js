import { Client, Message } from 'discord.js-selfbot-v13';
import axios from 'axios';

const GitSearch = {
    name: 'gitsearch',
    description: 'Searches GitHub for repositories.',
    usage: 'gitsearch <query>',
    aliases: ['ghsearch'],
    args: true,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        const query = args.join(' ');

        if (!query) {
            return message.channel.send('> ❎ Please provide a search query.');
        }

        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`);
            const { items } = response.data;

            if (!items.length) {
                return message.channel.send('> ❎ No repositories found for the given query.');
            }

            const topRepos = items
                .slice(0, 5)
                .map((repo) => {
                    return `[${repo.full_name}](<${repo.html_url}>) - ${repo.description || 'No description available'}`;
                })
                .join('\n');

            message.channel.send(`**Top 5 repositories for "${query}":**\n${topRepos}`);
        } catch (error) {
            message.channel.send('> ❎ An error occurred while searching GitHub. Please try again later.');
        }
    },
};

export default GitSearch;
