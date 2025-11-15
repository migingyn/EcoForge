// src/App.tsx
import { useState } from 'react'
import { LandingPage } from './landingpage'
import { Navbar } from './components/navbar'
import './App.css'

// ⬇️ NEW imports
import { CitySelect } from './CitySelect'
import type { CityResult } from './api/geodb'

function App() {
  const [count, setCount] = useState(0)
  // ⬇️ NEW state for the selected city
  const [destination, setDestination] = useState<CityResult | null>(null)

  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-figGray to-figBlue overflow-hidden">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen w-full">
        <LandingPage />
      </main>
    </div>
  )
}

export default App
