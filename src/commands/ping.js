import { Client, Message } from 'discord.js-selfbot-v13';

const Ping = {
     name: 'ping',
     description: "Displays the bot's bot latency",
     usage: 'ping',
     aliases: ['pong'],
     args: false,
     options: [],
     /**
      *
      * @param {Client} client
      * @param {Message} message
      * @param {Array} args
      */
     execute(client, message, args) {
          message.channel.send(`🏓 Pong! Latency \`${Math.round(client.ws.ping)}\`ms`).catch((_) => null);
     },
};

export default Ping;
