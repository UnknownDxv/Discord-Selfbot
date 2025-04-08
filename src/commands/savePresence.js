import { Client, Message } from 'discord.js-selfbot-v13';
import * as fs from 'node:fs';

const SavePresence = {
     name: 'savepresence',
     description: "Saves bot's current activities",
     usage: 'savepresence',
     aliases: ['saveact', 'saveactivity', 'saveactivities'],
     args: false,
     options: [],
     /**
      * @param {Client} client
      * @param {Message} message
      * @param {Array} args
      */
     execute(client, message, args) {
          const activities = client.user.presence.activities;
          if (!activities || activities.length === 0) {
               return message.channel.send('> ❎ No activities found to save.');
          }

          const jsonData = JSON.stringify(client.user.presence, null, 2);
          try {
               fs.writeFileSync('./src/json/presence.json', jsonData, 'utf8');
               message.channel.send('> ✅ Bot presence data saved!');
          } catch (error) {
               return message.channel.send('> ❎ Failed to save presence data.');
          }
     },
};

export default SavePresence;
