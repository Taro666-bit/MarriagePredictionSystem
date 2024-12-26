interface NameAnalysis {
  strokes: number;
  elements: string[];
  pronunciation: string[];
}

// 计算笔画和谐度
export function calculateStrokeHarmony(name1: string, name2: string): number {
  // 暂时返回一个基于名字长度的简单计算
  const baseScore = 15;  // 基础分数
  const lengthFactor = Math.abs(name1.length - name2.length) <= 1 ? 5 : 0;  // 长度相近加分
  return baseScore + lengthFactor;
}

// 计算发音和谐度
export function calculatePronunciation(name1: string, name2: string): number {
  // 暂时返回一个基于名字特征的简单计算
  const baseScore = 15;
  // 如果名字中有相同的字，加分
  const commonChars = name1.split('').filter(char => name2.includes(char));
  const commonScore = Math.min(commonChars.length * 2, 5);
  return baseScore + commonScore;
}

// 分析性格特征
export function analyzePersonality(name: string): number {
  // 基于名字特征的简单性格分析
  const baseScore = 20;
  const length = name.length;
  const complexityScore = Math.min(length * 2, 10);  // 名字长度带来的复杂性分数
  return baseScore + complexityScore;
}

// 计算五行关系
export function calculateFiveElements(name1: string, name2: string): number {
  // 简单的五行计算
  return Math.floor(Math.random() * 5) + 5;  // 5-10分
}

// 计算文化寓意契合度
export function calculateCulturalMeaning(name1: string, name2: string): number {
  // 简单的文化寓意计算
  return Math.floor(Math.random() * 5) + 5;  // 5-10分
}

// 计算缘分值（保持稳定）
export function calculateDestiny(name1: string, name2: string): number {
  // 使用名字的特征生成稳定的随机数
  const seed = name1.length * name2.length;
  return (seed % 5) + 5;  // 5-10分
}

// 生成详细分析
export function generateDetails(scores: any): Array<{ title: string; text: string }> {
  return [
    {
      title: '基础契合',
      text: `你们的名字笔画和谐度为${scores.basicScore.strokeHarmony}分，发音和谐度为${scores.basicScore.pronunciation}分，这预示着良好的基础契合。`
    },
    {
      title: '性格分析',
      text: `基于名字特征分析，你们的性格互补性较强，沟通模式契合度高，这对婚姻关系的稳定发展很有帮助。`
    },
    {
      title: '缘分指数',
      text: `从五行相生相克关系和文化寓意来看，你们的缘分指数很高，这是难得的姻缘。`
    }
  ];
} 