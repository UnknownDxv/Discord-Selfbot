import { Client, Message, MessageAttachment } from "discord.js-selfbot-v13";
import axios from "axios";

const PHComment = {
    name: "phcomment",
    description: "Generate a PH comment image",
    usage: "phcomment [user] <text>",
    aliases: ["ph", "pornhub", "pornhubcomment"],
    args: false,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(client, message, args) {
        const author = message.mentions.users.first() || message.author;
        const text = args?.slice(1)?.join(' ') || "Hello Darling"
        const api = `https://nekobot.xyz/api/imagegen?type=phcomment&text=${text}&username=${author.username}&image=${author.displayAvatarURL({ format: "png", size: 1024 })}`

        try {
            const response = await axios.get(api)
            if (!response.data.success) {
                return message.channel.send("Failed to generate image.")
            } else {
                const imageUrl = response?.data?.message
                await message.channel.send(imageUrl)
            }
        } catch (error) {
            return message.channel.send("Failed to generate image.")
        }


    }
}

export default PHComment;