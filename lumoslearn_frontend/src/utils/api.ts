/**
 * Utility functions for making API calls to the backend
 */

/**
 * Checks if the backend server is healthy and available
 * @returns {Promise<boolean>} True if the backend is healthy, false otherwise
 */
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/health');
    return response.ok;
  } catch (error) {
    console.error('Error checking backend health:', error);
    return false;
  }
};

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

/**
 * Sends a chat message to the AI and gets a response
 * @param {string} message - The user's message
 * @param {ChatMessage[]} history - The chat history
 * @returns {Promise<string>} The AI's response
 */
export const sendChatMessage = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

/**
 * Translates a given text to a target language using the backend API.
 * @param {string} text - The text to translate.
 * @param {string} targetLanguage - The language to translate to (e.g., 'hi').
 * @returns {Promise<string>} The translated text.
 */
export const translateText = async (
  text: string,
  targetLanguage: string
): Promise<string> => {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLanguage }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
}; 
