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
    // Premium Fields (15-section profile)
    year?: number | null;
    parfumeur?: string | null;
    concentration?: string | null;
    rating?: number;
    sillage?: number;
    longevity?: number;
    projection?: number;
    uniqueness?: number;
    priceValue?: number;
    duftDNA?: { blumig?: number; holzig?: number; frisch?: number; süss?: number; würzig?: number } | null;
    poeticDescription?: string | null;
    duftJourney?: { morgen?: string; mittag?: string; abend?: string; nacht?: string } | null;
    characterTags?: string[] | null;
    personalityType?: string | null;
    mood?: string | null;
    seasonRecommendation?: string | null;
    occasion?: string[] | null;
    climate?: string[] | null;
    perfectMoment?: string | null;
    comparisonPerfumes?: Array<{ name: string; reason: string }> | null;
    funFacts?: string[] | null;
    famouswearers?: string[] | null;
    history?: string | null;
    similarPerfumes?: Array<{ name: string; reason: string }> | null;
  };
  error?: string;
}

export interface AnalysisResponse {
  success: boolean;
  data?: ImageAnalysisResult['data'];
  error?: string;
}
