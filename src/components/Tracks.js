import { useEffect, useState } from "react";
import Loading from "./Loading";
import $api from "../api/api";
import Track from "./Track";

export default function Tracks() {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTracks = async () => {
    const LT = await $api.get("/tracks");
    setTracks(LT.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      loadTracks();
    }, 200);
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="tracks">
          {tracks.map((track) => (
            <Track key={track.track_id} track_id={track.track_id} author={track.author} name={track.name}></Track>
          ))}
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
