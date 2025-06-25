import { LCSStep } from '@/algorithms/lcs';

interface ControlPanelProps {
  currentStep: number;
  totalSteps: number;
  isAutoPlaying: boolean;
  playbackSpeed: number;
  steps: LCSStep[];
  onNextStep: () => void;
  onToggleAutoPlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function ControlPanel({
  currentStep,
  totalSteps,
  isAutoPlaying,
  playbackSpeed,
  steps,
  onNextStep,
  onToggleAutoPlay,
  onReset,
  onSpeedChange
}: ControlPanelProps) {
  const currentStepData = steps[Math.min(currentStep, steps.length - 1)];
  const currentOperation = currentStepData?.operation || 'initialize';
  const currentCharA = currentStepData?.charA || '';
  const currentCharB = currentStepData?.charB || '';
  const currentPosition = currentStepData ? `(${currentStepData.row}, ${currentStepData.col})` : '(0, 0)';

  const getOperationDisplay = (operation: string) => {
    switch (operation) {
      case 'initialize': return 'Initialize';
      case 'compare': return 'Compare';
      case 'match': return 'Match Found';
      case 'no-match': return 'No Match';
      case 'complete': return 'Complete';
      default: return 'Processing';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Control Panel */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 animate-fade-in sticky top-24">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <i className="fas fa-gamepad text-amber-500 mr-2"></i>
          Controls
        </h2>

        {/* Play Controls */}
        <div className="space-y-4">
          <button 
            onClick={onNextStep}
            disabled={currentStep >= totalSteps}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <i className="fas fa-step-forward mr-2"></i>
            Next Step
          </button>

          <button 
            onClick={onToggleAutoPlay}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-3 rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center font-medium"
          >
            <i className={`fas ${isAutoPlaying ? 'fa-pause' : 'fa-play'} mr-2`}></i>
            {isAutoPlaying ? 'Pause' : 'Auto Play'}
          </button>

          <button 
            onClick={onReset}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-3 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center font-medium"
          >
            <i className="fas fa-undo mr-2"></i>
            Reset
          </button>
        </div>

        {/* Speed Control */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">Animation Speed</label>
          <div className="relative">
            <input 
              type="range" 
              min="100" 
              max="2000" 
              value={playbackSpeed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Algorithm Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Operation:</span>
              <span className="font-medium text-blue-600">{getOperationDisplay(currentOperation)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time Complexity:</span>
              <span className="font-mono text-emerald-600">O(m×n)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Space Complexity:</span>
              <span className="font-mono text-emerald-600">O(m×n)</span>
            </div>
          </div>
        </div>

        {/* Current Comparison */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Current Comparison</h3>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-4 text-lg font-mono">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg">{currentCharA}</span>
              <i className="fas fa-arrows-left-right text-gray-400"></i>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">{currentCharB}</span>
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              Position: {currentPosition}
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-lightbulb text-amber-500 mr-2"></i>
          How LCS Works
        </h3>
        <div className="text-sm text-gray-700 space-y-3">
          <p>The Longest Common Subsequence algorithm uses dynamic programming to find the longest sequence that appears in both strings.</p>
          <div className="bg-white/70 rounded-lg p-3">
            <p className="font-medium mb-2">Algorithm Steps:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Create a matrix of size (m+1) × (n+1)</li>
              <li>Initialize first row and column to 0</li>
              <li>For each cell, compare characters</li>
              <li>If match: add 1 to diagonal value</li>
              <li>If no match: take maximum of left/top</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
