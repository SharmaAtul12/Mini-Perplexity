import 'dotenv/config';
import {OpenAI} from "openai";

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function mainJudge(groqResponse, geminiResponse) {
  const prompt = `
    Combine the following responses into one accurate, concise answer. Resolve conflicts, remove repetition, and prefer factual correctness.
    Groq Response: ${groqResponse}
    Gemini Response: ${geminiResponse}

    Also Mention how you have used the Groq and Gemini responses to create the final answer. 
    Make the concept easy to understand for a beginner . simplify the language and examples which is given by groq and gemini responses.
    
  `;

  const response = await openAi.responses.create({
    model: 'gpt-4',
    input: prompt
  })

  return response;

}

export default mainJudge