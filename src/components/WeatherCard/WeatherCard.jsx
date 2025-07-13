import { Activity, Droplet, Thermometer, Wind } from 'lucide-react'
import React from 'react'

const WeatherCard = ({weather, isVisible}) => {
  return (
    <div id='weather-card' className={`fade-in bg-white/95 backdrop-blur-sm rounded-xl mb-4 p-6 shadow-lg 
          transition-all duration-500 hover:transform hover:scale-105 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
      <div className='flex items-center gap-3 mb-4'>
        <Activity className='w-6 h-6 text-gray-500'/>
        {/* weather heading */}
        <h3 className='text-lg font-semibold text-gray-800'>
          Weather Conditions
        </h3>
      </div>
      <div className='space-y-3 text-gray-700'>
      {/* temperature */}
        <div className='flex items-center gap-2'>
          <Thermometer className='w-4 h-4 text-red-500'/>
          <span>
            Temperature: {weather.temp ? `${weather.temp}°C `: "--"}
          </span>
        </div>
        {/* humidity */}
        <div className='flex items-center gap-2'>
          <Droplet className='w-4 h-4 text-gray-500'/>
          <span>
            Himidity: {weather.humidity ? `${weather.humidity}%`: "--"}
          </span>
        </div>
        {/* windSpeed */}
        <div className='flex items-center gap-2'>
          <Wind className='w-4 h-4 text-gray-500'/>
          <span>
            Wind Speed: {weather.windSpeed ? `${weather.windSpeed} km/h `: "--"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard