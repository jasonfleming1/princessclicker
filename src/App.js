import React, { useState, useEffect } from 'react';

// Princess data with your uploaded images
const princessData = [
  { id: 1, name: "Anna", imageFile: "Image 1", color: "#FF69B4" },
  { id: 2, name: "Ariel", imageFile: "Image 2", color: "#20B2AA" },
  { id: 3, name: "Belle", imageFile: "Image 3", color: "#FFD700" },
  { id: 4, name: "Cinderella", imageFile: "Image 4", color: "#87CEEB" },
  { id: 5, name: "Elsa", imageFile: "Image 5", color: "#E0E6FF" },
  { id: 6, name: "Jasmine", imageFile: "Image 6", color: "#4169E1" },
  { id: 7, name: "Moana", imageFile: "Image 7", color: "#FF6347" },
  { id: 8, name: "Mulan", imageFile: "Image 8", color: "#DC143C" },
  { id: 9, name: "Pocahontas", imageFile: "Image 9", color: "#8B4513" },
  { id: 10, name: "Rapunzel", imageFile: "Image 10", color: "#DDA0DD" },
  { id: 11, name: "Snow White", imageFile: "Image 11", color: "#FF0000" },
  { id: 12, name: "Tiana", imageFile: "image", color: "#32CD32" }
];

const PrincessClicker = () => {
  const [princesses, setPrincesses] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedPrincesses, setClickedPrincesses] = useState(new Set());
  const [alert, setAlert] = useState("Click each princess once to win! 🎉");
  const [gameWon, setGameWon] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Shuffle function
  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Load images function
  const loadImage = async (imageFile) => {
    try {
      const imageData = await window.fs.readFile(imageFile);
      const blob = new Blob([imageData], { type: 'image/png' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error(`Failed to load ${imageFile}:`, error);
      return null;
    }
  };

  // Initialize game and load images
  useEffect(() => {
    const initializeGame = async () => {
      const princessesWithImages = await Promise.all(
        princessData.map(async (princess) => ({
          ...princess,
          imageUrl: await loadImage(princess.imageFile)
        }))
      );
      setPrincesses(shuffle(princessesWithImages));
    };
    
    initializeGame();
  }, []);

  // Reset game
  const resetGame = async () => {
    setScore(0);
    setClickedPrincesses(new Set());
    setAlert("Click each princess once to win! 🎉");
    setGameWon(false);
    setShowCelebration(false);
    
    // Reload images and shuffle
    const princessesWithImages = await Promise.all(
      princessData.map(async (princess) => ({
        ...princess,
        imageUrl: await loadImage(princess.imageFile)
      }))
    );
    setPrincesses(shuffle(princessesWithImages));
  };

  // Handle princess click
  const handlePrincessClick = (princessId, princessName) => {
    if (gameWon) return;

    if (clickedPrincesses.has(princessId)) {
      // Already clicked this princess
      setAlert(`Oops! You already clicked ${princessName}. Try again! 😊`);
      // Don't reset immediately - give them a moment to see what happened
      setTimeout(() => {
        const newHighScore = Math.max(score, highScore);
        setHighScore(newHighScore);
        resetGame();
      }, 2000);
    } else {
      // New princess clicked
      const newClickedPrincesses = new Set(clickedPrincesses);
      newClickedPrincesses.add(princessId);
      setClickedPrincesses(newClickedPrincesses);
      
      const newScore = score + 1;
      setScore(newScore);
      
      if (newScore === princessData.length) {
        // Won the game!
        setGameWon(true);
        setAlert("🎉 Amazing! You found all the princesses! You're a champion! 🎉");
        setHighScore(Math.max(newScore, highScore));
        setShowCelebration(true);
      } else {
        setAlert(`Great job! Keep going! ${newScore}/${princessData.length} princesses found! ⭐`);
        // Shuffle after each correct click
        setPrincesses(shuffle(princessData));
      }
    }
  };

  // Progress calculation
  const progressPercentage = (score / princessData.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold font-mono">👸 Princess Clicker</h1>
          <div className="text-center">
            <div className="text-lg font-semibold">{alert}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">Score: {score} | High Score: {highScore}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-full p-2 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Progress</span>
            <span className="text-sm font-semibold text-gray-700">{score}/{princessData.length}</span>
          </div>
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Princess Cards */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {princesses.map((princess) => {
            const isClicked = clickedPrincesses.has(princess.id);
            return (
              <div
                key={princess.id}
                className={`
                  relative bg-white rounded-xl p-6 shadow-lg cursor-pointer transform transition-all duration-300
                  ${isClicked 
                    ? 'scale-95 opacity-50 bg-green-100 border-4 border-green-400' 
                    : 'hover:scale-105 hover:shadow-xl border-4 border-transparent hover:border-purple-300'
                  }
                  ${showCelebration ? 'animate-bounce' : ''}
                `}
                onClick={() => handlePrincessClick(princess.id, princess.name)}
                style={{ 
                  backgroundColor: isClicked ? '#f0f9ff' : 'white',
                  borderColor: isClicked ? '#22c55e' : 'transparent'
                }}
              >
                {isClicked && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg">
                    ✓
                  </div>
                )}
                
                <div className="text-center">
                  {princess.imageUrl ? (
                    <img 
                      src={princess.imageUrl} 
                      alt={princess.name}
                      className="w-24 h-24 mx-auto mb-3 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500">Loading...</span>
                    </div>
                  )}
                  <div className="text-lg font-bold text-gray-800">{princess.name}</div>
                </div>
                
                {isClicked && (
                  <div className="absolute inset-0 bg-green-400 bg-opacity-20 rounded-xl flex items-center justify-center">
                    <div className="text-green-600 font-bold text-2xl">Found!</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Found Princesses Display */}
      {score > 0 && (
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Princesses Found: {score}</h3>
            <div className="flex flex-wrap gap-2">
              {princessData.filter(p => clickedPrincesses.has(p.id)).map(princess => (
                <div key={princess.id} className="bg-green-100 px-3 py-1 rounded-full border-2 border-green-300">
                  <span className="text-lg">{princess.emoji}</span>
                  <span className="ml-2 font-semibold text-green-800">{princess.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Won Celebration */}
      {gameWon && (
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-4">🎉 🏆 🎉</div>
            <h2 className="text-2xl font-bold text-white mb-4">Congratulations Champion!</h2>
            <p className="text-white mb-4">You found all {princessData.length} princesses!</p>
            <button
              onClick={resetGame}
              className="bg-white text-orange-500 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200"
            >
              Play Again! 🎮
            </button>
          </div>
        </div>
      )}

      {/* Reset Button */}
      {!gameWon && score > 0 && (
        <div className="max-w-6xl mx-auto p-4 text-center">
          <button
            onClick={resetGame}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-600 transition-colors duration-200"
          >
            Start Over 🔄
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-4 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold">Princess Clicker</div>
          <div className="text-sm opacity-80">Click each princess once to win!</div>
        </div>
      </div>
    </div>
  );
};

export default PrincessClicker;