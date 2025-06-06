import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocalStorage } from '../utils/localStorage';

const translations = {
  en: {
    'home.title': 'Learn AI & Python with Interactive Lessons',
    'home.subtitle': 'Your journey to mastering technology starts here—with bite-sized, bilingual, AI-driven learning',
    'home.cta': 'Start Learning Free',
    'home.stats.learners': 'Learners',
    'home.stats.rating': 'Avg. Rating',
    'home.stats.lessons': 'Micro-Lessons',
    'home.testimonial': 'LumosLearn made AI and Python so easy and fun to learn!',
    'home.testimonialAuthor': '— Student Review',
    'home.features.title': 'Learn AI and Python - Your Way',
    'home.features.subtitle': 'Bite-sized lessons, interactive exercises, and a personal AI tutor to guide you through your learning journey',
    'home.features.aiTutor.title': 'AI Tutor',
    'home.features.aiTutor.description': 'Get personalized help and instant feedback from our AI tutor',
    'home.features.aiTutor.cta': 'Try AI Tutor →',
    'home.features.lessons.title': 'Micro-Lessons',
    'home.features.lessons.description': 'Learn at your own pace with bite-sized, interactive lessons',
    'home.features.lessons.cta': 'Browse Lessons →',
    'home.features.python.title': 'Python Programming',
    'home.features.python.description': 'Master Python with hands-on coding exercises and projects',
    'home.features.python.cta': 'Start Coding →',
    'home.features.new': 'New',
    'home.community.title': 'Join Our Learning Community',
    'home.community.description': 'Connect with other learners, share your progress, and get help from community experts on our Discord server.',
    'home.community.joinDiscord': 'Join Discord Community',
    'home.community.joinNow': 'Join Now',
    'home.community.benefits.title': 'Community Benefits',
    'home.community.benefits.coding': 'Get help with coding challenges and exercises',
    'home.community.benefits.networking': 'Join study groups for different topics',
    'home.community.benefits.resources': 'Share your learning journey and success stories',
    'home.community.benefits.events': 'Get notified about new lessons and features',
    'nav.home': 'Home',
    'nav.lessons': 'Lessons',
    'nav.aiTutor': 'AI Tutor',
    'nav.pythonModule': 'Python',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.contact': 'Contact',
    'aiTutor.title': 'AI Tutor',
    'aiTutor.subtitle': 'Your personal AI-powered guide to learning.',
    'aiTutor.greeting': 'Hello! I am your personal AI tutor. How can I help you learn today?',
    'aiTutor.placeholder': 'Ask me anything about AI, Python, or our lessons...',
    'pythonModule.title': 'Python Environment',
    'pythonModule.subtitle': 'Write, run, and test your Python code in a real environment.',
    'pythonModule.run': 'Run Code',
    'pythonModule.clear': 'Clear Output',
    'pythonModule.output': 'Output:',
    'pythonModule.resetCode': 'Reset Code',
    'pythonModule.chapterIntro': 'Chapter Introduction',
    'pythonModule.loading': 'Loading Python Environment...',
    'pythonModule.ready': 'Python Environment Ready!',
    'pythonModule.running': 'Running...',
    'aiTutor.error': 'Sorry, I encountered an error. Please try again.',
    'aiTutor.connectionError': 'Unable to connect to the AI service. Please try again later.',
    'aiTutor.stopListening': 'Stop Listening',
    'aiTutor.speak': 'Speak',
    'lesson.quiz.correct': 'Correct answer!',
    'lesson.quiz.incorrect': 'Incorrect answer. Try again!',
    'lesson.quiz.completed': 'Quiz completed!',
    'lesson.loading': 'Loading lesson...',
    'lesson.notFound.title': 'Lesson Not Found',
    'lesson.notFound.description': 'The lesson content you are looking for hasn\'t been created yet or could not be loaded.',
    'lesson.notFound.backButton': 'Back to Lessons',
    'lesson.quiz.title': 'Quiz',
    'lesson.quiz.start': 'Start Quiz',
    'lesson.quiz.next': 'Next Question',
    'lesson.quiz.finish': 'Finish Quiz',
    'lesson.previous': 'Previous',
    'lesson.next': 'Next'
  },
  hi: {
    'home.title': 'इंटरैक्टिव पाठों के साथ AI और Python सीखें',
    'home.subtitle': 'प्रौद्योगिकी में महारत हासिल करने की आपकी यात्रा यहाँ से शुरू होती है—छोटे, द्विभाषी, AI-संचालित सीखने के साथ',
    'home.cta': 'मुफ्त सीखना शुरू करें',
    'home.stats.learners': 'शिक्षार्थी',
    'home.stats.rating': 'औसत रेटिंग',
    'home.stats.lessons': 'छोटे-पाठ',
    'home.testimonial': 'LumosLearn ने AI और Python को इतना आसान और मजेदार बना दिया!',
    'home.testimonialAuthor': '— छात्र समीक्षा',
    'home.features.title': 'AI और Python सीखें - अपने तरीके से',
    'home.features.subtitle': 'छोटे-छोटे पाठ, इंटरैक्टिव अभ्यास, और एक व्यक्तिगत AI ट्यूटर जो आपके सीखने की यात्रा में आपका मार्गदर्शन करेगा',
    'home.features.aiTutor.title': 'AI ट्यूटर',
    'home.features.aiTutor.description': 'हमारे AI ट्यूटर से व्यक्तिगत सहायता और तत्काल प्रतिक्रिया प्राप्त करें',
    'home.features.aiTutor.cta': 'AI ट्यूटर आज़माएँ →',
    'home.features.lessons.title': 'छोटे-पाठ',
    'home.features.lessons.description': 'छोटे-छोटे, इंटरैक्टिव पाठों के साथ अपनी गति से सीखें',
    'home.features.lessons.cta': 'पाठ ब्राउज़ करें →',
    'home.features.python.title': 'Python प्रोग्रामिंग',
    'home.features.python.description': 'व्यावहारिक कोडिंग अभ्यासों और परियोजनाओं के साथ Python में महारत हासिल करें',
    'home.features.python.cta': 'कोडिंग शुरू करें →',
    'home.features.new': 'नया',
    'home.community.title': 'हमारे सीखने वाले समुदाय में शामिल हों',
    'home.community.description': 'अन्य शिक्षार्थियों से जुड़ें, अपनी प्रगति साझा करें, और हमारे डिस्कॉर्ड सर्वर पर समुदाय के विशेषज्ञों से सहायता प्राप्त करें।',
    'home.community.joinDiscord': 'डिस्कॉर्ड समुदाय में शामिल हों',
    'home.community.joinNow': 'अभी शामिल हों',
    'home.community.benefits.title': 'समुदाय के लाभ',
    'home.community.benefits.coding': 'कोडिंग चुनौतियों और अभ्यासों में सहायता प्राप्त करें',
    'home.community.benefits.networking': 'विभिन्न विषयों के लिए अध्ययन समूहों में शामिल हों',
    'home.community.benefits.resources': 'अपनी सीखने की यात्रा और सफलता की कहानियाँ साझा करें',
    'home.community.benefits.events': 'नए पाठों और सुविधाओं के बारे में सूचना प्राप्त करें',
    'nav.home': 'होम',
    'nav.lessons': 'पाठ',
    'nav.aiTutor': 'एआई ट्यूटर',
    'nav.pythonModule': 'पाइथन',
    'footer.terms': 'शर्तें',
    'footer.privacy': 'गोपनीयता',
    'footer.contact': 'संपर्क',
    'aiTutor.title': 'एआई ट्यूटर',
    'aiTutor.subtitle': 'सीखने के लिए आपकी व्यक्तिगत एआई-संचालित मार्गदर्शिका।',
    'aiTutor.greeting': 'नमस्ते! मैं आपका व्यक्तिगत एआई ट्यूटर हूं। मैं आज आपको सीखने में कैसे मदद कर सकता हूं?',
    'aiTutor.placeholder': 'मुझसे एआई, पायथन, या हमारे पाठों के बारे में कुछ भी पूछें...',
    'pythonModule.title': 'पाइथन वातावरण',
    'pythonModule.subtitle': 'एक वास्तविक वातावरण में अपना पायथन कोड लिखें, चलाएं और परीक्षण करें।',
    'pythonModule.run': 'कोड चलाएँ',
    'pythonModule.clear': 'आउटपुट साफ़ करें',
    'pythonModule.output': 'आउटपुट:',
    'pythonModule.resetCode': 'कोड रीसेट करें',
    'pythonModule.chapterIntro': 'अध्याय परिचय',
    'pythonModule.loading': 'पायथन वातावरण लोड हो रहा है...',
    'pythonModule.ready': 'पायथन वातावरण तैयार है!',
    'pythonModule.running': 'चल रहा है...',
    'aiTutor.error': 'क्षमा करें, मुझे एक त्रुटि मिली। कृपया पुनः प्रयास करें।',
    'aiTutor.connectionError': 'AI सेवा से कनेक्ट नहीं हो पा रहा है। कृपया बाद में पुनः प्रयास करें।',
    'aiTutor.stopListening': 'सुनना बंद करें',
    'aiTutor.speak': 'बोलें',
    'lesson.quiz.correct': 'सही जवाब!',
    'lesson.quiz.incorrect': 'गलत जवाब। फिर से कोशिश करें!',
    'lesson.quiz.completed': 'प्रश्नोत्तरी पूरी हुई!',
    'lesson.loading': 'पाठ लोड हो रहा है...',
    'lesson.notFound.title': 'पाठ नहीं मिला',
    'lesson.notFound.description': 'आप जिस पाठ सामग्री की तलाश कर रहे हैं वह अभी तक नहीं बनाई गई है या लोड नहीं हो सकी है।',
    'lesson.notFound.backButton': 'पाठों पर वापस जाएं',
    'lesson.quiz.title': 'प्रश्नोत्तरी',
    'lesson.quiz.start': 'प्रश्नोत्तरी शुरू करें',
    'lesson.quiz.next': 'अगला सवाल',
    'lesson.quiz.finish': 'प्रश्नोत्तरी समाप्त करें',
    'lesson.previous': 'पिछला',
    'lesson.next': 'अगला'
  }
};

type TranslationKeys = keyof typeof translations.en;

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translate: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(LocalStorage.getLanguage());

  useEffect(() => {
    const storedLanguage = LocalStorage.getLanguage();
    setLanguageState(storedLanguage);
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    LocalStorage.setLanguage(lang);
  };

  const translate = (key: TranslationKeys): string => {
    const lang = language as keyof typeof translations;
    return translations[lang]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return { ...context, t: context.translate };
};