import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AlertTriangle, Wifi, WifiOff, MapPin, Wind, Thermometer, Droplets, Activity, CheckCircle, AlertCircle, Network } from 'lucide-react';
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

  const Network_Info = useNetworkInfo();
  const visibleEle = useIntersectionObserver();
  const {location , error} = useGeoLocation();

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
        //Mock data for demo
        const mockAQI = Math.floor(Math.random() * 200 )+1;
        let level, description;

        if(mockAQI <= 50){
          level = 'good';
          description = 'Air quality is satisfactory';
        }else if(mockAQI <= 100){
          level = 'moderate';
          description = 'Air quality is acceptable';
        }else{
          level = 'bad';
          description = 'Air quality is unhealthy';
        }

        setAirQuality({aqi: mockAQI, description: description});

        setWeather({
          temp: Math.floor(Math.random() * 20) + 30,
          humidity: Math.floor(Math.random() * 40) + 40,
          windSpeed: Math.floor(Math.random() * 10) + 15
        });

        const newChartData = Array.from({length: 24}, (_ , i) => ({
          hour: i,
          aqi: Math.floor(Math.random() * 120) + 20
        }));

        setChartData(newChartData);

        const newRecommendation = getRecommendation(mockAQI, level);
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
  useEffect(() => {
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
    <div className="bg-cyan-300 h-screen">
      <div className="container mx-auto px-4 py-8">
          <Header />
          <Network_API />
          <Location />
          <ErrorMessage error={error}/>

          <div>
            <AQICard />
            <WeatherCard />
            <HealthCard/>

          </div>

          <AQChart />
          <Recommendation />
          <Loader />
      </div>
    </div>
  )
}

export default App
