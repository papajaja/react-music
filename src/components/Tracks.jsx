import { useEffect, useState } from "react";
import Loading from "./Loading";
import $api from "../api/api";
import Track from "./Track";
import "../styles/tracks.scss";

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
    }, 10);
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="tracks">
          {tracks.map((track, index) => (
            <Track index={index + 1} key={track.id} track_id={track.id} author={track.author} title={track.title}></Track>
          ))}
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
