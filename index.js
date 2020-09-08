const searchForm = document.querySelector(".search__location");
const cityValue = document.querySelector(".search__location input");
const cityName = document.querySelector(".city-name p");
const cardBody = document.querySelector(".card-body");
const timeImg = document.querySelector(".card-top img");
const cardInfo = document.querySelector(".back__card");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((registration) => {
      console.log("SW registered");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW registration failed");
      console.log(error);
    });
}

const toCelcius = (kelvin) => {
  const celcius = Math.round(kelvin - 273.15);
  return celcius;
};

const isDayTime = (icon) => {
  if (icon.includes("d")) {
    return true;
  } else {
    return false;
  }
};

updateWeatherApp = (city) => {
  // console.log("cittyyyy>>", city.name);
  cityName.textContent = city.name;
  const imgName = city.weather[0].icon;
  const iconSrc = `http://openweathermap.org/img/wn/${imgName}@2x.png`;
  cardBody.innerHTML = `
  <div class="card-mid row">
            <div class="col-8 text-center temp"><span>${toCelcius(
              city.main.temp
            )}&deg;C</span></div>
            <div class="col-4 condition temp">
              <p class="condition">${city.weather[0].description}</p>
              <p class="high">${toCelcius(city.main.temp_max)}&deg;C</p>
              <p class="low">${toCelcius(city.main.temp_min)}&deg;C</p>
            </div>
          </div>
          <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" alt="" />
          </div>
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>${toCelcius(city.main.feels_like)}&deg;C</p>
              <span>Feels like</span>
            </div>
            <div class="col text-center">
              <p>${city.main.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
  `;
  if (isDayTime(imgName)) {
    // console.log("day");
    timeImg.setAttribute("src", "images/2244.jpg");
    if (cityName.classList.contains("text-white")) {
      cityName.classList.remove("text-white");
    } else {
      cityName.classList.add("text-black");
    }
  } else {
    // console.log("night");
    timeImg.setAttribute("src", "images/2308.jpg");
    if (cityName.classList.contains("text-black")) {
      cityName.classList.remove("text-black");
    } else {
      cityName.classList.add("text-white");
    }
  }
  cardInfo.classList.remove("d-none");
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const citySearched = cityValue.value.trim();
  console.log("input >>>", citySearched);
  searchForm.reset();
  requestCity(citySearched)
    .then((data) => {
      updateWeatherApp(data);
    })
    .catch((e) => console.log("error>>", e));
});
