// Base Url
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const searchResult = () => {
  const searchFiled = document.getElementById("search-meal");
  const searchText = searchFiled.value;
  if (searchText == "") {
    alert("Please enter keyword");
  } else {
    searchFiled.value = "";
    fetch(`${BASE_URL}/search.php?s=${searchText}`)
      .then((res) => res.json())
      .then((data) => displaySearch(data.meals));
  }
};

const displaySearch = (meals) => {
  const mealContainer = document.getElementById("meals");
  mealContainer.textContent = "";
  if (meals == null) {
    alert("Please valid keys");
  } else {
    meals.forEach((meal) => {
      const div = document.createElement("div");
      div.classList.add("meal");
      div.innerHTML = `
      <div onclick="loadMealDetail(${meal.idMeal})">
        <img src=${meal.strMealThumb}>
        <h3>${meal.strMeal}</h3>
      </div>
    `;
      mealContainer.appendChild(div);
    });
  }
};

const loadMealDetail = (mealId) => {
  fetch(`${BASE_URL}/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => detailsMeal(data.meals[0]));
};

const detailsMeal = (mealInfo) => {
  const detailMeal = document.getElementById("details-meal");
  detailMeal.textContent = "";
  const div = document.createElement("div");
  div.classList.add("meal");
  div.innerHTML = `
    <img src=${mealInfo.strMealThumb}>
    <h2>${mealInfo.strMeal}</h2>
    <p>${mealInfo.strInstructions.slice(0, 150)}</p>
    <button><a href="${mealInfo.strYoutube}" targe="__blank">More</a></button>
  `;
  detailMeal.appendChild(div);
};
