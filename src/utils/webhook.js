import fetch from 'node-fetch'

const webhookUrl = process.env.WEBHOOK_URL || null
/**
 * @param {String} content
 * @param {Array} embeds
 */
export async function sendToWebhook(content, embeds = []) {
    try {
        const body = { content, embeds }
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

    } catch (error) {
        console.error("Webhook Error:", error);
    }
}

