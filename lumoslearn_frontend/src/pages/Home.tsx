import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Brain, Code, Sparkles, Rocket, MessageSquare } from 'lucide-react';
import AnimatedButton from '../components/ui/AnimatedButton';
import GlassCard from '../components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // GSAP animations for hero elements
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title', {
      y: 100,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out"
    })
    .fromTo('.hero-subtitle', {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .fromTo('.hero-cta', {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .fromTo('.code-demo', {
      x: 100,
      opacity: 0,
      rotateY: 15
    }, {
      x: 0,
      opacity: 1,
      rotateY: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8");

    // Parallax stars
    gsap.set('.star', { 
      transformOrigin: 'center center',
      scale: 0 
    });
    
    gsap.to('.star', {
      scale: 1,
      duration: 2,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });

    gsap.to('.star', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Floating animation for features - synchronized for perfect alignment
    gsap.to('.floating', {
      y: -20,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
      // Removed stagger to keep all tiles perfectly aligned
    });

  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Animated stars background */}
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star absolute text-purple-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 8 + 4}px`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y, opacity }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                          backdrop-blur-sm border border-purple-300/30 rounded-full px-4 py-2 mb-8"
              >
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span className="text-sm font-medium text-purple-200">AI-Powered Learning Platform</span>
              </motion.div>

              <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
                Master{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  AI Fundamentals
                </span>
                <br />
                <span className="text-4xl md:text-5xl lg:text-6xl">in Minutes</span>
              </h1>
              
              <p className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-2xl mb-10">
                Level up your skills with interactive lessons, AI tutoring, and gamified challenges. 
                Start your journey to becoming a tech wizard! 🧙‍♂️
              </p>
              
              <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/lessons">
                  <AnimatedButton
                    variant="comic"
                    animationType="hover"
                    size="lg"
                    className="group w-full"
                  >
                    <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Start Learning
                  </AnimatedButton>
                </Link>
                
                <Link to="/ai-tutor">
                  <AnimatedButton
                    variant="glass"
                    animationType="slide"
                    size="lg"
                    className="w-full"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Try AI Tutor
                  </AnimatedButton>
                </Link>
              </div>
            </div>

            <div className="code-demo relative">
              <GlassCard className="max-w-lg mx-auto floating" variant="gradient">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-auto text-xs text-gray-400">python_ai_lesson.py</span>
                </div>
                
                <pre className="text-left text-sm font-mono leading-relaxed">
                  <code>
                    <span className="text-blue-400">import</span> <span className="text-green-400">numpy</span> <span className="text-blue-400">as</span> <span className="text-green-400">np</span><br/>
                    <span className="text-blue-400">from</span> <span className="text-green-400">tensorflow</span> <span className="text-blue-400">import</span> <span className="text-green-400">keras</span><br/><br/>
                    
                    <span className="text-purple-400">def</span> <span className="text-yellow-400">create_ai_model</span>():<br/>
                    <span className="text-gray-500">    # Build your first neural network!</span><br/>
                    <span className="text-white">    model = keras.Sequential([</span><br/>
                    <span className="text-white">        keras.layers.Dense(</span><span className="text-orange-400">128</span><span className="text-white">, activation=</span><span className="text-green-300">'relu'</span><span className="text-white">),</span><br/>
                    <span className="text-white">        keras.layers.Dense(</span><span className="text-orange-400">10</span><span className="text-white">, activation=</span><span className="text-green-300">'softmax'</span><span className="text-white">)</span><br/>
                    <span className="text-white">    ])</span><br/>
                    <span className="text-purple-400">    return</span> <span className="text-white">model</span><br/><br/>
                    
                    <span className="text-gray-500"># ✨ Level up your AI skills!</span><br/>
                    <span className="text-blue-400">print</span>(<span className="text-green-300">"Welcome to LumosLearn! 🚀"</span>)
                  </code>
                </pre>
              </GlassCard>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6 text-4xl"
              >
                �
              </motion.div>
            </div>          </div>
        </div>

        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="w-8 h-8 border-2 border-purple-300 rounded-full flex items-center justify-center">
            <div className="w-1 h-3 bg-purple-300 rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Adventure
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Level up your skills with our gamified learning paths. Each lesson is designed to 
              challenge and reward your progress! 🎮
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="floating"
            >
              <Link to="/lessons" className="block group">
                <GlassCard 
                  className="h-full text-center hover:scale-105 transition-transform duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/20"
                  variant="gradient"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 
                                rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                    <Clock size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors">
                    5-Minute Lessons
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Bite-sized lessons that fit into your busy schedule. Learn consistently without overwhelm.
                  </p>
                  <div className="inline-flex items-center text-purple-300 font-medium">
                    Start Journey →
                  </div>
                </GlassCard>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="floating"
            >
              <Link to="/ai-tutor" className="block group">
                <GlassCard 
                  className="h-full text-center hover:scale-105 transition-transform duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/20"
                  variant="gradient"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 
                                rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                    <Brain size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-300 transition-colors">
                    AI Tutor
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Get instant help from your personal AI tutor. Ask questions and get explanations 24/7.
                  </p>
                  <div className="inline-flex items-center text-blue-300 font-medium">
                    Chat with AI →
                  </div>
                </GlassCard>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="floating"
            >
              <Link to="/python" className="block group">
                <GlassCard 
                  className="h-full text-center hover:scale-105 transition-transform duration-300 group-hover:shadow-2xl group-hover:shadow-green-500/20"
                  variant="gradient"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 
                                rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                    <Code size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-green-300 transition-colors">
                    Code Playground
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Interactive coding lessons with real-time code execution. Learn by doing, not just reading.
                  </p>
                  <div className="inline-flex items-center text-green-300 font-medium">
                    Code Now →
                  </div>
                </GlassCard>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="floating"
            >
              <a 
                href="https://discord.gg/gfs9FZF8MC" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block group"
              >
                <GlassCard 
                  className="h-full text-center hover:scale-105 transition-transform duration-300 group-hover:shadow-2xl group-hover:shadow-indigo-500/20"
                  variant="gradient"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 
                                rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                    <MessageSquare size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-300 transition-colors">
                    Discord Community
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Connect with learners worldwide. Share progress, get help, and learn together.
                  </p>
                  <div className="inline-flex items-center text-indigo-300 font-medium">
                    Join Discord →
                  </div>
                </GlassCard>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            <div className="group">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 
                          bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform"
              >
                10+
              </motion.div>
              <div className="text-gray-300 text-lg font-medium">Active Learners</div>
              <div className="text-gray-500 text-sm mt-2">Growing every day</div>
            </div>

            <div className="group">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 
                          bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform"
              >
                4.9
              </motion.div>
              <div className="text-gray-300 text-lg font-medium">Average Rating</div>
              <div className="text-gray-500 text-sm mt-2">⭐⭐⭐⭐⭐</div>
            </div>

            <div className="group">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 
                          bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform"
              >
                280+
              </motion.div>
              <div className="text-gray-300 text-lg font-medium">Micro-Lessons</div>
              <div className="text-gray-500 text-sm mt-2">Always expanding</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <GlassCard className="max-w-4xl mx-auto" variant="bordered">
              <div className="relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl">💬</div>
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-200 italic mb-6 pt-8">
                  "LumosLearn transformed my understanding of AI and coding. The gamified approach 
                  kept me engaged, and the AI tutor was like having a personal mentor!"
                </blockquote>
                <cite className="text-purple-300 font-semibold">— Sarah K., Software Engineer</cite>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Level Up
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join thousands of learners who are already mastering AI and coding fundamentals. 
              Your journey to becoming a tech wizard starts with a single click! ✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/lessons">
                <AnimatedButton
                  variant="comic"
                  animationType="hover"
                  size="lg"
                  className="group"
                >
                  <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Begin Your Quest
                </AnimatedButton>
              </Link>
              
              <Link to="/register">
                <AnimatedButton
                  variant="glass"
                  animationType="slide"
                  size="lg"
                >
                  Create Free Account
                </AnimatedButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;