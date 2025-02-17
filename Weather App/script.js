const locationInput = document.querySelector('#location-input');
const searchBtn = document.querySelector('#search-btn');

async function searchWeather() {
    const value = "";

    try {
        const location = locationInput.value.trim() || 'London, UK';
        console.log(location);
        const apiKey = 'MBNRUQ7DLUV67RFTDSHLP8CPS';
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
        const response = await fetch(url, {mode: 'cors'});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        value = data;
        return value;
    } catch (error) {
        console.error("Error fetching:", error);
    }
    
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchWeather();
});

locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchWeather();
    }
});