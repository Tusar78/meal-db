// Base Url
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Toggle Spinner
const toggleSpinner = styleProperty => {
  document.getElementById('spinner').style.display = styleProperty;
}

const searchResult = () => {
  const searchFiled = document.getElementById("search-meal");
  const searchText = searchFiled.value;
  toggleSpinner('grid')
  searchFiled.value = "";
  fetch(`${BASE_URL}/search.php?s=${searchText}`)
    .then((res) => res.json())
    .then((data) => displaySearch(data.meals));
};

searchResult();
const displaySearch = (meals) => {
  const mealContainer = document.getElementById("meals");
  mealContainer.textContent = "";
  if (meals == null) {
    alert("Please valid keys");
    toggleSpinner('none')
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
      toggleSpinner('none')
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

const searchInp = document.getElementById('search-meal');
const searchBtn = document.getElementById('search-btn');

searchInp.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
})