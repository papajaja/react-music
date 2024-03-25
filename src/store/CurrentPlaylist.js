import { makeAutoObservable } from "mobx";

class CurrentPlaylist {
  author = null;
  title = null;
  description = "Something there..";
  likes = 0;
  background = null;
  id = null;

  tracks = [];

  constructor() {
    makeAutoObservable(this);
  }

  setPlaylist(author, title, id) {
    this.author = author;
    this.title = title;
    this.id = id;
  }
}

export default new CurrentPlaylist();
