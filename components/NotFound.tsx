import React from 'react'

interface Props {
    message?: string
}

function NotFound({ message }: Props) {
  return (
    <div className="not-found">
        <h1>Error 404</h1>
        <div style={{borderLeft: "2px solid gold", height:"45px"}}/>
        <h2>{message}</h2>
    </div>
  )
}

export default NotFound