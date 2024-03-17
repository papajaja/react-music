import { makeAutoObservable } from "mobx";

class CurrentTrack {
  audio = null;
  id = null;
  author = null;
  name = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAudio(audio, id, author, name) {
    this.audio = audio;
    this.id = id;
    this.author = author;
    this.name = name;
  }
}

export default new CurrentTrack();
