'use client';

import { Scale, AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import { LogicAnalysis } from '@/types';

interface LogicViewerProps {
  analysis: LogicAnalysis;
}

function StrengthIndicator({ strength }: { strength: 'weak' | 'moderate' | 'strong' }) {
  const config = {
    weak: {
      icon: AlertCircle,
      label: '论证较弱',
      color: 'text-rose-600 bg-rose-100',
      barColor: 'bg-rose-500',
      width: 'w-1/3',
    },
    moderate: {
      icon: Info,
      label: '论证中等',
      color: 'text-amber-600 bg-amber-100',
      barColor: 'bg-amber-500',
      width: 'w-2/3',
    },
    strong: {
      icon: CheckCircle,
      label: '论证较强',
      color: 'text-emerald-600 bg-emerald-100',
      barColor: 'bg-emerald-500',
      width: 'w-full',
    },
  };

  const { icon: Icon, label, color, barColor, width } = config[strength];

  return (
    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/60">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${color.split(' ')[0]}`} />
        <span className={`text-sm font-medium ${color.split(' ')[0]}`}>{label}</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} ${width} transition-all duration-500`} />
      </div>
      <p className="text-xs text-slate-500 mt-2">
        {strength === 'weak' && '检测到多个逻辑漏洞，建议仔细审视'}
        {strength === 'moderate' && '论证基本成立，但有改进空间'}
        {strength === 'strong' && '论证结构清晰，逻辑较严密'}
      </p>
    </div>
  );
}

export default function LogicViewer({ analysis }: LogicViewerProps) {
  return (
    <div className="space-y-6">
      <StrengthIndicator strength={analysis.strength} />
      
      {analysis.fallacies.length > 0 && (
        <div className="bg-rose-50/50 rounded-xl p-5 border border-rose-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-rose-100 p-2 rounded-lg">
              <AlertCircle className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="font-semibold text-slate-800">检测到逻辑漏洞</h3>
          </div>
          
          <div className="space-y-4">
            {analysis.fallacies.map((fallacy, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-rose-100">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-medium shrink-0">
                    {fallacy.type}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-2">{fallacy.description}</p>
                    <div className="bg-slate-50 rounded p-2 mb-2">
                      <p className="text-xs text-slate-400 mb-1">原文位置：</p>
                      <p className="text-xs text-slate-600">{fallacy.location}</p>
                    </div>
                    <div className="flex items-start gap-2 bg-blue-50 rounded p-2">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-blue-700">{fallacy.suggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {analysis.fallacies.length === 0 && (
        <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-800">暂未检测到常见逻辑漏洞</h3>
          </div>
          <p className="text-sm text-slate-600">
            但这不意味着论证完全无懈可击。建议从其他角度继续审视。
          </p>
        </div>
      )}
      
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/60">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-slate-100 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-slate-600" />
          </div>
          <h3 className="font-semibold text-slate-800">论证结构提示</h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">{analysis.structure}</p>
        
        {analysis.premises.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-slate-500 mb-2">识别的论据：</p>
            <ul className="space-y-2">
              {analysis.premises.map((premise, index) => (
                <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-slate-400 shrink-0">{index + 1}.</span>
                  <span>{premise}...</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div>
          <p className="text-xs text-slate-500 mb-2">推断的结论：</p>
          <p className="text-sm text-slate-700 bg-white rounded p-3 border border-slate-200">
            {analysis.conclusion}...
          </p>
        </div>
      </div>
    </div>
  );
}
