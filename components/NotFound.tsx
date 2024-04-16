import React from 'react'

interface Props {
    message?: string
}

function NotFound({ message }: Props) {
  return (
    <div className="not-found">
        {message}
    </div>
  )
}

export default NotFound