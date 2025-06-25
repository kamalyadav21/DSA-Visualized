import { LCSStep, getCellStatus } from '@/algorithms/lcs';

interface GridVisualizerProps {
  stringA: string;
  stringB: string;
  steps: LCSStep[];
  currentStep: number;
  totalSteps: number;
}

export default function GridVisualizer({ 
  stringA, 
  stringB, 
  steps, 
  currentStep, 
  totalSteps 
}: GridVisualizerProps) {
  const matrix = steps[Math.min(currentStep, steps.length - 1)]?.matrix || [];
  const progressPercentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  
  const getCellClasses = (row: number, col: number, value: number) => {
    const status = getCellStatus(row, col, currentStep, steps);
    const baseClasses = "w-12 h-12 flex items-center justify-center font-mono text-sm font-semibold rounded-lg mr-1 transition-all duration-300";
    
    switch (status) {
      case 'current':
        return `${baseClasses} bg-amber-100 border-2 border-amber-400 animate-pulse-soft`;
      case 'match':
        return `${baseClasses} bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg`;
      case 'max-value':
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg`;
      case 'final':
        return `${baseClasses} bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg`;
      case 'completed':
        return `${baseClasses} bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg`;
      default:
        return `${baseClasses} bg-gray-50 border border-gray-200 hover:shadow-md`;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <i className="fas fa-table text-emerald-500 mr-2"></i>
          Dynamic Programming Matrix
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Column Headers */}
          <div className="flex mb-2">
            <div className="w-12 h-12 flex items-center justify-center font-mono text-sm font-semibold"></div>
            <div className="w-12 h-12 flex items-center justify-center font-mono text-sm font-semibold bg-gray-100 rounded-lg mr-1">ε</div>
            {stringB.split('').map((char, index) => (
              <div 
                key={index} 
                className="w-12 h-12 flex items-center justify-center font-mono text-sm font-semibold bg-blue-100 text-blue-800 rounded-lg mr-1"
              >
                {char}
              </div>
            ))}
          </div>

          {/* Matrix Rows */}
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex mb-1">
              <div className="w-12 h-12 flex items-center justify-center font-mono text-sm font-semibold bg-emerald-100 text-emerald-800 rounded-lg mr-1">
                {rowIndex === 0 ? 'ε' : stringA[rowIndex - 1]}
              </div>
              {row.map((value, colIndex) => (
                <div 
                  key={colIndex} 
                  className={getCellClasses(rowIndex, colIndex, value)}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-amber-100 border-2 border-amber-400 rounded"></div>
            <span className="text-gray-700">Current Cell</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded"></div>
            <span className="text-gray-700">Match Found</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded"></div>
            <span className="text-gray-700">Max Value</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded"></div>
            <span className="text-gray-700">Final Result</span>
          </div>
        </div>
      </div>
    </div>
  );
}
