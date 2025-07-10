import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
// import { cn } from '@/lib/utils'
// Temporary fix: define a simple cn utility here
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'gradient' | 'bordered' | 'elevated'
  hover?: 'lift' | 'glow' | 'tilt' | 'magnetic'
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'default',
  hover = 'lift',
  blur = 'md',
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current || hover !== 'magnetic') return

    const card = cardRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      // @ts-expect-error gsap's type definitions do not include 'to' on the default import, but it works at runtime
      gsap.to(card, {
        x: x * 0.1,
        y: y * 0.1,
        rotation: x * 0.05,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      // @ts-expect-error gsap's type definitions do not include 'to' on the default import, but it works at runtime
      gsap.to(card, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hover])

  const variants = {
    default: "bg-white/10 border border-white/20",
    gradient: "bg-gradient-to-br from-white/10 to-white/5 border border-white/20",
    bordered: "bg-white/5 border-2 border-white/30",
    elevated: "bg-white/15 border border-white/25 shadow-2xl"
  }

  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl"
  }

  const hoverEffects = {
    lift: "hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-blue-500/25",
    glow: "hover:shadow-2xl hover:shadow-blue-500/30 hover:border-blue-400/50",
    tilt: "hover:rotate-1 hover:scale-105",
    magnetic: "" // Handled by useEffect
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-300 cursor-pointer group overflow-hidden",
        variants[variant],
        blurClasses[blur],
        hover !== 'magnetic' && hoverEffects[hover],
        className
      )}
      onClick={onClick}
      whileHover={hover === 'lift' ? { y: -8 } : undefined}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Sparkle effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full animate-ping" />
        <div className="absolute top-1/4 -left-1 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" />
      </div>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Bottom shine effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
    </motion.div>
  )
}

export default GlassCard
