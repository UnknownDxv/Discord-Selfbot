import { Client, Message } from 'discord.js-selfbot-v13';

const VcStatus = {
    name: 'vcstatus',
    description: 'Change your voice channel status!',
    usage: 'vcstatus <text>',
    aliases: ['vcs'],
    args: true,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    execute(client, message, args) {
        const status = args.join(' ');
        const guild = client.guilds.cache.find((guild) => guild.members.me.voice.channel);

        if (guild) {
            guild?.members?.me?.voice
                ?.setStatus(status)
                .then((_) => message.channel.send(`> ✅ Voice status changed to: **${status}**`))
                .catch((_) => message.channel.send(`> ❎ Failed to change voice status maybe I don't have permission`));
        } else {
            return message.channel.send('> ❎ You are not connected to a guild voice channel.');
        }
    },
};

export default VcStatus;
