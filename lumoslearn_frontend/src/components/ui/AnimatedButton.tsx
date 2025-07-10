import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
// import { cn } from '@/lib/utils'
// Temporary fix: define a simple cn utility here
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl",
        primary: "bg-gradient-to-r from-[#34D399] to-[#38BDF8] text-white shadow-lg hover:shadow-xl",
        secondary: "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20",
        ghost: "hover:bg-white/10 text-white",
        comic: "bg-gradient-to-b from-yellow-400 to-yellow-500 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-lg",
        xl: "h-14 px-10 text-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  animationType?: 'hover' | 'magnetic' | 'comic' | 'slide'
  icon?: React.ReactNode
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  className,
  variant,
  size,
  children,
  animationType = 'hover',
  icon,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const magneticRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current

    if (animationType === 'magnetic') {
      const handleMouseMove = (e: MouseEvent) => {
        if (!magneticRef.current) return
        
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(magneticRef.current, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        })
      }

      const handleMouseLeave = () => {
        if (!magneticRef.current) return
        gsap.to(magneticRef.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        })
      }

      button.addEventListener('mousemove', handleMouseMove)
      button.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        button.removeEventListener('mousemove', handleMouseMove)
        button.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    if (animationType === 'comic') {
      const handleMouseEnter = () => {
        gsap.to(button, {
          y: -2,
          duration: 0.1,
          ease: "bounce.out"
        })
      }

      const handleMouseLeave = () => {
        gsap.to(button, {
          y: 0,
          duration: 0.1,
          ease: "bounce.out"
        })
      }

      const handleMouseDown = () => {
        gsap.to(button, {
          y: 2,
          duration: 0.05
        })
      }

      const handleMouseUp = () => {
        gsap.to(button, {
          y: -2,
          duration: 0.1,
          ease: "bounce.out"
        })
      }

      button.addEventListener('mouseenter', handleMouseEnter)
      button.addEventListener('mouseleave', handleMouseLeave)
      button.addEventListener('mousedown', handleMouseDown)
      button.addEventListener('mouseup', handleMouseUp)

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter)
        button.removeEventListener('mouseleave', handleMouseLeave)
        button.removeEventListener('mousedown', handleMouseDown)
        button.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [animationType])

  const buttonContent = (
    <motion.button
      ref={buttonRef}
      className={cn(buttonVariants({ variant, size, className }))}
      whileHover={animationType === 'hover' ? { scale: 1.05 } : undefined}
      whileTap={animationType === 'hover' ? { scale: 0.95 } : undefined}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      tabIndex={props.tabIndex}
      // Add more props as needed
    >
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
      
      <span className="relative flex items-center gap-2">
        {icon && <span className="w-5 h-5">{icon}</span>}
        {children}
      </span>
    </motion.button>
  )

  if (animationType === 'magnetic') {
    return (
      <div ref={magneticRef} className="inline-block">
        {buttonContent}
      </div>
    )
  }

  return buttonContent
}

export default AnimatedButton

