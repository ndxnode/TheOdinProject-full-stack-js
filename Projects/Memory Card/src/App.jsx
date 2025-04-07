import "./App.css";
import NarutoCharacterGrid from "./components/NarutoCharacterGrid";

function App() {
  return (
    <div className="App">
      <header className="game-header">
        <h1>Naruto Memory Challenge</h1>
        <p className="game-subtitle">
          Test your memory with characters from the Naruto universe!
        </p>
      </header>
      <NarutoCharacterGrid />
    </div>
  );
}

export default App;
