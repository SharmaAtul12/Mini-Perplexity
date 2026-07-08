import 'dotenv/config';

import {OpenAI} from "openai";
import {GoogleGenAI} from '@google/genai';
import mainJudge from './judge.js';


const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const gemini = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

async function getResponses(query) {

  const groqPromise = groq.responses.create({
    model: "llama-3.3-70b-versatile",
    input: query
  });

  const geminiPromise = gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: query
  });

  const [groqResponse,geminiResponse] = await Promise.all([groqPromise, geminiPromise])

  console.log('Groq Response ----------------------------------------------------------', groqResponse.output_text);
  console.log("\n\n");
  console.log('Gemini Response ---------------------------------------------------------  :', geminiResponse.text);
  console.log("\n\n");

  const finalResponse = await mainJudge(groqResponse.output_text, geminiResponse.text)

  return finalResponse.output_text;
}

export default getResponses;


