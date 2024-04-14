import $api from "../api/api";
import CurrentTrack from "../store/CurrentTrack";
import Queue from "../store/Queue";

class TrackService {
  async setTrack(trac_k) {
    try {
      const response = await $api.get(`tracks/${trac_k.id}`);
      const track = response.data;
      let image = "";
      if (track.album.images[0]) image = track.album.images[0].url;
      const artists = track.artists.map((e) => e.name);
      CurrentTrack.setTrack(track.preview_url, track.name, artists, image, track.id);
    } catch (error) {}
  }

  async setQueue(tracks) {
    Queue.setQueue(tracks);
  }

  shuffleArray(array) {
    const newArray = array.slice();

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  async switchMixed() {
    if (Queue.isMixed) {
      Queue.tracks = Queue.notMixedTracks;
    } else {
      const tracks = Queue.tracks;
      const shuffledTracks = service.shuffleArray(tracks);
      Queue.tracks = shuffledTracks;
    }
    Queue.switchMixed();
  }

  async switchRepeat() {
    Queue.switchRepeat();
  }

  async playNext() {
    let neededIndex = null;
    const tracks = Queue.tracks;
    tracks.forEach((track, i) => {
      if (track.id) {
        if (track.id === CurrentTrack.id) {
          neededIndex = i + 1;
        }
      } else if (track.track.id) {
        if (track.track.id === CurrentTrack.id) {
          neededIndex = i + 1;
        }
      }
    });

    if (neededIndex) {
      if (neededIndex >= tracks.length && Queue.isRepeated) {
        neededIndex = 0;
        if (tracks[neededIndex].id) {
          service.setTrack(tracks[neededIndex]);
        } else if (tracks[neededIndex].track.id) {
          console.log(neededIndex);
          service.setTrack(tracks[neededIndex].track);
        }
      } else if (neededIndex < tracks.length) {
        if (tracks[neededIndex].id) {
          service.setTrack(tracks[neededIndex]);
        } else if (tracks[neededIndex].track.id) {
          service.setTrack(tracks[neededIndex].track);
        }
      }
    }
  }

  async playPrev() {
    let neededIndex = null;
    const tracks = Queue.tracks;
    tracks.forEach((track, i) => {
      if (track.id === CurrentTrack.id) {
        neededIndex = i - 1;
        if (neededIndex > -1) {
          service.setTrack(tracks[neededIndex]);
        }
      } else if (track.track) {
        if (track.track.id === CurrentTrack.id) {
          neededIndex = i - 1;
          if (neededIndex > -1) {
            service.setTrack(tracks[neededIndex].track);
          }
        }
      }
    });
  }
}

const service = new TrackService();
export default service;
