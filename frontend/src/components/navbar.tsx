import React, { useState } from 'react'
import logo from './image.psd-10.png' // Adjust the path as needed

export function Navbar() {
    return (
      <nav className="w-full fixed top-0 left-0 border-b-3 border-gray-800 bg-figGray
        px-8 py-4 flex items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-[8%] w-[8%]" />
          <span className="text-4xl font-notoSans font-bold text-ecoGreen">Eco</span>
          <span className="text-4xl font-notoSans font-bold text-white">Forge</span>
        </div>
      </nav>
    )
  }