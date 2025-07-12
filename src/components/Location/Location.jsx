import { MapPin } from 'lucide-react'
import React from 'react'

const Location = ({location}) => {
  
  return (
    <div className='bg-white/90 backdrop-blur-sm rounded-lg p-4 mb-6 mt-5 text-center text-gray-800'>
      <div className='flex items-center justify-center gap-2 text-4xl font-semibold'>
        <MapPin className='w-7 h-7 text-blue-500'/>
        <span>
          {location}
        </span>
      </div>
    </div>
  )
}

export default Location