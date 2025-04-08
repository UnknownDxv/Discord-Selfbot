import { Client, Message } from 'discord.js-selfbot-v13';

const Avatar = {
     name: 'avatar',
     description: 'Displays the avatar of the mentioned user.',
     usage: 'avatar [user]',
     aliases: ['av'],
     args: false,
     options: [],
     /**
      *
      * @param {Client} client
      * @param {Message} message
      * @param {Array} args
      */
     async execute(client, message, args) {
          let member = message.mentions.members?.first() || message?.guild?.members.cache.get(args[0] || client.user.id);
          if (!member) {
               member = client.users.cache.get(args[0] || client.user.id);
          }

          let avatar = member.displayAvatarURL({ dynamic: true, size: 4096 });

          await message.channel.send(`**${member.displayName}'s** Avatar: ${avatar}`);
     },
};

export default Avatar;
