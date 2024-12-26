export interface PredictionResult {
  score: number;
  description: string;
  details: Array<{
    title: string;
    text: string;
  }>;
  name1: string;
  name2: string;
} 