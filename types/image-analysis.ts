export interface ImageAnalysisResult {
  success: boolean;
  data?: {
    perfumeName: string;
    brandName: string;
    confidence: 'high' | 'medium' | 'low';
    notes: {
      top: string[];
      heart: string[];
      base: string[];
    };
    development: {
      opening: string;
      middleGame: string;
      drydown: string;
    };
    family: string;
    origin?: string;
    usageRecommendations: {
      occasions: string[];
      seasons: string[];
      timeOfDay: string[];
      skinType?: string[];
    };
    intensity: 'very_light' | 'light' | 'medium' | 'strong' | 'very_strong' | undefined;
    gender: 'woman' | 'man' | 'unisex' | null;
    bottleDescription: string;
    generalDescription: string;
  };
  error?: string;
}

export interface AnalysisResponse {
  success: boolean;
  data?: ImageAnalysisResult['data'];
  error?: string;
}

// Legacy types for /api/analyze-image (old endpoint)
export interface AnalyzeImageRequest {
  imageBase64: string;
  includeProductInfo?: boolean;
}

export interface AnalyzeImageResponse {
  success: boolean;
  data?: ImageAnalysisResult;
  error?: string;
}
