import { CheckCircle } from 'lucide-react'
import React from 'react'

const Recommendaton = ({recommendaton , isVisible}) => {
  console.log(recommendaton);
  return (
    <div id='recommendations' className={`fade-in bg-white/90 backdrop-blur-sm  rounded-xl p-6 shadow-lg transition-all duration-500
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
      <h3 className='text-xl text-black font-semibold text-shadow-gray-800 mb-4'>
        💡 Task Recommendation 
      </h3>

      <ul className='space-y-3'>
        {recommendaton.map((item,idx) => (
          <li 
            key={idx} 
            className='flex items-start gap-3 text-gray-700'
            >
            <CheckCircle  className='w-5 h-5 text-green-500 mt-0.5 flex-shrink-0'/>
            <span>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Recommendaton