import { useState, useEffect, useCallback } from 'react';
import { calculateLCS, LCSResult } from '@/algorithms/lcs';
import GridVisualizer from '@/components/GridVisualizer';
import ControlPanel from '@/components/ControlPanel';

export default function Home() {
  const [stringA, setStringA] = useState('ABCDGH');
  const [stringB, setStringB] = useState('AEDFHR');
  const [lcsResult, setLcsResult] = useState<LCSResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);

  // Calculate LCS when strings change
  const calculateLCSForStrings = useCallback(() => {
    if (stringA && stringB) {
      const result = calculateLCS(stringA, stringB);
      setLcsResult(result);
      setCurrentStep(0);
      setIsAutoPlaying(false);
    }
  }, [stringA, stringB]);

  useEffect(() => {
    calculateLCSForStrings();
  }, [calculateLCSForStrings]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && lcsResult && currentStep < lcsResult.steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, playbackSpeed);
      return () => clearTimeout(timer);
    } else if (isAutoPlaying && lcsResult && currentStep >= lcsResult.steps.length) {
      setIsAutoPlaying(false);
    }
  }, [isAutoPlaying, currentStep, lcsResult, playbackSpeed]);

  const handleNextStep = () => {
    if (lcsResult && currentStep < lcsResult.steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleToggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsAutoPlaying(false);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const calculateSimilarity = () => {
    if (!lcsResult || !stringA || !stringB) return 0;
    const maxLength = Math.max(stringA.length, stringB.length);
    return maxLength > 0 ? Math.round((lcsResult.lcsLength / maxLength) * 100) : 0;
  };

  if (!lcsResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                <i className="fas fa-project-diagram text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LCS Algorithm Visualizer</h1>
                <p className="text-sm text-gray-600">Longest Common Subsequence Dynamic Programming</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Educational Tool
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-keyboard text-blue-500 mr-2"></i>
            Input Strings
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">String A</label>
              <input 
                type="text" 
                value={stringA}
                onChange={(e) => setStringA(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-mono bg-gray-50 hover:bg-white"
                placeholder="Enter first string..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">String B</label>
              <input 
                type="text" 
                value={stringB}
                onChange={(e) => setStringB(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-mono bg-gray-50 hover:bg-white"
                placeholder="Enter second string..."
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span>LCS Length: {lcsResult.lcsLength}</span> • 
              <span> Result: "{lcsResult.lcsString}"</span>
            </div>
            <button 
              onClick={calculateLCSForStrings}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <i className="fas fa-calculator mr-2"></i>Calculate
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Grid Visualizer */}
          <div className="lg:col-span-3">
            <GridVisualizer
              stringA={stringA}
              stringB={stringB}
              steps={lcsResult.steps}
              currentStep={currentStep}
              totalSteps={lcsResult.steps.length}
            />
          </div>

          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel
              currentStep={currentStep}
              totalSteps={lcsResult.steps.length}
              isAutoPlaying={isAutoPlaying}
              playbackSpeed={playbackSpeed}
              steps={lcsResult.steps}
              onNextStep={handleNextStep}
              onToggleAutoPlay={handleToggleAutoPlay}
              onReset={handleReset}
              onSpeedChange={handleSpeedChange}
            />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-chart-line text-purple-500 mr-2"></i>
            Performance Metrics
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <i className="fas fa-clock text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Execution Time</p>
                  <p className="text-lg font-bold text-blue-600">{lcsResult.executionTime.toFixed(2)}ms</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200/50">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-500 p-2 rounded-lg">
                  <i className="fas fa-memory text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Memory Used</p>
                  <p className="text-lg font-bold text-emerald-600">{(stringA.length + 1) * (stringB.length + 1)} cells</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/50">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-500 p-2 rounded-lg">
                  <i className="fas fa-calculator text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Comparisons</p>
                  <p className="text-lg font-bold text-amber-600">{lcsResult.totalComparisons}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200/50">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <i className="fas fa-percentage text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Similarity</p>
                  <p className="text-lg font-bold text-purple-600">{calculateSimilarity()}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Built with <i className="fas fa-heart text-red-500"></i> using Vite + React + Tailwind CSS
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Educational tool for understanding dynamic programming algorithms
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
