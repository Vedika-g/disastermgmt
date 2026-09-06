import React from 'react';
import { SeverityLevel } from '../../types';

interface RiskBadgeProps {
  level: SeverityLevel | string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showDot = true }) => {
  const norm = level.toUpperCase();

  let colorClasses = 'bg-slate-800/80 text-slate-300 border-slate-700';
  let dotColor = 'bg-slate-400';

  if (norm === 'CRITICAL') {
    colorClasses = 'bg-red-950/40 text-red-400 border-red-500/40';
    dotColor = 'bg-red-500 animate-pulse';
  } else if (norm === 'HIGH') {
    colorClasses = 'bg-orange-950/40 text-orange-400 border-orange-500/40';
    dotColor = 'bg-orange-500';
  } else if (norm === 'WARNING' || norm === 'MODERATE' || norm === 'LOW_STOCK') {
    colorClasses = 'bg-amber-950/40 text-amber-300 border-amber-500/40';
    dotColor = 'bg-amber-400';
  } else if (norm === 'OPERATIONAL' || norm === 'SAFE' || norm === 'RESOLVED' || norm === 'LOW') {
    colorClasses = 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40';
    dotColor = 'bg-emerald-400';
  } else if (norm === 'INFO' || norm === 'EN_ROUTE' || norm === 'DISPATCHED') {
    colorClasses = 'bg-sky-950/40 text-sky-300 border-sky-500/40';
    dotColor = 'bg-sky-400';
  } else if (norm === 'ACTIVE') {
    colorClasses = 'bg-blue-950/40 text-blue-300 border-blue-500/40';
    dotColor = 'bg-blue-400 animate-pulse';
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5 font-mono tracking-wider',
    md: 'text-xs px-2.5 py-1 gap-2 font-mono tracking-wider',
    lg: 'text-sm px-3 py-1.5 gap-2.5 font-mono font-semibold',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded border font-medium uppercase select-none ${sizeClasses} ${colorClasses}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />}
      {level}
    </span>
  );
};
