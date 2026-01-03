const apiKey = "fdebcd93deca411df0b8f86707faccd4";

const searchBtn = document.querySelector("button");
const input = document.querySelector("input");

const cityEl = document.querySelector(".city");
const dateEl = document.querySelector(".date");
const tempEl = document.querySelector(".temp");
const conditionEl = document.querySelector(".condition");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const iconEl = document.querySelector(".weather-icon");

// Capitalize text
function capitalize(text) {
  return text
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

// Fetch weather
async function getWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    // Weather icon
    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Dynamic background
    const weatherMain = data.weather[0].main.toLowerCase();

    if (weatherMain.includes("cloud")) {
      document.body.style.background =
        "linear-gradient(135deg, #bdc3c7, #2c3e50)";
    } else if (weatherMain.includes("rain")) {
      document.body.style.background =
        "linear-gradient(135deg, #4e54c8, #8f94fb)";
    } else if (weatherMain.includes("clear")) {
      document.body.style.background =
        "linear-gradient(135deg, #56ccf2, #2f80ed)";
    } else {
      document.body.style.background =
        "linear-gradient(135deg, #74ebd5, #acb6e5)";
    }

    // Update UI
    cityEl.textContent = `${data.name}, ${data.sys.country}`;
    dateEl.textContent = new Date().toDateString();
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    conditionEl.textContent = capitalize(data.weather[0].description);
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} km/h`;

  } catch (err) {
    alert(err.message);
  }
}

// Button click
searchBtn.addEventListener("click", () => {
  if (input.value.trim()) {
    getWeather(input.value.trim());
    input.value = "";
  }
});

// Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
