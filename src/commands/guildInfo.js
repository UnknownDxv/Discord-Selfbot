import { Client, Message } from 'discord.js-selfbot-v13';

const GuildInfo = {
    name: 'guildinfo',
    description: 'Displays information about the current server.',
    usage: 'guildinfo',
    aliases: ['serverinfo'],
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
            if (!message.guild) return;

            const guild = message.guild;
            const bannerURL = guild.bannerURL({ dynamic: true, size: 1024 }) || 'No Banner';
            const owner = await guild.fetchOwner().catch(() => 'Unknown');

            let serverInfoMessage =
                `**🏰 Server Name:** ${guild.name}\n` +
                `**👑 Owner:** ${owner.user?.tag || 'Unknown'}\n` +
                `**👥 Members:** ${guild.memberCount}\n` +
                `**📆 Created At:** ${guild.createdAt.toDateString()}\n` +
                `**🔗 Roles:** ${guild.roles.cache.size}\n` +
                `**📺 Channels:** ${guild.channels.cache.size}\n` +
                `**🆔 Server ID:** ${guild.id}`;

            if (bannerURL !== 'No Banner') {
                serverInfoMessage += `\n**🖼 Server Banner:** ${bannerURL}`;
            }

            await message.channel.send(serverInfoMessage);
        } catch (error) {
            console.error('Error fetching server info:', error);
        }
    },
};

export default GuildInfo;
