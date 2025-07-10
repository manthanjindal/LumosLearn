import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Target, Zap, Crown, Award } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon?: 'star' | 'trophy' | 'target' | 'zap' | 'crown' | 'award';
  unlocked?: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  icon = 'star',
  unlocked = false,
  rarity = 'common',
  className = '',
  size = 'md',
  onClick
}) => {
  const iconMap = {
    star: Star,
    trophy: Trophy,
    target: Target,
    zap: Zap,
    crown: Crown,
    award: Award
  };

  const IconComponent = iconMap[icon];

  const rarityStyles = {
    common: {
      bg: 'from-gray-600 to-gray-800',
      border: 'border-gray-500',
      glow: unlocked ? 'shadow-lg shadow-gray-500/20' : '',
      text: 'text-gray-300'
    },
    rare: {
      bg: 'from-blue-600 to-blue-800',
      border: 'border-blue-500',
      glow: unlocked ? 'shadow-lg shadow-blue-500/30' : '',
      text: 'text-blue-300'
    },
    epic: {
      bg: 'from-purple-600 to-purple-800',
      border: 'border-purple-500',
      glow: unlocked ? 'shadow-lg shadow-purple-500/40' : '',
      text: 'text-purple-300'
    },
    legendary: {
      bg: 'from-yellow-500 via-orange-500 to-red-500',
      border: 'border-yellow-400',
      glow: unlocked ? 'shadow-lg shadow-yellow-500/50' : '',
      text: 'text-yellow-300'
    }
  };

  const sizeStyles = {
    sm: {
      container: 'w-16 h-16',
      icon: 'w-6 h-6',
      text: 'text-xs'
    },
    md: {
      container: 'w-20 h-20',
      icon: 'w-8 h-8',
      text: 'text-sm'
    },
    lg: {
      container: 'w-24 h-24',
      icon: 'w-10 h-10',
      text: 'text-base'
    }
  };

  const rarity_config = rarityStyles[rarity];
  const size_config = sizeStyles[size];

  return (
    <motion.div
      className={`group cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Badge Container */}
      <div className="relative">
        {/* Main Badge */}
        <div
          className={`
            ${size_config.container} 
            rounded-full 
            bg-gradient-to-br ${rarity_config.bg}
            border-2 ${rarity_config.border}
            ${rarity_config.glow}
            flex items-center justify-center
            transition-all duration-300
            ${unlocked ? 'opacity-100' : 'opacity-40 grayscale'}
            ${unlocked ? 'group-hover:scale-110' : ''}
          `}
        >
          <IconComponent 
            className={`${size_config.icon} ${rarity_config.text}`}
          />
        </div>

        {/* Unlock Animation */}
        {unlocked && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={`w-full h-full rounded-full border-2 ${rarity_config.border} animate-ping`} />
          </motion.div>
        )}

        {/* Sparkle Effects for Legendary */}
        {unlocked && rarity === 'legendary' && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 60}deg) translateY(-${size_config.container === 'w-16 h-16' ? '20' : size_config.container === 'w-20 h-20' ? '25' : '30'}px)`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </>
        )}

        {/* Locked Overlay */}
        {!unlocked && (
          <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
            <div className="w-4 h-4 border border-gray-400 rounded bg-gray-600" />
          </div>
        )}
      </div>

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 
                   bg-black/90 text-white text-xs rounded-lg opacity-0 pointer-events-none
                   group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        <div className="font-medium">{title}</div>
        <div className="text-gray-300 text-xs">{description}</div>
        <div 
          className={`text-xs font-bold mt-1 ${rarity_config.text}`}
        >
          {rarity.toUpperCase()}
        </div>
        {/* Tooltip Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                        border-4 border-transparent border-t-black/90" />
      </motion.div>
    </motion.div>
  );
};

export default AchievementBadge;
