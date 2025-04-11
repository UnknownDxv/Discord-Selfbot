import Discord from 'discord.js-selfbot-v13';
import { exec } from 'child_process';
import util from 'util';

const Shell = {
    name: 'shell',
    description: 'Executes shell commands.',
    usage: 'sh <command>',
    aliases: ['sh', 'terminal', 'cmd'],
    args: true,
    options: [],
    /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {Array} args
     */
    async execute(client, message, args) {
        const execPromise = util.promisify(exec);
        const command = args.join(' ');

        try {
            const { stdout, stderr } = await execPromise(command);

            if (stderr) {
                await message.react('⚠️').catch(() => null);
                return message.channel
                    .send({
                        content: `\`\`\`bash\n${stderr}\n\`\`\``,
                    })
                    .catch(() => null);
            }

            const output = stdout.length > 1990 ? stdout.slice(0, 1990) + '...' : stdout;

            await message.react('✅').catch(() => null);
            return message.channel.send({ content: `\`\`\`bash\n${output}\n\`\`\`` }).catch(() => null);
        } catch (error) {
            await message.react('❌').catch(() => null);
            return message.channel.send({ content: `\`\`\`bash\n${error.message}\n\`\`\`` }).catch(() => null);
        }
    },
};

export default Shell;
