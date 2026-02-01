export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        tetris: {
          cyan: '#00F0F1',
          blue: '#0000F0',
          orange: '#F0A000',
          yellow: '#F0F000',
          green: '#00F000',
          purple: '#F000F0',
          red: '#F00000',
        }
      }
    },
  },
  plugins: [],
}