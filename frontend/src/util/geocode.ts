async function geocode(location: string) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/geocode?q=${encodeURIComponent(
      location
    )}`
  );
  const data = await res.json();

  if (!data || data.length == 0) {
    throw new Error("Location not found");
  }

  return {
    lat: data.lat,
    lon: data.lon,
    displayName: data.display_name,
  };
}

export default geocode;
