import { Client, Message } from 'discord.js-selfbot-v13';
import { evaluate } from 'mathjs';

const Math = {
    name: 'math',
    description: 'Solves mathematical expressions.',
    usage: 'math <expression>',
    aliases: ['calc'],
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
            let expression = args.join(' ');
            if (!expression) return await message.channel.send('> ❌ Please provide a mathematical expression.');

            let result = evaluate(expression).toString().replace(/\s+/g, ''); 
            result = result.slice(0, -1) + result.slice(-1).toUpperCase(); 

            await message.channel.send(`🧮 | **Expression:** \`${expression}\`\n📊 | **Result:** \`${result}\``);
        } catch (error) {
            return await message.channel.send('> ❌ Invalid mathematical expression!');
        }
    }
};

export default Math;