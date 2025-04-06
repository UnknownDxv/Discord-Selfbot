import { Client, Message } from 'discord.js-selfbot-v13';

const Status = {
    name: 'status',
    description: 'Set your online status!',
    usage: 'status <online | idle | dnd | invisible>',
    aliases: ['setstatus'],
    args: true,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {
        try {
            const status = args[0]?.toLowerCase();
            const validStatuses = ['online', 'idle', 'dnd', 'invisible'];

            if (!validStatuses.includes(status)) {
                return await message.channel.send(`❎ | Invalid status! Use one of: \`${validStatuses.join(', ')}\``);
            }

            client.user.setPresence({ status });

            return await message.channel.send(`✅ | Status set to: **${status}**`);
        } catch (error) {
            return await message.channel.send(`❎ | Error setting status!`);
        }
    }
}

export default Status;