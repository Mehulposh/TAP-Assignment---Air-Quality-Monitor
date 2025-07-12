import { Wind } from 'lucide-react';
import React from 'react'

const AQICard = ({airQuality, isVisible}) => {

  const getColor = (level) => {
    switch (level) {
      case 'good' : return 'bg-green-500';
      case 'moderate' : return 'bg-yellow-500';
      case 'bad' : return 'bg-red-500';
      default : return 'bg-gray-500';
    }
  };

  const getTextColor = (level) => {
    switch (level){
      case 'good' : return 'text-green-500';
      case 'moderate' : return 'text-yellow-500';
      case 'bad' : return 'text-red-500';
      default : return 'text-gray-500';
    }
  }


  return (
    <div id= 'aqi-card' className={`fade-in bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg 
          transition-all duration-500 hover:transform hover:scale-105 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
      <div className='flex items-center gap-3 mb-4'>
        <Wind className='h-6 w-6 text-blue-500'/>
        <h3 className='text-lg font-semibold text-gray-800 '>
          AIR QUALITY INDEX
        </h3>
      </div>
      <div className= {`text-5xl font-bold text-center py-6 rounded-lg ${getColor(airQuality.level)} text-white`}>
        {airQuality.aqi || '--'}
      </div>
      <p className= {`text-center font-medium ${getTextColor(airQuality.level)}`}>
        {airQuality.description}
      </p>
    </div>
  )
}

export default AQICard