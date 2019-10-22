console.log("JS file loaded");
// fetch() is not a part of node it is a part of client side JS
// https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch
// fetch("http://puzzle.mead.io/puzzle")
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   });

const searchButton = document.querySelector(".search-form button");
searchButton.addEventListener("click", () => {
  searchButton.classList.add("pressed");
  setTimeout(() => {
    searchButton.classList.remove("pressed");
  }, 300);
});

const form = document.querySelector("form");
const address = document.querySelector("#address");
const successSearch = document.querySelector("#search-info");
const short = successSearch.querySelector(".short");
const long = successSearch.querySelector(".long");
const loc = successSearch.querySelector(".location");
const errorSearch = document.querySelector("#search-error");
const resultsSearch = document.querySelector(".search-results");

const preSearch = () => {
  short.textContent = "";
  long.textContent = "";
  loc.textContent = "";  
  errorSearch.textContent = "";

  loc.classList.remove("appear");
  long.classList.remove("appear");
  short.classList.remove("appear");

  resultsSearch.classList.add("loading");
  errorSearch.classList.remove("found");
  successSearch.classList.remove("found");
}

const successFound = data => {
  resultsSearch.classList.remove("loading");
  successSearch.classList.add("found");

  loc.classList.add("appear");
  long.classList.add("appear");
  short.classList.add("appear");

  loc.textContent = data.timezone;
  long.textContent = data.long;
  short.textContent = data.short;
};

const failFound = data => {
  resultsSearch.classList.remove("loading");
  errorSearch.classList.add("found");

  errorSearch.textContent = data;
};

form.addEventListener("submit", async event => {
  event.preventDefault();
  // view changes
  preSearch();

  try {
    // fetch data request
    const response = await fetch(`/weather?address=${address.value}`);
    const data = await response.json();
    // err case
    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    // view changes
    successFound(data);
    //result
    return console.log({ ...data });
  } catch (err) {
    //view changes
    failFound(err);
    // result
    return console.log(err);
  }
});
