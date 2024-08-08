import { OpenAI } from "openai";
import { getProductNames } from "./app/components/products/util";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const getOpenAIResponse = async (prods) => {
  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: "Hello!",
        },
      },

      {
        role: "user",
        content: [
          {
            type: "text",
            text: "I will provide you a list of items you have to suggest a recepie using these items!",
          },
          {
            type: "text",
            text: prods,
          },
        ],
      },
    ],
    max_tokens: 1000,
  });

  return resp;
};

export { getOpenAIResponse };
