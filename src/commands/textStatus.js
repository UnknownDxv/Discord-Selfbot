import { Client, Message, CustomStatus } from 'discord.js-selfbot-v13';

const TextStatus = {
     name: 'textstatus',
     description: 'Set a text status!',
     usage: 'textstatus <text>',
     aliases: ['ts'],
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
               if (!text) return await message.channel.send('> ❎ Please provide a status message.');

               const emojiRegex = /(<a?:\w+:\d+>)|([\p{Emoji}])/gu;
               const matches = [...text.matchAll(emojiRegex)];

               let emoji = null;
               let cleanText = text;

               if (matches.length === 1) {
                    emoji = matches[0][0];
                    cleanText = text.replace(emoji, '').trim();
               }

               const custom = new CustomStatus(client).setEmoji(emoji || null).setState(cleanText);
               client.user.setPresence({ activities: [custom], status: 'online' });

               return await message.channel.send(`> ✅ Text status set to: **${text}**`);
          } catch (error) {
               console.error(error);
               return await message.channel.send(`> ❎ Error setting text status!`);
          }
     },
};

export default TextStatus;
