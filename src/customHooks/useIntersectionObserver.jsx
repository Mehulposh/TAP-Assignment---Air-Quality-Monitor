import React, { useEffect, useRef, useState } from 'react'

//custom hook for scrolling
const useIntersectionObserver = () => {
  const [visibleEle, setVisibleEle] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');

    //adding the rendered elements in ref
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          setVisibleEle(prev => new Set([...prev, entry.target.id]));
        }
      });
    },{threshold: 0.1});

    elements.forEach(ele => {
      if(ele.id){
        observerRef.current.observe(ele);
      }
    });
    
    //cleanup function
    return () => {
      if(observerRef.current){
        observerRef.current.disconnect();
      }
    };
  },[]);


  return visibleEle;
}

export default useIntersectionObserver