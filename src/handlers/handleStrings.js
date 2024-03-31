class handleStrings {
  static handleCut(string) {
    const symbols = " ,.!?";
    for (let i = string.length - 1; i > -1; i--) {
      if (symbols.indexOf(string[i]) > -1) {
        string = string.slice(0, i);
      } else {
        break;
      }
    }
    return string;
  }

  static handleArtists(artists, maxLen) {
    const artistsNames = artists.map((i) => i.name);
    let artistsString = artistsNames.join(", ");
    if (artistsString.length > maxLen) {
      artistsString = artistsString.slice(0, maxLen - 3);
      artistsString = this.handleCut(artistsString);
      artistsString += "...";
    }
    if (artistsString.length === 0) {
      artistsString = "Unknown";
    }
    return artistsString;
  }

  static handleName(name, maxLen) {
    if (name.length > maxLen) {
      name = name.slice(0, maxLen - 3);
      name = this.handleCut(name);
      name += "...";
    }
    if (name.length === 0) {
      name = "Unknown";
    }
    return name;
  }

  static handleAlbum(album, maxLen) {
    if (album.length > maxLen) {
      album = album.slice(0, maxLen - 3);
      album = this.handleCut(album);
      album += "...";
    }
    if (album.length === 0) {
      album = "Unknown";
    }
    return album;
  }
}

export default handleStrings;
