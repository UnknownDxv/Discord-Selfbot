import { Client, Message } from 'discord.js-selfbot-v13';
import axios from 'axios';

const GitUser = {
    name: 'gituser',
    description: 'Retrieves information about a GitHub user.',
    usage: 'gituser <username>',
    aliases: ['githubuser', 'ghuser'],
    args: true,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        const username = args[0];

        if (!username) {
            return message.channel.send('> ❎ Please provide a GitHub username.');
        }

        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            const userData = response.data;

            const userInfo =
                `>>> **Username:** ${userData.login}\n` +
                `**Name:** ${userData.name || 'Not available'}\n` +
                `**Bio:** ${userData.bio || 'Not available'}\n` +
                `**Followers:** ${userData.followers}\n` +
                `**Following:** ${userData.following}\n` +
                `**Public Repositories:** ${userData.public_repos}\n` +
                `**URL:** [Profile](${userData.html_url})`;

            message.channel.send(userInfo);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                message.channel.send('> ❎ User not found.');
            } else {
                message.channel.send('> ❎ An error occurred while retrieving user information. Please try again later.');
            }
        }
    },
};

export default GitUser;
