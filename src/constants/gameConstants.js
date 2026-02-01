export const GRID_WIDTH = 10
export const GRID_HEIGHT = 20

// Tetromino shapes
export const TETROMINOES = [
  // I
  [[1, 1, 1, 1]],
  // O
  [[1, 1], [1, 1]],
  // T
  [[0, 1, 0], [1, 1, 1]],
  // S
  [[0, 1, 1], [1, 1, 0]],
  // Z
  [[1, 1, 0], [0, 1, 1]],
  // J
  [[1, 0, 0], [1, 1, 1]],
  // L
  [[0, 0, 1], [1, 1, 1]]
]

export const TETROMINO_COLORS = {
  1: 'cyan',    // I
  2: 'yellow',  // O
  3: 'purple',  // T
  4: 'green',   // S
  5: 'red',     // Z
  6: 'blue',    // J
  7: 'orange'   // L
}