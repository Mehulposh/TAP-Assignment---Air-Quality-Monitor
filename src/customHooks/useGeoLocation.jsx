
import React, { useEffect, useState } from 'react'

const useGeoLocation = () => {
  //state for location
  const [location , setLocation] = useState({
    lat: null,
    long: null,
  });

  //state for error
  const [error, setError] = useState(null);
  
  //usseffect to fetch the coordinates of current location
  useEffect(() => {
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          
          setLocation({
            lat: latitude,
            long: longitude,
          });

          setError(null);
        },

        (error) => {
          console.log("Location Error :", error);
          setError('Unable to detect location . using default location');
          setLocation({
            lat: 19.0760,
            long: 72.8777,
            
          });
        },
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 300000}
      );
    }else{
      setError('Geolocation not supported . using default location');
      setLocation({
            lat: 19.0760,
            long: 72.8777,
            
          });
    }
  },[]);

  return {location, error};
}

export default useGeoLocation