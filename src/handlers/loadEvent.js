import * as fs from 'node:fs';
import { Client } from 'discord.js-selfbot-v13';

/**
 * @param {Client} client
 */

export default async (client) => {
    try {
        let eventsFolder = fs.readdirSync('./src/events');

        await Promise.all(
            eventsFolder.map(async (dir) => {
                try {
                    let eventFiles = fs.readdirSync(`./src/events/${dir}`).filter((file) => file.endsWith('.js'));

                    await Promise.all(
                        eventFiles.map(async (file) => {
                            try {
                                const { default: event } = await import(`../events/${dir}/${file}`);

                                if (!event?.enable || !event?.name || !event?.execute) {
                                    console.error(`⚠️ | Skipping invalid event file: ${file}`);
                                    return;
                                }

                                if (event.once) {
                                    client.once(event.name, (...args) => event.execute(...args, client));
                                } else {
                                    client.on(event.name, (...args) => event.execute(...args, client));
                                }
                            } catch (error) {
                                console.error(`⚠️ | Error loading event file: ${file}`, error);
                            }
                        })
                    );
                } catch (error) {
                    console.error(`⚠️ | Unable to load event directory: ${dir}`, error);
                }
            })
        );
    } catch (error) {
        console.error('⚠️ | Error while loading events', error);
    }
};
