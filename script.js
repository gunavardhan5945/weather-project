const apiKey = "YOUR_API_KEY_HERE";

// Elements
const searchBox = document.querySelector(".search-box");
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const condition = document.querySelector(".condition");
const humidity = document.querySelector(".details .box:nth-child(1) h3");
const wind = document.querySelector(".details .box:nth-child(2) h3");
const pressure = document.querySelector(".details .box:nth-child(3) h3");

// Fetch Weather
async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found ❌");
            return;
        }

        // Update UI
        cityName.innerText = data.name;
        temp.innerText = Math.round(data.main.temp) + "°C";
        condition.innerText = data.weather[0].main;
        humidity.innerText = data.main.humidity + "%";
        wind.innerText = data.wind.speed + " km/h";
        pressure.innerText = data.main.pressure + " hPa";

    } catch (error) {
        alert("Error fetching data ⚠️");
    }
}

// Enter Key Search
searchBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather(searchBox.value);
    }
});

// Default Load
getWeather("Vijayawada");
