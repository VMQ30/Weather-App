import { setDropDown } from './dropdown.js'
import { displayWeatherData } from './DOM.js'

async function getWeatherData(city, date, secondDate){
    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date}/${secondDate}?unitGroup=us&include=current%2Cdays%2Calerts&key=ZDLHZQNCD3ZBG72RLWFD5BLL2&contentType=json`, {mode: 'cors'})
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

    const sunrise = weatherData.currentConditions.sunrise
    const sunset = weatherData.currentConditions.sunset

    const latitude = weatherData.latitude
    const longitude = weatherData.longitude

    const coord = `${latitude}, ${longitude}`
    const country = weatherData.resolvedAddress

    return{
        location: {country, city, coord},
        weather: {temperature, tempFeelsLike, conditions},
        time: {date, time},
        sun: {sunrise, sunset}
    }
}

async function setWeatherData(){
    const loader = document.querySelector('.loader')
    loader.style.display = 'block'
    try{
        const weather = await getWeatherData('pateros', '2025-07-04', '2025-07-10')
        
        const city = weather.location.city
        const country = weather.location.country
        const coord = weather.location.coord

        const temperature = weather.weather.temperature
        const tempFeelsLike = weather.weather.tempFeelsLike
        const condition = weather.weather.conditions

        const time = weather.time.time
        const date = weather.time.date

        const sunrise = weather.sun.sunrise
        const sunset = weather.sun.sunset

        displayWeatherData(city, country, coord, temperature, tempFeelsLike, condition, time, date, sunset, sunrise)

        console.log(city)
    }
    catch{
        
    }
    finally{
        loader.style.display = 'none'
    }
}

(function(){
    setDropDown()
    setWeatherData()
})()