import { Client, Message } from 'discord.js-selfbot-v13';

const Nickname = {
    name: 'nickname',
    description: 'Change your server nickname.',
    usage: 'nickname <new_name>',
    aliases: ['nick'],
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
            if (!message.guild) return;

            if (!message.guild.me?.permissions.has('CHANGE_NICKNAME')) {
                return message.channel.send('> ❌ I do not have permission to change nicknames.')
                    .then(msg => setTimeout(() => msg.delete().catch(() => null), 5000));
            }

            const newNickname = args.join(' ');
            if (!newNickname) {
                return message.channel.send('> ❌ Please provide a new nickname.')
                    .then(msg => setTimeout(() => msg.delete().catch(() => null), 5000));
            }

            await message.member.setNickname(newNickname).catch(() => null);
            await message.channel.send(`> ✅ Your nickname has been changed to **"${newNickname}"**.`)
                .then(msg => setTimeout(() => msg.delete().catch(() => null), 5000));

        } catch (error) {
            console.error('Error changing nickname:', error);
        }
    }
};

export default Nickname;