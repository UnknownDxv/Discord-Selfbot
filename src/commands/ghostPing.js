import { Client, Message } from 'discord.js-selfbot-v13';

const GhostPing = {
    name: 'ghostping',
    description: 'Ghost pings a user by mentioning them.',
    usage: 'ghostping <user_id>',
    aliases: ['gp'],
    args: true,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {
        let userId = args[0];

        if (!userId || isNaN(userId)) {
            return message.channel.send('> ❌ **Please provide a valid User ID.**').then(m => setTimeout(() => m.delete().catch(() => null), 5000));
        }

        try {
            let user = await client.users.fetch(userId);
            if (!user) {
                return message.channel.send('> ❌ **User not found.**').then(m => setTimeout(() => m.delete().catch(() => null), 5000));
            }

            let ghostPingMessage = await message.channel.send(`<@${user.id}>`); // Mentions user
            setTimeout(() => ghostPingMessage.delete().catch(() => null), 1000); // Deletes after 1 second

        } catch (error) {
            console.error(error);
            return message.channel.send('> ❌ **Failed to ghost ping.**').then(m => setTimeout(() => m.delete().catch(() => null), 5000));
        }
    }
};

export default GhostPing;