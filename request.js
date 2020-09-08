const key = "d1a4de1354d143b286cede9495cdd855";

// const baseURL =
//   "http://api.openweathermap.org/data/2.5/weather?q=nairobi&appid=d1a4de1354d143b286cede9495cdd855";
// fetch(baseURL)
//   .then((response) => {
//     console.log("response>>", response.json());
//   })
//   .catch((error) => console.log(error));
// fetch(baseURL).then((response) => console.log(response));

const requestCity = async (city) => {
  const baseURL = "http://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${city}&appid=${key}`;
  const response = await fetch(baseURL + query);
  const data = await response.json();
  console.log("data >>>>", data);
  return data;
};
// requestCity("nairobi");
