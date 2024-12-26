// 基础契合度评分
export interface BasicCompatibility {
  personality: {
    introversion: number;     // 内向/外向
    decisionMaking: number;   // 理性/感性
    lifeRhythm: number;      // 生活节奏
    socialNeeds: number;      // 社交需求
    total: number;           // 总分
  };
  lifestyle: {
    schedule: number;        // 作息时间
    habits: number;          // 生活习惯
    interests: number;       // 兴趣爱好
    diet: number;           // 饮食习惯
    total: number;          // 总分
  };
  total: number;            // 基础契合度总分
}

// 价值观契合度评分
export interface ValueCompatibility {
  lifeValues: {
    workLifeBalance: number;    // 工作与生活平衡
    personalDevelopment: number; // 个人发展
    qualityOfLife: number;      // 生活质量追求
    total: number;
  };
  familyValues: {
    marriageExpectation: number; // 婚姻期待
    responsibility: number;      // 家庭责任
    parenting: number;          // 教育理念
    total: number;
  };
  financialValues: {
    spending: number;           // 消费习惯
    investment: number;         // 理财方式
    planning: number;           // 经济规划
    total: number;
  };
  total: number;
}

// 情感沟通能力评分
export interface EmotionalCompatibility {
  communication: {
    expression: number;        // 表达能力
    listening: number;         // 倾听能力
    emotionalExpression: number; // 情绪表达
    total: number;
  };
  conflictResolution: {
    problemSolving: number;    // 问题解决
    tolerance: number;         // 包容度
    emotionalControl: number;  // 情绪管理
    total: number;
  };
  empathy: {
    understanding: number;     // 理解能力
    support: number;          // 情感支持
    maintenance: number;      // 关系维护
    total: number;
  };
  total: number;
}

// 成长潜力评分
export interface GrowthCompatibility {
  development: {
    commonGoals: number;      // 共同目标
    complementarity: number;  // 互补性
    valueEvolution: number;   // 价值观进化
    total: number;
  };
  support: {
    familyRelations: number;  // 原生家庭
    socialNetwork: number;    // 社交网络
    commonFriends: number;    // 共同朋友
    total: number;
  };
  resilience: {
    attitude: number;         // 态度
    problemSolving: number;   // 解决能力
    mentalToughness: number;  // 心理韧性
    total: number;
  };
  total: number;
}

// 完整的评估结果
export interface CompatibilityResult {
  basic: BasicCompatibility;
  values: ValueCompatibility;
  emotional: EmotionalCompatibility;
  growth: GrowthCompatibility;
  totalScore: number;
  matchLevel: string;
  suggestions: Array<{
    category: string;
    title: string;
    content: string;
    priority: number;
  }>;
  risks: Array<{
    area: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    suggestions: string[];
  }>;
} 