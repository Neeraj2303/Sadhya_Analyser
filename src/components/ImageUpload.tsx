import React, { useCallback, useState } from 'react';
import { Upload, Camera, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File, imageUrl: string) => void;
  isAnalyzing: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageUpload(file, url);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!previewUrl ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-yellow-400 bg-yellow-50 scale-105' 
              : 'border-yellow-300 hover:border-yellow-400 hover:bg-yellow-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isAnalyzing}
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-yellow-100 rounded-full">
                <Upload className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Upload your Sadhya photo
              </p>
              <p className="text-sm text-gray-500">
                Drag & drop or click to select
              </p>
              <p className="text-xs text-gray-400 mt-2">
                JPG, PNG, WebP up to 10MB
              </p>
            </div>
            
            <div className="flex justify-center">
              <Camera className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={previewUrl}
              alt="Uploaded Sadhya"
              className="w-full h-64 object-cover"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-2"></div>
                  <p className="text-sm">Analyzing your Sadhya...</p>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={clearImage}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
            disabled={isAnalyzing}
          >
            <X className="w-4 h-4" />
          </button>
          
          <p className="text-center text-sm text-gray-600 mt-2">
            Ready to analyze your Sadhya layout!
          </p>
        </div>
      )}
    </div>
  );
};