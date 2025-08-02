import { AnalysisResult, SadhyaItem } from '../components/SadhyaAnalysis';

// Traditional Sadhya items and their expected positions
const TRADITIONAL_ITEMS: Omit<SadhyaItem, 'detected' | 'correctPosition' | 'confidence'>[] = [
  { name: 'Banana', malayalamName: 'പഴം', expectedPosition: 'Top left of leaf' },
  { name: 'Rice', malayalamName: 'ചോറ്', expectedPosition: 'Center of leaf' },
  { name: 'Sambar', malayalamName: 'സാമ്പാർ', expectedPosition: 'Left side, near rice' },
  { name: 'Rasam', malayalamName: 'രസം', expectedPosition: 'Left side, below sambar' },
  { name: 'Avial', malayalamName: 'അവിയൽ', expectedPosition: 'Top center, above rice' },
  { name: 'Thoran', malayalamName: 'തോരൻ', expectedPosition: 'Right side of rice' },
  { name: 'Pickle', malayalamName: 'അച്ചാർ', expectedPosition: 'Top right corner' },
  { name: 'Payasam', malayalamName: 'പായസം', expectedPosition: 'Bottom right' },
  { name: 'Papad', malayalamName: 'പപ്പടം', expectedPosition: 'Top of leaf' },
  { name: 'Chips', malayalamName: 'ചിപ്സ്', expectedPosition: 'Top right area' }
];

// Mock detection results - in real implementation, this would come from ML model
const generateMockDetection = (): SadhyaItem[] => {
  return TRADITIONAL_ITEMS.map(item => ({
    ...item,
    detected: Math.random() > 0.2, // 80% chance of detection
    correctPosition: Math.random() > 0.3, // 70% chance of correct position
    confidence: Math.floor(Math.random() * 30) + 70 // 70-99% confidence
  }));
};

const calculateScore = (items: SadhyaItem[]): number => {
  const detectedItems = items.filter(item => item.detected);
  const correctlyPlaced = items.filter(item => item.detected && item.correctPosition);
  
  if (detectedItems.length === 0) return 0;
  
  const detectionScore = (detectedItems.length / items.length) * 50;
  const placementScore = (correctlyPlaced.length / detectedItems.length) * 50;
  
  return Math.round(detectionScore + placementScore);
};

const generateVerdict = (score: number, correctlyPlaced: number, totalDetected: number): { verdict: string; malayalamVerdict: string } => {
  if (score >= 90) {
    return {
      verdict: "Outstanding! Your Sadhya is absolutely perfect!",
      malayalamVerdict: "നീ ഒരു ചക്ക ഷെഫ് അല്ലേ! 👨‍🍳✨"
    };
  } else if (score >= 80) {
    return {
      verdict: "Excellent placement! Traditional grandmothers would be proud!",
      malayalamVerdict: "സൂപ്പർ! അമ്മൂമ്മമാർ അഭിമാനിക്കും! 👵❤️"
    };
  } else if (score >= 70) {
    return {
      verdict: "Good attempt! A few adjustments and you'll be perfect!",
      malayalamVerdict: "നല്ലതാ! കുറച്ച് പ്രാക്ടീസ് കൂടി വേണം 😊"
    };
  } else if (score >= 50) {
    return {
      verdict: "Not bad for a beginner, but room for improvement!",
      malayalamVerdict: "ശേരി, പക്ഷേ കുറച്ച് കൂടി ശ്രദ്ധിക്കണം 🤔"
    };
  } else {
    return {
      verdict: "Oops! This needs some serious rearrangement!",
      malayalamVerdict: "ഏടാ ഇതൊക്കെ സാധ്യയോ സാലഡോ? 😅🤪"
    };
  }
};

const generateRecommendations = (items: SadhyaItem[]): string[] => {
  const recommendations: string[] = [];
  
  const missingItems = items.filter(item => !item.detected);
  const misplacedItems = items.filter(item => item.detected && !item.correctPosition);
  
  if (missingItems.length > 0) {
    recommendations.push(`Add missing items: ${missingItems.map(item => item.malayalamName).join(', ')}`);
  }
  
  if (misplacedItems.length > 0) {
    recommendations.push("Rearrange items according to traditional positions shown in the layout guide");
  }
  
  // Specific traditional recommendations
  const rice = items.find(item => item.name === 'Rice');
  if (!rice?.detected) {
    recommendations.push("Rice should be the centerpiece of your Sadhya - place it in the middle of the leaf");
  }
  
  const banana = items.find(item => item.name === 'Banana');
  if (!banana?.correctPosition) {
    recommendations.push("Place banana slices on the top-left corner for auspicious beginning");
  }
  
  const payasam = items.find(item => item.name === 'Payasam');
  if (!payasam?.correctPosition) {
    recommendations.push("Payasam should be on bottom-right for a sweet ending");
  }
  
  if (recommendations.length === 0) {
    recommendations.push("Your Sadhya layout is traditional and well-arranged!");
  }
  
  return recommendations.slice(0, 4); // Limit to 4 recommendations
};

export const analyzeSadhya = async (imageFile: File): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  const items = generateMockDetection();
  const score = calculateScore(items);
  const correctlyPlaced = items.filter(item => item.detected && item.correctPosition).length;
  const totalDetected = items.filter(item => item.detected).length;
  
  const { verdict, malayalamVerdict } = generateVerdict(score, correctlyPlaced, totalDetected);
  const recommendations = generateRecommendations(items);
  
  return {
    items,
    overallScore: score,
    verdict,
    malayalamVerdict,
    recommendations
  };
};