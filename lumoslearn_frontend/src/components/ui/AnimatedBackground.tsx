import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

interface AnimatedBackgroundProps {
  variant?: 'space' | 'geometric' | 'particles' | 'minimal'
  intensity?: 'low' | 'medium' | 'high'
  color?: 'blue' | 'purple' | 'green' | 'multicolor'
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = 'space',
  intensity = 'medium',
  color = 'blue'
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Create floating particles
    const createParticles = () => {
      if (!container) return

      const particleCount = intensity === 'low' ? 15 : intensity === 'medium' ? 30 : 50

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute rounded-full pointer-events-none'
        
        // Random size and position
        const size = Math.random() * 4 + 1
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        
        // Color based on theme
        const colors = {
          blue: ['rgba(59, 130, 246, 0.6)', 'rgba(147, 197, 253, 0.4)', 'rgba(191, 219, 254, 0.3)'],
          purple: ['rgba(147, 51, 234, 0.6)', 'rgba(196, 181, 253, 0.4)', 'rgba(221, 214, 254, 0.3)'],
          green: ['rgba(34, 197, 94, 0.6)', 'rgba(134, 239, 172, 0.4)', 'rgba(187, 247, 208, 0.3)'],
          multicolor: ['rgba(59, 130, 246, 0.6)', 'rgba(20, 184, 166, 0.4)', 'rgba(34, 197, 94, 0.3)', 'rgba(6, 182, 212, 0.3)']
        }
        
        particle.style.backgroundColor = colors[color][Math.floor(Math.random() * colors[color].length)]
        
        container.appendChild(particle)

        // Animate particle
        gsap.set(particle, { opacity: 0 })
        gsap.to(particle, {
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        })

        gsap.to(particle, {
          x: `${Math.random() * 200 - 100}px`,
          y: `${Math.random() * 200 - 100}px`,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          yoyo: true,
          ease: "none"
        })
      }
    }

    createParticles()

    return () => {
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [intensity, color])

  const getBackgroundStyle = () => {
    const styles = {
      space: "bg-black",
      geometric: "bg-black",
      particles: "bg-black",
      minimal: "bg-black"
    }
    return styles[variant]
  }

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${getBackgroundStyle()}`}>
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-teal-500/5 to-cyan-500/8 animate-pulse" />
      
      {/* Main particle container */}
      <div ref={containerRef} className="absolute inset-0" />
      
      {/* Floating geometric shapes */}
      {variant === 'geometric' && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-500/20 rotate-45"
            animate={{ rotate: 405, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-24 h-24 border border-teal-500/20"
            animate={{ rotate: -360, scale: [1, 0.9, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-3/4 w-16 h-16 border border-cyan-500/20 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      
      {/* Space-specific effects */}
      {variant === 'space' && (
        <>
          <div className="stars absolute inset-0 opacity-60" />
          <div className="shooting-stars absolute inset-0" />
        </>
      )}
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

export default AnimatedBackground

// CSS for space effects (add to index.css)
export const spaceEffectsCSS = `
.stars {
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #eee, transparent),
    radial-gradient(2px 2px at 40px 70px, #fff, transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
    radial-gradient(1px 1px at 130px 80px, #fff, transparent),
    radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: sparkle 50s linear infinite;
}

.shooting-stars {
  position: relative;
}

.shooting-stars::before,
.shooting-stars::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 6px #fff;
  animation: shootingStar 8s linear infinite;
}

.shooting-stars::after {
  animation-delay: 4s;
  animation-duration: 6s;
  top: 30%;
  left: 70%;
}

@keyframes sparkle {
  0% { transform: translateX(0); }
  100% { transform: translateX(-200px); }
}

@keyframes shootingStar {
  0% {
    transform: translateX(-100vw) translateY(100vh);
    opacity: 1;
  }
  100% {
    transform: translateX(100vw) translateY(-100vh);
    opacity: 0;
  }
}
`
