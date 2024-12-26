import type {
  BasicCompatibility,
  ValueCompatibility,
  EmotionalCompatibility,
  GrowthCompatibility,
  CompatibilityResult
} from '@/types/compatibility';

// 生成基于名字特征的基础分数 (范围0-10)
function generateBaseScore(name: string): number {
  const seed = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (seed % 6) + 5; // 生成5-10的稳定分数
}

// 计算基础契合度
export function calculateBasicCompatibility(name1: string, name2: string): BasicCompatibility {
  const personality = {
    introversion: generateBaseScore(name1 + name2),
    decisionMaking: generateBaseScore(name2 + name1),
    lifeRhythm: generateBaseScore(name1[0] + name2[0]),
    socialNeeds: generateBaseScore(name1.slice(-1) + name2.slice(-1)),
    total: 0
  };
  personality.total = Math.floor(
    (personality.introversion + personality.decisionMaking + 
     personality.lifeRhythm + personality.socialNeeds) / 4 * 10
  );

  const lifestyle = {
    schedule: generateBaseScore(name2 + name1),
    habits: generateBaseScore(name1 + name2[0]),
    interests: generateBaseScore(name2 + name1[0]),
    diet: generateBaseScore(name1.slice(-1) + name2),
    total: 0
  };
  lifestyle.total = Math.floor(
    (lifestyle.schedule + lifestyle.habits + 
     lifestyle.interests + lifestyle.diet) / 4 * 10
  );

  return {
    personality,
    lifestyle,
    total: Math.floor((personality.total + lifestyle.total) / 2)
  };
}

// 计算价值观契合度
export function calculateValueCompatibility(name1: string, name2: string): ValueCompatibility {
  const lifeValues = {
    workLifeBalance: generateBaseScore(name1 + name2),
    personalDevelopment: generateBaseScore(name2 + name1),
    qualityOfLife: generateBaseScore(name1[0] + name2[0]),
    total: 0
  };
  lifeValues.total = Math.floor(
    (lifeValues.workLifeBalance + lifeValues.personalDevelopment + 
     lifeValues.qualityOfLife) / 3 * 10
  );

  // ... 类似地计算 familyValues 和 financialValues
  // 为了保持代码简洁，这里省略了部分实现

  return {
    lifeValues,
    familyValues: {
      marriageExpectation: generateBaseScore(name1 + name2),
      responsibility: generateBaseScore(name2 + name1),
      parenting: generateBaseScore(name1 + name2),
      total: Math.floor(generateBaseScore(name1 + name2) * 10)
    },
    financialValues: {
      spending: generateBaseScore(name1 + name2),
      investment: generateBaseScore(name2 + name1),
      planning: generateBaseScore(name1 + name2),
      total: Math.floor(generateBaseScore(name1 + name2) * 10)
    },
    total: Math.floor(generateBaseScore(name1 + name2) * 10)
  };
}

// 获取匹配等级描述
export function getMatchLevel(score: number): string {
  if (score >= 90) return "极其理想的匹配";
  if (score >= 80) return "优秀的匹配";
  if (score >= 70) return "良好的匹配";
  if (score >= 60) return "需要努力的匹配";
  return "具有挑战的匹配";
}

// 生成建议
export function generateSuggestions(result: CompatibilityResult): Array<{
  category: string;
  title: string;
  content: string;
  priority: number;
}> {
  const suggestions = [];
  
  // 基于分数生成建议
  if (result.basic.total < 70) {
    suggestions.push({
      category: '基础契合',
      title: '生活习惯调适建议',
      content: '建议双方多沟通各自的生活习惯，找出差异点，共同制定适应计划。',
      priority: 1
    });
  }

  // 添加更多建议...
  
  return suggestions;
}

// 定义风险等级类型
type RiskSeverity = 'low' | 'medium' | 'high';

// 定义风险项类型
interface Risk {
  area: string;
  description: string;
  severity: RiskSeverity;
  suggestions: string[];
}

function assessRisks(result: CompatibilityResult): Risk[] {
  const risks: Risk[] = [];

  // 性格差异风险
  if (result.basic?.personality?.total < 60) {
    risks.push({
      area: '性格差异',
      description: '你们的性格特征存在较大差异',
      severity: 'high',
      suggestions: [
        '尝试相互理解和包容对方的性格特点',
        '寻找共同兴趣和活动来增进理解',
        '保持开放和诚实的沟通'
      ]
    });
  }

  // 生活习惯风险
  if (result.basic?.lifestyle?.total < 70) {
    risks.push({
      area: '生活习惯',
      description: '你们的生活习惯存在一定差异',
      severity: 'medium',
      suggestions: [
        '共同制定生活规划和时间表',
        '相互妥协和适应对方的习惯',
        '建立共同的家庭规则'
      ]
    });
  }

  // 价值观风险
  if (result.values?.lifeValues?.total < 80) {
    risks.push({
      area: '价值观差异',
      description: '你们在人生价值观方面存在分歧',
      severity: 'high',
      suggestions: [
        '深入交流彼此的人生目标和理想',
        '寻找共同的价值观和追求',
        '尊重对方的个人发展诉求'
      ]
    });
  }

  // 经济观念风险
  if (result.values?.financialValues?.total < 70) {
    risks.push({
      area: '经济观念',
      description: '你们在经济观念上有显著差异',
      severity: 'medium',
      suggestions: [
        '制定共同的财务计划',
        '建立透明的家庭财务制度',
        '平衡个人和家庭的经济需求'
      ]
    });
  }

  // 沟通表达风险
  if (result.emotional?.communication?.total < 70) {
    risks.push({
      area: '沟通表达',
      description: '你们在沟通方式上存在障碍',
      severity: 'medium',
      suggestions: [
        '学习积极倾听的技巧',
        '避免使用消极或攻击性的语言',
        '定期进行深入的情感交流'
      ]
    });
  }

  // 情感共鸣风险
  if (result.emotional?.empathy?.total < 60) {
    risks.push({
      area: '情感共鸣',
      description: '你们在情感共鸣方面有待提升',
      severity: 'high',
      suggestions: [
        '培养同理心和感同身受的能力',
        '多关注对方的情感需求',
        '在关键时刻给予情感支持'
      ]
    });
  }

  return risks;
}

// 计算情感沟通能力
export function calculateEmotionalCompatibility(name1: string, name2: string): EmotionalCompatibility {
  const communication = {
    expression: generateBaseScore(name1 + name2),
    listening: generateBaseScore(name2 + name1),
    emotionalExpression: generateBaseScore(name1[0] + name2[0]),
    total: 0
  };
  communication.total = Math.floor(
    (communication.expression + communication.listening + 
     communication.emotionalExpression) / 3 * 10
  );

  const conflictResolution = {
    problemSolving: generateBaseScore(name1 + name2),
    tolerance: generateBaseScore(name2 + name1),
    emotionalControl: generateBaseScore(name1 + name2[0]),
    total: 0
  };
  conflictResolution.total = Math.floor(
    (conflictResolution.problemSolving + conflictResolution.tolerance + 
     conflictResolution.emotionalControl) / 3 * 10
  );

  const empathy = {
    understanding: generateBaseScore(name1 + name2),
    support: generateBaseScore(name2 + name1),
    maintenance: generateBaseScore(name1 + name2),
    total: 0
  };
  empathy.total = Math.floor(
    (empathy.understanding + empathy.support + 
     empathy.maintenance) / 3 * 10
  );

  return {
    communication,
    conflictResolution,
    empathy,
    total: Math.floor(
      (communication.total + conflictResolution.total + empathy.total) / 3
    )
  };
}

// 计算成长潜力
export function calculateGrowthCompatibility(name1: string, name2: string): GrowthCompatibility {
  const development = {
    commonGoals: generateBaseScore(name1 + name2),
    complementarity: generateBaseScore(name2 + name1),
    valueEvolution: generateBaseScore(name1[0] + name2[0]),
    total: 0
  };
  development.total = Math.floor(
    (development.commonGoals + development.complementarity + 
     development.valueEvolution) / 3 * 10
  );

  const support = {
    familyRelations: generateBaseScore(name1 + name2),
    socialNetwork: generateBaseScore(name2 + name1),
    commonFriends: generateBaseScore(name1 + name2[0]),
    total: 0
  };
  support.total = Math.floor(
    (support.familyRelations + support.socialNetwork + 
     support.commonFriends) / 3 * 10
  );

  const resilience = {
    attitude: generateBaseScore(name1 + name2),
    problemSolving: generateBaseScore(name2 + name1),
    mentalToughness: generateBaseScore(name1 + name2),
    total: 0
  };
  resilience.total = Math.floor(
    (resilience.attitude + resilience.problemSolving + 
     resilience.mentalToughness) / 3 * 10
  );

  return {
    development,
    support,
    resilience,
    total: Math.floor(
      (development.total + support.total + resilience.total) / 3
    )
  };
}

// 计算总体匹配度
export function calculateOverallCompatibility(name1: string, name2: string): CompatibilityResult {
  const basic = calculateBasicCompatibility(name1, name2);
  const values = calculateValueCompatibility(name1, name2);
  const emotional = calculateEmotionalCompatibility(name1, name2);
  const growth = calculateGrowthCompatibility(name1, name2);

  // 计算总分 (基于权重)
  const totalScore = Math.floor(
    basic.total * 0.2 +      // 基础契合度 20%
    values.total * 0.3 +     // 价值观契合度 30%
    emotional.total * 0.25 + // 情感沟通能力 25%
    growth.total * 0.25      // 成长潜力 25%
  );

  const matchLevel = getMatchLevel(totalScore);

  // 生成建议和风险评估
  const result: CompatibilityResult = {
    basic,
    values,
    emotional,
    growth,
    totalScore,
    matchLevel,
    suggestions: [],
    risks: []
  };

  result.suggestions = generateSuggestions(result);
  result.risks = assessRisks(result);

  return result;
} 