import React from 'react'
type ele ={
  children : React.ReactNode
}
export default function ProtectedRoute({children}:ele) {
  return (
    <div>{children}</div>
  )
}
