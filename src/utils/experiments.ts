type Variant = 'control' | 'variant';

interface Experiment {
  id: string;
  variants: Record<Variant, number>;
}

const EXPERIMENTS: Record<string, Experiment> = {
  'new-hero-design': {
    id: 'new-hero-design',
    variants: {
      control: 0.5,  // 50%的用户看到原始版本
      variant: 0.5,  // 50%的用户看到新版本
    },
  },
  'cta-button-color': {
    id: 'cta-button-color',
    variants: {
      control: 0.5,  // 蓝色按钮
      variant: 0.5,  // 绿色按钮
    },
  },
};

export function getExperimentVariant(experimentId: string): Variant {
  const experiment = EXPERIMENTS[experimentId];
  if (!experiment) return 'control';

  // 获取或生成用户ID
  const userId = getUserId();
  
  // 基于用户ID和实验ID生成一个确定性的随机数
  const hash = hashCode(`${userId}-${experimentId}`);
  const normalizedHash = (hash % 100) / 100;

  // 根据权重分配变体
  let cumulative = 0;
  for (const [variant, weight] of Object.entries(experiment.variants)) {
    cumulative += weight;
    if (normalizedHash < cumulative) {
      return variant as Variant;
    }
  }

  return 'control';
}

// 获取或生成用户ID
function getUserId(): string {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = Math.random().toString(36).substring(2);
    localStorage.setItem('userId', userId);
  }
  return userId;
}

// 简单的字符串哈希函数
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
} 