import { MapPin } from 'lucide-react'
import React from 'react'

const Location = ({location}) => {
  return (
    <div className='bg-white/90 backdrop-blur-sm rounded-lg p-4 mb-6 text-center text-gray-800'>
      <div className='flex items-center justify-center gap-2'>
        <MapPin className='w-5 h-5 text-blue-500'/>
        <span>
          {location.address}
        </span>
      </div>
    </div>
  )
}

export default Location