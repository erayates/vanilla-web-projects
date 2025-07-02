import "./style.css";
import { createMovies, randOccupiedSeats } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  class Application {
    constructor() {
      this.MAX_SEATS = 48;
      this.MOVIES = createMovies();
      this.app = document.getElementById("app");
      this.selectedMovie = this.MOVIES[0] || null;
      this.totalPrice = 0;
      this.totalPriceElement = null;
      if (!this.app) {
        throw new Error("App element not found");
      }
    }

    init() {
      this.renderMovies();
      this.renderSeats();
      this.renderResults();
    }

    renderMovies() {
      const moviesContainer = document.createElement("div");
      moviesContainer.className = "movies-container";

      const movieSelectionDropdown = document.createElement("select");

      this.MOVIES.forEach((movie) => {
        const option = document.createElement("option");
        option.value = movie.price;
        option.textContent = `${movie.title} (${movie.duration}) - $${movie.price}`;
        movieSelectionDropdown.appendChild(option);
      });

      moviesContainer.appendChild(document.createTextNode("Select a movie: "));
      moviesContainer.appendChild(movieSelectionDropdown);

      movieSelectionDropdown.addEventListener("change", (event) => {
        const selectedPrice = event.target.value;
        this.selectedMovie = this.MOVIES.find(
          (movie) => movie.price == selectedPrice
        );
      });

      this.app.appendChild(moviesContainer);
    }

    renderSeats() {
      const seatsContainer = document.createElement("div");
      seatsContainer.className = "seats-container";

      for (let i = 0; i < this.MAX_SEATS; i++) {
        const seatElement = document.createElement("div");
        seatElement.className = "seat";
        seatElement.addEventListener("click", () => {
          if (seatElement.classList.contains("selected")) {
            seatElement.classList.remove("selected");
            this.totalPrice -= this.selectedMovie.price;
          } else {
            this.totalPrice += this.selectedMovie.price
            seatElement.classList.add("selected");
          }
          this.updateTotalPrice();
        });
        seatsContainer.appendChild(seatElement);
      }

      const occupiedSeats = randOccupiedSeats(
        Array.from(seatsContainer.children),
        10
      );

      occupiedSeats.forEach((seat) => {
        seat.classList.add("occupied");
      });

      this.app.appendChild(seatsContainer);
    }

    renderResults() {
      const resultsContainer = document.createElement("div");
      
      resultsContainer.className = "results-container";

      this.totalPriceElement = document.createElement("div");
      this.totalPriceElement.className = "total-price";
      this.totalPriceElement.textContent = `Total Price: $${this.totalPrice}`;

      resultsContainer.appendChild(this.totalPriceElement);
      this.app.appendChild(resultsContainer);
    }

    updateTotalPrice() {
      if (this.totalPriceElement) {
        this.totalPriceElement.textContent = `Total Price: $${this.totalPrice}`;
      }
    }
  }

  const app = new Application();
  app.init();
});
