const Key = '8ef3cb146f1df5e47a0244574fbd7a9b';
const AirURL = 'https://api.openweathermap.org/data/2.5/air_pollution';
const WeatherURL = 'https://api.openweathermap.org/data/2.5/weather';

//function fetch airQuality data 
export async  function getAirQuality(long,lat){
    try {
        //api call
        const res = await fetch(`${AirURL}?lat=${lat}&lon=${long}&appid=${Key}`);
        const data = await res.json();
        console.log(data.list[0].main.aqi);
        return data.list[0].main.aqi;
    } catch (error) {
        console.log(error);
         alert('Failed to fetch data');
    }
}


//function fetch wearther data 
export async function getWeatherData(long,lat){
    try {
        //api call
        const res = await fetch(`${WeatherURL}?lat=${lat}&lon=${long}&appid=${Key}`);
        const data = await res.json();
        console.log(data);
        console.log({name:data.name , temp: data.main.temp, windSpeed: data.wind.speed, humidity: data.main.humidity});
        return {name:data.name , temp: Math.floor(data.main.temp - 273.15) , windSpeed: Math.round(data.wind.speed * 3.6), humidity: data.main.humidity}
    } catch (error) {
        console.log(error);
         alert('Failed to fetch data');
    }
}


//function to fetch historical data
export async function getHistoricalAirQuality(long,lat) {
    try {
        const hour = 24;
        const current = Math.floor(Date.now()/1000);
        const start = current - (hour * 3600);

        //api call for historical data
        const res = await fetch(`${AirURL}/history?lat=${lat}&lon=${long}&start=${start}&end=${current}&appid=${Key}`);
        const data = await res.json();
        

        //Calculate average of hourly data
        const hourMap = data.list.map((item,idx) => ({
            hour: idx + 1,
            aqi: item.main.aqi,

        }))

        return hourMap;
    } catch (error) {
        console.log(error);
        alert('Failed to fetch data');
    }
}