import { useEffect, useState } from "react";
import $api from "../../api/api";
import Track from "./Track";
import "../../styles/media/tracks.scss";
import Header from "./Header";
import SpotifyService from "../../services/SpotifyService";
import { useParams } from "react-router-dom";

export default function Tracks({ tracks }) {
  return (
    <div className="tracks">
      <Header></Header>
      <hr />
      {tracks.map((track, index) => (
        <Track key={index} index={index} track={track.track}></Track>
      ))}
    </div>
  );
}
