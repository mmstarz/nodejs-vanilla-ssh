console.log("JS file loaded");
// fetch() is not a part of node it is a part of client side JS
// https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch
// fetch("url")
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   });
const form = document.querySelector("form");
const address = document.querySelector("#address");
const successSearch = document.querySelector("#search-info");
const tz = successSearch.querySelector(".timezone");
const loc = successSearch.querySelector(".location");
const long = successSearch.querySelector(".long");
const short = successSearch.querySelector(".short");
const tempH = successSearch.querySelector(".tempH");
const tempL = successSearch.querySelector(".tempL");
const resultsSearch = document.querySelector(".search-results");

const searchButton = document.querySelector(".search-form button");
searchButton.addEventListener("click", () => {
  searchButton.classList.add("pressed");
  setTimeout(() => {
    searchButton.classList.remove("pressed");
  }, 300);
});

const closeButton = document.querySelector(".close-btn");
closeButton.addEventListener("mouseleave", () => {
  closeButton.classList.remove("enter");
  closeButton.classList.add("leave");
});

closeButton.addEventListener("mouseenter", () => {
  closeButton.classList.remove("leave");
  closeButton.classList.add("enter");
});

closeButton.addEventListener("click", () => {
  tz.textContent = "";
  loc.textContent = "";
  long.textContent = "";
  short.textContent = "";
  tempH.textContent = "";
  tempL.textContent = "";

  tz.classList.remove("appear");
  loc.classList.remove("appear");
  long.classList.remove("appear");
  short.classList.remove("appear");
  tempH.classList.remove("appear");
  tempL.classList.remove("appear");

  resultsSearch.classList.remove("loading");
  successSearch.classList.remove("found");

  address.value = "";
});

const preSearch = () => {
  tz.textContent = "";
  loc.textContent = "";
  long.textContent = "";
  short.textContent = "";
  tempH.textContent = "";
  tempL.textContent = "";

  tz.classList.remove("appear");
  loc.classList.remove("appear");
  long.classList.remove("appear");
  short.classList.remove("appear");
  tempH.classList.remove("appear");
  tempL.classList.remove("appear");

  resultsSearch.classList.add("loading");
  successSearch.classList.remove("found");
};

const successFound = data => {
  resultsSearch.classList.remove("loading");
  successSearch.classList.add("found");

  tz.classList.add("appear");
  loc.classList.add("appear");
  long.classList.add("appear");
  short.classList.add("appear");
  tempH.classList.add("appear");
  tempL.classList.add("appear");

  tz.textContent = data.timezone;
  loc.textContent = data.loc;
  long.textContent = data.long;
  short.textContent = data.short;
  tempH.textContent = data.tempH;
  tempL.textContent = data.tempL;
};

const failFound = data => {
  resultsSearch.classList.remove("loading");
  successSearch.classList.add("found");
  short.classList.add("appear");
  short.textContent = data;
};

form.addEventListener("submit", async event => {
  event.preventDefault();
  // view changes
  preSearch();

  try {
    // fetch data request (no domain goes for internal API)
    const response = await fetch(`/weather?address=${address.value}`);
    const data = await response.json();
    // err case
    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }

    // view changes
    successFound(data);
    //result
    // return console.log({ ...data });
  } catch (err) {
    //view changes
    failFound(err);
    // result
    // return console.log(err);
  }
});
