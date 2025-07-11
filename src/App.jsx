import Header from "./components/Header/Header"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AlertTriangle, Wifi, WifiOff, MapPin, Wind, Thermometer, Droplets, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";


function App() {
  

  return (
    <>
      <Header/>
      <ErrorMessage error={'true'} />
    </>
  )
}

export default App
