import { Client, Message } from 'discord.js-selfbot-v13';

const Uptime = {
     name: 'uptime',
     description: 'Shows how long the bot has been running',
     usage: 'uptime',
     aliases: [],
     args: false,
     options: [],
     /**
      * @param {Client} client
      * @param {Message} message
      * @param {Array} args
      */
     execute(client, message, args) {
          const startedAt = Math.floor(Date.now() / 1000 - process.uptime());
          message.channel.send(`⏱️ Running Since <t:${startedAt}:R>`).catch((_) => null);
     },
};

export default Uptime;
