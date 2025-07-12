import React from 'react'

const Loader = ({isLoading}) => {
  return isLoading && (
    <div className='text-center py-8 '>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'>
        <p className='text-blue-100'>Loading Required Data...</p>
      </div>
    </div>
  )
}

export default Loader