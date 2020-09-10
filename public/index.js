const searchForm = document.querySelector(".search__location");
const cityValue = document.querySelector(".search__location input");
const cityName = document.querySelector(".city-name p");
const cardBody = document.querySelector(".card-body");
const timeImg = document.querySelector(".card-top img");
const cardInfo = document.querySelector(".back__card");
const forecastInfo = document.querySelector(".forecast");

const forecastDate = document.querySelector(".forecast__date");
const forecastTime = document.querySelector(".forecast__time");
const forecastIcon = document.querySelector(".img1");
const forecastPrediction = document.querySelector(".forecast__prediction");

const forecastDate2 = document.querySelector(".forecast__date2");
const forecastTime2 = document.querySelector(".forecast__time2");
const forecastIcon2 = document.querySelector(".img2");
const forecastPrediction2 = document.querySelector(".forecast__prediction2");

const forecastDate3 = document.querySelector(".forecast__date3");
const forecastTime3 = document.querySelector(".forecast__time3");
const forecastIcon3 = document.querySelector(".img3");
const forecastPrediction3 = document.querySelector(".forecast__prediction3");

const forecastDate4 = document.querySelector(".forecast__date4");
const forecastTime4 = document.querySelector(".forecast__time4");
const forecastIcon4 = document.querySelector(".img4");
const forecastPrediction4 = document.querySelector(".forecast__prediction4");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((registration) => {
      // console.log("SW registered");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW registration failed");
      console.log(error);
    });
}
const dateFunction = (date) => {
  let array = date.split(" "),
    day = array[0],
    time = array[1];
  return [day, time];
};

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
  const iconSrc = `https://openweathermap.org/img/wn/${imgName}@2x.png`;
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
  forecastInfo.classList.remove("d-none");
  cardInfo.classList.remove("d-none");
};

updateForecast = (city) => {
  // console.log("forecast 2>>>", city);
  const forecast = city.list[0];
  forecastDate.textContent = dateFunction(forecast.dt_txt)[0];
  forecastTime.textContent = dateFunction(forecast.dt_txt)[1];
  forecastIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
  );
  forecastPrediction.textContent = forecast.weather[0].description;
};

updateForecast2 = (city) => {
  // console.log("forecast 2>>>", city);
  const forecast = city.list[1];
  forecastDate2.textContent = dateFunction(forecast.dt_txt)[0];
  forecastTime2.textContent = dateFunction(forecast.dt_txt)[1];
  forecastIcon2.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
  );
  forecastPrediction2.textContent = forecast.weather[0].description;
};

updateForecast3 = (city) => {
  // console.log("forecast 2>>>", city);
  const forecast = city.list[2];
  forecastDate3.textContent = dateFunction(forecast.dt_txt)[0];
  forecastTime3.textContent = dateFunction(forecast.dt_txt)[1];
  forecastIcon3.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
  );
  forecastPrediction3.textContent = forecast.weather[0].description;
};

updateForecast4 = (city) => {
  // console.log("forecast 2>>>", city);
  const forecast = city.list[3];
  forecastDate4.textContent = dateFunction(forecast.dt_txt)[0];
  forecastTime4.textContent = dateFunction(forecast.dt_txt)[1];
  forecastIcon4.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
  );
  forecastPrediction4.textContent = forecast.weather[0].description;
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const citySearched = cityValue.value.trim();
  // console.log("input >>>", citySearched);
  searchForm.reset();
  requestCity(citySearched)
    .then((data) => {
      updateWeatherApp(data);
    })
    .catch((e) => console.log("error>>", e));

  requestForecast(citySearched)
    .then((data) => {
      // console.table("FFFFFOoooorcast>>>", data);
      updateForecast(data);
      updateForecast2(data);
      updateForecast3(data);
      updateForecast4(data);
    })
    .catch((e) => console.log("error>>", e));
});
