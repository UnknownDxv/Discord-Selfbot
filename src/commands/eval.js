import Discord from 'discord.js-selfbot-v13';
import axios from 'axios';
import fetch from 'node-fetch';
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
                text = util.inspect(text, { depth: 0 });
            }
            if (process.env.TOKEN) {
                text = text.replaceAll(process.env.TOKEN, '[TOKEN REDACTED]');
            }
            return text;
        }

        const code = args.join(" ");

        try {
            const evaled = eval(code);

            if (evaled instanceof Promise) {
                await message.react('✅').catch(() => null);
                return;
            }

            const result = await clean(client, evaled);

            if (result && result !== 'undefined') {
                await message.channel.send({
                    content: `\`\`\`js\n${result}\n\`\`\``,
                }).catch(() => null);
            } else {
                return message.react('✅').catch(() => null);
            }
        } catch (error) {
            message.react('❌').catch(() => null);
            message.channel.send({
                content: `\`\`\`js\n${error.message}\n\`\`\``,
            }).catch(() => null);
        }
    }
}

export default Eval;