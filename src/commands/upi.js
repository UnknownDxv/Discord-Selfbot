import { Client, Message } from 'discord.js-selfbot-v13';

const UPI = {
     name: 'upi',
     description: 'Display your UPI ID securely.',
     usage: 'upi',
     aliases: ['pay'],
     args: false,
     options: [],
     /**
      *
      * @param {Client} client
      * @param {Message} message
      * @param {Array} args
      */
     async execute(client, message, args) {
          const upiID = process.env.UPI_ID;
          try {
               await message.channel.send(`💳 **UPI Payment Details:** || ${upiID} ||`);
          } catch (error) {
               console.error('Error sending UPI details:', error);
               message.channel.send('> ❎ Error sending UPI details. Please try again later.').catch(() => null);
          }
     },
};

export default UPI;
