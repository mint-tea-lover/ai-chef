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
          content: "You are a professional chef. Create the best possible recipe using a subset of the ingredients provided. Respond strictly in the same language as the input. Choose only compatible ingredients; do not use everything if it doesn't make sense for the dish.",
        },
        {
          role: "user",
          content: ingredientsArr.join(', '),
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