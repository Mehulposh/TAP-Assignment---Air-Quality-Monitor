
import React, { useEffect, useState } from 'react'

const useGeoLocation = () => {
  const [location , setLocation] = useState({
    lat: null,
    long: null,
    address: 'Detecting...'
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          setLocation({
            lat: latitude,
            long: longitude,
            address: `${latitude.toFixed(4)} , ${longitude.toFixed(4)}`
          });

          setError(null);
        },

        (error) => {
          console.log("Location Error :", error);
          setError('Unable to detect location . using default location');
          setLocation({
            lat: 19.0760,
            long: 72.8777,
            address: 'Mumbai, Maharashtra, India (default)'
          });
        },
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 300000}
      );
    }else{
      setError('Geolocation not supported . using default location');
      setLocation({
            lat: 19.0760,
            long: 72.8777,
            address: 'Mumbai, Maharashtra, India (default)'
          });
    }
  },[]);

  return {location, error};
}

export default useGeoLocation