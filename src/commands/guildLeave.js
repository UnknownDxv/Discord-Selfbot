import { Client, Message } from 'discord.js-selfbot-v13';

const GuildLeave = {
    name: 'guildleave',
    description: 'Leaves the current server.',
    usage: 'guildleave',
    aliases: ['leaveguild'],
    args: false,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    execute(client, message, args) {
        try {
            if (!message.guild) return;
            message.channel.send(`🚪 | Leaving **${message.guild.name}**...`).then((msg) =>
                setTimeout(async () => {
                    await msg.delete().catch(() => null);
                    await message.guild?.leave();
                }, 5000)
            );
        } catch (error) {
            console.error('Error leaving guild:', error);
        }
    },
};

export default GuildLeave;
