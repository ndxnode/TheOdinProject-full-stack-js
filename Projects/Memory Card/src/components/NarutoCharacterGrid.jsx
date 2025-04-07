import React, { useState, useEffect } from "react";
import "../styles/NarutoCharacterGrid.css";

const NarutoCharacterGrid = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Game state
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [lastClickedId, setLastClickedId] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);

  // Character IDs specified by the user
  const characterIds = [1344, 1307, 1299, 376, 928, 259, 1373, 1037, 813];

  useEffect(() => {
    const fetchCharactersById = async () => {
      try {
        setLoading(true);

        // Create an array of promise requests to fetch each character
        const characterPromises = characterIds.map((id) =>
          fetch(`https://dattebayo-api.onrender.com/characters/${id}`).then(
            (response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch character with ID ${id}`);
              }
              return response.json();
            }
          )
        );

        // Wait for all requests to complete
        const characterData = await Promise.all(characterPromises);
        // Shuffle the characters array initially
        setCharacters(shuffleArray([...characterData]));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCharactersById();
  }, []);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleCardClick = (characterId) => {
    // If the game is over or cards are shuffling, do nothing
    if (gameOver || gameWon || isShuffling) return;

    // Set the last clicked ID for visual feedback
    setLastClickedId(characterId);

    // Check if the card has been clicked before
    if (clickedCards.includes(characterId)) {
      // Game over - the card was already clicked
      setGameOver(true);

      // Update high score if current score is higher
      if (score > highScore) {
        setHighScore(score);
      }
    } else {
      // Card hasn't been clicked yet
      const newClickedCards = [...clickedCards, characterId];
      setClickedCards(newClickedCards);

      // Increment score
      const newScore = score + 1;
      setScore(newScore);

      // Check if all cards have been clicked (game won)
      if (newScore === characters.length) {
        setGameWon(true);
        if (newScore > highScore) {
          setHighScore(newScore);
        }
      } else {
        // Add a short delay before shuffling for better UX
        setIsShuffling(true);
        setTimeout(() => {
          // Shuffle the cards for the next round
          setCharacters(shuffleArray([...characters]));
          setIsShuffling(false);
        }, 500);
      }
    }
  };

  const resetGame = () => {
    setClickedCards([]);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setLastClickedId(null);
    setCharacters(shuffleArray([...characters]));
  };

  if (loading)
    return (
      <div className="loading-container">
        <h2>Loading Naruto Characters...</h2>
        <div className="loading-spinner"></div>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <h2>Error Loading Characters</h2>
        <p>{error}</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );

  if (characters.length === 0)
    return (
      <div className="error-container">
        <h2>No Characters Found</h2>
        <p>Unable to load characters from the API.</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );

  // Render game over or game won overlay
  if (gameOver || gameWon) {
    return (
      <div className="naruto-character-grid-container">
        <h2>Naruto Memory Card Game</h2>

        <div className="score-board">
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
        </div>

        <div className="game-overlay">
          <div className="game-result">
            {gameWon ? (
              <>
                <h2 className="win-title">Congratulations! You Won!</h2>
                <p>
                  Amazing! You remembered all {characters.length} characters!
                </p>
              </>
            ) : (
              <>
                <h2 className="game-over-title">Game Over!</h2>
                <p>You clicked on the same character twice!</p>
              </>
            )}
            <p className="final-score">Your score: {score}</p>
            <p className="high-score">High score: {highScore}</p>
            <button className="restart-button" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>

        <div className="naruto-character-grid">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`character-card ${
                character.id === lastClickedId ? "last-clicked" : ""
              }`}
            >
              <div className="character-image-container">
                {character.images && character.images.length > 0 ? (
                  <img
                    src={character.images[0]}
                    alt={character.name}
                    className="character-image"
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
              </div>
              <h3 className="character-name">{character.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="naruto-character-grid-container">
      <h2>Naruto Memory Card Game</h2>

      <div className="score-board">
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
      </div>

      <div className="game-instructions">
        <p>
          Click on a different character each time. Don't click the same
          character twice!
        </p>
      </div>

      <div
        className={`naruto-character-grid ${isShuffling ? "shuffling" : ""}`}
      >
        {characters.map((character) => (
          <div
            key={character.id}
            className={`character-card ${
              character.id === lastClickedId ? "last-clicked" : ""
            } ${clickedCards.includes(character.id) ? "already-clicked" : ""}`}
            onClick={() => handleCardClick(character.id)}
          >
            <div className="character-image-container">
              {character.images && character.images.length > 0 ? (
                <img
                  src={character.images[0]}
                  alt={character.name}
                  className="character-image"
                />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
            </div>
            <h3 className="character-name">{character.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NarutoCharacterGrid;
