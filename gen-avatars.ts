import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateAndSave(prompt: string, filename: string) {
  console.log(`Generating ${filename}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        fs.writeFileSync(path.join(process.cwd(), 'public', filename), buffer);
        console.log(`Saved ${filename}`);
        return;
      }
    }
    console.log(`Failed to find image data for ${filename}`);
  } catch (e) {
    console.error(`Error generating ${filename}:`, e);
  }
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  await Promise.all([
    generateAndSave("A close-up portrait of a futuristic 3D virtual digital human, female financial product buyer, wearing an elegant professional suit, holographic elements, clean light gray background, 8k, highly detailed 3D render, soft studio lighting.", "wealth.png"),
    generateAndSave("A close-up portrait of a futuristic 3D virtual digital human, male stock market expert, wearing sleek smart glasses and a tech-wear suit, holographic stock charts reflecting in glasses, clean light blue background, 8k, highly detailed 3D render, soft studio lighting.", "quant.png"),
    generateAndSave("A close-up portrait of a friendly futuristic 3D virtual digital human, female investment advisor, warm smile, wearing a modern professional outfit, glowing AI assistant aura, clean warm white background, 8k, highly detailed 3D render, soft studio lighting.", "advisor.png")
  ]);
}

main().catch(console.error);
