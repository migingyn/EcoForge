async function optimizeRequest(
  lat: number,
  lon: number,
  weights: Record<string, number>
) {
  const backend = import.meta.env.VITE_BACKEND_URL;

  const res = await fetch(`${backend}/optimize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      destination_lat: lat,
      destination_lon: lon,
      tonnage: 1000,
      weights: weights,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to optimize");
  }

  return res.json();
}

export default optimizeRequest;
