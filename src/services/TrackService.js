import $api from "../api/api";
import handleStrings from "../handlers/handleStrings";
import CurrentTrack from "../store/CurrentTrack";

class TrackService {
  async setTrack(id, preview_url) {
    try {
      const response = await $api.get(`tracks/${id}`);
      const track = response.data;
      const name_max_length = 30;
      const artists_max_length = 30;
      // const album_max_length = 40;

      const name = handleStrings.handleName(track.name, name_max_length);
      const artists = handleStrings.handleArtists(track.artists, artists_max_length);
      if (preview_url) {
        CurrentTrack.setTrack(preview_url, name, artists, track.album.images[0].url);
      }
    } catch (error) {
      console.log("TrackService -> getTrack -> error", error);
    }
  }
}

export default new TrackService();
