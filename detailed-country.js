const mainContainer = document.querySelector(".main-country");
const borderContainer = document.querySelector(".border-countries");
const mainHeader = document.querySelector(".main-header");
const country = document.querySelector(".country");
const borderHeader = document.querySelector(".border-header");
mainContainer.style.display = "none";
const render = function (el) {
  let langs = [];
  const langArr = Object.entries(el.languages);
  langArr.forEach((el) => {
    langs.push(el[1]);
  });
  document.getElementById("country-name").textContent = el.name.common;
  document.getElementById("country-flag").src = el.flags.png;
  document.getElementById("country-name-native").textContent = Object.entries(
    el.name.nativeName
  )[0][1].official;
  document.getElementById("country-population").textContent =
    el.population.toLocaleString();
  document.getElementById("country-region").textContent = el.region;
  document.getElementById("country-subregion").textContent = el.subregion;
  document.getElementById("country-capital").textContent = el.capital;
  document.getElementById(
    "country-domain"
  ).textContent = `.${el.altSpellings[0].toLowerCase()}`;
  document.getElementById("country-currency").textContent = Object.entries(
    el.currencies
  )[0][1].name;
  document.getElementById("country-language").textContent = langs;
  mainContainer.style.display = "flex";
};

// ///////////////////////////////////////////////////////////////////
// BORDER COUNTRIES

const renderBorders = function (el) {
  const borderH = document.createElement("div");
  borderContainer.append(borderH);
  el.borders.forEach((item) => {
    const borderList = document.createElement("div");
    borderList.classList.add("border-list");
    const button = document.createElement("button");
    button.classList.add("neighbor");
    let str = "";
    if (localStorage.getItem("darkMode") !== "true") {
      button.classList.remove("dark");
      str = "true";
    } else {
      button.classList.add("dark");
      str = "false";
    }
    document
      .querySelector(".mode-switcher")
      .addEventListener("click", function () {
        button.classList.toggle("dark");
        if (localStorage.getItem("darkMode") === "false") {
          str = "true";
        } else {
          str = "false";
        }
        localStorage.setItem("darkMode", str);
      });

    const borderLink = document.createElement("a");
    button.textContent = item;
    borderContainer.append(borderList);
    borderList.append(borderLink);
    borderLink.append(button);
    fetch("https://restcountries.com/v3.1/all")
      .then((r) => r.json())
      .then((res) => {
        const result = res.filter((el) => el.cca3 === item);
        borderLink.href = `/detailed-country.html?${result[0].name.common}`;
      });
  });
};

const baseUrl = document.URL;
const id = baseUrl.slice(baseUrl.indexOf("?") + 1);
const modifiedId = id.replaceAll(/%/g, "").replaceAll(/20/g, " ");
fetch("https://restcountries.com/v3.1/all")
  .then((r) => r.json())
  .then((res) => {
    const resultCountry = res.filter((item) => item.name.common === modifiedId);

    render(...resultCountry);
    renderBorders(...resultCountry);
  });

const secondContainer = document.querySelector(".container-second");
const content = document.querySelector(".content");
const returnBtn = document.querySelector(".return-btn");

let str = "";

if (localStorage.getItem("darkMode") !== "true") {
  mainHeader.classList.remove("dark");
  secondContainer.classList.remove("dark");
  content.classList.remove("dark");
  returnBtn.classList.remove("dark");
  document.getElementById("country-name").classList.remove("dark");
  document.querySelector(".list-text").classList.remove("dark");
  document.querySelector(".main-list").classList.remove("dark");
  document.querySelector(".secondary-list").classList.remove("dark");
  borderHeader.classList.remove("dark");

  str = "true";
} else {
  content.classList.remove("dark");
  mainHeader.classList.add("dark");
  secondContainer.classList.add("dark");
  content.classList.add("dark");
  returnBtn.classList.add("dark");
  document.getElementById("country-name").classList.add("dark");
  document.querySelector(".main-list").classList.add("dark");
  document.querySelector(".secondary-list").classList.add("dark");
  borderHeader.classList.add("dark");

  str = "false";
}

document.querySelector(".mode-switcher").addEventListener("click", function () {
  mainHeader.classList.toggle("dark");
  secondContainer.classList.toggle("dark");
  content.classList.toggle("dark");
  returnBtn.classList.toggle("dark");
  document.getElementById("country-name").classList.toggle("dark");
  document.querySelector(".list-text").classList.toggle("dark");
  document.querySelector(".main-list").classList.toggle("dark");
  document.querySelector(".secondary-list").classList.toggle("dark");
  borderHeader.classList.toggle("dark");

  if (localStorage.getItem("darkMode") === "false") {
    str = "true";
  } else {
    str = "false";
  }
  localStorage.setItem("darkMode", str);
});
