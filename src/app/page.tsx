'use client';

import { Brain, BookOpen, Shield, Sparkles, ArrowRight, MessageSquare, Zap, Target, Clock, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Eye,
    title: '多视角阅读器',
    description: '输入任何观点，系统从支持、反对、盲点、利益相关方四个维度分析。不给结论，只提供思考框架。',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Shield,
    title: '逻辑漏洞检测器',
    description: '自动识别常见逻辑谬误：诉诸权威、稻草人谬误、滑坡谬误等。提示"这里需要你思考"，不说对错。',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: BookOpen,
    title: '思维成长档案',
    description: '记录曾经相信但现在质疑的观点，追踪思维演变。见证自己从"相信"到"审视"的成长。',
    color: 'bg-emerald-100 text-emerald-600',
    badge: 'Coming Soon',
  },
];

const useCases = [
  {
    title: '读文章时',
    description: '看到一篇让你热血沸腾或义愤填膺的文章？先别急着转发，用工具分析一下。',
    icon: MessageSquare,
  },
  {
    title: '做决策时',
    description: '面对两难选择？把选项和顾虑都写下来，让工具帮你发现可能的盲点。',
    icon: Target,
  },
  {
    title: '讨论前',
    description: '准备和人辩论？先分析自己的观点是否经得起推敲，做到"知己知彼"。',
    icon: Zap,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-primary-600" />
            </div>
            <span className="font-semibold text-slate-800">Critical Thinking Toolkit</span>
          </div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm">开源项目</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI时代最稀缺的能力</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            不是给答案
            <br />
            <span className="text-primary-600">而是帮你学会提问</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            当信息爆炸让人无所适从，当算法推荐让人困在茧房，
            <br className="hidden md:block" />
            批判性思维成为了最稀缺的能力。这个工具帮你从多个角度看问题。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/perspective"
              className="flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-100"
            >
              <Eye className="w-5 h-5" />
              <span>开始多视角分析</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/logic"
              className="flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-xl font-medium hover:bg-slate-50 transition-colors border border-slate-200"
            >
              <Shield className="w-5 h-5" />
              <span>检测逻辑漏洞</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">核心功能</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              三个工具，三种视角，帮你形成自己的判断
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200/60 card-hover relative"
              >
                {feature.badge && (
                  <span className="absolute top-4 right-4 text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                    {feature.badge}
                  </span>
                )}
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">使用场景</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              随时随地培养批判性思维的习惯
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60"
              >
                <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <useCase.icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{useCase.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm mb-6">
            <Clock className="w-4 h-4" />
            <span>这个项目源于我对批判性思维的思考</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            如果你也想：
          </h2>
          
          <ul className="text-lg text-slate-300 space-y-3 mb-10">
            <li className="flex items-center justify-center gap-2">
              <span className="text-primary-400">•</span>
              <span>系统学习思维方法</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="text-primary-400">•</span>
              <span>读更多能激发思考的内容</span>
            </li>
          </ul>
          
          <a
            href="https://vigma.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-500 transition-colors"
          >
            <span>欢迎看看我写的书</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-slate-500" />
            <span className="text-slate-500 text-sm">Critical Thinking Toolkit</span>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white text-sm flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://vigma.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white text-sm flex items-center gap-1"
            >
              <BookOpen className="w-4 h-4" />
              <span>vigma.app</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
