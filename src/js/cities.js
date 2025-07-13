export async function getCities(userInput){
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${userInput}`
    const setting = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3d2c09540bmsh824a822687e062ep16894fjsne1f633364575',
		    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
    }

    const response = await fetch(url, setting)
    const data = await response.json();
    return data
}

export function displaySearchSuggestion(){
    const searchSuggestion = document.querySelector('.search-suggestion')
    const searchBar = document.querySelector('.city-search')
    
    let debounceTime
    searchBar.addEventListener('input', ()  => {
        searchSuggestion.innerHTML = ''

        clearTimeout(debounceTime);
        debounceTime = setTimeout( async() => {
            let search = searchBar.value.trim().toLowerCase()

            if(search === ''){
            searchSuggestion.style.display = 'none'
            }

            else{
                const results = await getCities(search)
                console.log(results)
                if(results.data.length != 0){
                    results.data.forEach((result) => {
                        const cityContent = document.createElement('div')
                        cityContent.textContent = result.city
                        searchSuggestion.appendChild(cityContent)

                        cityContent.addEventListener('click', () => {
                            searchBar.value = result.city
                            searchSuggestion.style.display = 'none'
                        })
                    })
                    searchSuggestion.style.display = 'flex'
                }
                else{
                    const cityContent = document.createElement('p')
                    cityContent.textContent = 'No Cities Found'
                    searchSuggestion.appendChild(cityContent)
                    searchSuggestion.style.display = 'flex'
                }
                
            }
        }, 200)
    })   
}

export function getCurrentLocation(){
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            try{
                const city = await getCityCoords(latitude, longitude)
                resolve(city)

            }
            catch{
                console.log('Unable to Retrieve Location')
            }
        })
    })
}

function errorLocation(){
    console.log('Unable to Retrieve Location')
}

async function getCityCoords(latitude, longitude){
    const apiKey = 'd7e5c47b9c764d7897bb2857e11389df'
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`

    const data = await fetch(url, {mode: 'cors'})
    const result = await data.json()
    const currentCity = result.results[0].components.city

    console.log(currentCity)
    return(currentCity)
}