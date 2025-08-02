import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { SadhyaAnalysis, AnalysisResult } from './components/SadhyaAnalysis';
import { Footer } from './components/Footer';
import { analyzeSadhya } from './services/sadhyaAnalyzer';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = async (file: File, imageUrl: string) => {
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const result = await analyzeSadhya(file);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error gracefully
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setUploadedImage(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-4xl mx-auto">
          {!analysisResult ? (
            <div className="space-y-8">
              <ImageUpload 
                onImageUpload={handleImageUpload}
                isAnalyzing={isAnalyzing}
              />
              
              {isAnalyzing && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-lg">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
                    <span className="text-gray-700 font-medium">
                      AI is examining your Sadhya layout...
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Checking traditional placement rules
                  </p>
                </div>
              )}
              
              {/* How it works section */}
              {!uploadedImage && (
                <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    How It Works
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-yellow-600">1</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">Upload Photo</h3>
                      <p className="text-sm text-gray-600">
                        Take a clear photo of your Sadhya on the banana leaf
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-green-600">2</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">AI Analysis</h3>
                      <p className="text-sm text-gray-600">
                        Our AI detects items and checks traditional placement
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-orange-600">3</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">Get Verdict</h3>
                      <p className="text-sm text-gray-600">
                        Receive your score with cheeky Malayalam feedback!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Show uploaded image alongside results */}
              {uploadedImage && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                    Your Sadhya
                  </h3>
                  <div className="flex justify-center">
                    <img
                      src={uploadedImage}
                      alt="Analyzed Sadhya"
                      className="max-w-md w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              )}
              
              <SadhyaAnalysis result={analysisResult} />
              
              <div className="text-center">
                <button
                  onClick={handleNewAnalysis}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Analyze Another Sadhya
                </button>
              </div>
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;