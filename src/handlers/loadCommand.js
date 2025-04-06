import * as fs from 'node:fs';
import { Client } from 'discord.js-selfbot-v13';

/**
 * @param {Client} client 
 */
export default async (client) => {
    try {
        let commandsFolder = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

        await Promise.all(commandsFolder.map(async (file) => {
            try {
                const command = (await import(`../commands/${file}`)).default;

                if (!command?.name) {
                    console.warn(`⚠️ | Skipping invalid command file: ${file}`);
                    return;
                }

                client.commands.set(command.name, command);

                if (Array.isArray(command.aliases) && command.aliases.length > 0) {
                    command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
                }

                console.log(`✅ | Loaded Command: ${command.name}`);
            } catch (error) {
                console.error(`⚠️ | Error loading command file: ${file}`, error);
            }
        }));
    } catch (error) {
        console.error("⚠️ | Error while loading commands", error);
    }
};