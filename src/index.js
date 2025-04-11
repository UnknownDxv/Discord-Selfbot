import 'dotenv/config';
import { Client, Collection } from 'discord.js-selfbot-v13';

const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.gtSniperChannelId = null;

const handlers = ['antiCrash', 'loadEvent', 'loadCommand'];

(async () => {
    console.clear();
    await Promise.all(
        handlers.map(async (handler) => {
            const module = await import(`./handlers/${handler}.js`);
            module.default(client);
        })
    );
})();

client.login(process.env.TOKEN).catch(console.error);

export default client;
