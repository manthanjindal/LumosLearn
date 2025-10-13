import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
  color?: 'purple' | 'blue' | 'green' | 'orange';
  showPercentage?: boolean;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  className = '',
  children,
  color = 'purple',
  showPercentage = true
}) => {
  const normalizedRadius = (size - strokeWidth) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorMap = {
    purple: {
      background: 'stroke-purple-900/30',
      progress: 'stroke-purple-500',
      glow: 'drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]'
    },
    blue: {
      background: 'stroke-blue-900/30',
      progress: 'stroke-blue-500',
      glow: 'drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]'
    },
    green: {
      background: 'stroke-green-900/30',
      progress: 'stroke-green-500',
      glow: 'drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]'
    },
    orange: {
      background: 'stroke-orange-900/30',
      progress: 'stroke-orange-500',
      glow: 'drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]'
    }
  };

  const colors = colorMap[color];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        height={size}
        width={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset: 0 }}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          className={colors.background}
        />
        {/* Progress circle */}
        <motion.circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          className={`${colors.progress} ${colors.glow}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut",
            delay: 0.2
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showPercentage && (
          <motion.span 
            className="text-lg font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default ProgressRing;
