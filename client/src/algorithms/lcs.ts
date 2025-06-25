export interface LCSStep {
  row: number;
  col: number;
  charA: string;
  charB: string;
  operation: 'initialize' | 'compare' | 'match' | 'no-match' | 'complete';
  value: number;
  decision: 'diagonal' | 'left' | 'top' | 'none';
  matrix: number[][];
}

export interface LCSResult {
  steps: LCSStep[];
  finalMatrix: number[][];
  lcsLength: number;
  lcsString: string;
  totalComparisons: number;
  executionTime: number;
}

export function calculateLCS(stringA: string, stringB: string): LCSResult {
  const startTime = performance.now();
  const steps: LCSStep[] = [];
  const m = stringA.length;
  const n = stringB.length;
  
  // Create matrix with extra row and column for empty string
  const matrix: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  let totalComparisons = 0;
  
  // Initialize first row and column (already 0)
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        steps.push({
          row: i,
          col: j,
          charA: i === 0 ? 'ε' : stringA[i - 1],
          charB: j === 0 ? 'ε' : stringB[j - 1],
          operation: 'initialize',
          value: 0,
          decision: 'none',
          matrix: matrix.map(row => [...row])
        });
      }
    }
  }
  
  // Fill the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      totalComparisons++;
      
      const charA = stringA[i - 1];
      const charB = stringB[j - 1];
      
      if (charA === charB) {
        // Characters match - take diagonal + 1
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
        steps.push({
          row: i,
          col: j,
          charA,
          charB,
          operation: 'match',
          value: matrix[i][j],
          decision: 'diagonal',
          matrix: matrix.map(row => [...row])
        });
      } else {
        // Characters don't match - take max of left and top
        const leftValue = matrix[i][j - 1];
        const topValue = matrix[i - 1][j];
        
        if (leftValue >= topValue) {
          matrix[i][j] = leftValue;
          steps.push({
            row: i,
            col: j,
            charA,
            charB,
            operation: 'no-match',
            value: matrix[i][j],
            decision: 'left',
            matrix: matrix.map(row => [...row])
          });
        } else {
          matrix[i][j] = topValue;
          steps.push({
            row: i,
            col: j,
            charA,
            charB,
            operation: 'no-match',
            value: matrix[i][j],
            decision: 'top',
            matrix: matrix.map(row => [...row])
          });
        }
      }
    }
  }
  
  // Add completion step
  steps.push({
    row: m,
    col: n,
    charA: stringA[m - 1],
    charB: stringB[n - 1],
    operation: 'complete',
    value: matrix[m][n],
    decision: 'none',
    matrix: matrix.map(row => [...row])
  });
  
  // Reconstruct LCS string
  const lcsString = reconstructLCS(matrix, stringA, stringB);
  const executionTime = performance.now() - startTime;
  
  return {
    steps,
    finalMatrix: matrix,
    lcsLength: matrix[m][n],
    lcsString,
    totalComparisons,
    executionTime
  };
}

function reconstructLCS(matrix: number[][], stringA: string, stringB: string): string {
  const lcs: string[] = [];
  let i = stringA.length;
  let j = stringB.length;
  
  while (i > 0 && j > 0) {
    if (stringA[i - 1] === stringB[j - 1]) {
      lcs.unshift(stringA[i - 1]);
      i--;
      j--;
    } else if (matrix[i - 1][j] > matrix[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  
  return lcs.join('');
}

export function getCellStatus(
  row: number, 
  col: number, 
  currentStep: number, 
  steps: LCSStep[]
): 'current' | 'completed' | 'match' | 'max-value' | 'final' | 'default' {
  if (currentStep >= steps.length) return 'default';
  
  const currentStepData = steps[currentStep];
  
  // Current cell being processed
  if (row === currentStepData.row && col === currentStepData.col) {
    return 'current';
  }
  
  // Check if this cell has been processed
  const cellStep = steps.findIndex(step => step.row === row && step.col === col);
  if (cellStep !== -1 && cellStep < currentStep) {
    const stepData = steps[cellStep];
    
    // Final result cell
    if (stepData.operation === 'complete') {
      return 'final';
    }
    
    // Match found
    if (stepData.operation === 'match') {
      return 'match';
    }
    
    // High value cells
    if (stepData.value > 1) {
      return 'max-value';
    }
    
    return 'completed';
  }
  
  return 'default';
}
