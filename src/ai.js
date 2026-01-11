import { InferenceClient } from "@huggingface/inference";

const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

if (!API_KEY) {
  console.error("API Key is missing! Check your .env file and restart the server.");
}

const client = new InferenceClient(API_KEY);

export async function getRecipeFromAI(ingredientsArr) {
  try {
    const chatCompletion = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-V3:novita",
      messages: [
        {
          role: "system",
          content: `
You are a professional chef. Create the best possible recipe using a subset of the ingredients provided.

CRITICAL INSTRUCTIONS:

- Respond ONLY with a valid JSON object.
- DO NOT include Markdown code blocks (like json ... ). Respond in plain text.
- DO NOT include any introductory or concluding text.
- Use THE SAME LANGUAGE for response as the input.
- JSON Structure: { "title": "Recipe Name", "description": "Short description", "ingredients": ["ingredient - amount", ...], "instructions": ["step 1", "step 2", ...] }`,
        },
        {
          role: "user",
          content: ingredientsArr.join('\n'),
        },
      ],
    });

    return chatCompletion.choices[0].message.content;
  } catch (err) {
    console.error("Detailed API Error:", err);

    // Извлекаем статус-код (он может быть в err.statusCode или внутри err.message)
    const statusCode = err.statusCode || (err.message.match(/\d{3}/) || [])[0];

    if (statusCode === "422" || statusCode === 422) {
      throw new Error("MODEL_REJECTED"); // Модель не смогла обработать этот набор данных
    }

    if (statusCode === "400" || statusCode === 400) {
      throw new Error("BAD_REQUEST"); // Ошибка в формате запроса или токене
    }

    if (statusCode === "429" || statusCode === 429) {
      throw new Error("RATE_LIMIT"); // Слишком много запросов
    }

    // Если ничего не подошло, значит проблема с сетью
    throw new Error("NETWORK_ERROR");
  }
}