import { Client, Message } from 'discord.js-selfbot-v13';

const Banner = {
    name: 'banner',
    description: 'Displays the banner of the mentioned user.',
    usage: 'banner [user]',
    aliases: ['bn'],
    args: false,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {
        let member = message.mentions.members?.first() || message?.guild?.members.cache.get(args[0]|| client.user.id)
        if (!member) {
            member = client.users.cache.get(args[0] || client.user.id)
        }

        let banner = member.bannerURL({ dynamic: true, size: 4096 })

        await message.channel.send(`**${member.displayName}'s** Banner: ${banner}`)
    }
};

export default Banner;
