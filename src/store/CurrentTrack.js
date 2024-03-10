import { makeAutoObservable } from "mobx";

class CurrentTrack {
  audio = null;
  id = null;
  author = null;
  name = null;
  isLoaded = false;
  isPaused = true;

  constructor() {
    makeAutoObservable(this);
  }

  setAudio(audio, id, author, name) {
    this.audio = audio;
    this.id = id;
    this.author = author;
    this.name = name;
  }

  switchIsLoaded() {
    this.isLoaded = !this.isLoaded;
  }

  switchIsPaused() {
    this.isPaused = !this.isPaused;
  }


}

export default new CurrentTrack();
