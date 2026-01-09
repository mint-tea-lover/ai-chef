import { InferenceClient } from "@huggingface/inference";

// Проверь, что в .env файл добавлена строка: VITE_HUGGINGFACE_API_KEY=hf_...
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

if (!API_KEY) {
  console.error("API Key is missing! Check your .env file and restart the server.");
}

const client = new InferenceClient(API_KEY);

export async function getRecipeFromAI(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

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
- DO NOT include Markdown code blocks (like json ... ). Respond in plane text.
- DO NOT include any introductory or concluding text.
- Use THE SAME LANGUAGE for response as the input.
- JSON Structure: { "title": "Recipe Name", "ingredients": ["ingredient - amount", ...], "instructions": ["step 1", "step 2", ...] }`,
        },
        {
          role: "user",
          content: ingredientsArr.join('\n'),
        },
      ],
    });

    return chatCompletion.choices[0].message.content;
  } catch (err) {
    console.error("Полная ошибка:", err);

    if (err.message.includes("400")) {
      return "Сервер HF не принял запрос. Проверь формат данных или модель.";
    }
    return "Произошла ошибка связи с AI.";
  }
}