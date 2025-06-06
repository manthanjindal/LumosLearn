import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocalStorage } from '../utils/localStorage';

const translations = {
  en: {
    'home.title': 'Learn AI & Python with Interactive Lessons',
    'home.subtitle': 'Your journey to mastering technology starts here—with bite-sized, bilingual, AI-driven learning',
    'home.cta': 'Start Learning Now',
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
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
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
    'pythonModule.running': 'Running...'
  },
  es: {
    'home.title': 'Aprende IA y Python con Lecciones Interactivas',
    'home.subtitle': 'Tu viaje para dominar la tecnología comienza aquí, con lecciones breves, bilingües e impulsadas por IA',
    'home.cta': 'Comienza a Aprender',
    'home.stats.learners': 'Estudiantes',
    'home.stats.rating': 'Calificación',
    'home.stats.lessons': 'Micro-Lecciones',
    'home.testimonial': '¡LumosLearn hizo que aprender IA y Python fuera fácil y divertido!',
    'home.testimonialAuthor': '— Reseña de Estudiante',
    'home.features.title': 'Aprende IA y Python - A Tu Manera',
    'home.features.subtitle': 'Lecciones breves, ejercicios interactivos y un tutor de IA personal para guiarte en tu aprendizaje',
    'home.features.aiTutor.title': 'Tutor de IA',
    'home.features.aiTutor.description': 'Obtén ayuda personalizada y retroalimentación instantánea de nuestro tutor de IA',
    'home.features.aiTutor.cta': 'Prueba el Tutor de IA →',
    'home.features.lessons.title': 'Micro-Lecciones',
    'home.features.lessons.description': 'Aprende a tu propio ritmo con lecciones breves e interactivas',
    'home.features.lessons.cta': 'Explorar Lecciones →',
    'home.features.python.title': 'Programación Python',
    'home.features.python.description': 'Domina Python con ejercicios prácticos y proyectos',
    'home.features.python.cta': 'Empieza a Programar →',
    'home.features.new': 'Nuevo',
    'home.community.title': 'Únete a Nuestra Comunidad',
    'home.community.description': 'Conéctate con otros estudiantes, comparte tu progreso y obtén ayuda de expertos en nuestro servidor de Discord.',
    'home.community.joinDiscord': 'Únete a la Comunidad Discord',
    'home.community.joinNow': 'Únete Ahora',
    'home.community.benefits.title': 'Beneficios de la Comunidad',
    'home.community.benefits.coding': 'Obtén ayuda con desafíos y ejercicios de programación',
    'home.community.benefits.networking': 'Únete a grupos de estudio para diferentes temas',
    'home.community.benefits.resources': 'Comparte tu viaje de aprendizaje e historias de éxito',
    'home.community.benefits.events': 'Recibe notificaciones sobre nuevas lecciones y funciones',
    'nav.home': 'Inicio',
    'nav.lessons': 'Lecciones',
    'nav.aiTutor': 'Tutor IA',
    'nav.pythonModule': 'Python',
    'nav.dashboard': 'Panel',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registrarse',
    'nav.logout': 'Cerrar Sesión',
    'footer.terms': 'Términos',
    'footer.privacy': 'Privacidad',
    'footer.contact': 'Contacto',
    'aiTutor.title': 'Tutor de IA',
    'aiTutor.subtitle': 'Tu guía personal de aprendizaje impulsada por IA.',
    'aiTutor.greeting': '¡Hola! Soy tu tutor personal de IA. ¿Cómo puedo ayudarte a aprender hoy?',
    'aiTutor.placeholder': 'Pregúntame cualquier cosa sobre IA, Python o nuestras lecciones...',
    'pythonModule.title': 'Entorno de Python',
    'pythonModule.subtitle': 'Escribe, ejecuta y prueba tu código Python en un entorno real.',
    'pythonModule.run': 'Ejecutar Código',
    'pythonModule.clear': 'Limpiar Salida',
    'pythonModule.output': 'Salida:',
    'pythonModule.resetCode': 'Restablecer Código',
    'pythonModule.chapterIntro': 'Introducción al Capítulo',
    'pythonModule.loading': 'Cargando Entorno de Python...',
    'pythonModule.ready': '¡Entorno de Python Listo!',
    'pythonModule.running': 'Ejecutando...'
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
    return translations[lang]?.[key] || translations['en'][key];
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