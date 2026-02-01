import { GRID_WIDTH, GRID_HEIGHT } from '../constants/gameConstants'

export function createEmptyGrid() {
  return Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(0))
}

export function canPlaceTetromino(grid, tetromino, x, y) {
  if (!tetromino) return false

  for (let row = 0; row < tetromino.length; row++) {
    for (let col = 0; col < tetromino[row].length; col++) {
      if (tetromino[row][col]) {
        const gridX = x + col
        const gridY = y + row

        // Check bounds
        if (gridX < 0 || gridX >= GRID_WIDTH || gridY >= GRID_HEIGHT) {
          return false
        }

        // Check collision with placed pieces
        if (gridY >= 0 && grid[gridY][gridX] !== 0) {
          return false
        }
      }
    }
  }
  return true
}

export function placeTetromino(grid, tetromino, x, y) {
  const newGrid = grid.map(row => [...row])

  for (let row = 0; row < tetromino.length; row++) {
    for (let col = 0; col < tetromino[row].length; col++) {
      if (tetromino[row][col]) {
        const gridY = y + row
        const gridX = x + col
        if (gridY >= 0 && gridY < GRID_HEIGHT && gridX >= 0 && gridX < GRID_WIDTH) {
          newGrid[gridY][gridX] = tetromino[row][col]
        }
      }
    }
  }

  return newGrid
}

export function clearLines(grid) {
  let newGrid = grid.map(row => [...row])
  let linesCleared = 0

  for (let row = GRID_HEIGHT - 1; row >= 0; row--) {
    if (newGrid[row].every(cell => cell !== 0)) {
      newGrid.splice(row, 1)
      newGrid.unshift(Array(GRID_WIDTH).fill(0))
      linesCleared++
      row++ // Check this row again
    }
  }

  return { newGridAfterClear: newGrid, linesCleared }
}

export function rotateTetromino(tetromino) {
  const n = tetromino.length
  const rotated = Array(n).fill(null).map(() => Array(n).fill(0))

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
      rotated[j][n - 1 - i] = tetromino[i][j]
    }
  }

  return rotated
}