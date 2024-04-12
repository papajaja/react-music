import { makeAutoObservable } from "mobx";
import CurrentTrack from "./CurrentTrack";
import TrackService from "../services/TrackService";

class Queue {
  tracks = [];
  notMixedTracks = [];
  isMixed = false;
  isRepeated = false;

  constructor() {
    makeAutoObservable(this);
  }

  setQueue(tracks) {
    this.tracks = tracks;
    this.notMixedTracks = tracks;
  }

  switchMixed() {
    this.isMixed = !this.isMixed;
  }

  switchRepeat() {
    this.isRepeated = !this.isRepeated;
  }
}

export default new Queue();
