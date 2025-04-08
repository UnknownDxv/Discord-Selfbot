import { Client, Message } from 'discord.js-selfbot-v13';

const VcLeave = {
  name: 'vcleave',
  description: 'Leave the current voice channel!',
  usage: 'vcleave',
  aliases: ['leavevc', 'disconnectvc'],
  args: false,
  options: [],
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array} args 
   */
  async execute(client, message, args) {
    try {
      if (!client.vcConnection) 
        return await message.channel.send(`> ❌ I'm not connected to any voice channel!`);

      await client.vcConnection.disconnect();
      client.vcConnection = null; 

      return await message.channel.send(`> ✅ Successfully left the voice channel!`);
    } catch (error) {
      return await message.channel.send(`> ❌ Error leaving voice channel!`);
    }
  }
}

export default VcLeave;