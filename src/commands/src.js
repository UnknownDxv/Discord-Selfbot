import { Client, Message } from 'discord.js-selfbot-v13';

const Src = {
    name: 'src',
    description: 'Displays the GitHub Repo of the bot',
    usage: 'src',
    aliases: ['source'],
    args: false,
    options: [],
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    execute(client, message, args) {
        message.channel.send(process.env.REPO || "Source Code not found!").catch(_ => null);
    }
};

export default Src;