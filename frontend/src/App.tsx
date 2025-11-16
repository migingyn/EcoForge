import { useState } from "react";
import { LandingPage } from "./landingpage";
import { Navbar } from "./components/navbar";
import "./App.css";

function App() {
  const [screen, setScreen] = useState<'landing' | 'recommendations'>('landing')
  const [formData, setFormData] = useState({ city: '', volume: '', option: '' })

  const handleFindMill = (city: string, volume: string, option: string) => {
    setFormData({ city, volume, option })
    setScreen('recommendations')
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-figGray to-figBlue overflow-hidden">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen w-full">
        {screen === 'landing' ? (
          <LandingPage onFindMill={handleFindMill}/>
        ) : (
          <Recommendations {...formData} />
        )}
      </main>
    </div>
  );
}

export default App;
