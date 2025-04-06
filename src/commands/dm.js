import { Client, Message } from 'discord.js-selfbot-v13';

const DM = {
    name: 'dm',
    description: 'Send a direct message to a user.',
    usage: 'dm <@user> <message>',
    aliases: [],
    args: true,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args
     */
    async execute(client, message, args) {

        let user = message.mentions.users.first() || client.users.cache.get(args[0])
        let text = args.slice(1).join(' ')
        if (!user) return message.channel.send('❎ **User not found.**').then(m => setTimeout(() => m.delete().catch(() => null), 5000));

        try {

            await user.send(text)
            await message.channel.send(`✅ | Message successfully sent to **${user.tag}**.`)

        } catch (error) {
            return await message.channel.send(`❎ | Could not send the message. The user may have DMs disabled.`)
        }



    }
};

export default DM;