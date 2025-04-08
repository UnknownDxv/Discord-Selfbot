import { Client, Message } from 'discord.js-selfbot-v13';

const MessageCreate = {
    name: 'messageCreate',
    once: false,
    enable: true,
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    execute(message, client) {
        client.emit('nitroSniper', message)
        client.emit('gtSniper', message)
        const prefix = process.env.PREFIX;
        if (message.author.id !== client.user.id) return
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmd = args.shift().toLowerCase();

        const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
        if (!command) return;
        
        if (command.name !== 'eval') {
            message.delete().catch(_ => null)
        }

        if (command.args && command.args === true) {
            if (!args.length) {

                message.channel
                    .send(`> ❌ Missing Arguments! \`${prefix + command.usage}\``)
                    .then((m) => setTimeout(() => m.delete().catch((_) => null), 10000));
                return;
            }
        }

        return command.execute(client, message, args)

    }
}

export default MessageCreate;