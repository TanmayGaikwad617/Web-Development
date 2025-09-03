document.addEventListener('DOMContentLoaded',()=>{
    const cityinput= document.getElementById('city-input');
    const getweatherbtn= document.getElementById('get-weather-btn');
    const weatherinfo= document.getElementById('weather-info');
    const cityname= document.getElementById('city-name');
    const temperatureDisplay= document.getElementById('temperature');
    const descriptionDisplay= document.getElementById('description');
    const errorMessage= document.getElementById('error-message');

    const API_KEY="API-key";

    getweatherbtn.addEventListener('click',async()=>{
        const city= cityinput.value.trim();
        if(!city) return;

        try {
            const weatherdata =await fetchWeatherdata(city);  
            displayWeatherdata(weatherdata);
        } catch (error) {
            displayerror();
        }
    })

    async function fetchWeatherdata(city){
        const url=`Url goes here`;

        const response=await fetch(url);
        console.log(typeof response);
        console.log("Response",response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data=await response.json();

        return data;
    }

    function displayWeatherdata(weatherdata){
            console.log(weatherdata);
         const {name,main,weather}=weatherdata; 

         cityname.textContent=name;    
         temperatureDisplay.textContent = `${weatherdata.main.temp}°C`;
         descriptionDisplay.textContent = weatherdata.weather[0].description;
         
         weatherinfo.classList.remove("hidden");
         errorMessage.classList.add("hidden");
    }

    function displayerror(){
        weatherinfo.classList.remove("hidden");
        errorMessage.classList.add("add");
    }


})
