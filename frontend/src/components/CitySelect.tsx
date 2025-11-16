import { useEffect, useState } from "react";
import { searchUSCities } from "../api/geodb";
import type { CityResult } from "../api/geodb";

type CitySelectProps = {
  value: CityResult | null;
  onChange: (city: CityResult | null) => void;
  placeholder?: string;
  className?: string;
};

export function CitySelect({
  value,
  onChange,
  placeholder = "e.g., Chicago, IL",
  className,
}: CitySelectProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // When parent sets a value (after selection), reflect in the input
  useEffect(() => {
    if (value) {
      setQuery(`${value.city}, ${value.region}`);
    }
  }, [value]);

  // Fetch cities when user types (debounced) with exact-city preference
  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    // Only use the part before the comma as the city search term
    // e.g. "Los Angeles, CA" -> "los angeles"
    const citySearch = trimmed.split(",")[0].toLowerCase();

    let cancelled = false;
    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);
      const cities = await searchUSCities(trimmed);

      if (cancelled) return;

      // 1) Dedupe by city + region so you don't get repetitive entries
      const seen = new Set<string>();
      const unique = cities.filter((c) => {
        const key = `${c.city.toLowerCase()}|${c.region.toLowerCase()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      // 2) Prefer exact city name matches (e.g. "Los Angeles")
      const exactMatches = unique.filter(
        (c) => c.city.toLowerCase() === citySearch
      );

      let filtered: CityResult[];

      if (exactMatches.length > 0) {
        // Only show exact city matches
        filtered = exactMatches;
      } else {
        // Otherwise, fall back to prefix matches (e.g. "Los" -> "Los Angeles")
        filtered = unique.filter((c) =>
          c.city.toLowerCase().startsWith(citySearch)
        );
      }

      setResults(filtered);
      setIsLoading(false);
      setIsOpen(filtered.length > 0);
    }, 300); // debounce 300ms

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  const handleSelect = (city: CityResult) => {
    onChange(city);
    setQuery(`${city.city}, ${city.region}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        className={
          className ??
          "w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ecoGreen focus:outline-none"
        }
        value={query}
        onChange={(e) => {
          const text = e.target.value;
          setQuery(text);
          if (!text.trim()) {
            onChange(null);
          }
        }}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
      />

      {isLoading && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white pointer-events-none">
          Searching...
        </span>
      )}

      {isOpen && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg text-sm text-left">
          {results.map((city) => (
            <li
              key={city.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleSelect(city)}
            >
              <div className="font-medium text-black">
                {city.city}, {city.region}
              </div>
              <div className="text-xs text-black">{city.countryCode}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
