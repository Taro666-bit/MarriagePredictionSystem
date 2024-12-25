export interface PredictionResult {
  score: number;
  description: string;
  details: Array<{
    title: string;
    text: string;
  }>;
} 