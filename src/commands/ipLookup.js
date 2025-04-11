import { Client, Message } from 'discord.js-selfbot-v13';
import axios from 'axios';

const IpLookup = {
    name: 'iplookup',
    description: 'Lookup information about an IP address.',
    usage: 'iplookup <ip>',
    aliases: ['ip', 'lookupip'],
    args: true,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        const ipAddress = args[0];
        if (!ipAddress) {
            return message.channel.send('> ❎ Please provide an IP address to lookup.').catch(console.error);
        }

        try {
            const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
            const data = response.data;

            if (data.status !== 'success') {
                return message.channel.send('> ❎ Invalid IP address or failed to fetch data.').catch(console.error);
            }

            const ipInfoMessage =
                `**IP Address:** ${data.query}\n` +
                `**Country:** ${data.country}\n` +
                `**Region:** ${data.regionName}\n` +
                `**City:** ${data.city}\n` +
                `**ZIP:** ${data.zip || 'N/A'}\n` +
                `**ISP:** ${data.isp}`;

            message.channel.send(ipInfoMessage);
        } catch (error) {
            message.channel.send('> ❎ Error looking up IP address. Please try again later.').catch(console.error);
        }
    },
};

export default IpLookup;
