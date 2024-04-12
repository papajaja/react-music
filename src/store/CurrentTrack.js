import { makeAutoObservable } from "mobx";

class CurrentTrack {
  isLoaded = false;
  isPaused = true;
  audio = null;
  name = null;
  id = null;
  artists = null;
  picture = null;
  playlist = null;
  volume = 30;

  constructor() {
    makeAutoObservable(this);
  }

  switchPaused() {
    if (this.isPaused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.isPaused = !this.isPaused;
  }

  dropTrack() {
    if (this.audio) this.audio.pause();
    this.isLoaded = false;
    this.isPaused = true;
    this.audio = null;
    this.name = null;
    this.id = null;
    this.artists = null;
    this.picture = null;
  }

  setLoaded() {
    this.isLoaded = true;
  }

  setPlaylist(playlist) {
    this.playlist = playlist;
  }

  setVolume(volume) {
    this.volume = volume;
  }

  async setTrack(href, name, artists, picture, id) {
    console.log("setting track");
    this.dropTrack();
    this.isLoaded = false;
    this.audio = new Audio(href);
    this.name = name;
    this.id = id;
    this.artists = artists;
    this.picture = picture;
    this.audio.onloadedmetadata = () => {
      curr_track.setLoaded();
      this.audio.volume = this.volume / 100;
    };
  }
}

const curr_track = new CurrentTrack();
export default curr_track;
