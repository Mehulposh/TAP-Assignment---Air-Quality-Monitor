import {AlertCircle,AlertTriangle, CheckCircle } from 'lucide-react'
import React from 'react'

const HealthCard = ({airQuality, isVisible}) => {
  
  return (
    <div id='health-card' className={`fade-in bg-white/95 backdrop-blur-sm rounded-xl p-6 mb-5 shadow-lg transition-all duration-500 hover:transform hover:scale-105 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
     >
      <div className='flex items-center gap-3 mb-4'>
        <AlertCircle  className='w-6 h-6 text-orange-500'/>
        <h3 className='text-lg font-semibold text-gray-800'>
          Health Status
        </h3>
        
      </div>
      <p className='text-black font-bold  text-md mt-3 '>
          {airQuality.description}
        </p>
      <div className='mt-5 font-bold ' >
        {airQuality.level === 'good' && (
          <div className='flex items-center gap-2 text-green-600' >
            <CheckCircle className='w-5 h-5' />
            <span>
              Safe for outdoor activities
            </span>
          </div>
        )}

        {airQuality.level === 'moderate' && (
          <div className='flex items-center gap-2 text-yellow-600'>
            <AlertTriangle className='w-5 h-5' />
            <span>
              Moderate risk in outdoor activities
            </span>
          </div>
        )}

        {airQuality.level === 'bad' && (
          <div className='flex items-center gap-2 text-red-600'>
            <AlertTriangle className='w-5 h-5' />
            <span>
              Unhealthy - bad for outdoor activities
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default HealthCard