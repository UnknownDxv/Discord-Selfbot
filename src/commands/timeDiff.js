import { Client, Message } from 'discord.js-selfbot-v13'

const TimeDiff = {
    name: 'timediff',
    description: 'Calculate the time difference between two message IDs.',
    usage: 'timediff <message_1> <message_2>',
    aliases: ['tdiff'],
    args: true,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {
        let firstMessageId = args[0];
        let secondMessageId = args[1];

        if (!firstMessageId || !secondMessageId) return message.channel.send(`❎ | Please provide two valid message IDs.`)

        const date1 = snowflakeToDate(firstMessageId);
        const date2 = snowflakeToDate(secondMessageId);

        const diff = Math.abs(date2 - date1);
        const seconds = (diff / 1000) % 60;
        const minutes = Math.floor(diff / 60000) % 60;
        const hours = Math.floor(diff / 3600000) % 24;
        const days = Math.floor(diff / 86400000);
        const years = Math.floor(days / 365);

        let timeDiffDescription = '';

        if (years > 0) {
            timeDiffDescription += `**${years}** years `;
        }
        if (days % 365 > 0) {
            timeDiffDescription += `**${days % 365}** days `;
        }
        if (hours > 0) {
            timeDiffDescription += `**${hours}** hours `;
        }
        if (minutes > 0) {
            timeDiffDescription += `**${minutes}** minutes `;
        }
        if (seconds > 0) {
            timeDiffDescription += `**${seconds.toFixed(2)}** seconds`;
        }

        const formatMessage = `>>> **Time Difference**\n\n${timeDiffDescription || 'No difference in time'}\n\n**Message ID 1**\nSent: <t:${Math.floor(date1.getTime() / 1000)}:F>\n\n**Message ID 2**\nSent: <t:${Math.floor(date2.getTime() / 1000)}:F>\n\n-# Showing difference between the two given IDs.`
        await message.channel.send(formatMessage)

        function snowflakeToDate(snowflake) {
            const discordEpoch = 1420070400000;
            const timestamp = BigInt(snowflake) >> 22n;
            return new Date(Number(timestamp) + discordEpoch);
        }
    }
}

export default TimeDiff;