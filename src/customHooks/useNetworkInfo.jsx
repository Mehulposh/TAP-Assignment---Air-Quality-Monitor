import React, { useEffect, useState } from 'react'

//custom hook for fetchin network details
const useNetworkInfo = () => {
  //state to store network details
  const [networkInfo, setNetworInfo] = useState({
    online: navigator.onLine,
    type: 'unknown',
    speed: null
  });

  useEffect(() => {
    const updateNetworlInfo = () => {
      
      const connection  = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      setNetworInfo({
        online: navigator.onLine,
        type: connection?.effectiveType || 'unknown',
        speed: connection?.downlink || null
      });
    };

    updateNetworlInfo();
    window.addEventListener('online' , updateNetworlInfo);
    window.addEventListener('offline' , updateNetworlInfo);

    if('connection' in navigator){
      navigator.connection.addEventListener('change' , updateNetworlInfo);
    }

    return () => {
      window.removeEventListener('online' , updateNetworlInfo);
      window.removeEventListener('offline' , updateNetworlInfo);
      if('connection' in navigator){
        navigator.connection.removeEventListener('change' , updateNetworlInfo);
      }
    };
  },[]);

  return networkInfo;
};

export default useNetworkInfo