import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getAIInsights(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are LinkNova's core AI engine. Provide concise, enterprise-grade insights about a global digital ecosystem. Focus on e-commerce, travel, medical, and delivery trends. Format your response as a professional insight.",
      },
    });
    return response.text || "Unable to generate insights at this moment.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "AI Core is currently optimizing. Please check back shortly.";
  }
}

export async function getProductRecommendations(userBehavior: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on this user behavior: ${userBehavior}, suggest 3 product categories and why they are recommended. Return as JSON.`,
      config: {
        responseMimeType: "application/json",
      },
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return [];
  }
}
