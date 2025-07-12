export async function getCities(userInput){
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${userInput}&limit=5`
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
        
        clearTimeout(debounceTime);
        debounceTime = setTimeout( async() => {
            let search = searchBar.value.trim().toLowerCase()

            if(search === ''){
            searchSuggestion.innerHTML = ''
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
                    })
                    searchSuggestion.style.display = 'block'
                }
                else{
                    const cityContent = document.createElement('p')
                    cityContent.textContent = 'No Cities Found'
                    searchSuggestion.appendChild(cityContent)
                    searchSuggestion.style.display = 'block'
                }
                
            }
        }, 500)
    })   
}

