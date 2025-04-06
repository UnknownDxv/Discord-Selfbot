import { Client, Message } from 'discord.js-selfbot-v13';

const ClearPresence = {
    name: 'clearactivity',
    description: 'Clear your presence activity!',
    usage: 'clearactivity',
    aliases: ['clearact', 'clearpresence', 'resetstatus', 'clearstatus'],
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
            client.user.setPresence({ activities: [], status: 'online' });

            return await message.channel.send(`✅ | Presence cleared!`);
        } catch (error) {
            return await message.channel.send(`❎ | Error clearing presence!`);
        }
    }
}

export default ClearPresence;