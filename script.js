// Weather App
const weatherInput = document.querySelector('.weather-form');
const cityInput = document.querySelector('.city-input');
const card = document.querySelector('.card');
const apikey = "13e1ecfbcdff5e1210b2ec31840a2c60";

// Event Listener
weatherInput.addEventListener('submit', async event => {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        try {
            const weatherdata = await getWeatherData(city);
            displayWeatherInfo(weatherdata);
        } catch (error) {
            console.error(error);
            displayError("City not found or failed to fetch weather data.");
        }
    } else {
        displayError('Please enter a city name.');
    }
});

// Display Error
function displayError(message) {
    card.innerHTML = ''; 
    card.style.display = 'flex';

    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('error-display');

    card.appendChild(errorDisplay);
}

// Fetch Weather Data
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Could not fetch weather data');
    }

    return await response.json();
}

// Display Weather Info
function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card.innerHTML = ''; 
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const desDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${temp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    desDisplay.textContent = `Condition: ${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add('city-name');
    tempDisplay.classList.add('temp');
    desDisplay.classList.add('descritption'); // 
    humidityDisplay.classList.add('humidity');
    weatherEmoji.classList.add('weather-emoji');

    // Append elements to the card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(desDisplay);
    card.appendChild(weatherEmoji);
}

// Simple Weather Emoji Mapper
function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return '⛈️'; // Thunderstorm
    if (weatherId >= 300 && weatherId < 500) return '🌦️'; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return '🌧️'; // Rain
    if (weatherId >= 600 && weatherId < 700) return '❄️'; // Snow
    if (weatherId >= 700 && weatherId < 800) return '🌫️'; // Atmosphere (fog, mist)
    if (weatherId === 800) return '☀️'; // Clear
    if (weatherId > 800) return '☁️'; // Clouds
    return '🌈'; // Default/Unknown
}
