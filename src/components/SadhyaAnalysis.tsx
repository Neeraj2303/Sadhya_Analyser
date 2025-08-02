import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Star } from 'lucide-react';

export interface SadhyaItem {
  name: string;
  malayalamName: string;
  expectedPosition: string;
  detected: boolean;
  correctPosition: boolean;
  confidence: number;
}

export interface AnalysisResult {
  items: SadhyaItem[];
  overallScore: number;
  verdict: string;
  malayalamVerdict: string;
  recommendations: string[];
}

interface SadhyaAnalysisProps {
  result: AnalysisResult;
}

export const SadhyaAnalysis: React.FC<SadhyaAnalysisProps> = ({ result }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (score >= 60) return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    return <XCircle className="w-6 h-6 text-red-600" />;
  };

  const renderStars = (score: number) => {
    const stars = Math.round((score / 100) * 5);
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Overall Score */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getScoreIcon(result.overallScore)}
            <h3 className="text-xl font-bold text-gray-800">Sadhya Score</h3>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(result.overallScore)}`}>
              {result.overallScore}/100
            </div>
            {renderStars(result.overallScore)}
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-700">{result.verdict}</p>
          <p className="text-lg text-yellow-700 font-medium">{result.malayalamVerdict}</p>
        </div>
      </div>

      {/* Detected Items */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          Detected Items
        </h4>
        
        <div className="grid gap-3">
          {result.items.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                item.detected 
                  ? item.correctPosition 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-yellow-200 bg-yellow-50'
                  : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-sm text-gray-600">({item.malayalamName})</span>
                </div>
                <p className="text-sm text-gray-500">Expected: {item.expectedPosition}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                {item.detected ? (
                  <>
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round(item.confidence)}%
                    </span>
                    {item.correctPosition ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    )}
                  </>
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            Suggestions for Perfect Sadhya
          </h4>
          
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Traditional Layout Guide */}
      <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl shadow-lg p-6 border border-green-200">
        <h4 className="text-lg font-bold text-gray-800 mb-4">Traditional Sadhya Layout</h4>
        
        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-green-300">
          <div className="text-center text-gray-600 mb-2">
            <span className="text-sm font-medium">Banana Leaf Layout</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-2 bg-yellow-100 rounded">
              <div className="font-medium">Banana</div>
              <div className="text-gray-600">Top Left</div>
            </div>
            <div className="text-center p-2 bg-green-100 rounded">
              <div className="font-medium">Rice</div>
              <div className="text-gray-600">Center</div>
            </div>
            <div className="text-center p-2 bg-red-100 rounded">
              <div className="font-medium">Pickles</div>
              <div className="text-gray-600">Top Right</div>
            </div>
            <div className="text-center p-2 bg-orange-100 rounded">
              <div className="font-medium">Sambar</div>
              <div className="text-gray-600">Left</div>
            </div>
            <div className="text-center p-2 bg-purple-100 rounded">
              <div className="font-medium">Curry</div>
              <div className="text-gray-600">Around Rice</div>
            </div>
            <div className="text-center p-2 bg-pink-100 rounded">
              <div className="font-medium">Payasam</div>
              <div className="text-gray-600">Bottom Right</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};