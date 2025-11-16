// src/api/geodb.ts

const GEO_DB_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const headers = {
  "X-RapidAPI-Key": import.meta.env.VITE_GEODB_API_KEY as string,
  "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
};

export type CityResult = {
  id: number;
  city: string;
  region: string;      // state
  countryCode: string;
  latitude: number;
  longitude: number;
};

export async function searchUSCities(query: string): Promise<CityResult[]> {
    if (!query) return [];
  
    const url = new URL(`${GEO_DB_BASE_URL}/cities`);
    url.searchParams.set("countryIds", "US");
    url.searchParams.set("namePrefix", query);
    url.searchParams.set("limit", "10");
    url.searchParams.set("sort", "-population");
    url.searchParams.set("minPopulation", "1000");
  
    console.log("Calling GeoDB:", url.toString());
  
    try {
      const res = await fetch(url.toString(), { headers });
      console.log("GeoDB status:", res.status);
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("GeoDB error body:", errorText);
        return [];
      }
  
      const data = await res.json();
      console.log("GeoDB data:", data);
  
      return (data.data || []).map((c: any) => ({
        id: c.id,
        city: c.city,
        region: c.region,
        countryCode: c.countryCode,
        latitude: c.latitude,
        longitude: c.longitude,
      }));
    } catch (err) {
      console.error("Network error searching cities", err);
      return [];
    }
  }
