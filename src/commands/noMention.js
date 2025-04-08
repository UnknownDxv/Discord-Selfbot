import { Client, Message } from 'discord.js-selfbot-v13';

const NoMention = {
     name: 'nomention',
     description: 'Mention anyone without ping!',
     usage: 'nomention <user_id | role_id> [message]',
     aliases: ['nom'],
     args: true,
     options: [],
     /**
      *
      * @param {Client} client
      * @param {Message} message
      * @param {Array} args
      */
     async execute(client, message, args) {
          let id = args[0];
          let text = args.slice(1).join(' ') || '';

          if (!id || isNaN(id) || !/^\d+$/.test(id)) {
               return message.channel.send('> ❌ Please provide a valid numeric ID.').then((m) => setTimeout(() => m.delete().catch(() => null), 5000));
          }

          let user = await client.users.fetch(id).catch(() => null);
          if (user) {
               return message.channel.send({ content: `<@${user.id}> ${text}`, allowedMentions: { parse: [] } });
          }

          let role = await message?.guild.roles.fetch(id).catch(() => null);
          if (role) {
               return message.channel.send({ content: `<@&${role.id}> ${text}`, allowedMentions: { parse: [] } });
          }

          return message.channel.send('> ❌ This ID does not belong to any User or Role.').then((m) => setTimeout(() => m.delete().catch(() => null), 5000));
     },
};

export default NoMention;
