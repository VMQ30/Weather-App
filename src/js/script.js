import { setDropDown } from './dropdown.js'
import { displayWeatherData, displayMoreWeatherData } from './DOM.js'

async function getWeatherData(city, date){
    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=current%2Cdays%2Calerts&key=ZDLHZQNCD3ZBG72RLWFD5BLL2&contentType=json`, {mode: 'cors'})
    const weatherData = await data.json()
    console.log(weatherData)

    const conditions = weatherData.currentConditions.conditions

    const temperature = weatherData.currentConditions.temp
    const tempFeelsLike = weatherData.currentConditions.feelslike
    const uvIndex = weatherData.currentConditions.uvindex

    const humidity = weatherData.currentConditions.humidity
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
        time: {date, time, timezone},
        sun: {sunrise, sunset},
        misc:{uvIndex, humidity, rainProbability, windDirection, windSpeed}
    }
}

async function setWeatherData(){
    
    const loader = document.querySelector('.loader')
    loader.style.display = 'block'

    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    console.log(formattedDate);

    try{
        const weather = await getWeatherData('pateros', formattedDate)
        
        const city = weather.location.city
        const country = weather.location.country
        const coord = weather.location.coord

        const temperature = weather.weather.temperature
        const tempFeelsLike = weather.weather.tempFeelsLike
        const condition = weather.weather.conditions

        const time = weather.time.time
        const timezone = weather.time.timezone
        const date = weather.time.date

        const sunrise = weather.sun.sunrise
        const sunset = weather.sun.sunset

        const uvIndex = weather.misc.humidity
        const humidity = weather.misc.humidity
        const rainProbability = weather.misc.rainProbability
        const windDirection = weather.misc.windDirection
        const windSpeed = weather.misc.windSpeed

        displayWeatherData(city, country, coord, temperature, tempFeelsLike, condition, time, date, sunset, sunrise)
        displayMoreWeatherData()
        getTime(timezone)
    }
    catch{
        loader.innerHTML = `
        <h2>Error! Try Again Later!</h2>
        `
    }
    finally{
        loader.style.display = 'none'
    }
}

// async function futureForecast(){
//     const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=current%2Cdays%2Calerts&key=ZDLHZQNCD3ZBG72RLWFD5BLL2&contentType=json`, {mode: 'cors'})
//     const weatherData = await data.json()

//     const 
// }

function getTime(timezone){
    const timeDisplay = document.querySelector('.time')
    updateTime()

    setInterval(updateTime, 1000)

    function updateTime(){
        const currentTime = new Date()
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        })
        timeDisplay.textContent = formatter.format(currentTime)
    }
}






(function(){
    setDropDown()
    setWeatherData()
})()