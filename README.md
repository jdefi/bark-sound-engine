# 🐾 BarkTranslator Pro

[![DEV Weekend Challenge](https://shields.io)](https://dev.to)
[![License: MIT](https://shields.io)](https://opensource.org)

BarkTranslator Pro is an audio-first generative application built for the **DEV Weekend Challenge: Dog Days Edition**.

Instead of building a simple text wrapper, this project explores the intersection of semantic orchestration (LLMs) and acoustic primitives (Generative SFX). The application takes user-defined human scenarios and canine contextual profiles, translates them into precise audio prompts via **Google AI**, and synthesizes realistic bark variations natively via **ElevenLabs**.

---

## 🚀 Live Demo & Submission

* **Live Web App:** https://bark-sound-engine.vercel.app/
* **Official DEV.to Submission:** https://dev.to/joop-t/testing-new-ai-capabilities-our-dev-challenge-submission-2icd

---

## 🛠️ Architecture & Core Mechanics

The pipeline is completely deterministic and built to minimize latency across API boundaries:

1. **Context Intake:** The user feeds in parameters detailing the dog breed/size and a contextual human scenario.
2. **Semantic Transformation (Google AI):** The inputs are processed by `gemini-2.5-flash` using targeted prompt engineering to transform raw text into a professional, descriptive sound-design prompt.
3. **Acoustic Synthesis (ElevenLabs):** The sound-design prompt is piped into the `/v1/sound-effects` endpoint to dynamically generate custom audio waveforms.

```text
[User Context] ➔ [Google Gemini API] ➔ [Sound Design Prompt] ➔ [ElevenLabs SFX API] ➔ [Dynamic MP3 Output]
```

---

## ⚙️ Tech Stack & Dependencies

- **Frontend UI:** Next.js 14+ (App Router) — React, inline styles
- **Backend API:** Next.js API Routes (Serverless Functions)
- **Orchestration Layer:** Google Generative AI SDK (`@google/genai`)
- **Audio Generation:** ElevenLabs REST API
- **Deployment:** Vercel

---

## 📁 Project Structure

```
bark-translator-pro/
├── src/
│   └── app/
│       ├── api/
│       │   └── generate-bark/
│       │       └── route.js          # Secure Backend API Route
│       ├── layout.js
│       └── page.js                   # Frontend UI Dashboard
├── .env.local                        # Local API Keys (Do not commit)
├── next.config.js
├── package.json
└── README.md
```

---

## 🧑‍💻 Installation & Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/[Your-Username]/bark-translator-pro.git
cd bark-translator-pro
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
GOOGLE_API_KEY="your_gemini_api_key_here"
ELEVEN_API_KEY="your_elevenlabs_api_key_here"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Boot up the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Acknowledgments

- Built by **[Joop]**, Founder & CEO of [Trestle DeFi](https://trestle.website)
- Massive thanks to the **DEV Community** team, **Google AI**, and **ElevenLabs** for providing the infrastructure sandbox and organizing the challenge.
