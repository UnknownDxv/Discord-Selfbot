import { Client, Message } from 'discord.js-selfbot-v13';

const GuildIcon = {
    name: 'guildicon',
    description: 'Displays the guild icon.',
    usage: 'guildicon',
    aliases: ['servericon', 'gicon'],
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
            if (!message.guild) return await message.channel.send(`> ❌ This command can only be used in a server.`).then(msg => setTimeout(() => msg.delete().catch(_ => null), 5000));

            let iconURL = message.guild.iconURL({ dynamic: true, size: 4096 });

            if (!iconURL) {
                return await message.channel.send(`> ❌ This server does not have an icon.`).then(msg => setTimeout(() => msg.delete().catch(_ => null), 5000));
            }
            await message.channel.send(`🖼️ | **${message.guild.name}'s** Icon: ${iconURL}`);

        } catch (error) {
            return await message.channel.send(`> ❌ Error fetching server icon!`).then(msg => setTimeout(() => msg.delete().catch(_ => null), 5000));
        }
    }
};

export default GuildIcon;