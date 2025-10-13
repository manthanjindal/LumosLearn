import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { Menu, X, Languages, Home, Book, Brain, User, LucideIcon } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import AnimatedButton from '../ui/AnimatedButton'
// import { cn } from '@/lib/utils'
// Temporary fix: define a simple cn utility here
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

type NavItem = {
  id: string
  path: string
  icon: LucideIcon
  label: 'nav.home' | 'nav.lessons' | 'nav.aiTutor'
}

const navItems: NavItem[] = [
  { id: 'home', path: '/', icon: Home, label: 'nav.home' },
  { id: 'lessons', path: '/lessons', icon: Book, label: 'nav.lessons' },
  { id: 'aiTutor', path: '/ai-tutor', icon: Brain, label: 'nav.aiTutor' }
]

const EnhancedNavbar: React.FC = () => {
  const { language, setLanguage, translate } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const selectorRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      // Only add background when scrolled more than 50px to ensure home page stays transparent
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname)
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex)
    }
  }, [location.pathname])

  useEffect(() => {
    // Animate selector to active item
    if (selectorRef.current && itemRefs.current[activeIndex]) {
      const activeItem = itemRefs.current[activeIndex]
      if (activeItem) {
        const { offsetWidth: width, offsetLeft: left } = activeItem
        gsap.to(selectorRef.current, {
          width,
          left,
          duration: 0.15,
          ease: "power2.out"
        })
      }
    }
  }, [activeIndex])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en')
  }

  const handleItemHover = (index: number) => {
    if (window.innerWidth >= 768) { // Only on desktop
      const item = itemRefs.current[index]
      if (item && selectorRef.current) {
        const { offsetWidth: width, offsetLeft: left } = item
        gsap.to(selectorRef.current, {
          width: width + 20,
          left: left - 10,
          duration: 0.1,
          ease: "power2.out",
          backgroundColor: "rgba(255, 255, 255, 0.08)"
        })
      }
    }
  }

  const handleItemLeave = () => {
    if (window.innerWidth >= 768) {
      const activeItem = itemRefs.current[activeIndex]
      if (activeItem && selectorRef.current) {
        const { offsetWidth: width, offsetLeft: left } = activeItem
        gsap.to(selectorRef.current, {
          width,
          left,
          duration: 0.1,
          ease: "power2.out",
          backgroundColor: "rgba(255, 255, 255, 0.06)"
        })
      }
    }
  }

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        (isScrolled && location.pathname !== '/')
          ? "bg-base-950/30 backdrop-blur-2xl border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20 relative">
          {/* Logo - positioned absolutely to the left */}
          <motion.div 
            className="absolute left-0 flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-8 w-8 rounded-md bg-white/10 border border-white/15 grid place-items-center">
                <span className="text-xs font-semibold tracking-tight">LL</span>
              </div>
              <span className="font-display text-base font-semibold tracking-tight text-white/90">LumosLearn</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - centered */}
          <div className="hidden md:flex items-center relative">
            <div 
              className="relative flex items-center gap-1 rounded-full p-1 bg-base-950/30 backdrop-blur-2xl border border-white/10 shadow-md saturate-150"
              onMouseLeave={handleItemLeave}
            >
              {/* Active indicator */}
              <div
                ref={selectorRef}
                className="absolute h-10 rounded-full transition-all duration-300 border border-white/15 bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                style={{ width: 0, left: 0 }}
              />
              
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeIndex === index
                
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    ref={el => itemRefs.current[index] = el}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10",
                      isActive 
                        ? "text-white" 
                        : "text-white/75 hover:text-white"
                    )}
                    onMouseEnter={() => handleItemHover(index)}
                  >
                    <Icon size={18} className={cn(isActive ? 'text-white' : 'text-white/70')} />
                    <span>{translate(item.label)}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Controls - positioned absolutely to the right */}
          <div className="absolute right-0 hidden md:flex items-center gap-4">
            <AnimatedButton
              {...{ variant: "ghost", size: "sm" }}
              onClick={toggleLanguage}
              animationType="hover"
              icon={<Languages size={20} />}
              className="rounded-full w-10 h-10 p-0"
            >
              <span className="sr-only">Language</span>
            </AnimatedButton>
            
            <AnimatedButton
              {...{ variant: "ghost", size: "sm" }}
              animationType="hover"
              icon={<User size={20} />}
              className="rounded-full w-10 h-10 p-0"
            >
              <span className="sr-only">Login</span>
            </AnimatedButton>
          </div>

          {/* Mobile Menu Button - positioned absolutely to the right */}
          <div className="absolute right-0 md:hidden flex items-center gap-4">
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-base-950/40 backdrop-blur-2xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{translate(item.label)}</span>
                    </Link>
                  </motion.div>
                )
              })}
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="pt-4 border-t border-white/10"
              >
                <div className="flex items-center justify-between px-4">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <Languages size={20} />
                    <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
                  </button>
                  
                  <AnimatedButton
                    {...{ variant: "primary", size: "sm" }}
                    animationType="hover"
                  >
                    <User size={16} />
                    Login
                  </AnimatedButton>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default EnhancedNavbar
