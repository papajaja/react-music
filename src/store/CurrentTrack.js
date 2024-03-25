import { makeAutoObservable } from "mobx";

class CurrentTrack {
  maxLen = 22;
  audio = null;
  id = null;
  author = null;
  title = null;
  author_m = null;
  title_m = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAudio(audio, id, author, title) {
    this.audio = audio;
    this.id = id;
    this.author = author;
    this.title = title;
    if (title.length > this.maxLen) {
      this.title_m = title.slice(0, this.maxLen);
      this.title_m += "...";
    } else {
      this.title_m = title;
    }
    if (author.length > this.maxLen) {
      this.author_m = author.slice(0, this.maxLen);
      this.author_m += "...";
    } else {
      this.author_m = author;
    }
  }
}

export default new CurrentTrack();
