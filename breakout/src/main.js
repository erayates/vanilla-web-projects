import "./style.css";
import Game from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");
  if (!app) {
    console.error("App element not found");
    return;
  }

  // Initialize the game
  const game = new Game();
});
