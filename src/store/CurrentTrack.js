import { makeAutoObservable } from "mobx";

class CurrentTrack {
  audio = null;
  name = null;
  artists = null;
  picture = null;

  constructor() {
    makeAutoObservable(this);
  }

  async setTrack(href, name, artists, picture) {
    if (this.audio) {
      this.audio.pause();
    }
    this.audio = new Audio(href);
    this.name = name;
    this.artists = artists;
    this.picture = picture;
    this.audio.currentTime = 0;
    this.audio.play();
  }
}

export default new CurrentTrack();
