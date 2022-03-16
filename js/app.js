import { MY_API_KEY } from "../CONFIG.js";
const clipboard = document.getElementById("clipboard");
const twitter = document.getElementById("twitter");
const button = document.getElementById("button");


function randomQuotes() {
  button.classList.add("loading");
  button.innerText = "Loading Quotes...";

  fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
      "x-rapidapi-key": MY_API_KEY,
    },
  })
    .then((response) => response.json())
    .then(showQuotes)
    .catch((err) => {
      console.error(err);
    });
}
randomQuotes();

function showQuotes(quotes) {
  const quote = document.getElementById("quotes");
  quote.innerHTML = `" ${quotes.content} "`;

  const author = document.getElementById("author");
  author.innerHTML = `- ${quotes.originator.name}`;

  button.classList.remove("loading");
  button.innerText = "New Quotes";

  clipboard.addEventListener("click", () => {
    navigator.clipboard.writeText(quote.innerHTML);
  });

  twitter.addEventListener("click", () => {
    let tweetURL = `https://twitter.com/intent/tweet?url=${quote.innerText}`;
    window.open(tweetURL, "_blank");
  });
}

button.addEventListener("click", randomQuotes);
