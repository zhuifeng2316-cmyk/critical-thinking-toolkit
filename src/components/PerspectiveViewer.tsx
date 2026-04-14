'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb, Eye, Users, Scale, Target, Brain } from 'lucide-react';
import { PerspectiveAnalysis } from '@/types';

interface PerspectiveViewerProps {
  analysis: PerspectiveAnalysis;
}

function PerspectiveCard({ 
  title, 
  icon: Icon, 
  points, 
  colorClass,
  bgClass 
}: { 
  title: string; 
  icon: React.ElementType; 
  points: string[]; 
  colorClass: string;
  bgClass: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className={`${bgClass} rounded-xl p-5 border border-slate-200/60 card-hover`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-3">
          <div className={`${colorClass} p-2 rounded-lg`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      
      {isOpen && (
        <ul className="space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
              <span className={`${colorClass} mt-1.5 w-1.5 h-1.5 rounded-full shrink-0`} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PerspectiveViewer({ analysis }: PerspectiveViewerProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <PerspectiveCard
          title={analysis.supporting.title}
          icon={Lightbulb}
          points={analysis.supporting.points}
          colorClass="bg-amber-100 text-amber-600"
          bgClass="bg-amber-50/50"
        />
        <PerspectiveCard
          title={analysis.opposing.title}
          icon={AlertTriangle}
          points={analysis.opposing.points}
          colorClass="bg-rose-100 text-rose-600"
          bgClass="bg-rose-50/50"
        />
      </div>
      
      <PerspectiveCard
        title={analysis.blindspots.title}
        icon={Eye}
        points={analysis.blindspots.points}
        colorClass="bg-violet-100 text-violet-600"
        bgClass="bg-violet-50/50"
      />
      
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200/60">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-slate-100 p-2 rounded-lg">
            <Users className="w-5 h-5 text-slate-600" />
          </div>
          <h3 className="font-semibold text-slate-800">利益相关方分析</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-700">可能受益者</span>
            </div>
            <ul className="space-y-3">
              {analysis.stakeholders.beneficiaries.map((item, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium text-slate-700">{item.group}</span>
                  <p className="text-slate-500 mt-0.5">{item.reason}</p>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-sm font-medium text-rose-700">可能受损者</span>
            </div>
            <ul className="space-y-3">
              {analysis.stakeholders.losers.map((item, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium text-slate-700">{item.group}</span>
                  <p className="text-slate-500 mt-0.5">{item.reason}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
