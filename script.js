const countriesContainer = document.querySelector(".country-list");
const filterBtn = document.querySelector(".filter-container");
const regionListContainer = document.querySelector(".region-list-container");
const btnAll = document.getElementById("all");
const btnAfrica = document.getElementById("africa");
const btnEurope = document.getElementById("europe");
const btnAsia = document.getElementById("asia");
const btnAmericas = document.getElementById("americas");
const btnOceania = document.getElementById("oceania");
const searchBox = document.querySelector(".search-box");
const loadContainer = document.querySelector(".load-content");
const country = document.querySelector(".country");

countriesContainer.innerHTML = "";

//HELPER FUNCTION/////////////////////////////////////////////////////
let support = (function () {
  if (!window.DOMParser) return false;
  let parser = new DOMParser();
  try {
    parser.parseFromString("x", "text/html");
  } catch (err) {
    return false;
  }
  return true;
})();

const stringToHTML = function (str) {
  // If DOMParser is supported, use it
  if (support) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, "text/html");
    return doc.body;
  }

  // Otherwise, fallback to old-school method
  let dom = document.createElement("div");
  dom.innerHTML = str;
  return dom;
};

//////////////////////////////////////////////////////////////////////////////
const countriesArr = [];
fetch("https://restcountries.com/v3.1/all")
  .then((r) => r.json())
  .then((res) => {
    res.forEach((item) => {
      countriesArr.push(item);
    });
  });
//COUNTRY RENDER FUNCTION//////////////////////////////////////////
const renderCountries = function (arr) {
  countriesContainer.innerHTML = "";
  arr.forEach((el) => {
    const countriesHtml = `<a href="/detailed-country.html?${
      el.name.common
    }"  class="country">
              <button class="country-image">
                <img src="${el.flags.png}" class="flag" flag" />
              </button>
              <div class="country-info">
              <h3 class="country-name">${el.name.common}</h3>
              <ul>
                  <li>Population: <span class="api-info">${el.population.toLocaleString()}</span></li>
                    <li>Region: <span class="api-info">${el.region}</span></li>
                    <li>Capital: <span class="api-info">${
                      el.capital
                    }</span></li>
                </ul>
              </div>
            </a>`;
    countriesContainer.innerHTML += countriesHtml;
  });
};

const renderByRegion = function (regName) {
  countriesContainer.innerHTML = "";

  const result = countriesArr.filter((el) => el.region === regName);
  renderCountries(result);
};
//COUNTRIES STARTING POSITION//////////
fetch("https://restcountries.com/v3.1/all")
  .then((r) => r.json())
  .then((res) => {
    renderCountries(countriesArr);
  });

filterBtn.addEventListener("click", function () {
  regionListContainer.classList.toggle("active");
});

//REGION: ALL
btnAll.addEventListener("click", function () {
  countriesContainer.innerHTML = "";
  renderCountries(countriesArr);
});

//REGION: AFRICA
btnAfrica.addEventListener("click", function () {
  renderByRegion("Africa");
});

//REGION: EUROPE
btnEurope.addEventListener("click", function () {
  renderByRegion("Europe");
});

//REGION: ASIA
btnAsia.addEventListener("click", function () {
  renderByRegion("Asia");
});

//REGION: AMERICA
btnAmericas.addEventListener("click", function () {
  renderByRegion("Americas");
});

//REGION: OCEANIA
btnOceania.addEventListener("click", function () {
  renderByRegion("Oceania");
});

//////SEARCH

let filter = "";
searchBox.addEventListener("input", function () {
  let searchedArr = [];
  filter = searchBox.value.toLowerCase();
  countriesArr.forEach((item) => {
    if (item.name.common.toLowerCase().includes(filter)) {
      searchedArr.push(item);
    }
  });
  renderCountries(searchedArr);
});

//dark mode
const firstContainer = document.querySelector(".container-first");
const content = document.querySelector(".content");
const mainHeader = document.querySelector(".main-header");
const filterButton = document.querySelector(".filter-button");
const form = document.querySelector(".form");
const regListContainer = document.querySelector(".region-list-container");

let str = "";
if (localStorage.getItem("darkMode") !== "true") {
  mainHeader.classList.remove("dark");
  content.classList.remove("dark");
  firstContainer.classList.remove("dark");
  filterButton.classList.remove("dark");
  form.classList.remove("dark");
  regListContainer.classList.remove("dark");
  searchBox.classList.remove("dark");
  str = "true";
} else {
  mainHeader.classList.add("dark");
  content.classList.add("dark");
  firstContainer.classList.add("dark");
  filterButton.classList.add("dark");
  form.classList.add("dark");
  regListContainer.classList.add("dark");
  searchBox.classList.add("dark");
  str = "false";
}

document.querySelector(".mode-switcher").addEventListener("click", function () {
  mainHeader.classList.toggle("dark");
  content.classList.toggle("dark");
  firstContainer.classList.toggle("dark");
  filterButton.classList.toggle("dark");
  form.classList.toggle("dark");
  regListContainer.classList.toggle("dark");
  searchBox.classList.toggle("dark");
  if (localStorage.getItem("darkMode") === "false") {
    str = "true";
  } else {
    str = "false";
  }
  localStorage.setItem("darkMode", str);
});
