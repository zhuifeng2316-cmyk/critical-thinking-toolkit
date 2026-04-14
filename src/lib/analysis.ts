import { PerspectiveAnalysis, LogicAnalysis, LogicFallacy } from '@/types';

// Common logical fallacies for detection
const fallacies = [
  {
    type: '诉诸权威',
    pattern: /据[^说]|专家说|权威[认主]为|某某大[佬V]|名人[曾言]称/,
    description: '用权威人士的言论代替逻辑论证，权威的观点不一定正确',
    suggestion: '这个权威在其领域是否可信？是否有其他专家持不同观点？',
  },
  {
    type: '稻草人谬误',
    pattern: /你是在说|你的意思就是|这不就是|难道不觉得.*也是/,
    description: '曲解对方的观点，然后攻击这个曲解后的版本',
    suggestion: '对方真的持有这个观点吗？有没有更温和或更准确的解读？',
  },
  {
    type: '滑坡谬误',
    pattern: /一旦.*就|最终必然|必然导致|如果不.*就会/,
    description: '假设某种小小的偏离会引发连锁反应，最终导致灾难性后果',
    suggestion: '每个环节的因果关系是否都有充分依据？有没有中间立场？',
  },
  {
    type: '非黑即白',
    pattern: /不是.*就是|要么.*要么|只有|必须/,
    description: '只给出两个极端选项，忽视中间的可能性',
    suggestion: '是否存在第三种、第四种选择？能否找到折中方案？',
  },
  {
    type: '人身攻击',
    pattern: /[这人它].*[品格动机]|你是.*才会|因为你是/,
    description: '攻击提出观点的人，而非观点本身',
    suggestion: '这个人的身份背景与观点的正确性有何关联？观点本身能否独立成立？',
  },
  {
    type: '循环论证',
    pattern: /因为.*所以|正因.*所以|既然.*就|说明.*证明/,
    description: '用要证明的结论作为前提',
    suggestion: '结论能否独立于前提成立？有没有外部证据支持？',
  },
  {
    type: '从众心理',
    pattern: /大家都在|所有人都认为|难道没人觉得|难道.*不是/,
    description: '用"多数人"或"少数人"的想法来判断对错',
    suggestion: '多数人的看法是否就代表真理？历史上有哪些"多数人"犯错的情况？',
  },
  {
    type: '诉诸情感',
    pattern: /难道不[可心]|难道你忍心|令人[心寒愤怒]|让人[难以接受]/,
    description: '用情感诉求代替逻辑论证',
    suggestion: '情感反应能否替代事实和逻辑？这个担忧是否有数据支持？',
  },
];

// Extract sentences for analysis
function extractSentences(text: string): string[] {
  return text
    .split(/[。！？；\n]/)
    .map(s => s.trim())
    .filter(s => s.length > 10);
}

// Analyze text from multiple perspectives
export async function analyzePerspective(text: string): Promise<PerspectiveAnalysis> {
  const sentences = extractSentences(text);
  
  // Use the LLM API to generate perspective analysis
  const apiKey = localStorage.getItem('llm-api-key');
  
  if (!apiKey) {
    // Return mock data if no API key
    return generateMockPerspective(text);
  }

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `你是一个批判性思维分析助手，帮助用户从多个角度分析观点和文章。

请分析用户输入的内容，从以下四个维度提供洞见（不给出结论，只提供思考角度）：

1. **支持角度**：找出支持这个观点的合理论据和情境
2. **反对角度**：找出质疑这个观点的反驳理由和例外情况
3. **盲点分析**：指出作者可能忽略或未考虑的方面
4. **利益相关方**：分析谁会从这个观点中获益，谁可能受损

请用JSON格式返回结果，结构如下：
{
  "supporting": {"title": "支持角度", "points": ["要点1", "要点2", "要点3"]},
  "opposing": {"title": "反对角度", "points": ["要点1", "要点2", "要点3"]},
  "blindspots": {"title": "盲点分析", "points": ["要点1", "要点2", "要点3"]},
  "stakeholders": {
    "beneficiaries": [{"group": "受益群体", "reason": "原因"}],
    "losers": [{"group": "受损群体", "reason": "原因"}]
  }
}

请确保：
- 每个points数组有3-5个要点
- points中的内容要有深度，不要泛泛而谈
- 盲点分析要具体指出可能被忽视的维度
- 利益相关方分析要揭示潜在的受益和受损群体`
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (content) {
      // Try to parse JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }
    
    return generateMockPerspective(text);
  } catch (error) {
    console.error('API Error:', error);
    return generateMockPerspective(text);
  }
}

// Mock data for demo when no API key
function generateMockPerspective(text: string): PerspectiveAnalysis {
  return {
    supporting: {
      title: '支持角度',
      points: [
        '这个观点在特定情境下确实有其合理性，可能基于某些可验证的观察或经验',
        '支持者往往看到了这个观点所指向的某些真实存在的问题或趋势',
        '在某些条件下，这个观点的逻辑链条是可以成立的',
        '如果问题确实存在，那么提出这个观点的出发点是值得肯定的',
      ],
    },
    opposing: {
      title: '反对角度',
      points: [
        '这个观点可能过度简化了复杂问题，忽略了个体差异和具体情况',
        '支持这个观点的证据可能不够充分，或者存在选择性偏差',
        '在某些文化、地域或历史背景下，这个观点可能并不适用',
        '反例的存在说明这个观点不是普遍真理，需要更谨慎的表述',
      ],
    },
    blindspots: {
      title: '盲点分析',
      points: [
        '作者可能没有考虑到这个观点对不同群体的差异化影响',
        '时间维度上的变化可能被忽视了——这个观点是否经得起时间检验？',
        '系统性、结构性因素可能被归因于个人选择或努力',
        '情感因素（如恐惧、焦虑）可能在悄悄影响判断',
      ],
    },
    stakeholders: {
      beneficiaries: [
        { group: '提供简单答案的人/机构', reason: '这个观点往往能让人快速做出判断，无需深入思考' },
        { group: '强化现有叙事的一方', reason: '符合某些主流叙事的观点更容易获得传播和认可' },
      ],
      losers: [
        { group: '复杂性思考者', reason: '这个观点可能抑制了人们对问题复杂性的认识' },
        { group: '被简单归类的群体', reason: '非黑即白的逻辑可能冤枉了具体情况复杂的个体' },
      ],
    },
  };
}

// Analyze logical structure and detect fallacies
export async function analyzeLogic(text: string): Promise<LogicAnalysis> {
  const sentences = extractSentences(text);
  const detectedFallacies: LogicFallacy[] = [];
  
  // Pattern-based fallacy detection
  for (const sentence of sentences) {
    for (const fallacy of fallacies) {
      if (fallacy.pattern.test(sentence)) {
        detectedFallacies.push({
          type: fallacy.type,
          description: fallacy.description,
          location: sentence.substring(0, 50) + '...',
          suggestion: fallacy.suggestion,
        });
      }
    }
  }

  // Deduplicate fallacies by type
  const uniqueFallacies = detectedFallacies.reduce((acc, curr) => {
    const exists = acc.find(f => f.type === curr.type);
    if (!exists) {
      acc.push(curr);
    }
    return acc;
  }, [] as LogicFallacy[]);

  // Determine overall strength
  let strength: 'weak' | 'moderate' | 'strong' = 'strong';
  if (uniqueFallacies.length >= 3) {
    strength = 'weak';
  } else if (uniqueFallacies.length >= 1) {
    strength = 'moderate';
  }

  return {
    structure: '该论证包含一个主要观点和多个支撑论据。建议检查论点之间的逻辑关系是否紧密。',
    premises: sentences.slice(0, 3).map(s => s.substring(0, 100)),
    conclusion: sentences[sentences.length - 1]?.substring(0, 100) || '未检测到明确结论',
    fallacies: uniqueFallacies,
    strength,
  };
}

// Generate multi-perspective analysis using simple rules (no LLM required)
export function generateLocalPerspective(text: string): PerspectiveAnalysis {
  // Simple keyword-based analysis
  const positiveKeywords = ['应该', '正确', '好', '重要', '必须', '需要', '价值', '意义', '好处'];
  const negativeKeywords = ['错误', '坏', '糟糕', '不能', '不要', '避免', '问题', '危险', '风险'];
  const hasPositive = positiveKeywords.some(k => text.includes(k));
  const hasNegative = negativeKeywords.some(k => text.includes(k));
  
  return {
    supporting: {
      title: '支持角度',
      points: [
        '从直觉上看，这个观点可能符合某些人的直接经验和感受',
        '如果这个观点来自对某类现象的观察，那么观察本身是有价值的',
        '在情绪层面，这个观点可能反映了某种真实的关切或期望',
        '提出这个观点至少说明有人在认真思考相关问题',
      ],
    },
    opposing: {
      title: '反对角度',
      points: [
        '个人经验和感受不一定能代表整体情况',
        '情绪化的表达可能影响判断的客观性',
        '这个观点是否经得起不同情境的检验？',
        '有没有相反的证据或案例？',
      ],
    },
    blindspots: {
      title: '盲点分析',
      points: [
        '这个观点主要反映了哪类人群的视角？是否有代表性？',
        '在时间维度上，这个观点是否有长期适用性？',
        '是否考虑了技术进步和社会变化带来的新变量？',
        '作者可能受到哪些信息渠道的影响？这些信息源可靠吗？',
      ],
    },
    stakeholders: {
      beneficiaries: [
        { group: '持有相同观点的人群', reason: '得到认同和支持，增强群体认同感' },
        { group: '观点的直接受益方', reason: '如果观点有利于特定群体，他们可能从中获益' },
      ],
      losers: [
        { group: '持不同观点的群体', reason: '可能感到被否定或边缘化' },
        { group: '追求客观真相的人', reason: '非黑即白的观点可能阻碍对复杂性的理解' },
      ],
    },
  };
}
