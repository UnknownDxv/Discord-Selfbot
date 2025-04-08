import { Client, Message } from 'discord.js-selfbot-v13';

const Hack = {
    name: 'hack',
    description: 'Simulates a prank hack.',
    usage: 'hack',
    aliases: ['fakehack'],
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
            await message.channel.send('🕵️ | **Hacking in progress...**');

            setTimeout(() => {
                message.channel.send('🔍 | Accessing mainframe...');
            }, 2000);

            setTimeout(() => {
                message.channel.send('🔥 | Bypassing firewalls...');
            }, 4000);

            setTimeout(() => {
                message.channel.send('📡 | Retrieving user data...');
            }, 6000);

            setTimeout(() => {
                message.channel.send('⚠️ | **ALERT: Firewall detected! Attempting to bypass...**');
            }, 8000);

            setTimeout(() => {
                message.channel.send('> ✅ Hack successful! You now control the system! (Just kidding 🤣)');
            }, 10000);

        } catch (error) {
            return await message.channel.send('> ❌ Error executing the hack command!');
        }
    }
};

export default Hack;