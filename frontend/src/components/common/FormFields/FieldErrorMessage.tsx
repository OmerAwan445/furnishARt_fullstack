import React from 'react'

const FieldErrorMessage = ({ message }:{ message:string }) => {
  return (
    <span className="mt-0 mr-3 text-red-500 text-xs font-medium">
        {message}
    </span>
  )
}

export default FieldErrorMessage
