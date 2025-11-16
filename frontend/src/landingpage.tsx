import React, { useState } from 'react'
import { CitySelect } from './components/CitySelect'
import type { CityResult } from './api/geodb'


export function LandingPage({ onFindMill }: { onFindMill: (city: string, 
    volume: string, option: string) => void }) {
  const [priority, setPriority] = useState("cost");
  const [volume, setVolume] = useState("");
  const [destination, setDestination] = useState<CityResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && volume) {
      onFindMill(destination.city, volume, priority);
    }
  };


  return (
    <div className="w-full text-center">
      {/* Headline */}
      <h1 className="text-4xl font-bold text-white mb-3">
        Smart steel sourcing recommendations
      </h1>

      <p className="text-gray-300 mb-10 text-lg">
        Enter your criteria and we’ll recommend the best steel mills for your project
      </p>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-xl mx-auto">
        
        {/* Location */}
        <label className="block text-left font-medium mb-2 text-gray-700">
          Which city are you delivering to?
        </label>
        <CitySelect
          value={destination}
          onChange={setDestination}
          placeholder="e.g., Chicago, IL"
          className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-ecoGreen focus:outline-none"
        />

        {/* Volume */}
        <label className="block text-left font-medium mb-2 text-gray-700">
          How much do you need?
        </label>
        <select 
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-ecoGreen focus:outline-none appearance-none"
          style={{ height: '48px' }}
        >
          <option value="">Select volume</option>
          <option value="1-50">1–500 tons</option>  
          <option value="50-250">500–1000 tons</option>
          <option value="250-1000">1500–2000 tons</option>
          <option value="1000+">3000+ tons</option>
        </select>


        {/* Priority */}
        <label className="block text-left font-medium mb-3 text-gray-700">
          What matters most to you?
        </label>

        <div className="flex space-x-3 justify-center mb-8">

        <button
            type="button"
            onClick={() => setPriority("cost")}
            className={`px-5 py-2 rounded-full border transition
              ${
                priority === "cost"
                  ? "bg-buttonBlue text-white border-transparent"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            Cost
          </button>

          <button
            type="button"
            onClick={() => setPriority("sustainability")}
            className={`px-5 py-2 rounded-full border transition
              ${
                priority === "sustainability"
                  ? "bg-buttonBlue text-white border-transparent"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
          >
             Sustainability
          </button>

          <button
            type="button"
            onClick={() => setPriority("reliability")}
            className={`px-5 py-2 rounded-full border transition
              ${
                priority === "reliability"
                  ? "bg-buttonBlue text-white border-transparent"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
          >
             Reliability
          </button>
        </div>

        {/* CTA Button */}
        <button type="submit" 
          className="w-full bg-submitGreen text-white font-semibold py-3 rounded-lg hover:bg-hoverGreen transition">
          Find My Best Mill
        </button>
      </form>
    </div>
  );
}
