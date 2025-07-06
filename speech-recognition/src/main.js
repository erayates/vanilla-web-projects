import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  try {
    const app = document.querySelector("#app");
    const recognition = new SpeechRecognition();

    const button = document.createElement("button");
    button.textContent = "Start Speech Recognition";

    let p = document.createElement("p");
    p.textContent = "Click the button and start speaking!";
    app.appendChild(p);

    button.addEventListener("click", () => {
      recognition.start();
    });

    app.appendChild(button);

    recognition.addEventListener("result", (event) => {
      const transcript = event.results[0][0].transcript;
      p.textContent = `You said: ${transcript}`;
    });
  } catch (error) {
    console.error(
      "Speech Recognition is not supported in this browser.",
      error
    );
    const app = document.querySelector("#app");
    app.innerHTML =
      "<p>Speech Recognition is not supported in this browser.</p>";
  }
});
