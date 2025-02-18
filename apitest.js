require('dotenv').config(); // Load .env variables if available

/**
 * Weather App - API Testing
 *
 * This script is for testing the OpenWeather API by fetching current weather data
 * and a 5-day forecast for a given city. It prompts the user for a city name 
 * and then displays the current weather (temperature, humidity, wind speed, etc.) 
 * along with a 5-day weather forecast. The user can also exit the application 
 * by typing 'exit'.
 *
 * It uses:
 * - OpenWeather API for fetching weather data
 * - Node.js with axios for HTTP requests
 * - Readline for user input
 * - dotenv for managing API keys securely
 */

const axios = require('axios');
const readline = require('readline');

// Allow API key to be set via environment variable or directly in the file
const API_KEY = process.env.API_KEY || 'your_default_api_key_here';  // Provide a fallback key here if necessary

// Check if API key exists
if (!API_KEY) {
    console.error("⚠️ ERROR: No API key found! Please add your API key in the `.env` file or directly in the code.");
    process.exit(1);
}

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user for city input
function askCity() {
    return new Promise((resolve) => {
        rl.question('Please enter a city name (or type "exit" to quit): ', (city) => {
            if (city.toLowerCase() === 'exit') {
                console.log('Exiting the weather application. Goodbye!');
                process.exit();
            }
            resolve(city);
        });
    });
}

// Function to get weather icon from the API response
function getWeatherIcon(iconCode) {
    const icons = {
        '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return icons[iconCode] || '❓';
}

// Function to fetch current weather data
async function getCurrentWeather(city) {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',  // Display temperature in Celsius
                lang: 'en' // English weather descriptions
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching the weather data:', error.message);
        return null;
    }
}

// Function to fetch 5-day weather forecast
async function getForecast(city) {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'en'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching the forecast data:', error.message);
        return null;
    }
}

// Function to display weather information in a user-friendly way
function displayWeather(current, forecast) {
    console.log('\n--- CURRENT WEATHER ---');
    console.log(`${current.name}, ${current.sys.country}`);
    console.log(`Temperature: ${current.main.temp}°C`);
    console.log(`Feels like: ${current.main.feels_like}°C`);
    console.log(`Condition: ${current.weather[0].description} ${getWeatherIcon(current.weather[0].icon)}`);
    console.log(`Humidity: ${current.main.humidity}%`);
    console.log(`Wind: ${current.wind.speed} m/s`);

    console.log('\n--- 5-DAY FORECAST ---');
    const dailyForecasts = forecast.list.filter(item => item.dt_txt.includes('12:00:00')); // Filter for midday forecasts
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);  // Convert Unix timestamp to readable date
        console.log(`${date.toLocaleDateString('en-US')}: ${day.main.temp}°C, ${day.weather[0].description} ${getWeatherIcon(day.weather[0].icon)}`);
    });
}

// Main function to handle the entire workflow
async function main() {
    const city = await askCity();  // Ask user for city name
    if (!city) {
        console.log('Please enter a valid city name.');
        return;
    }
    const currentWeather = await getCurrentWeather(city);  // Get current weather
    const forecast = await getForecast(city);  // Get 5-day forecast

    if (currentWeather && forecast) {
        displayWeather(currentWeather, forecast);  // Display the weather and forecast
    } else {
        console.log('Unable to retrieve weather information. Please try again with a valid city name.');
    }

    rl.close();  // Close the input prompt
}

main();  // Execute the main function
