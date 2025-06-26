import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className="flex justify-center mb-6">
      <Link to="/" className="inline-block">
        <img
          src="./src/assets/expenselogo.png"
          alt="Logo"
          className="h-12 w-auto object-contain"
        />
      </Link>
    </div>
  )
}

export default Logo
