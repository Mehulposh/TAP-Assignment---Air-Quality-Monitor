import Header from "./components/Header/Header"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AlertTriangle, Wifi, WifiOff, MapPin, Wind, Thermometer, Droplets, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import useNetworkInfo from './customHooks/useNetworkInfo';
import useGeoLocation from './customHooks/useGeoLocation';
import useIntersectionObserver from './customHooks/useIntersectionObserver';


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
      
    })
  })
  return (
    <div className="bg-cyan-300 h-screen">
      <Header/>
      <ErrorMessage error={'true'} />
    </div>
  )
}

export default App
