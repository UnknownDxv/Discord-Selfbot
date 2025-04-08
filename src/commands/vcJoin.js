import { Client, Message } from 'discord.js-selfbot-v13';

const VcJoin = {
     name: 'vcjoin',
     description: 'Join a voice channel!',
     usage: 'vcjoin <#channel> [deafen | video | off]',
     aliases: ['joinvc', 'connectvc'],
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
               let channel = message.mentions.channels.first() || client.channels.cache.get(args[0]);
               if (!channel) return await message.channel.send(`> ❎ Voice channel not found!`);

               if (args[1] && ['deaf', 'd', 'deafen'].includes(args[1])) {
                    client.vcConnection = await client.voice.joinChannel(channel, {
                         selfDeaf: true,
                         selfMute: true,
                         selfVideo: false,
                    });
               } else if (args[1] && ['vid', 'video', 'v'].includes(args[1])) {
                    client.vcConnection = await client.voice.joinChannel(channel, {
                         selfDeaf: true,
                         selfMute: true,
                         selfVideo: true,
                    });
               } else {
                    client.vcConnection = await client.voice.joinChannel(channel, {
                         selfDeaf: false,
                         selfMute: true,
                         selfVideo: false,
                    });
               }

               return await message.channel.send(`> ✅ Successfully joined the voice channel!`);
          } catch (error) {
               return await message.channel.send(`> ❎ Error joining voice channel!`);
          }
     },
};

export default VcJoin;
