import React from 'react'

const Status = ({text = 'Default Display Text', className = 'status-display'}) => {
  return (
    <div className={className}>
      <h1>{text}</h1>
    </div>
  )
}

export default Status