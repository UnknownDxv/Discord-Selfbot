import { Client, Message } from 'discord.js-selfbot-v13'

const GTCheat = {
    name: 'gtcheat',
    description: "Toggle Greentea sniper for Mudae game",
    usage: "gtcheat <channel_id>",
    aliases: [],
    args: true,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    execute(client, message, args) {
        const channelId = args[0]
        const channel = client.channels.cache.get(channelId)
        if (!channel) {
            client.gtSniperChannelId = null
            return message.channel.send('> GreenTea sniper successfully reset!')
        }
        client.gtSniperChannelId = channel?.id

        return message.channel.send(`> ✅ GreenTea sniper successfully set to \`${channel.name}\``)


    }
}

export default GTCheat