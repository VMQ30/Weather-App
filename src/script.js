async function getWeatherData(country){
    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/2025-07-07?key=ZDLHZQNCD3ZBG72RLWFD5BLL2`, {mode: 'cors'})
    const weatherData = await data.json()
    console.log(weatherData)
}

getWeatherData('pateros')