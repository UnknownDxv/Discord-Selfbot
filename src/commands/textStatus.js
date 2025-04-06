import { Client, Message, CustomStatus } from 'discord.js-selfbot-v13';

const TextStatus = {
    name: 'textstatus',
    description: 'Set a text status!',
    usage: 'textstatus <text>',
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
        try {
            const text = args.join(' ');
            if (!text)
                return await message.channel.send('❎ | Please provide a status message.');

            const custom = new CustomStatus(client).setState(text);

            client.user.setPresence({ activities: [custom] });

            return await message.channel.send(`✅ | Text status set to: **${text}**`);
        } catch (error) {
            return await message.channel.send(`❎ | Error setting text status!`);
        }
    }
}

export default TextStatus;