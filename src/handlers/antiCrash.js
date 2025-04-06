import { Client } from 'discord.js-selfbot-v13';

/**
 * @param {Client} client
 */

export default (client) => {
    process.on('unhandledRejection', (reason, promise) => {
        console.error('🚨 Unhandled Rejection at:', promise, 'Reason:', reason);
    });

    process.on('uncaughtException', (error) => {
        console.error('🔥 Uncaught Exception:', error);
    });

    process.on('uncaughtExceptionMonitor', (error) => {
        console.error('⚠️ Uncaught Exception Monitor:', error);
    });

}