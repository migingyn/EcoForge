// src/components/CitySelect.tsx
import { useEffect, useState } from "react";
import { searchUSCities } from "./api/geodb";
import type { CityResult } from "./api/geodb";

type CitySelectProps = {
  value: CityResult | null;
  onChange: (city: CityResult | null) => void;
  label?: string;
};


export function CitySelect({ value, onChange, label }: CitySelectProps) {
  const [query, setQuery] = useState(
    value ? `${value.city}, ${value.region}` : ""
  );
  const [results, setResults] = useState<CityResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceId, setDebounceId] = useState<number | null>(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    if (debounceId) window.clearTimeout(debounceId);

    const id = window.setTimeout(async () => {
      setIsLoading(true);
      const cities = await searchUSCities(query);
      setResults(cities);
      setIsLoading(false);
      setIsOpen(true);
    }, 250);

    setDebounceId(id);
  }, [query]);

  const handleSelect = (city: CityResult) => {
    onChange(city);
    setQuery(`${city.city}, ${city.region}`);
    setIsOpen(false);
  };

  return (
    <div className="city-select-container">
      {label && <label className="field-label">{label}</label>}

      <div className="city-input-wrapper">
        <input
          type="text"
          className="text-input"
          placeholder="Start typing a city (e.g., Chicago)…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value) onChange(null);
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          onBlur={() => {
            // tiny delay so click on option still registers
            setTimeout(() => setIsOpen(false), 150);
          }}
        />
        {isLoading && <span className="input-hint">Searching…</span>}
      </div>

      {isOpen && results.length > 0 && (
        <ul className="city-dropdown">
          {results.map((city) => (
            <li
              key={city.id}
              className="city-option"
              onMouseDown={() => handleSelect(city)} // mousedown so blur doesn't kill it
            >
              <div className="city-option-main">
                {city.city}, {city.region}
              </div>
              <div className="city-option-sub">
                {city.countryCode} •{" "}
                {Math.round(city.latitude * 100) / 100},{" "}
                {Math.round(city.longitude * 100) / 100}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
