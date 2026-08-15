import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const { breed, scenario } = await request.json();

    if (!breed || !scenario) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json({ error: 'GOOGLE_API_KEY not configured' }, { status: 500 });
    }
    if (!process.env.ELEVEN_API_KEY) {
      return NextResponse.json({ error: 'ELEVEN_API_KEY not configured' }, { status: 500 });
    }

    // Step 1: Generate acoustic prompt via Google Gemini
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
    const geminiPrompt = `You are a sound designer for a movie. A user wants to generate a realistic dog bark sound effect.
Dog Details/Breed: ${breed}
What is happening in the scene: ${scenario}

Write a 1-sentence, highly descriptive sound effect prompt for an AI audio generator.
Focus heavily on pitch, intensity, distance, and acoustic emotion. Include breed-specific traits.
Example output: A sharp, high-pitched, excited yip of a small terrier echoing in a narrow alley.
Only return the prompt text, nothing else.`;

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: geminiPrompt,
    });

    const refinedAudioPrompt = geminiResponse.text?.trim();
    if (!refinedAudioPrompt) {
      return NextResponse.json({ error: 'Failed to generate audio prompt from Gemini' }, { status: 502 });
    }

    // Step 2: Generate sound effect via ElevenLabs
    const elevenLabsResponse = await fetch('https://api.elevenlabs.io/v1/sound-effects', {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVEN_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: refinedAudioPrompt,
        duration_seconds: 3.0,
        prompt_influence: 0.8,
      }),
    });

    if (!elevenLabsResponse.ok) {
      const errorText = await elevenLabsResponse.text();
      console.error('ElevenLabs error:', errorText);
      return NextResponse.json({ error: `ElevenLabs Error: ${errorText}` }, { status: 502 });
    }

    // Step 3: Stream audio buffer to frontend
    const audioBuffer = await elevenLabsResponse.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });

  } catch (error: unknown) {
    console.error('Server error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Internal server error: ${message}` }, { status: 500 });
  }
}
