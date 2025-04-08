import { Client, Message } from 'discord.js-selfbot-v13';
import * as fs from 'node:fs';

const Help = {
     name: 'help',
     description: 'Displays all available commands',
     usage: 'help',
     aliases: ['h'],
     args: false,
     options: [],
     /**
      *
      * @param {Client} client
      * @param {Message} message
      * @param {Array} args
      */
     async execute(client, message, args) {
          const commandFiles = fs.readdirSync('src/commands').filter((file) => file.endsWith('.js'));
          const commands = [];

          for (const file of commandFiles) {
               const commandData = (await import(`../commands/${file}`)).default;
               commands.push({
                    name: `${process.env.PREFIX}${commandData.name}`,
                    description: commandData.description || 'No description provided',
               });
          }

          const totalCommands = commands.length;
          const developer = process.env.DEV;

          const baseMessage = `💁‍♂️ **Help Menu**  
━━━━━━━━━━━━━━━━━━━  
📜 **Total Commands:** ${totalCommands}  
👨‍💻 **Developer:** ${developer}  
━━━━━━━━━━━━━━━━━━━\n\n`;

          let messageChunk = baseMessage;
          let firstMessageSent = false;

          for (const cmd of commands) {
               const commandEntry = `🔹 **${cmd.name}** → ${cmd.description}\n`;

               if (messageChunk.length + commandEntry.length > 2000) {
                    await message.channel.send(messageChunk).catch((_) => null);
                    messageChunk = '';
                    firstMessageSent = true;
               }

               messageChunk += commandEntry;
          }

          if (messageChunk.trim().length > 0) {
               await message.channel.send(messageChunk).catch((_) => null);
          }
     },
};

export default Help;
