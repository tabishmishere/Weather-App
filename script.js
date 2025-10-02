const apiKey = "19cc331352a3c87c82977c74777075f8";

// Getting all IDs
const search = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const weatherCondition = document.getElementById('weatherCondition');
const cityName = document.getElementById('city');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const temperature = document.getElementById('temperature');
const imgIcon = document.getElementById('img-icon');

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert("City not found!");
            return;
        }
        const data = await response.json();
        // console.log(data);

        // Update UI
        cityName.textContent = data.name;
        windSpeed.textContent = `${data.wind.speed} km/h`;
        humidity.textContent = `${data.main.humidity} %`;
        temperature.textContent = `${Math.round(data.main.temp)} °C`;
        weatherCondition.textContent = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        imgIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        imgIcon.alt = data.weather[0].description;

        // Update weather icon
        // const weatherMain = data.weather[0].main.toLowerCase();
        // updateWeatherIcon(weatherMain);

    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        alert("Something went wrong. Please try again later.");
    }
}
getWeatherData("Lahore");
// Set icon based on weather

// function updateWeatherIcon(condition) {
//     if (condition.includes("cloud")) {
//         imgIcon.src = "./images/cloud.png";
//     } else if (condition.includes("rain")) {
//         imgIcon.src = "./images/rain.png";
//     } else if (condition.includes("clear")) {
//         imgIcon.src = "./images/clear.png";
//     } else if (condition.includes("snow")) {
//         imgIcon.src = "./images/snow.png";
//     } else if (condition.includes("storm") || condition.includes("thunder")) {
//         imgIcon.src = "./images/storm.png";
//     } else {
//         imgIcon.src = "./images/mist.png";
//     }
// }

// Search Button Event
searchBtn.addEventListener('click', () => {
    const cityName = search.value.trim();
    if (cityName) {
        getWeatherData(cityName);
    } else {
        alert("Please enter a city name!");
    }
});


