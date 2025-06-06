import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Mic, MicOff, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { sendChatMessage, checkBackendHealth } from '../utils/api';

// Add these types at the top of the file for TypeScript support
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const getSpeechRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  return SpeechRecognition ? new SpeechRecognition() : null;
};

const AITutor: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('aiTutor.greeting'),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Check backend health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      const isHealthy = await checkBackendHealth();
      setIsBackendAvailable(isHealthy);
    };
    checkHealth();
  }, []);

  useEffect(() => {
    recognitionRef.current = getSpeechRecognition();
    if (recognitionRef.current) {
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !isBackendAvailable) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get AI response using the API utility
      const response = await sendChatMessage(
        input,
        messages
          .filter((msg, idx) => !(idx === 0 && msg.sender === 'bot')) // Remove initial bot greeting
          .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            content: msg.text
          }))
      );
      
      // Add AI message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t('aiTutor.error'),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          {t('aiTutor.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t('aiTutor.subtitle')}
        </p>
      </div>
      
      {!isBackendAvailable && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center text-red-800 dark:text-red-200">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p>
              {t('aiTutor.connectionError')}
            </p>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="h-[600px] flex flex-col">
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-xl ${
                      message.sender === 'user'
                        ? 'bg-[#219176] text-[#145968]'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <span className={`text-xs mt-1 block ${
                      message.sender === 'user'
                        ? 'text-[#145968]'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-4 rounded-xl bg-gray-100 dark:bg-gray-700">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={t('aiTutor.placeholder')}
                className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#219176]"
                disabled={isLoading || !isBackendAvailable}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim() || !isBackendAvailable}
                className="p-3 bg-[#219176] text-white rounded-r-lg hover:bg-[#30b58a] focus:outline-none focus:ring-2 focus:ring-[#219176] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SendHorizontal size={20} />
              </button>
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading || !isBackendAvailable}
                className={`p-3 rounded-lg focus:outline-none transition-colors duration-200 ${
                  isListening
                    ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-[#30b58a] dark:hover:bg-[#30b58a]'
                }`}
                title={isListening ? t('aiTutor.stopListening') : t('aiTutor.speak')}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                {isListening ? 'Listening... Speak now!' : 'Speak (Click the mic to start)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;