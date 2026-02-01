import { GRID_WIDTH, GRID_HEIGHT, TETROMINO_COLORS } from '../constants/gameConstants'

export default function Grid({ grid, currentTetromino, currentX, currentY }) {
  const renderCell = (rowIndex, colIndex) => {
    const cellValue = grid[rowIndex][colIndex]
    
    // Check if current tetromino is at this position
    if (currentTetromino) {
      for (let row = 0; row < currentTetromino.length; row++) {
        for (let col = 0; col < currentTetromino[row].length; col++) {
          if (currentTetromino[row][col] && 
              currentX + col === colIndex && 
              currentY + row === rowIndex) {
            return 'tetromino-active'
          }
        }
      }
    }
    
    return cellValue ? `tetromino-${cellValue}` : 'empty'
  }

  return (
    <div className="grid gap-0" style={{
      gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
      width: '300px',
      height: '600px',
      backgroundColor: '#222',
      border: '3px solid #fff',
      padding: '2px'
    }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`border border-gray-700 ${
              renderCell(rowIndex, colIndex) === 'empty' 
                ? 'bg-gray-900' 
                : 'bg-blue-500'
            }`}
            style={{
              width: '30px',
              height: '30px'
            }}
          />
        ))
      )}
    </div>
  )
}