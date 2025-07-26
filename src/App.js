import React, { useState, useEffect } from 'react';

// Princess data with your uploaded images
const princessData = [
  { id: 1, name: "Anna", imageFile: "Image 1", color: "#FF69B4", emoji: "❄️" },
  { id: 2, name: "Ariel", imageFile: "Image 2", color: "#20B2AA", emoji: "🧜‍♀️" },
  { id: 3, name: "Belle", imageFile: "Image 3", color: "#FFD700", emoji: "📚" },
  { id: 4, name: "Cinderella", imageFile: "Image 4", color: "#87CEEB", emoji: "👠" },
  { id: 5, name: "Elsa", imageFile: "Image 5", color: "#E0E6FF", emoji: "⭐" },
  { id: 6, name: "Jasmine", imageFile: "Image 6", color: "#4169E1", emoji: "🧞‍♂️" },
  { id: 7, name: "Moana", imageFile: "Image 7", color: "#FF6347", emoji: "🌊" },
  { id: 8, name: "Mulan", imageFile: "Image 8", color: "#DC143C", emoji: "🗡️" },
  { id: 9, name: "Pocahontas", imageFile: "Image 9", color: "#8B4513", emoji: "🦅" },
  { id: 10, name: "Rapunzel", imageFile: "Image 10", color: "#DDA0DD", emoji: "🌸" },
  { id: 11, name: "Snow White", imageFile: "Image 11", color: "#FF0000", emoji: "🍎" },
  { id: 12, name: "Tiana", imageFile: "Image 12", color: "#32CD32", emoji: "🐸" }
];

const PrincessClicker = () => {
  const [princesses, setPrincesses] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedPrincesses, setClickedPrincesses] = useState(new Set());
  const [alert, setAlert] = useState("Find each princess once to win! 🎉");
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
    setAlert("Find each princess once to win! 🎉");
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
      setAlert(`Oops! You already found ${princessName}! Try a different princess! 😊`);
      // Don't reset immediately - give them a moment to see what happened
      setTimeout(() => {
        const newHighScore = Math.max(score, highScore);
        setHighScore(newHighScore);
        resetGame();
      }, 2500);
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
        setAlert("🎉 WOW! You found ALL the princesses! You're AMAZING! 🎉");
        setHighScore(Math.max(newScore, highScore));
        setShowCelebration(true);
      } else {
        setAlert(`Great job finding ${princessName}! Keep going! ⭐`);
        // Shuffle after each correct click for more challenge
        setTimeout(() => {
          setPrincesses(currentPrincesses => shuffle([...currentPrincesses]));
        }, 1000);
      }
    }
  };

  // Progress calculation
  const progressPercentage = (score / princessData.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      {/* Mobile-Optimized Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-3 shadow-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-3 font-mono">
            👸 Princess Clicker 👸
          </h1>
          
          {/* Alert Message - Larger and More Prominent */}
          <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-3">
            <div className="text-center text-lg md:text-xl font-bold">{alert}</div>
          </div>
          
          {/* Score Display - Bigger and More Kid-Friendly */}
          <div className="flex justify-between items-center text-lg md:text-xl font-bold">
            <div className="bg-green-400 bg-opacity-80 px-3 py-2 rounded-lg">
              Found: {score}
            </div>
            <div className="bg-yellow-400 bg-opacity-80 px-3 py-2 rounded-lg text-purple-800">
              Best: {highScore}
            </div>
            <div className="bg-blue-400 bg-opacity-80 px-3 py-2 rounded-lg">
              Left: {princessData.length - score}
            </div>
          </div>
        </div>
      </div>

      {/* Large Visual Progress Bar */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-purple-700">Your Progress</span>
            <span className="text-xl font-bold text-purple-700">{score} of {princessData.length}</span>
          </div>
          <div className="bg-gray-200 rounded-full h-8 overflow-hidden border-4 border-purple-300">
            <div 
              className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
              style={{ width: `${Math.max(progressPercentage, 8)}%` }}
            >
              {progressPercentage > 15 && (
                <span className="text-white font-bold text-sm">
                  {Math.round(progressPercentage)}%
                </span>
              )}
            </div>
          </div>
          
          {/* Progress Stars */}
          <div className="flex justify-center mt-3 space-x-1">
            {Array.from({ length: princessData.length }, (_, i) => (
              <span 
                key={i} 
                className={`text-2xl ${i < score ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Princess Cards - Bigger and More Touch-Friendly */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {princesses.map((princess) => {
            const isClicked = clickedPrincesses.has(princess.id);
            return (
              <div
                key={princess.id}
                className={`
                  relative bg-white rounded-2xl p-4 md:p-6 shadow-lg cursor-pointer transform transition-all duration-300
                  ${isClicked 
                    ? 'scale-95 opacity-60 bg-green-50 border-4 border-green-400 ring-4 ring-green-200' 
                    : 'hover:scale-105 hover:shadow-2xl border-4 border-transparent hover:border-purple-300 active:scale-95'
                  }
                  ${showCelebration ? 'animate-bounce' : ''}
                  min-h-[180px] md:min-h-[200px]
                `}
                onClick={() => handlePrincessClick(princess.id, princess.name)}
                style={{ 
                  backgroundColor: isClicked ? '#f0fdf4' : 'white',
                  borderColor: isClicked ? '#22c55e' : 'transparent'
                }}
              >
                {isClicked && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold border-4 border-white shadow-lg">
                    ✓
                  </div>
                )}
                
                <div className="text-center h-full flex flex-col justify-center">
                  {princess.imageUrl ? (
                    <img 
                      src={princess.imageUrl} 
                      alt={princess.name}
                      className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-3xl">{princess.emoji}</span>
                    </div>
                  )}
                  <div className="text-lg md:text-xl font-bold text-gray-800 mb-1">{princess.name}</div>
                  <div className="text-2xl">{princess.emoji}</div>
                </div>
                
                {isClicked && (
                  <div className="absolute inset-0 bg-green-400 bg-opacity-10 rounded-2xl flex items-center justify-center">
                    <div className="text-green-600 font-bold text-xl md:text-2xl bg-white bg-opacity-90 px-4 py-2 rounded-full">
                      Found! 🎉
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Found Princesses Display - More Visual */}
      {score > 0 && !gameWon && (
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-center text-purple-700 mb-4">
              Princesses You Found! 🎉
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {princessData.filter(p => clickedPrincesses.has(p.id)).map(princess => (
                <div key={princess.id} className="bg-green-100 border-3 border-green-400 rounded-xl p-3 text-center">
                  <div className="text-3xl mb-2">{princess.emoji}</div>
                  <div className="font-bold text-green-800 text-sm">{princess.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Won Celebration - Bigger and More Exciting */}
      {gameWon && (
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-2xl p-6 md:p-8 shadow-2xl text-center animate-pulse">
            <div className="text-6xl md:text-8xl mb-4">🎉 🏆 🎉</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              YOU ARE AMAZING! 
            </h2>
            <p className="text-xl md:text-2xl text-white mb-6 font-bold">
              You found all {princessData.length} princesses! You're a true Princess Expert! 👸✨
            </p>
            <button
              onClick={resetGame}
              className="bg-white text-purple-600 px-8 py-4 rounded-2xl text-xl md:text-2xl font-bold hover:bg-gray-100 transition-colors duration-200 shadow-lg transform hover:scale-105 active:scale-95"
            >
              Play Again! 🎮✨
            </button>
          </div>
        </div>
      )}

      {/* Mobile-Friendly Reset Button */}
      {!gameWon && score > 0 && (
        <div className="max-w-6xl mx-auto p-4 text-center">
          <button
            onClick={resetGame}
            className="bg-purple-500 text-white px-8 py-4 rounded-2xl text-lg md:text-xl font-bold hover:bg-purple-600 transition-colors duration-200 shadow-lg transform hover:scale-105 active:scale-95"
          >
            Start Over 🔄
          </button>
        </div>
      )}

      {/* Instructions for Kids */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-blue-100 border-4 border-blue-300 rounded-2xl p-4 text-center">
          <div className="text-lg md:text-xl font-bold text-blue-800 mb-2">
            How to Play! 🎯
          </div>
          <div className="text-base md:text-lg text-blue-700">
            Tap each princess ONCE to find them all! If you tap the same princess twice, the game starts over. 
            Can you find all {princessData.length} princesses? 🌟
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-6 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl md:text-3xl font-bold mb-2">👸 Princess Clicker 👸</div>
          <div className="text-base md:text-lg opacity-90">Find all the princesses to win!</div>
        </div>
      </div>
    </div>
  );
};

export default PrincessClicker;
