async function getWeatherData(country, firstDate, secondDate){
    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/${firstDate}/${secondDate}?unitGroup=us&include=current%2Cdays%2Calerts&key=ZDLHZQNCD3ZBG72RLWFD5BLL2&contentType=json`, {mode: 'cors'})
    const weatherData = await data.json()
    console.log(weatherData)

    const conditions = weatherData.currentConditions.conditions

    const temperature = weatherData.currentConditions.temp
    const tempFeelsLike = weatherData.currentConditions.feelslike
    const uvIndex = weatherData.currentConditions.uvindex

    const humidty = weatherData.currentConditions.humidity
    const rainProbability = weatherData.currentConditions.precipprob

    const windDirection = weatherData.currentConditions.winddir
    const windSpeed = weatherData.currentConditions.windspeed

    const timezone = weatherData.timezone
    const time = weatherData.currentConditions.datetime

    const sunriseTime = weatherData.currentConditions.sunrise
    const sunsetTime = weatherData.currentConditions.sunset
    
    console.log(conditions)
    console.log(temperature)
    console.log(tempFeelsLike)
    console.log(uvIndex)
    console.log(humidty)
    console.log(rainProbability)
    console.log(windDirection)
    console.log(windSpeed)
    console.log(timezone)
    console.log(time)
    console.log(sunriseTime)
    console.log(sunsetTime)
}

getWeatherData('pateros', '2025-07-04', '2025-07-10')

const settings = document.querySelector('.settings');
const settingDroppdown = document.querySelector('.settings-box');

settings.addEventListener("mouseenter", () => {
    settingDroppdown.classList.add('visible')
})

settings.addEventListener('mouseleave', () => {
    settingDroppdown.classList.remove('visible')
})

settingDroppdown.addEventListener("mouseenter", () => {
    settingDroppdown.classList.add('visible')
})

settingDroppdown.addEventListener('mouseleave', () => {
    settingDroppdown.classList.remove('visible')
})