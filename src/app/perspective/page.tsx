'use client';

import { useState, useEffect } from 'react';
import { Eye, Brain, ArrowLeft, Key, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ApiKeyModal from '@/components/ApiKeyModal';
import { analyzePerspective, generateLocalPerspective } from '@/lib/analysis';
import { PerspectiveAnalysis } from '@/types';

const PerspectiveViewer = dynamic(() => import('@/components/PerspectiveViewer'), {
  ssr: false,
});

const sampleText = `读书无用论：现在的大学生毕业后工资还不如农民工，读书有什么用？

我见过太多名校毕业生给初中毕业的人打工，学历越来越不值钱了。与其花十几年读书，不如早点出来闯荡，积累社会经验更重要。

而且很多成功人士都是低学历：马云是师范毕业，比尔·盖茨大学辍学，乔布斯也没读完大学。他们都没被学历束缚，所以才能取得这么大成就。

所以我认为，能早点工作就早点工作，读书只是在浪费时间。`;

export default function PerspectivePage() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<PerspectiveAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem('llm-api-key');
    setHasApiKey(!!apiKey);
  }, []);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    
    const apiKey = localStorage.getItem('llm-api-key');
    
    try {
      if (apiKey) {
        const result = await analyzePerspective(input);
        setAnalysis(result);
      } else {
        // Use local analysis without LLM
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = generateLocalPerspective(input);
        setAnalysis(result);
        setShowApiModal(true);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      const result = generateLocalPerspective(input);
      setAnalysis(result);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveApiKey = (apiKey: string) => {
    localStorage.setItem('llm-api-key', apiKey);
    setHasApiKey(true);
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
              <div className="bg-amber-100 p-2 rounded-lg">
                <Eye className="w-5 h-5 text-amber-600" />
              </div>
              <span className="font-semibold text-slate-800">多视角阅读器</span>
            </div>
          </div>
          <button
            onClick={() => setShowApiModal(true)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
          >
            {hasApiKey ? (
              <>
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span>AI增强中</span>
              </>
            ) : (
              <>
                <Key className="w-4 h-4" />
                <span>配置API</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">输入你想分析的观点</h1>
          <p className="text-slate-600">
            系统会从四个维度帮你分析：支持角度、反对角度、盲点、利益相关方。
            不给结论，只提供视角——判断权在你手中。
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/60 mb-8">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入一段文章、一个观点或一段话...
            
例如：
- 朋友圈转发的文章观点
- 某位大V的发言
- 你自己思考但不确定的想法
- 想要挑战的流行说法"
            className="w-full border-0 focus:ring-0 resize-none text-slate-700 leading-relaxed placeholder:text-slate-400"
            rows={8}
          />
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={loadSample}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              加载示例
            </button>
            <button
              onClick={handleAnalyze}
              disabled={!input.trim() || isAnalyzing}
              className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>分析中...</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>开始分析</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {analysis && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-500" />
              <h2 className="text-lg font-semibold text-slate-800">分析结果</h2>
              {!hasApiKey && (
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">
                  基础分析
                </span>
              )}
            </div>
            <PerspectiveViewer analysis={analysis} />
            
            {/* Tip */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-blue-700">
                <strong>提示：</strong>这个分析仅供参考。批判性思维的核心是独立思考，
                不要盲目接受任何分析结果——包括这个。质疑它，验证它，然后形成你自己的判断。
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
        onSave={handleSaveApiKey}
      />
    </main>
  );
}
