import { makeAutoObservable } from "mobx";

class CurrentUser {
  id = null;
  name = null;
  image = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(id, name, image) {
    this.id = id;
    this.name = name;
    this.image = image;
  }

  logout() {
    this.id = null;
    this.name = null;
    this.image = null;
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");

    window.location.href = "/login";
  }
}

export default new CurrentUser();
