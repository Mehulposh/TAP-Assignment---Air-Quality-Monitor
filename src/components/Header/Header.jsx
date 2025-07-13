import React from 'react'

const Header = () => {
  return (
    <div className='text-center pt-10'>
        {/* title of the application */}
        <h1 className='text-4xl md:text-5xl text-white font-bold mb-4 drop-shadow-lg' >🌍 Smart City Air Quality Monitor</h1>
        {/* sub-title of the application */}
        <p className='text-xl text-yellow-500'>Real-time environmental monitoring for your health and safety</p>
    </div>
  )
}

export default Header