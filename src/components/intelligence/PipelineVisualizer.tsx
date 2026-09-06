import React, { useState, useEffect } from 'react';
import {
  Satellite,
  Radio,
  FileText,
  Binary,
  Cpu,
  Flame,
  MapPin,
  Send,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const PipelineVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const pipelineSteps = [
    {
      title: 'Data Collection',
      icon: Satellite,
      desc: 'Multi-spectral SAR, drone reconnaissance, ultrasonic IoT stream, citizen SOS reports.',
      tag: 'Raw Feeds',
    },
    {
      title: 'Data Ingestion',
      icon: Binary,
      desc: 'Edge-to-cloud telemetry ingest, time-series deduplication, coordinate normalization.',
      tag: '128 Mbps',
    },
    {
      title: 'Preprocessing',
      icon: Layers,
      desc: 'Radiometric calibration, cloud masking, orthorectification, noise filtering.',
      tag: '10m Res',
    },
    {
      title: 'AI Analysis',
      icon: Cpu,
      desc: 'Deep U-Net water surface segmentation, road breach classifier, building damage scoring.',
      tag: '98.2% Conf',
    },
    {
      title: 'Risk Assessment',
      icon: Flame,
      desc: 'Composite vulnerability weighting: Hazard (0.35) + Population (0.25) + Lifelines (0.40).',
      tag: 'Risk 82/100',
    },
    {
      title: 'GIS Intelligence',
      icon: MapPin,
      desc: 'Dynamic spatial vectorization, multi-polygon flood zoning, choke-point mapping.',
      tag: 'GeoJSON',
    },
    {
      title: 'Response Planning',
      icon: Send,
      desc: 'Dijkstra route optimization, NDRF boat dispatch, resource load balancing.',
      tag: 'Actionable',
    },
  ];

  // Cycling active step animation to simulate data flow
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [pipelineSteps.length]);

  return (
    <div className="bg-command-card border border-command-border rounded-lg p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping-slow" />
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
              OPERATIONAL DATA & AI INFERENCE PIPELINE
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Autonomous multi-modal pipeline from raw earth observation to tactical rescue directives
          </p>
        </div>
        <span className="text-[10px] font-mono bg-blue-950/60 border border-blue-500/40 text-blue-300 px-2.5 py-1 rounded">
          PIPELINE ACTIVE • LATENCY: 420ms
        </span>
      </div>

      {/* Interactive Horizontal Flow Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 relative">
        {pipelineSteps.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = idx === activeStep;
          const isPast = idx < activeStep;

          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`relative cursor-pointer rounded-lg p-3 border transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-900/30 scale-[1.02]'
                  : isPast
                  ? 'bg-command-surface border-command-border text-slate-300'
                  : 'bg-command-surface/50 border-command-border/60 text-slate-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div
                    className={`p-1.5 rounded ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : isPast
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <StepIcon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-command-bg border border-command-border text-slate-400">
                    {step.tag}
                  </span>
                </div>

                <h4
                  className={`text-xs font-bold font-mono tracking-wide ${
                    isActive ? 'text-blue-300' : 'text-slate-200'
                  }`}
                >
                  {idx + 1}. {step.title}
                </h4>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-3 leading-snug font-sans">
                  {step.desc}
                </p>
              </div>

              {/* Step indicator */}
              <div className="mt-3 pt-2 border-t border-command-border/40 flex items-center justify-between text-[10px] font-mono">
                <span className={isActive ? 'text-blue-400 font-bold' : 'text-slate-500'}>
                  {isActive ? 'PROCESSING' : isPast ? 'VERIFIED' : 'PENDING'}
                </span>
                {idx < pipelineSteps.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-slate-600 hidden lg:block" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
