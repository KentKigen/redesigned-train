import { useState, useEffect, useRef } from 'react'
import { GRID_WIDTH, GRID_HEIGHT, TETROMINOES } from '../constants/gameConstants'
import { createEmptyGrid, canPlaceTetromino, placeTetromino, clearLines } from '../utils/gameUtils'
import Grid from './Grid'

export default function GameBoard({ setScore, setGameOver, setLevel }) {
  const [grid, setGrid] = useState(createEmptyGrid())
  const [currentTetromino, setCurrentTetromino] = useState(null)
  const [currentX, setCurrentX] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [score, setLocalScore] = useState(0)
  const [level, setLocalLevel] = useState(1)
  const [gameRunning, setGameRunning] = useState(true)
  const gameLoopRef = useRef(null)

  // Initialize game with first tetromino
  useEffect(() => {
    spawnNewTetromino()
  }, [])

  // Main game loop
  useEffect(() => {
    if (!gameRunning) return

    gameLoopRef.current = setInterval(() => {
      setCurrentY(prev => {
        const newY = prev + 1
        // Check if tetromino can move down
        if (!canPlaceTetromino(grid, currentTetromino, currentX, newY)) {
          // Place tetromino and spawn new one
          const newGrid = placeTetromino(grid, currentTetromino, currentX, prev)
          const { newGridAfterClear, linesCleared } = clearLines(newGrid)
          setGrid(newGridAfterClear)
          
          if (linesCleared > 0) {
            const points = calculatePoints(linesCleared, level)
            setLocalScore(score + points)
            setScore(score + points)
          }
          
          spawnNewTetromino()
          return 0
        }
        return newY
      })
    }, 500 / level) // Speed increases with level

    return () => clearInterval(gameLoopRef.current)
  }, [gameRunning, currentTetromino, currentX, currentY, grid, level, score])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameRunning) {
        if (e.key === ' ' || e.key === 'Enter') {
          resetGame()
        }
        return
      }

      switch (e.key.toLowerCase()) {
        case 'arrowleft':
          if (canPlaceTetromino(grid, currentTetromino, currentX - 1, currentY)) {
            setCurrentX(currentX - 1)
          }
          break
        case 'arrowright':
          if (canPlaceTetromino(grid, currentTetromino, currentX + 1, currentY)) {
            setCurrentX(currentX + 1)
          }
          break
        case 'arrowdown':
          if (canPlaceTetromino(grid, currentTetromino, currentX, currentY + 1)) {
            setCurrentY(currentY + 1)
          }
          break
        case ' ':
          // Hard drop
          let dropY = currentY
          while (canPlaceTetromino(grid, currentTetromino, currentX, dropY + 1)) {
            dropY++
          }
          setCurrentY(dropY)
          e.preventDefault()
          break
        case 'z':
          // Rotate left
          break
        case 'x':
          // Rotate right
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameRunning, currentTetromino, currentX, currentY, grid])

  function spawnNewTetromino() {
    const randomIndex = Math.floor(Math.random() * TETROMINOES.length)
    const newTetromino = TETROMINOES[randomIndex]
    const spawnX = Math.floor((GRID_WIDTH - newTetromino[0].length) / 2)
    
    if (!canPlaceTetromino(grid, newTetromino, spawnX, 0)) {
      setGameRunning(false)
      setGameOver(true)
      return
    }
    
    setCurrentTetromino(newTetromino)
    setCurrentX(spawnX)
    setCurrentY(0)
  }

  function resetGame() {
    setGrid(createEmptyGrid())
    setLocalScore(0)
    setLocalLevel(1)
    setScore(0)
    setLevel(1)
    setGameRunning(true)
    setGameOver(false)
    spawnNewTetromino()
  }

  function calculatePoints(linesCleared, currentLevel) {
    const basePoints = [0, 100, 300, 500, 800]
    return (basePoints[linesCleared] || 800) * currentLevel
  }

  return (
    <div className="flex flex-col items-center">
      <Grid grid={grid} currentTetromino={currentTetromino} currentX={currentX} currentY={currentY} />
    </div>
  )
}