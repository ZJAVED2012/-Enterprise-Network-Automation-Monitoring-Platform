
import { GoogleGenAI, Modality } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

// Helper to initialize AI client with API key from environment variables
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates network architecture based on intent.
 */
export const generateNetworkArchitecture = async (prompt: string, useSearch: boolean = false): Promise<string> => {
  try {
    const ai = getAI();
    const config: any = {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.2,
      // Gemini 3 and 2.5 models support thinkingBudget configuration
      thinkingConfig: { thinkingBudget: 32768 } 
    };

    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config,
    });

    // Access the .text property directly (not a method call) as per latest SDK guidelines
    return response.text || "No output generated.";
  } catch (error) {
    console.error("Architect Error:", error);
    throw error;
  }
};

/**
 * Technical NOC assistant chat interface.
 */
export const chatWithGemini = async (message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: SYSTEM_PROMPT + "\nYou are currently in the NOC Chatbot module. Answer technical queries precisely.",
    }
  });
  const response = await chat.sendMessage({ message });
  return response.text;
};

/**
 * Generates visual assets using Pro Image engines.
 */
export const generateVisual = async (prompt: string, size: "1K" | "2K" | "4K" = "1K", aspectRatio: string = "16:9") => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: {
        imageSize: size,
        aspectRatio: aspectRatio as any
      }
    }
  });

  // Iterating through response parts to locate the image payload
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
};

/**
 * Analyzes visuals for hardware and cabling details.
 */
export const analyzeVisual = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  const [mimePart, data] = base64Image.split(';base64,');
  const mimeType = mimePart.split(':')[1];

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data, mimeType } },
        { text: prompt }
      ]
    }
  });
  return response.text;
};

/**
 * Edits existing network diagrams.
 */
export const editVisual = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  const [mimePart, data] = base64Image.split(';base64,');
  const mimeType = mimePart.split(':')[1];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data, mimeType } },
        { text: prompt }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No edited image generated");
};

/**
 * Provides grounded location information via Google Maps.
 */
export const findNearbyServices = async (lat: number, lng: number, query: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: query,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      }
    }
  });
  return {
    text: response.text,
    chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

/**
 * Native text-to-speech conversion with manual PCM decoding.
 */
export const textToSpeech = async (text: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("No audio generated");

  // Manual base64 decoding for PCM data streams
  const binaryString = atob(base64Audio);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  
  // Directly process raw PCM audio bytes to avoid browser compression artifacts
  const dataInt16 = new Int16Array(bytes.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(1, frameCount, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
};
