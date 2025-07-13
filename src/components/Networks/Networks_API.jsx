import { Wifi, WifiOff } from 'lucide-react';
import React from 'react'

const Networks_API = ({networkInfo}) => {
  return (
    <div>
      <div>
       {/*network status  */}
        {networkInfo.online ? (
          <>
         
            <Wifi className='w-6 h-6 text-green-400'/>
            <span className='text-green-400 text-xl'>
              Online
            </span>
          </>
        ) : (
          <>
            <WifiOff className='w-6 h-6 text-red-500'/>
            <span className='text-red-600'>
              Offline
            </span>
          </>
        )} 
        <div className='e-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
      </div>
      {/* network details */}
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