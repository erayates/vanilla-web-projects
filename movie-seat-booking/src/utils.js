export function randOccupiedSeats(seats, count) {
  const occupiedSeats = new Set();
  while (occupiedSeats.size < count) {
    const randomIndex = Math.floor(Math.random() * seats.length);
    occupiedSeats.add(seats[randomIndex]);
  }

  return Array.from(occupiedSeats);
}

export function createMovies() {
  const movies = new Array(10).fill(null).map((_, index) => ({
    title: `Movie ${index + 1}`,
    duration: `${90 + index * 10} minutes`,
    price: 10 + index * 2
  }));

  return movies;
}