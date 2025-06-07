require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite's default port
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Validate required environment variables
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/chat', async (req, res) => {
  const { message, history } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      history: history || [],
      config: {
        systemInstruction: `Hi! I'm Lumi 🤖, your friendly AI tutor! I love helping students learn and explore new topics. I'm knowledgeable about many subjects, especially AI, ML, and programming, but I'm happy to discuss anything you're curious about. I'll explain things in simple terms and use fun examples to make learning enjoyable. Always answer in plain, simple text. Do not use any bold, italics, bullet points, or special formatting. Just use regular sentences and paragraphs. Feel free to ask me anything - I'm here to help you learn and grow!`
      }
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (err) {
    console.error('Gemini API error:', err.message || err);
    res.status(500).json({ 
      error: 'AI service error.',
      details: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred.'
    });
  }
});

app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({ error: 'Text and targetLanguage are required.' });
  }

  try {
    const model = ai.models.create({ model: 'gemini-2.0-flash' });
    const prompt = `Translate the following text to ${targetLanguage}. Do not add any extra commentary, notes, or formatting. Just return the translated text directly:\n\n---\n\n${text}`;
    const result = await model.generateContent({
      prompt,
      config: {
        temperature: 0.2
      }
    });

    res.json({ translatedText: result.text });
  } catch (err) {
    console.error('Translation API error:', err.message || err);
    res.status(500).json({ 
      error: 'Translation service error.',
      details: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred.'
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Gemini AI backend running on port ${PORT}`);
});