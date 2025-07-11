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
        <p class = 'feels-like'>Feels Like: ${tempFeelsLike}°C</p>
        <p class = 'weather-description'>${condition}</p>
    </div>
    
    <div class = 'location-bottom>
    
    </div>`

    let temperatureText = document.querySelector('.temperature')
    let temperatureFeelsLikeText = document.querySelector('.feels-like')
    switchTempMetrics(temperature, tempFeelsLike, temperatureText, temperatureFeelsLikeText)

    // const icon = document.querySelector('.weather-icon')
    // icon.src = 
}

// function getIcon(icon){
//     switch(icon){
//         case('snow'):
//             return('./icons/snow')
        
        
//     }
// }

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
        
        <p class = 'more-info-details' id = 'wind-speed'>${windSpeed} mph</p>
    </div>`

    let windSpeedText = document.getElementById('wind-speed')
    switchSpeedMetrics(windSpeed, windSpeedText)
    
}

export function displayFutureWeatherData(futureArray){
    const futureDisplay = document.querySelector('.future-info')
    futureDisplay.innerHTML = `
    <h1>Next Days</h1>
        <div class = 'future-list'>
            
        </div>
    `
    futureArray.forEach((day) => {
        const mainPanel = document.createElement('div')
        mainPanel.classList.add('future-weather')

        const date = document.createElement('p')
        date.classList.add('future-date')
        date.textContent = day.date

        const desc = document.createElement('h3')
        desc.classList.add('future-weather-description')
        desc.textContent = day.conditions

        const tempDiv = document.createElement('div')
        tempDiv.classList.add('future-temperature')

        const tempHeader = document.createElement('p')
        tempHeader.classList.add('future-temp-header')
        tempHeader.textContent = 'Temperature: '

        const tempInfo = document.createElement('h3')
        tempInfo.classList.add('future-temp-info')
        tempInfo.textContent = `${day.temperature}°C`

        tempDiv.appendChild(tempHeader)
        tempDiv.appendChild(tempInfo)

        const rainDiv = document.createElement('div')
        rainDiv.classList.add('future-rain-prob')

        const spanIcon = document.createElement('span')
        spanIcon.innerHTML = getRainProbSVG()
        
        const rainHeader = document.createElement('p')
        rainHeader.classList.add('future-temp-header')
        rainHeader.textContent = `${day.rainProb}%`

        rainDiv.appendChild(spanIcon)
        rainDiv.appendChild(rainHeader)

        mainPanel.appendChild(date)
        mainPanel.appendChild(desc)
        mainPanel.appendChild(tempDiv)
        mainPanel.appendChild(rainDiv)

        const futureList = document.querySelector('.future-list')
        futureList.appendChild(mainPanel)

        switchFutureTempMetrics(day.temperature, tempInfo)
        switchDarkMode()
    })
}

function switchTempMetrics(temperature, tempFeelsLike, temperatureText, temperatureFeelsLikeText){
    const tempMetric = document.querySelector('.temp-metric')
    let currentMetric = 'C'

    tempMetric.addEventListener("click", () => {
        temperature = parseFloat(temperature)
        tempFeelsLike = parseFloat(tempFeelsLike)

        if(currentMetric === 'C'){
            temperature = temperature * (9 / 5) + 32
            temperatureText.textContent = `${temperature.toFixed(1)}°F`
            tempFeelsLike = tempFeelsLike * (9 / 5) + 32
            temperatureFeelsLikeText.textContent = `Feels Like: ${tempFeelsLike.toFixed(1)}°F`

            currentMetric = 'F'
        }
        else if(currentMetric === 'F'){
            temperature = (temperature - 32) * 5 / 9
            temperatureText.textContent = `${temperature.toFixed(1)}°C`
            tempFeelsLike = (tempFeelsLike - 32) * 5 / 9
            temperatureFeelsLikeText.textContent = `Feels Like: ${tempFeelsLike.toFixed(1)}°C`

            currentMetric = 'C'
        }  
    })
}

function switchFutureTempMetrics(temperature, temperatureText){
    const tempMetric = document.querySelector('.temp-metric')
    let currentMetric = 'C'

    tempMetric.addEventListener("click", () => {
        temperature = parseFloat(temperature)

        if(currentMetric === 'C'){
            temperature = temperature * (9 / 5) + 32
            temperatureText.textContent = `${temperature.toFixed(1)}°F`
            currentMetric = 'F'
            tempMetric.textContent = 'Fahrenheit '
        }
        else if(currentMetric === 'F'){
            temperature = (temperature - 32) * 5 / 9
            temperatureText.textContent = `${temperature.toFixed(1)}°C`
            currentMetric = 'C'
            tempMetric.textContent = 'Celsius'
        }  
    })
}

function switchSpeedMetrics(windSpeed, windSpeedText){
    const speedMetric = document.querySelector('.speed-metric')
    let currentMetric = 'mph'
    // const darkMode = document.querySelector('.dark-mode')
    speedMetric.addEventListener("click", () => {
        windSpeed = parseFloat(windSpeed)

        if(currentMetric === 'mph'){
            windSpeed = windSpeed * 1.60934
            windSpeedText.textContent = `${windSpeed.toFixed(1)} kph`
            currentMetric = 'kph'
            speedMetric.textContent = 'kph'
        }
        else if(currentMetric === 'kph'){
            windSpeed = windSpeed / 1.60934
            windSpeedText.textContent = `${windSpeed.toFixed(1)} mph`
            currentMetric = 'mph'
            speedMetric.textContent = 'mph'
        }  
    })
}

function switchDarkMode(){
    let currentState = 'normal mode'
    const darkMode = document.querySelector('.dark-mode')
    let background = document.querySelector('body')
    let panels = document.querySelectorAll('.future-weather')
    let panelsInfo = document.querySelectorAll('.future-weather h3')

    darkMode.addEventListener("click", () => {
        if(currentState === 'normal mode'){
            background.style.background = 'linear-gradient(rgb(0, 0, 43) 7%, rgb(0, 0, 104) 49%, rgb(0, 25, 87) 70%, rgb(6, 53, 125) 98%)'
            
            panels.forEach((panel) => {
                panel.style.background = 'rgba(0, 0, 0, 0.2)'
            })

            panelsInfo.forEach((panel) => {
                panel.style.color = 'rgba(188, 211, 228, 0.915)'
            })

            darkMode.textContent = 'Dark Mode'
            currentState = 'dark mode'
        }

        else if(currentState === 'dark mode'){
            background.style.background = 'linear-gradient(rgb(0, 0, 133) 7%, rgb(41, 116, 255) 49%, rgb(103, 146, 255) 70%, rgb(181, 211, 255) 98%)'
            
            panels.forEach((panel) => {
                panel.style.background = 'rgba(255, 255, 255, 0.2)'
            })

            panelsInfo.forEach((panel) => {
                panel.style.color = 'rgb(44, 44, 221)'
            })

            darkMode.textContent = 'Light Mode'
            currentState = 'normal mode'
        }
    })
}