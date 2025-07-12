import React, { useEffect, useRef, useState } from 'react'

const useIntersectionObserver = () => {
  const [visibleEle, setVisibleEle] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');

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

    return () => {
      if(observerRef.current){
        observerRef.current.disconnect();
      }
    };
  },[]);


  return visibleEle;
}

export default useIntersectionObserver