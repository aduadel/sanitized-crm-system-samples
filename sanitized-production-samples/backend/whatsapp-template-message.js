/**
 * sendTemplateMessage
 * --------------------
 * A generic utility function for sending WhatsApp template messages
 * using an external messaging API (e.g., WhatsApp Cloud API).
 *
 * This sample demonstrates:
 *  - Working with Axios to call external APIs
 *  - Building dynamic template parameters
 *  - Using environment variables for sensitive configuration
 *  - Clean error handling and request structure
 *
 * NOTE:
 * This is a sanitized sample. Template names, variables, and media URLs
 * are placeholders and do not reflect real business logic.
 */

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// External API configuration (generic placeholders)
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;

// Example: Generic template name and language code
const TEMPLATE_NAME = "sample_notification_template";
const LANGUAGE_CODE = "en";

export const sendTemplateMessage = async (recipientNumber, variables = []) => {
  try {
    // Example placeholder header image URL
    const headerImageUrl = "https://example.com/sample-image.png";

    const response = await axios.post(
      WHATSAPP_API_URL,
      {
        messaging_product: "whatsapp",
        to: recipientNumber,
        type: "template",
        template: {
          name: TEMPLATE_NAME,
          language: { code: LANGUAGE_CODE },
          components: [
            // Optional header example
            {
              type: "header",
              parameters: [
                {
                  type: "image",
                  image: { link: headerImageUrl },
                },
              ],
            },

            // Body variables (generic placeholders)
            {
              type: "body",
              parameters: variables.map((item) => ({
                type: "text",
                text: item.toString(),
              })),
            },

            // Optional — URL button (placeholder)
            {
              type: "button",
              sub_type: "url",
              index: 0,
              parameters: [
                {
                  type: "text",
                  text: "https://example.com/action",
                },
              ],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log(`Message sent successfully to ${recipientNumber}`);
    } else {
      console.error(`Failed to send message. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(
      "Error sending WhatsApp template:",
      error.response?.data || error.message
    );
  }
};
