import { Client, Message } from 'discord.js-selfbot-v13';
import fetch from 'node-fetch';

const Rizz = {
    name: 'rizz',
    description: 'Send a random pickup line to a user.',
    usage: 'rizz [@user]',
    aliases: ['pickup', 'flirt'],
    args: false,
    options: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {Array} args
     */
    execute(client, message, args) {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        const uri = 'https://rizzapi.vercel.app/random';

        getRizz().then((pickupLine) => {
            if (user) {
                message.channel.send({
                    content: `<@${user.id}> ${filterWords(pickupLine)}`,
                    allowedMentions: { users: [user.id] },
                });
            } else {
                message.channel.send(filterWords(pickupLine));
            }
        });

        function getRizz() {
            return fetch(uri)
                .then((response) => response.json())
                .then((data) => data?.text || 'Could not fetch pickup line.')
                .catch(() => 'Could not fetch pickup line.');
        }

        function filterWords(text) {
            const wordFilters = {
                pussy: 'p???y',
                dick: 'd?c?',
                bitch: 'b?t?h',
                whore: 'w??r?',
                ass: 'a?s',
                vagina: 'v?g?n?',
                penis: 'p???s',
                blowjob: 'b???j??',
            };

            let filteredText = text;

            for (const [word, replacement] of Object.entries(wordFilters)) {
                const regex = new RegExp(`\\b${word}\\b`, 'gi');
                filteredText = filteredText.replace(regex, replacement);
            }

            return filteredText;
        }
    },
};

export default Rizz;
