import Discord from 'discord.js-selfbot-v13';
import axios from 'axios';
import * as fs from 'node:fs';
import util from 'util';

const Eval = {
    name: 'eval',
    description: 'Evaluates JavaScript code.',
    usage: 'eval <code>',
    aliases: ['js', 'code'],
    args: true,
    options: [],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {
        async function clean(client, text) {
            if (typeof text !== 'string') {
                text = util.inspect(text, {
                    depth: 0,
                });
            }
            text = text.replaceAll(process.env.TOKEN, '[TOKEN REDACTED]');
            return text;
        }
        const code = args.join(" ")

        try {
            const evaled = await eval(code);
            const result = await clean(client, evaled);
            await message.channel.send({
                content: `✅ | **Evaluation Successful:**\n\n\`\`\`js\n${result}\n\`\`\``,
            }).catch(_ => null)

        } catch (error) {
            await message.channel.send({
                content: `❎ | **Evaluation Error:**\n\n\`\`\`js\n${error.message}\n\`\`\``,
            }).catch(_ => null)
        }
    }
};

export default Eval;