
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

// Key Error Notification Bus
type KeyErrorHandler = () => void;
const keyErrorListeners: KeyErrorHandler[] = [];
export const onKeyError = (handler: KeyErrorHandler) => keyErrorListeners.push(handler);
const notifyKeyError = () => keyErrorListeners.forEach(h => h());

// CRITICAL: Fresh instance creation for each call ensures up-to-date user-selected API key usage.
const getAI = () => {
  const key = process.env.API_KEY;
  if (!key) return null;
  return new GoogleGenAI({ apiKey: key });
};

/**
 * Exponential Backoff Utility for Rate Limits (429)
 */
const withRetry = async <T>(fn: () => Promise<T>, retries = 5, delay = 2000): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    const errorMsg = error?.message || "";
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
 * MOCK DATA GENERATOR (For Simulation Mode)
 */
const getSimulatedResponse = (task: string): string => {
  if (task.includes("Architecture")) {
    return `[SIMULATION MODE]
# SITE-WIDE NETWORK ARCHITECTURE (PAK-CORE-01)
## CORE LAYER:
- 2x Cisco ASR 9001 (Multi-chassis EtherChannel)
- 100G Backbone uplinks
## DISTRIBUTION LAYER:
- 4x Juniper EX4650 Stack
- VRRP Priority 255/100
## SECURITY POLICIES:
- Firewall: FortiGate 600F Cluster
- Zones: DMZ, Campus_Trusted, Management_Plane
- ACL: NIST 800-53 Compliant

Design by Mr. Zeeshan Javed. Simulation generated successfully.`;
  }
  if (task.includes("Ansible")) {
    return `---
# SIMULATED ANSIBLE PLAYBOOK
- name: Configure Core Switching
  hosts: core_switches
  gather_facts: no
  tasks:
    - name: Update SNMP Community
      cisco.ios.ios_config:
        lines:
          - snmp-server community NETGENIUS_V2_RW RW
    - name: Set OSPF Priority
      cisco.ios.ios_ospf_interfaces:
        config:
          - name: GigabitEthernet0/1
            address_family:
              - afi: ipv4
                priority: 100
    - name: Logging
      cisco.ios.ios_logging:
        dest: host
        name: 10.0.0.50`;
  }
  return "Simulation node active. Real-time AI processing requires a verified API key.";
};

export interface ArchitectureResult {
  text: string;
  groundingChunks?: any[];
}

export const generateNetworkArchitecture = async (prompt: string, useSearch: boolean = false): Promise<ArchitectureResult> => {
  const ai = getAI();
  if (!ai) return { text: getSimulatedResponse("Architecture") };

  return withRetry(async () => {
    try {
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
      console.warn("API Call Failed. Falling back to Simulation Mode.");
      notifyKeyError();
      return { text: getSimulatedResponse("Architecture") };
    }
  });
};

export const generateAnsiblePlaybook = async (intent: string): Promise<string> => {
  const ai = getAI();
  if (!ai) return getSimulatedResponse("Ansible");

  return withRetry(async () => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a production-ready Ansible playbook for: "${intent}". Return ONLY YAML.`,
        config: {
          systemInstruction: "You are an Ansible Expert. Only provide the YAML code, no explanation.",
        },
      });
      return response.text || "--- \n# Error generating playbook";
    } catch (error) {
      return getSimulatedResponse("Ansible");
    }
  });
};

export const chatWithGemini = async (message: string) => {
  const ai = getAI();
  if (!ai) return "NOC Assistant (Sim Mode): Key missing. I can only provide general network guidance.";

  return withRetry(async () => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: message,
        config: { systemInstruction: SYSTEM_PROMPT, temperature: 0.2 }
      });
      return response.text;
    } catch (error) {
      return "Communication failure. NOC simulation active.";
    }
  });
};

export const fastChatWithGemini = async (message: string) => {
  const ai = getAI();
  if (!ai) return "Rapid Node: [Simulation] Response latency < 10ms.";

  return withRetry(async () => {
    try {
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
      return "Fast Path Simulation active.";
    }
  });
};

export const generateNetworkVideo = async (prompt: string) => {
  const ai = getAI();
  if (!ai) return "https://www.w3schools.com/html/mov_bbb.mp4"; // Placeholder

  try {
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
    return "https://www.w3schools.com/html/mov_bbb.mp4";
  }
};

export const generateVisual = async (prompt: string, size: "1K" | "2K" | "4K" = "1K", aspectRatio: string = "1:1") => {
  const ai = getAI();
  if (!ai) return "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000";

  return withRetry(async () => {
    try {
      const model = (size === "2K" || size === "4K") ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
      const config: any = { imageConfig: { aspectRatio: aspectRatio as any } };
      if (model === 'gemini-3-pro-image-preview') config.imageConfig.imageSize = size;

      const response = await ai.models.generateContent({
        model,
        contents: { parts: [{ text: prompt }] },
        config
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
      return "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000";
    } catch (error) {
      return "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000";
    }
  });
};

export const editVisual = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  if (!ai) return base64Image;

  return withRetry(async () => {
    try {
      const [mimePart, data] = base64Image.split(';base64,');
      const mimeType = mimePart.split(':')[1];
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ inlineData: { data, mimeType } }, { text: prompt }],
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
      return base64Image;
    } catch (error) {
      return base64Image;
    }
  });
};

export const analyzeVisual = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  if (!ai) return "Simulation Analysis: Image contains enterprise rack hardware with standard fiber patch panels. No violations detected.";

  return withRetry(async () => {
    try {
      const [mimePart, data] = base64Image.split(';base64,');
      const mimeType = mimePart.split(':')[1];
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ inlineData: { data, mimeType } }, { text: prompt }] }
      });
      return response.text;
    } catch (error) {
      return "Analysis simulation active.";
    }
  });
};

export const findNearbyServices = async (lat: number, lng: number, query: string) => {
  const ai = getAI();
  if (!ai) return { text: "Simulated Location Data: ISP offices found in G-8 and Blue Area, Islamabad.", chunks: [] };

  return withRetry(async () => {
    try {
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
      return { text: "Location simulation active.", chunks: [] };
    }
  });
};

export const textToSpeech = async (text: string) => {
  const ai = getAI();
  if (!ai) return;

  return withRetry(async () => {
    try {
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
      console.warn("TTS Failed.");
    }
  });
};

export const connectNOCVoice = async (callbacks: any) => {
  const ai = getAI();
  if (!ai) throw new Error("Simulation mode: Voice calls unavailable.");
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
      systemInstruction: SYSTEM_PROMPT + "\nNOC Voice Assistant.",
    },
  });
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
