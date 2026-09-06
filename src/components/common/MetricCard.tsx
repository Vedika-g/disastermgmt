import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: 'critical' | 'high' | 'warning' | 'operational' | 'info' | 'neutral';
  trendText?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  onClick?: () => void;
  accentColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  badgeText,
  badgeVariant = 'neutral',
  trendText,
  trendDirection = 'neutral',
  icon: Icon,
  onClick,
}) => {
  const badgeStyles = {
    critical: 'bg-red-500/15 text-red-400 border-red-500/30',
    high: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    warning: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    operational: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    info: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  }[badgeVariant];

  const trendStyles = {
    up: 'text-red-400',
    down: 'text-emerald-400',
    neutral: 'text-slate-400',
  }[trendDirection];

  return (
    <div
      onClick={onClick}
      className={`relative bg-command-card border border-command-border rounded-lg p-4 transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-command-borderLight hover:bg-command-cardHover hover:shadow-lg hover:shadow-black/40' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 rounded bg-command-surface border border-command-border text-slate-300">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-3 my-1">
        <span className="text-2xl lg:text-3xl font-bold font-mono text-white tracking-tight">
          {value}
        </span>
        {badgeText && (
          <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border uppercase ${badgeStyles}`}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-command-border/60 text-xs">
        <span className="text-slate-400 truncate">{subtitle}</span>
        {trendText && (
          <span className={`font-mono text-[11px] font-medium shrink-0 flex items-center gap-1 ${trendStyles}`}>
            {trendDirection === 'up' && '↑'}
            {trendDirection === 'down' && '↓'}
            {trendText}
          </span>
        )}
      </div>
    </div>
  );
};
