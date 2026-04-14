'use client';

import { useState } from 'react';
import { Shield, Brain, ArrowLeft, Key, Loader2, Sparkles, ExternalLink, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ApiKeyModal from '@/components/ApiKeyModal';
import { analyzeLogic } from '@/lib/analysis';

const LogicViewer = dynamic(() => import('@/components/LogicViewer'), {
  ssr: false,
});

const sampleText = `据某权威专家称，特斯拉的自动驾驶技术已经完美成熟，完全可以替代人类驾驶。

专家说了，技术已经通过了几百万公里的测试，比人类驾驶安全多了。出了事故那只是个例，不代表整体有问题。

一旦自动驾驶全面普及，所有交通事故都会消失。每年因车祸死亡的十几万人就都得救了，这是造福人类的大好事。

如果不尽快推广自动驾驶技术，中国在人工智能领域就会落后于美国，这将是一场技术灾难。

所以我认为，所有车企都应该立即停止人工驾驶汽车的研发，把资源全部投入到自动驾驶上去。这是为了人类美好的未来！`;

export default function LogicPage() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<Awaited<ReturnType<typeof analyzeLogic>> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeLogic(input);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSample = () => {
    setInput(sampleText);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">返回</span>
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="bg-violet-100 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-violet-600" />
              </div>
              <span className="font-semibold text-slate-800">逻辑漏洞检测器</span>
            </div>
          </div>
          <button
            onClick={() => setShowApiModal(true)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
          >
            <Key className="w-4 h-4" />
            <span>配置API</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">输入你想检验的论证</h1>
          <p className="text-slate-600">
            系统会检测常见的逻辑谬误，并提示你"这里需要思考"的地方。
            它不说对错，只帮你发现问题。
          </p>
        </div>

        {/* Common Fallacies Info */}
        <div className="bg-violet-50 rounded-xl p-4 border border-violet-100 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-violet-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-violet-800 mb-2">系统可以检测以下常见逻辑谬误：</p>
              <div className="flex flex-wrap gap-2">
                {['诉诸权威', '稻草人谬误', '滑坡谬误', '非黑即白', '人身攻击', '循环论证', '从众心理', '诉诸情感'].map(fallacy => (
                  <span key={fallacy} className="text-xs bg-white text-violet-700 px-2 py-1 rounded">
                    {fallacy}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/60 mb-8">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入一段论证或论述...
            
例如：
- 朋友圈的养生文章
- 某个产品的推销文案
- 政治人物的发言
- 商业大佬的观点
- 你自己的论证逻辑"
            className="w-full border-0 focus:ring-0 resize-none text-slate-700 leading-relaxed placeholder:text-slate-400"
            rows={8}
          />
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={loadSample}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              加载示例（含多种谬误）
            </button>
            <button
              onClick={handleAnalyze}
              disabled={!input.trim() || isAnalyzing}
              className="flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>检测中...</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>开始检测</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {analysis && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-500" />
              <h2 className="text-lg font-semibold text-slate-800">检测结果</h2>
            </div>
            <LogicViewer analysis={analysis} />
            
            {/* Tip */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-blue-700">
                <strong>提示：</strong>发现谬误不等于论点完全错误。
                一个论证可能存在逻辑漏洞，但核心观点仍然可能是对的。
                逻辑分析只是帮你更清晰地审视论证，而非否定一切。
              </p>
            </div>
          </div>
        )}

        {/* Vigma CTA */}
        {!analysis && (
          <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>想系统学习批判性思维？</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              推荐阅读
            </h3>
            <p className="text-slate-300 mb-6">
              如果你觉得这个工具有用，可能也会对我写的内容感兴趣
            </p>
            <a
              href="https://vigma.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-500 transition-colors"
            >
              <span>访问 vigma.app</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      <ApiKeyModal
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        onSave={() => {}}
      />
    </main>
  );
}
