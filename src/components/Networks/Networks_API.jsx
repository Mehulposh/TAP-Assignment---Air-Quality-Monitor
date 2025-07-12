import { Wifi, WifiOff } from 'lucide-react';
import React from 'react'

const Networks_API = ({networkInfo}) => {
  return (
    <div>
      <div>
        {networkInfo.online ? (
          <>
            <Wifi className='w-5 h-5 text-green-800'/>
            <span className='text-green-800'>
              Online
            </span>
          </>
        ) : (
          <>
            <WifiOff className='w-5 h-5 text-red-500'/>
            <span className='text-red-600'>
              Offline
            </span>
          </>
        )} 
        <div className='e-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
      </div>
      <div className='text-right'>
        <div>
          Connection: {networkInfo.type}
        </div>
        {networkInfo.speed && <div> Speed: {networkInfo.speed} Mbps</div>}
      </div>
    </div>
  )
}

export default Networks_API;