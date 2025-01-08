const axios = require('axios');
const readline = require('readline');

const API_KEY = ''; // Insert your OpenWeatherMap API key here
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt the user for a city name
function askCity() {
    return new Promise((resolve) => {
        rl.question('Please enter a city name: ', (city) => {
            resolve(city);
        });
    });
}

// Function to represent weather icons using ASCII characters
function getWeatherIcon(iconCode) {
    const icons = {
        '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return icons[iconCode] || '❓'; // Return a question mark if the icon is not recognized
}

// Function to fetch current weather data for a given city
async function getCurrentWeather(city) {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // Return temperature in Celsius
                lang: 'tr' // Use Turkish language for weather description
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching the weather data:', error.message);
        return null;
    }
}

// Function to fetch 5-day weather forecast for a given city
async function getForecast(city) {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // Return temperature in Celsius
                lang: 'tr' // Use Turkish language for weather description
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred while fetching the forecast data:', error.message);
        return null;
    }
}

// Function to display the current weather and 5-day forecast
function displayWeather(current, forecast) {
    console.log('\n--- CURRENT WEATHER ---');
    console.log(`${current.name}, ${current.sys.country}`); // Display city and country
    console.log(`Temperature: ${current.main.temp}°C`); // Display current temperature
    console.log(`Feels like: ${current.main.feels_like}°C`); // Display "feels like" temperature
    console.log(`Condition: ${current.weather[0].description} ${getWeatherIcon(current.weather[0].icon)}`); // Display weather description with icon
    console.log(`Humidity: ${current.main.humidity}%`); // Display humidity
    console.log(`Wind: ${current.wind.speed} m/s`); // Display wind speed

    console.log('\n--- 5-DAY FORECAST ---');
    const dailyForecasts = forecast.list.filter(item => item.dt_txt.includes('12:00:00')); // Filter to show only midday forecasts
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000); // Convert Unix timestamp to date
        console.log(`${date.toLocaleDateString('tr-TR')}: ${day.main.temp}°C, ${day.weather[0].description} ${getWeatherIcon(day.weather[0].icon)}`); // Display forecast
    });
}

// Main function to run the program
async function main() {
    const city = await askCity(); // Ask user for the city
    const currentWeather = await getCurrentWeather(city); // Get current weather data
    const forecast = await getForecast(city); // Get 5-day weather forecast

    if (currentWeather && forecast) {
        displayWeather(currentWeather, forecast); // Display the weather and forecast if data is available
    } else {
        console.log('Unable to retrieve weather information. Please ensure you entered a valid city name.');
    }

    rl.close(); // Close the readline interface
}

main(); // Run the main function



// this is for reding out from text files that


// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// // const axios = require('axios'); // We'll use axios for UCMDB API calls

// const app = express();
// const port = 3000;

// // UCMDB API information (not used currently)
// /*

// const UCMDB_API_URL = 'https://your-ucmdb-api-url.com/api';
// const UCMDB_API_USERNAME = 'your-username';
// const UCMDB_API_PASSWORD = 'your-password';
// */

// // Serve static files from the 'public' directory
// app.use(express.static('public'));
// // Add JSON parsing middleware
// app.use(express.json()); // for parsing application/json

// // Get server CIs
// app.get('/get-server-cis', (req, res) => {
//     // Current state: Reading from file
//     try {
//         const servers = fs.readFileSync('servers.txt', 'utf-8').split('\n').filter(Boolean);
//         res.json(servers);
//     } catch (error) {
//         console.error('Error reading servers.txt:', error);
//         res.status(500).json({ error: 'Failed to read server list' });
//     }

//     // UCMDB API call (currently disabled)
//     /*
//     try {
//         const response = await axios.get(`${UCMDB_API_URL}/servers`, {
//             auth: {
//                 username: UCMDB_API_USERNAME,
//                 password: UCMDB_API_PASSWORD
//             }
//         });
//         const servers = response.data.map(server => server.name);
//         res.json(servers);
//     } catch (error) {
//         console.error('Error fetching servers from UCMDB:', error);
//         res.status(500).json({ error: 'Failed to fetch servers from UCMDB' });
//     }
//     */
// });

// // Get database CIs
// app.get('/get-database-cis', (req, res) => {
//     // Current state: Reading from file
//     try {
//         const databases = fs.readFileSync('databases.txt', 'utf-8').split('\n').filter(Boolean);
//         res.json(databases);
//     } catch (error) {
//         console.error('Error reading databases.txt:', error);
//         res.status(500).json({ error: 'Failed to read database list' });
//     }

//     // UCMDB API call (currently disabled)
//     /*
//     try {
//         const response = await axios.get(`${UCMDB_API_URL}/databases`, {
//             auth: {
//                 username: UCMDB_API_USERNAME,
//                 password: UCMDB_API_PASSWORD
//             }
//         });
//         const databases = response.data.map(db => db.name);
//         res.json(databases);
//     } catch (error) {
//         console.error('Error fetching databases from UCMDB:', error);
//         res.status(500).json({ error: 'Failed to fetch databases from UCMDB' });
//     }
//     */
// });



// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

 
