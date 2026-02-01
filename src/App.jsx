import { useState, useEffect } from 'react'
import GameBoard from './components/GameBoard'
import './App.css'

function App() {
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [level, setLevel] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl p-8">
        <h1 className="text-5xl font-bold text-white text-center mb-8">TETRIS</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <GameBoard setScore={setScore} setGameOver={setGameOver} setLevel={setLevel} />
          
          <div className="bg-gray-800 rounded-lg p-6 text-white">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Score</h2>
              <p className="text-4xl font-bold text-yellow-400">{score}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Level</h2>
              <p className="text-4xl font-bold text-green-400">{level}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Controls</h2>
              <ul className="text-sm space-y-2">
                <li>⬅️ Move Left</li>
                <li>➡️ Move Right</li>
                <li>⬇️ Soft Drop</li>
                <li>Space Hard Drop</li>
                <li>Z Rotate Left</li>
                <li>X Rotate Right</li>
              </ul>
            </div>
            
            {gameOver && (
              <div className="bg-red-600 p-4 rounded text-center">
                <p className="text-xl font-bold">GAME OVER!</p>
                <p className="mt-2">Press any key to restart</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App