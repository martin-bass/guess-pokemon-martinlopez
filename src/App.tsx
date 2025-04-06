//Chakra UI
import { useState } from "react";
import "./App.css";
import PokemonChosen from "./mock/api";

type Form = HTMLFormElement & {
  namePokemon: HTMLInputElement;
};

function App() {
  const pokemon = PokemonChosen.PokemonChosen;

  const [pokemonName] = useState(pokemon.name);
  const [pokemonImg] = useState(pokemon.image);
  const [won, setWon] = useState(false);
  const [lose, setLose] = useState(false);
  const [adevertencia, setAdvertencia] = useState(false);

  const [aciertos, setAciertos] = useState(
    Number(window.localStorage.getItem("ACIERTOS"))
  );
  const [errores, setErrores] = useState(
    Number(window.localStorage.getItem("ERRORES"))
  );

  const handleSubmit = (e: React.FormEvent<Form>) => {
    e.preventDefault();

    const { namePokemon } = e.currentTarget;

    if (namePokemon.value === "") {
      setAdvertencia(true);
    } else {
      if (namePokemon.value.toLowerCase() === pokemonName) {
        setAdvertencia(false);
        setWon(true);
        setLose(false);
        namePokemon.value = "";
        setAciertos(aciertos + 1);
      } else {
        setAdvertencia(false);
        setLose(true);
        setErrores(errores + 1);
        namePokemon.value = "";
      }
    }
  };

  window.localStorage.setItem("ACIERTOS", aciertos.toString());
  window.localStorage.setItem("ERRORES", errores.toString());

  return (
    <main>
      <section>
        <div className="title-container">
          <i className="nes-pokeball pokeball"></i>
          <h1 className="nes-text">Quién es este Pokémon?</h1>
          <i className="nes-pokeball pokeball"></i>
        </div>
      </section>
      <section>
        <div className="bg-container">
          <div className="img-container">
            <img
              className={won || lose ? "img-pokemon-visible" : "img-pokemon"}
              src={pokemonImg}
            />
          </div>
        </div>
      </section>
      <section>
        {won || lose ? null : (
          <form className="nes-field form-container" onSubmit={handleSubmit}>
            <input
              name="namePokemon"
              type="text"
              id="name_field"
              className="nes-input"
              placeholder="Escribe aquí..."
            />
            <button className="nes-btn is-primary" type="submit">
              Adivinar
            </button>
            <button
              className="nes-btn is-error"
              type="button"
              onClick={() => {
                setLose(true);
                setErrores(errores + 1);
                setAdvertencia(false);
              }}
            >
              Rendirse
            </button>
          </form>
        )}
        <div className="alert-container">
          {adevertencia && (
            <p className="nes-text is-error">Escribe una respuesta!</p>
          )}
        </div>
      </section>
      <section className="win-container">
        {won && (
          <div className="nes-container">
            <span className="nes-text is-success">Ganaste!</span>
            <p>El pókemon es {pokemonName.toUpperCase()}</p>
            <button
              type="button"
              className="nes-btn is-primary"
              onClick={() => {
                location.reload();
              }}
            >
              Volver a Jugar!
            </button>
          </div>
        )}
        {lose && (
          <div className="nes-container">
            <span className="nes-text is-error">Perdiste!</span>
            <p>El pókemon es {pokemonName.toUpperCase()}</p>
            <button
              type="button"
              className="nes-btn is-primary"
              onClick={() => {
                location.reload();
              }}
            >
              Volver a Jugar!
            </button>
          </div>
        )}
        <div className="nes-container with-title is-centered score-container">
          <p className="title">Puntaje</p>
          <span className="nes-text is-success aciertos">
            <p>✓ Aciertos: {window.localStorage.getItem("ACIERTOS")}</p>
          </span>
          <span className="nes-text is-error errores">
            <p>× Errores: {window.localStorage.getItem("ERRORES")}</p>
          </span>
        </div>
      </section>
      <section className="footer">
        <div className="footer-container">
          <p>
            Challenge by Martín Lopez. Based in{" "}
            <a href="https://twitter.com/goncy" target="_blank">
              @goncy's
            </a>{" "}
            <a
              href="https://github.com/goncy/interview-challenges/tree/main/guess-pokemon"
              target="_blank"
            >
              challenge
            </a>
          </p>
          <div className="icons-container">
            <a
              href="https://www.linkedin.com/in/martinariellopez22187139/"
              target="_blank"
            >
              <i className="nes-icon linkedin" />
            </a>
            <a href="https://github.com/martin-bass" target="_blank">
              <i className="nes-icon github" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
