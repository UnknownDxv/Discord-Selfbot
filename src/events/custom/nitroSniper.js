import { Client, Message } from 'discord.js-selfbot-v13';
import { sendToWebhook } from '../../utils/webhook.js';

const NitroSniper = {
    name: 'nitroSniper',
    once: false,
    enable: true,
    /**
     *
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {
        if (!message.content.includes('discord.gift/')) return;
        const nitroSniper = process.env.NITRO_SNIPER === 'true';
        if (!nitroSniper) return;

        const cleanContent = message.content.replaceAll('||', '');
        const code = cleanContent.split('discord.gift/')[1]?.split(/ |\n/)[0];
        if (!code) return;

        let embedBase = {
            title: 'Nitro Sniper',
            description: `**Code**: ${code}`,
            color: 0xffff00,
            fields: [],
            author: {
                name: message.author.username,
                icon_url: message.author.displayAvatarURL({ dynamic: true }),
            },
            timestamp: new Date().toISOString(),
        };

        if (message.guild) {
            embedBase.fields.push(
                {
                    name: 'Server Name',
                    value: message.guild.name,
                    inline: false,
                },
                {
                    name: 'Channel Mention',
                    value: `<#${message.channel.id}>`,
                    inline: false,
                }
            );
        } else {
            embedBase.fields.push({
                name: 'Channel',
                value: 'Direct Message',
                inline: false,
            });
        }

        await sendToWebhook(`⚠️ **Nitro Code Detected** <@${client.user.id}>`, [embedBase]);

        try {
            const res = await fetch(`https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`, {
                method: 'POST',
                headers: {
                    Authorization: process.env.TOKEN,
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            let resultEmbed = { ...embedBase };

            if (res.status === 200) {
                resultEmbed.color = 0x00ff00;
                return await sendToWebhook(`✅ **Successfully Redeemed** <@${client.user.id}>`, [resultEmbed]);
            } else {
                resultEmbed.color = 0xff0000;
                return await sendToWebhook(`❌ **Failed To Redeem** <@${client.user.id}>`, [resultEmbed]);
            }
        } catch (error) {
            return await sendToWebhook(`❌ **Error During Redeem** <@${client.user.id}>`);
        }
    },
};

export default NitroSniper;
