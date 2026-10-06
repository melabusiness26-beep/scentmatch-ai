// Analyse-Result von Claude für Bild-Input
export interface ImageAnalysisResult {
  where?: 'person' | 'store' | 'holiday' | 'hotel' | 'online' | null;
  gender?: 'self_woman' | 'self_man' | 'gift_woman' | 'gift_man' | 'unisex' | null;
  feeling?: 'fresh' | 'warm' | 'woody' | 'floral' | 'oriental' | 'spicy' | null;
  intensity?: 'very_light' | 'light' | 'medium' | 'strong' | 'very_strong' | null;
  occasion?: 'daily' | 'office' | 'evening' | 'special' | null;
  bottleDescription?: string | null;
  brandName?: string | null;
  perfumeName?: string | null;
  confidence: 'high' | 'medium' | 'low';
}

// API Request/Response
export interface AnalyzeImageRequest {
  imageBase64: string;
  includeProductInfo?: boolean; // für /duft-scanner: mit brandName/perfumeName
}

export interface AnalyzeImageResponse {
  success: boolean;
  data?: ImageAnalysisResult;
  error?: string;
}
