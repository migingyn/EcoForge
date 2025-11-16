import React, { useState } from "react";
import { CitySelect } from "./components/CitySelect";
import optimizeRequest from "./util/optimize";
import type { CityResult } from "./api/geodb";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const [priority, setPriority] = useState("cost");
  const [volume, setVolume] = useState("");
  const [destination, setDestination] = useState<CityResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!destination) {
      alert("Please select a destination city.");
      return;
    }

    try {
      const lat = destination.latitude;
      const lon = destination.longitude;

      const weights = {
        cost: priority === "cost" ? 9 : 1,
        co2: priority === "sustainability" ? 9 : 1,
        risk: priority === "reliability" ? 9 : 1,
        logistics:
          priority === "sustainability"
            ? 9
            : priority === "reliability"
            ? 4
            : 1,
      };

      const response = await optimizeRequest(lat, lon, weights);
      console.log("Optimized response:", response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full text-center">
      {/* Headline */}
      <h1 className="text-4xl font-bold text-white mb-3">
        Smart steel sourcing recommendations
      </h1>

      <p className="text-gray-300 mb-10 text-lg">
        Enter your criteria and we’ll recommend the best steel mills for your
        project
      </p>

      {/* Form Card */}
      <form
        className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        {/* Location */}
        <label className="block text-left font-medium mb-2 text-gray-700">
          Which city are you delivering to?
        </label>

        <CitySelect
          value={destination}
          onChange={setDestination}
          placeholder="e.g., Chicago, IL"
          className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#67C28A] focus:outline-none"
        />

        {/* Volume */}
        <label className="block text-left font-medium mb-2 text-gray-700">
          How much do you need?
        </label>

        <select
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#67C28A] focus:outline-none"
        >
          <option value="">Select volume</option>
          <option>1–50 tons</option>
          <option>50–250 tons</option>
          <option>250–1000 tons</option>
          <option>1000+ tons</option>
        </select>

        {/* Priority */}
        <label className="block text-left font-medium mb-3 text-gray-700">
          What matters most to you?
        </label>

        <div className="flex space-x-3 justify-center mb-8">
          <button
            type="button"
            onClick={() => setPriority("cost")}
            className={`px-5 py-2 rounded-full border transition ${
              priority === "cost"
                ? "bg-[#0D1A2D] text-white border-transparent"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Cost
          </button>

          <button
            type="button"
            onClick={() => setPriority("sustainability")}
            className={`px-5 py-2 rounded-full border transition ${
              priority === "sustainability"
                ? "bg-[#0D1A2D] text-white border-transparent"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Sustainability
          </button>

          <button
            type="button"
            onClick={() => setPriority("reliability")}
            className={`px-5 py-2 rounded-full border transition ${
              priority === "reliability"
                ? "bg-[#0D1A2D] text-white border-transparent"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Reliability
          </button>
        </div>

        {/* CTA */}
        <button
          type="submit"
          className="w-full bg-[#67C28A] text-white font-semibold py-3 rounded-lg hover:bg-[#5AB37A] transition"
        >
          Find My Best Mill
        </button>
      </form>
    </div>
  );
}
