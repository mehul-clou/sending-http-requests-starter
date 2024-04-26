import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:3000/placessss");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("failed to reach places");
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message: error.message || "could nnot fetch place,try agan later",
        });
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="Ann Error Occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
