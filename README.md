# 🤖 URI AI Lab Chatbot

This project was originally created by **Zachary Johnson** and is now maintained by the **University of Rhode Island AI Lab**. It is designed to support students, faculty, and visitors by providing an intelligent, conversational assistant with information about the AI Lab's research, events, location, and resources.

> 🔍 **Purpose**:  
> A customizable, AI-powered assistant chatbot that answers questions about the URI AI Lab — including ongoing research, student involvement, lab hours, and educational tools.

---

## 🚀 Features

- 🔗 Powered by OpenAI API (GPT-4/GPT-3.5)
- 🧠 Prompt engineering for accurate domain-specific responses
- 🗃️ Modular architecture with support for RAG (Retrieval-Augmented Generation)
- 💬 Cross-platform frontend (React Native for IOS & Andriod development)
- 🔐 Environment-based config with secure API key handling
- 📚 Expandable for URI Library or small business integrations

#### Web version available inside the repository *uri-ai-lab-chatbot-web*


### 📌 Roadmap

    🗺️ Here's what’s coming soon — or what you can help with!

    🔎 Integrate LangChain-powered RAG backend (context-aware responses from Pinecone)
    🌐 Deploy public demo site for URI students and visitors
    🗣️ Add voice input & TTS support for accessibility and hands-free interaction
    📚 Connect with URI Library systems for shared academic chatbot capabilities
    🧩 Modularize bot structure for other departments or small businesses
    🧠 Add AI memory or personalization (for frequent users)
    🏢 Modularize chatbot for other departments/small businesses
--- 

## 🛠️ Getting Started

### 🔧 Prerequisites

- Node.js (v18+)
- npm or yarn
- OpenAI API Key (or Claude/Gemini optional)
- Expo Go (if running the mobile version)

### 🖥️ Installation

```bash
git clone https://github.com/uri-ai-lab/ai-lab-chatbot.git
cd ai-lab-chatbot
npm install
```

### 🧪 Running Locally (Expo)
```bash
npm start
```
or
```bash
npx expo start
```

### 🔑 Environment Variables
#### 🔐 Make sure you have a .env file based on the provided .env.example
Create a .env file in the root:

```bash
OPENAI_API_KEY=your-api-key-here
BACKEND_URL=http://localhost:3000
```
You can find .env.example in the repo.

### 🧠 AI Behavior & Prompt Engineering

This chatbot uses prompt engineering techniques and optionally supports retrieval-augmented generation (RAG). Current categories include:

    🧪 Research Projects
    🏢 Lab Location & Hours
    🎓 Student Opportunities
    📅 Upcoming Events

    Future support for fine-tuning or vector-based search using LangChain + Pinecone is under development.

## 🤝 Contributing

We welcome contributions from students, faculty, and developers!

To contribute:

1. **Fork** the repository  
2. **Create a feature branch** (e.g., `feature/add-research-section`)  
3. **Make your changes**  
4. **Submit a pull request** for review  

You can also:

- 📥 Submit issues or feature requests
- 🧪 Add new prompt examples
- 📄 Help improve documentation

> Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) before getting started.


### 👥 Maintainers

    Zachary Johnson — @zrjohnson3 - zrjohnson3@gmail.com / zachary.johnson@uri.edu
    URI AI Lab — ai.uri.edu

### 📄 License

MIT License — see LICENSE for details.
