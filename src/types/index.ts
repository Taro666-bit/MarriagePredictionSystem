export interface PredictionResult {
  score: number;
  name1: string;
  name2: string;
  description: string;
  basic: {
    total: number;
    personality: {
      total: number;
    };
    lifestyle: {
      total: number;
    };
  };
  values: {
    total: number;
    lifeValues: {
      total: number;
    };
    financialValues: {
      total: number;
    };
  };
  emotional: {
    total: number;
    communication: {
      total: number;
    };
    empathy: {
      total: number;
    };
  };
} 