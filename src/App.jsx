import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAirQuality, getWeatherData, getHistoricalAirQuality } from './api/api';
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import useNetworkInfo from './customHooks/useNetworkInfo';
import useGeoLocation from './customHooks/useGeoLocation';
import Header from './components/Header/Header';
import useIntersectionObserver from './customHooks/useIntersectionObserver';
import Network_API from './components/Networks/Networks_API';
import Location from './components/Location/Location';
import AQICard from './components/AQICard/AQICard';
import WeatherCard from './components/WeatherCard/WeatherCard';
import HealthCard from './components/HealthCard/HealthCard';
import AQChart from './components/AQChart/AQChart';
import Recommendation from './components/Recommendation/Recommendaton';
import Loader from './components/Loader/Loader';


function App() {
  const [airQuality, setAirQuality] = useState({aqi: null, description: 'Loading', level: 'unknown'});
  const [weather, setWeather] = useState({temp: null, humidity: null, windSpeed: null});
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendation, setRecommendation] = useState([]);
  const [locationName, setLocationName] = useState('');

  const networkInfo = useNetworkInfo();
  const visibleEle = useIntersectionObserver();
  const {location , error} = useGeoLocation();
  console.log(location);

  const task_idRef = useRef(null);


  //Background Tasks API
  const BackgroundTaskScheduler = useCallback((callback) => {
    if('requestIdleCallback' in window){
      task_idRef.current = requestIdleCallback(callback, {timeout: 5000});
    }else{
      setTimeout(callback,100);
    }
  },[]);


  //Health recommendation based on air quality index (AQI)
  const getRecommendation = (aqi , level) => {
    if(level === 'good'){
      return [
        'Perfect time for outdoor exercises and activities',
        'Windows can be opened for natural ventilation',
        'Great conditions for children to play outside'
      ];
    }else if(level === 'moderate'){
      return [
        'Limit prolonged outdoor exertion',
        'Consider wearing a mask during outdoor activities',
        'Air purifiers recommended for sensitive individuals'
      ];
    }else{
      return [
        'Avoid outdoor activities, especially for sensitive groups',
        'Keep windows closed and use air purifiers',
        'Wear N95 masks if you must go outside',
        'Consider postponing outdoor exercises'
      ];
    }
  };


  //Fetch air quality data
  const getAQI = useCallback(() => {
    BackgroundTaskScheduler(async () => {
      try {
        //fetches data 
        const CurrAQI = await getAirQuality(location.long,location.lat);
        const weatherData = await getWeatherData(location.long,location.lat);
        
        //setting location name
        setLocationName(weatherData.name);
        let level, description;

        //deciding safety level and warning
        if(CurrAQI <= 2){
          level = 'good';
          description = 'Air quality is satisfactory';
        }else if(CurrAQI == 3){
          level = 'moderate';
          description = 'Air quality is acceptable';
        }else{
          level = 'bad';
          description = 'Air quality is unhealthy';
        }

        // setting air quality data
        setAirQuality({aqi: CurrAQI, description: description, level: level});

        setWeather({
          temp: weatherData.temp,
          humidity: weatherData.humidity,
          windSpeed: weatherData.windSpeed
        });

        

        const newChartData = await getHistoricalAirQuality(location.long,location.lat);

        setChartData(newChartData);

        const newRecommendation = getRecommendation(CurrAQI, level);
        setRecommendation(newRecommendation);

        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching air quality data:', error);
        alert('Failed to fetch environmental data. Please try again.');
        setIsLoading(false);
      }
    })
  },[BackgroundTaskScheduler, location]);


  //fetch data when location is available
  useEffect(  () => {
    if(location.lat && location.long){
      getAQI();
       
    }
  },[location, getAQI]);


  //cleanup 
  useEffect(() => {
    return() => {
      if(task_idRef.current){
        cancelIdleCallback(task_idRef.current);
      }
    };
  },[]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-8">
          <Header />
          <Network_API networkInfo={networkInfo} />
          <Location  location={locationName}/>
          <ErrorMessage error={error}/>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AQICard airQuality={airQuality} isVisible={visibleEle.has('aqi-card')}/>
            <WeatherCard  weather={weather} isVisible={visibleEle.has('weather-card')}/>
            <HealthCard airQuality={airQuality} isVisible={visibleEle.has('health-card')}/>

          </div>

          <AQChart chartData={chartData} isVisible={visibleEle.has('chart')}/>
          <Recommendation recommendaton={recommendation} isVisible={visibleEle.has('recommendations')}/>
          <Loader isLoading={isLoading}/>
      </div>
    </div>
  )
}

export default App
