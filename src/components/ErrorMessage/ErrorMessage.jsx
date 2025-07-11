import { AlertTriangle } from 'lucide-react'
import React from 'react'

const ErrorMessage = ({error}) => {
  return error && (
    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2'>
        <AlertTriangle className='w-5 h-5' />
        {error}
    </div>
  )
}

export default ErrorMessage