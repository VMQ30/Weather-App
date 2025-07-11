import { getSunsetSVG, getSunriseSVG, getHumiditySVG, getUVSVG, getRainProbSVG, getWindDirectionSVG, getWindSpeedSVG } from './svg.js'

export function displayWeatherData(city, country, coord, temperature, tempFeelsLike, condition, time, date, sunset, sunrise){
    const loader = document.querySelector('.loader')
    loader.style.display = 'block'

    let mainDisplay = document.querySelector('.location-details');
    mainDisplay.innerHTML = `
    <div class = 'location-left'>
        <div class = 'location'>
            <h2 class = 'city'>${city}</h2>
            <button class="current-location">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round">
                    <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 1 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
            </button>
        </div>
        
        <p class = 'country'>${country}</p>
        <p class = 'date'>${date}</p>
        <p class = 'coords'>Coords: ${coord}</p>
        
        <div class = 'sun'>
            <div class = 'sunrise-info'>
                <span>
                    ${getSunriseSVG()}
                </span>
                <p class = 'sunrise'>${sunrise}</p>
            </div>

            <div class = 'sunset-info'>
                <span>
                    ${getSunsetSVG()}
                </span>
                <p class = 'sunset'>${sunset}</p>
            </div>
        </div>
    </div>

    <div class = 'location-right'>
        <div class = 'weather'>
            <h1 class = 'temperature'>${temperature}°C</h1>
            <img src = '' class = 'weather-icon'>
        </div>
        <h3 class = 'time'>${time}</h3>
        <p class = 'feels-like'>Temperature Feels Like: ${tempFeelsLike}°C</p>
        <p class = 'weather-description'>${condition}</p>
    </div>
    
    <div class = 'location-bottom>
    
    </div>`
}

export function displayMoreWeatherData(uvIndex, humidity, rainProbability, windDirection, windSpeed){
    const display = document.querySelector('.location-more-info')
    display.innerHTML = `
    <div class = 'more-info'>
        <div>
            <span>
                ${getHumiditySVG()}
            </span>
            <h3 class = 'more-info-header'>Humidity</h3>
        </div>

        <p class = 'more-info-details'>${humidity}%</p>
    </div>

    <div class = 'more-info'>
        <div>
            <span>
                ${getUVSVG()}
            </span>
            <h3 class = 'more-info-header'>UV Index</h3>
        </div>
        <p class = 'more-info-details'>${uvIndex}</p>
    </div>

    <div class = 'more-info'>
        <div>
            <span>
                ${getRainProbSVG()}
            </span>
        <h3 class = 'more-info-header'>Chance of Rain</h3>
        </div>
        <p class = 'more-info-details'>${rainProbability}%</p>
    </div>
    <div class = 'more-info'>
        <div>
            <span>
                ${getWindDirectionSVG()}
            </span>
            <h3 class = 'more-info-header'>Wind Direction</h3>
        </div>
        
        <p class = 'more-info-details'>${windDirection}°</p>
    </div>
    
    <div class = 'more-info'>
        <div>
            <span>
                ${getWindSpeedSVG()}
            </span>
            <h3 class = 'more-info-header'>Wind Speed</h3>
        </div>
        
        <p class = 'more-info-details'>${windSpeed} mph</p>
    </div>
    `
}
