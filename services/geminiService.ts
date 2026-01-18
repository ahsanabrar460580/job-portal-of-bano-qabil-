
import { GoogleGenAI, Type } from "@google/genai";

// Always initialize with process.env.API_KEY directly
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCareerAdvice = async (userBio: string, skills: string[]) => {
  const ai = getAI();
  const prompt = `Based on my bio: "${userBio}" and skills: ${skills.join(', ')}, give me 3 professional career tips to succeed in the Pakistani tech market. Also, suggest one specific area of improvement.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert career counselor for Bano Qabil students in Pakistan. Be encouraging and practical.",
      }
    });
    // Use .text property to extract content
    return response.text || "I'm sorry, I couldn't generate advice right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to the career assistant.";
  }
};

export const matchJobToUser = async (jobTitle: string, jobDesc: string, userSkills: string[]) => {
  const ai = getAI();
  const prompt = `Job: ${jobTitle}\nDescription: ${jobDesc}\nUser Skills: ${userSkills.join(', ')}\n\nRate the match from 0-100% and provide a short 1-sentence explanation why.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            percentage: { type: Type.NUMBER },
            explanation: { type: Type.STRING }
          },
          required: ["percentage", "explanation"]
        }
      }
    });
    // Use .text property to extract content
    return JSON.parse(response.text || '{"percentage": 0, "explanation": "N/A"}');
  } catch (error) {
    return { percentage: 0, explanation: "Could not analyze match." };
  }
};
