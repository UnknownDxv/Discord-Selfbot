import { Client, Message, Permissions } from 'discord.js-selfbot-v13';

const VoiceMove = {
    name: 'voicemove',
    description: 'Move all users from a voice channel to another',
    usage: 'voicemove <vc_channel_id>',
    aliases: ['vcmove', 'vm'],
    args: true,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        const channelId = args[0];

        if (!message.guild) {
            return message.channel.send(`> ❎ This command is guild only.`);
        }

        const fromChannel = message.member.voice.channel;
        if (!fromChannel) return message.channel.send('> ❎ You must be in a voice channel to use this command.');

        if (!message.guild.members.me.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) {
            return message.channel.send(`> ❎ I need the \`Move Members\` permission to do that`);
        }

        const channel = message.guild.channels.cache.find((ch) => ch.id === channelId && ch.type === 'GUILD_VOICE');

        if (!channel || channel.type !== 'GUILD_VOICE') {
            return message.channel.send('> ❎ Please provide a valid target voice channel.');
        }

        for (const [memberId, member] of fromChannel.members) {
            try {
                await member.voice.setChannel(channel);
            } catch (error) {
                message.channel.send(`> ❎ Failed to move member \`${memberId}\``);
            }
        }

        message.channel.send(`> ✅ Moved all users from \`${fromChannel.name}\` to \`${channel.name}\`.`);
    },
};

export default VoiceMove;
