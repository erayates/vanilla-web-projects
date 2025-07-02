class Movie {
  constructor(title, duration) {
    this.title = title;
    this.duration = duration;
    this.price = this.calculatePrice();
  }

  getTitle() {
    return this.title;
  }

  getDuration() {
    return this.duration;
  }

  calculatePrice() {
    const durationInMinutes = parseInt(this.duration.split(" ")[0], 10);
    if (durationInMinutes <= 90) {
      return 10;
    } else if (durationInMinutes <= 120) {
      return 15;
    } else {
      return 20;
    }
  }
}
