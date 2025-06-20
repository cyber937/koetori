# Koetori 🕊️  
**Automatically edit interview audio to fit a specified duration.**

> ⚠️ **This project is currently under active development. Features and specifications may change without notice.**

---

## 🧭 Overview

**Koetori** is a tool that lets you upload interview audio and automatically trims it to fit within a user-specified length (e.g., 60 seconds), extracting only the most important segments using AI.

Currently, we are developing a **prototype focused on transcription via Whisper API and automatic excerpt editing**.

---

## ✨ Key Features (Planned)

- 🎙 **Audio file upload support**
- 🧠 **High-accuracy transcription using Whisper API**
- ⏱ **Automatic trimming based on time constraints**
- 🖼 **Web-based UI with React**
- 🌐 **Planned future support for video editing and TTS**

---

## 🚧 Current Progress

- [ ] Audio file upload
- [ ] Transcription via Whisper API
- [ ] Key sentence extraction to match target duration
- [ ] Preview & editing interface
- [ ] Final audio output generation

---

## 🛠 Tech Stack (Current & Planned)

- Frontend: **React + TypeScript**
- Backend: **Node.js + Express**
- AI: **OpenAI Whisper API**, **GPT-4 (summary logic)**
- Other: **ffmpeg** for audio extraction and preprocessing

---

## 🏃 Quick Start (For Developers)

```bash
git clone https://github.com/yourusername/koetori.git
cd koetori
npm install
cp .env.example .env  # Add your API keys and settings
npm run dev
