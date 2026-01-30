
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

// Key Error Notification Bus
type KeyErrorHandler = () => void;
const keyErrorListeners: KeyErrorHandler[] = [];
export const onKeyError = (handler: KeyErrorHandler) => keyErrorListeners.push(handler);
const notifyKeyError = () => keyErrorListeners.forEach(h => h());

// CRITICAL: Fresh instance creation for each call ensures up-to-date user-selected API key usage.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Exponential Backoff Utility for Rate Limits (429)
 */
const withRetry = async <T>(fn: () => Promise<T>, retries = 5, delay = 2000): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    const errorMsg = error?.message || "";
    // Check for 429 (Rate Limit) or RESOURCE_EXHAUSTED
    const isQuotaError = errorMsg.includes("429") || 
                         errorMsg.includes("RESOURCE_EXHAUSTED") || 
                         error?.status === "RESOURCE_EXHAUSTED";
    
    if (isQuotaError && retries > 0) {
      console.warn(`Quota exhausted (429). Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

/**
 * Global Error Handler for API Responses
 */
const handleApiError = (error: any) => {
  console.error("Gemini API Error Detail:", error);
  const errorMsg = error?.message || "";
  
  // Handle Quota
  if (errorMsg.includes("RESOURCE_EXHAUSTED") || errorMsg.includes("429")) {
    throw new Error("RATE_LIMIT: Quota exceeded. Free tier has low limits. Please wait 60 seconds or ensure billing is enabled on your GCP project.");
  }
  
  // Handle Permission/Auth/Model Availability
  // Per guidelines: "Requested entity was not found." indicates a need to reset key selection
  if (errorMsg.includes("PERMISSION_DENIED") || 
      errorMsg.includes("403") || 
      errorMsg.includes("Requested entity was not found") ||
      errorMsg.includes("404") ||
      errorMsg.includes("API key not valid")) {
    notifyKeyError(); // Reset hasKey in App.tsx to force re-selection
    throw new Error("AUTH_ERROR: Permission denied or Model not found. Please ensure you select an API key from a PAID Google Cloud Project with Billing enabled.");
  }

  if (errorMsg.includes("IMAGE_GENERATION_FAILED") || errorMsg.includes("SAFETY")) {
    throw new Error("IMAGE_FAILED: Content blocked by safety filters. Try a more technical/professional network prompt.");
  }

  throw error;
};

export interface ArchitectureResult {
  text: string;
  groundingChunks?: any[];
}

export const generateNetworkArchitecture = async (prompt: string, useSearch: boolean = false): Promise<ArchitectureResult> => {
  return withRetry(async () => {
    try {
      const ai = getAI();
      const config: any = {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.1,
        maxOutputTokens: 15000,
        thinkingConfig: { thinkingBudget: 4000 }
      };
      if (useSearch) config.tools = [{ googleSearch: {} }];

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config,
      });

      return {
        text: response.text || "SYSTEM_ERROR",
        groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks
      };
    } catch (error) {
      return handleApiError(error);
    }
  });
};

export const generateAnsiblePlaybook = async (intent: string): Promise<string> => {
  return withRetry(async () => {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a production-ready Ansible playbook for: "${intent}". Return ONLY YAML.`,
        config: {
          systemInstruction: "You are an Ansible Expert. Only provide the YAML code, no explanation.",
        },
      });
      return response.text || "--- \n# Error generating playbook";
    } catch (error) {
      return handleApiError(error);
    }
  });
};

export const chatWithGemini = async (message: string) => {
  return withRetry(async () => {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: message,
        config: { systemInstruction: SYSTEM_PROMPT, temperature: 0.2 }
      });
      return response.text;
    } catch (error) {
      return handleApiError(error);
    }
  });
};

export const fastChatWithGemini = async (message: string) => {
  return withRetry(async () => {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: message,
        config: {
          systemInstruction: SYSTEM_PROMPT + "\nRapid Response Mode.",
          temperature: 0.1
        }
      });
      return response.text;
    } catch (error) {
      return handleApiError(error);
    }
  });
};

export const generateNetworkVideo = async (prompt: string) => {
  try {
    const ai = getAI();
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic 3D network animation: ${prompt}`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    return `${downloadLink}&key=${process.env.API_KEY}`;
  } catch (error) {
    return handleApiError(error);
  }
};

export const generateVisual = async (prompt: string, size: "1K" | "2K" | "4K" = "1K", aspectRatio: string = "1:1") => {
  return withRetry(async () => {
    try {
      const ai = getAI();
      const model = (size === "2K" || size === "4K") ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
      const config: any = {
        imageConfig: {
          aspectRatio: aspectRatio as any
        }
      };
      
      if (model === 'gemini-3-pro-image-preview') {
        config.imageConfig.imageSize = size;
      }

      const response = await ai.models.generateContent({
        model,
        contents: { parts: [{ text: prompt }] },
        config
      });

      if (!response.candidates?.[0]) throw new Error("IMAGE_GENERATION_FAILED");

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
      throw new Error("IMAGE_GENERATION_FAILED");
    } catch (error) {
      return handleApiError(error);
    }
  });
};

export const editVisual = async (base64Image: string, prompt: string) => {
  return withRetry(async () => {
    try {
      const ai = getAI();
      const [mimePart, data] = base64Image.split(';base64,');
      const mimeType = mimePart.split(':')[1];
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data, mimeType } },
            { text: prompt },
          ],
        },
      });

      if (!response.candidates?.[0]) throw new Error("IMAGE_EDIT_FAILED");

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
      throw new Error("IMAGE_EDIT_FAILED");
    } catch (error) {
      return handleApiError(error);
    }
  });
};

export const analyzeVisual = async (base64Image: string, prompt: string) => {
  return withRetry(async () => {
    try {
      const ai = getAI();
      const [mimePart, data] = base64Image.split(';base64,');
      const mimeType = mimePart.split(':')[1];
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ inlineData: { data, mimeType } }, { text: prompt }] }
      });
      return response.text;
    } catch (error) {
      return handleApiError(error);
    }
  });
};

export const findNearbyServices = async (lat: number, lng: number, query: string) => {
  return withRetry(async () => {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: { retrievalConfig: { latLng: { latitude: lat, longitude: lng } } }
        }
      });
      return { text: response.text, chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
    } catch (error) {
      return handleApiError(error);
    }
  });
};

export const textToSpeech = async (text: string) => {
  return withRetry(async () => {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) return;
      
      const bytes = decode(base64Audio);
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const buffer = await decodeAudioData(bytes, ctx, 24000, 1);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    } catch (error) {
      return handleApiError(error);
    }
  });
};

export const connectNOCVoice = async (callbacks: any) => {
  try {
    const ai = getAI();
    return ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks,
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
        systemInstruction: SYSTEM_PROMPT + "\nNOC Voice Assistant.",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
};

// --- AUDIO UTILITIES ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

export function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
}
