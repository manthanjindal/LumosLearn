import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Brain, Code, Rocket, MessageSquare } from 'lucide-react';
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
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y, opacity }}
        className="relative min-h-[80vh] flex items-center z-10"
      >
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center text-center">
            <h1 className="hero-title display-heading text-5xl md:text-7xl lg:text-8xl font-semibold mb-6 text-white">
                Get addicted to learning.
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-white/70 max-w-2xl mb-10">
                Bite-sized lessons, an AI tutor when you need it, and a clean, distraction-free interface. Built for curious minds.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/lessons">
                  <AnimatedButton
                    variant="glass"
                    animationType="hover"
                    size="lg"
                    className="group"
                  >
                    <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Preview lessons
                  </AnimatedButton>
                </Link>
                <Link to="/ai-tutor">
                  <AnimatedButton
                    variant="secondary"
                    animationType="hover"
                    size="lg"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Learn with Lumi
                  </AnimatedButton>
                </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative py-28 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="display-heading text-4xl md:text-6xl font-semibold mb-6">What you can do</h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Move at your own pace. Stay focused. Learn the essentials the right way.
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
                  className="h-full text-center"
                  variant="bordered"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 
                                rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                    <Clock size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors">
                    5-Minute Lessons
                  </h3>
                  <p className="text-white/70 mb-6">
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
                  className="h-full text-center"
                  variant="bordered"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 
                                rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                    <Brain size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-300 transition-colors">
                    AI Tutor
                  </h3>
                  <p className="text-white/70 mb-6">
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
              <Link to="/lessons" className="block group">
                <GlassCard 
                  className="h-full text-center"
                  variant="bordered"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 
                                rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                    <Code size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-green-300 transition-colors">
                    Quests
                  </h3>
                  <p className="text-white/70 mb-6">
                    Short, focused missions to build real intuition—no fluff.
                  </p>
                  <div className="inline-flex items-center text-green-300 font-medium">
                    Start quests →
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
                  className="h-full text-center"
                  variant="bordered"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 
                                rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                    <MessageSquare size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-300 transition-colors">
                    Discord Community
                  </h3>
                  <p className="text-white/70 mb-6">
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
              <div className="text-white/80 text-lg font-medium">Active Learners</div>
              <div className="text-white/50 text-sm mt-2">Growing every day</div>
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
              <div className="text-white/80 text-lg font-medium">Average Rating</div>
              <div className="text-white/50 text-sm mt-2">⭐⭐⭐⭐⭐</div>
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
              <div className="text-white/80 text-lg font-medium">Micro-Lessons</div>
              <div className="text-white/50 text-sm mt-2">Always expanding</div>
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
                <blockquote className="text-2xl md:text-3xl font-medium text-white/90 italic mb-6 pt-8">
                  "LumosLearn transformed my understanding of AI and coding. The gamified approach 
                  kept me engaged, and the AI tutor was like having a personal mentor!"
                </blockquote>
                <cite className="text-white/70 font-semibold">— Sarah K., Software Engineer</cite>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-heading text-4xl md:text-6xl font-semibold mb-6">Ready to get started?</h2>
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-3xl mx-auto">
              Join learners building solid AI fundamentals—without the noise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/lessons">
                <AnimatedButton
                  variant="glass"
                  animationType="hover"
                  size="lg"
                  className="group"
                >
                  <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Begin learning
                </AnimatedButton>
              </Link>
              
              <Link to="/register">
                <AnimatedButton
                  variant="secondary"
                  animationType="slide"
                  size="lg"
                >
                  Create a free account
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