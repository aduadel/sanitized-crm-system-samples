import axios from "axios";
import { env } from "../config/env.js";

const TEMPLATE_NAME = "sample_notification_template";
const LANGUAGE_CODE = "en";

export async function sendTemplateMessage(
  recipientNumber: string,
  variables: Array<string | number> = [],
) {
  if (!env.whatsappApiToken || !env.whatsappApiUrl) {
    console.warn("WhatsApp API settings are not configured.");
    return;
  }

  try {
    await axios.post(
      env.whatsappApiUrl,
      {
        messaging_product: "whatsapp",
        to: recipientNumber,
        type: "template",
        template: {
          name: TEMPLATE_NAME,
          language: { code: LANGUAGE_CODE },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "image",
                  image: { link: "https://example.com/sample-image.png" },
                },
              ],
            },
            {
              type: "body",
              parameters: variables.map((item) => ({
                type: "text",
                text: item.toString(),
              })),
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${env.whatsappApiToken}`,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error sending WhatsApp template:",
        error.response?.data ?? error.message,
      );
      return;
    }

    console.error("Error sending WhatsApp template:", error);
  }
}
