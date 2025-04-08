import { Client, Message } from 'discord.js-selfbot-v13';

const Purge = {
     name: 'purge',
     description: 'Deletes your messages',
     usage: 'purge <amount>',
     aliases: ['clear'],
     args: true,
     options: [],
     /**
      *
      * @param {Client} client
      * @param {Message} message
      * @param {Array} args
      */
     async execute(client, message, args) {
          const amount = parseInt(args[0]) || 1;
          if (amount <= 0) return message.channel.send('> ❎ Invalid number.').catch(() => null);

          let messages = (await message.channel.messages.fetch({ limit: 100 })).filter((m) => m.author.id === client.user.id).first(amount);

          if (!messages.length) return message.channel.send('> ❎ No messages found.').catch(() => null);

          for (const msg of messages) await msg.delete().catch(() => null);
     },
};

export default Purge;
