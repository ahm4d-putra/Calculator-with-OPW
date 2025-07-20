// API Key OpenWeatherMap (daftar gratis di openweathermap.org)
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Ganti dengan API key Anda
const CITY_ID = '1642911'; // ID Jakarta di OpenWeatherMap

async function fetchWeather() {
    try {
        // 1. Fetch current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}&units=metric&lang=id`
        );
        
        if (!currentResponse.ok) {
            throw new Error('Gagal mengambil data cuaca saat ini');
        }
        
        const currentData = await currentResponse.json();
        updateCurrentWeather(currentData);
        
        // 2. Fetch 5-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&appid=${API_KEY}&units=metric&lang=id`
        );
        
        if (!forecastResponse.ok) {
            throw new Error('Gagal mengambil prakiraan cuaca');
        }
        
        const forecastData = await forecastResponse.json();
        updateForecast(forecastData);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('weather-description').textContent = 'Gagal memuat data cuaca';
        document.getElementById('forecast').innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${error.message}</p>
                <button onclick="fetchWeather()">Coba Lagi</button>
            </div>
        `;
    }
}

function updateCurrentWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-description').textContent = 
        data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)} °C`;
    
    // Update weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.querySelector('.weather-icon-main').innerHTML = 
        `<img src="${iconUrl}" alt="${data.weather[0].main}" style="width:80px">`;
    
    // Update details
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)} °C`;
    document.getElementById('humidity').textContent = `${data.main.humidity} %`;
    document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/jam`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
}

function updateForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';
    
    // Ambil data setiap hari (per 24 jam)
    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('id-ID', { weekday: 'short' });
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" 
                 alt="${forecast.weather[0].description}">
            <div class="forecast-temp">${Math.round(forecast.main.temp)}°C</div>
            <div class="forecast-desc">${forecast.weather[0].description}</div>
        `;
        
        forecastContainer.appendChild(forecastItem);
    }
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchWeather);