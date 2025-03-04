const apiKey = "c540b32ebb2fa5e653788076919b7ccd";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(cityName) {
    try {
        const response = await fetch(apiURL + cityName + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log("Weather Data:", data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";

        // Update Humidity and Wind Speed correctly
        document.querySelector('.humidity-value').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind-value').innerHTML = data.wind.speed + " km/h";

        // Update Weather Icon
        switch (data.weather[0].main) {
            case 'Clouds': weatherIcon.src = 'images/clouds.png'; break;
            case 'Clear': weatherIcon.src = 'images/clear.png'; break;
            case 'Drizzle': weatherIcon.src = 'images/drizzle.png'; break;
            case 'Rain': weatherIcon.src = 'images/rain.png'; break;
            case 'Thunderstorm': weatherIcon.src = 'images/thunderstorm.png'; break;
            case 'Mist':
            case 'Fog':
            case 'Haze': weatherIcon.src = 'images/mist.png'; break;
            case 'Snow': weatherIcon.src = 'images/snow.png'; break;
            default: weatherIcon.src = 'images/default.png';
        }

        document.querySelector('.weather').style.display = "block";
        document.querySelector('.error').style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
