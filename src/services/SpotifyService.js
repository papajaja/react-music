import $api from "../api/api";
import CurrentUser from "../store/CurrentUser";

class SpotifyService {
  async searchData(value) {
    try {
      const response = await $api.get(`/search?q=${value}&type=album,track,playlist,artist`);
      return response;
    } catch (error) {
      console.error("SpotifyService -> searchData -> error", error);
    }
  }
  async createPlaylist(name, description) {
    try {
      const response = await $api.post(`users/${CurrentUser.id}/playlists`, { body: { name: name, public: true, collaborative: false, description: description } });
      return response;
    } catch (error) {
      console.error("SpotifyService -> getUserPlaylists -> error", error);
    }
  }
  async getUserPlaylists() {
    try {
      const response = await $api.get("me/playlists");
      return response;
    } catch (error) {
      console.error("SpotifyService -> getUserPlaylists -> error", error);
    }
  }
  async getProfile() {
    try {
      const response = await $api.get("me");
      return response;
    } catch (error) {
      console.error("SpotifyService -> getProfile -> error", error);
    }
  }
  async getFeaturedPlaylists(limit = 32) {
    try {
      const featuredPlaylists = await $api.get(`browse/featured-playlists?limit=${limit}`);
      return featuredPlaylists;
    } catch (error) {
      console.error("SpotifyService -> getFeaturedPlaylists -> error", error);
    }
  }
  async getPlaylist(id) {
    const playlist = await $api.get(`playlists/${id}`);
    return playlist.data;
  }
  async getArtist(id) {
    try {
      const artist = await $api.get(`artists/${id}`);
      const artistAlbums = await $api.get(`artists/${id}/albums`);
      const artistPopular = await $api.get(`artists/${id}/top-tracks`);
      const artistRelated = await $api.get(`artists/${id}/related-artists`);
      return { artist, artistAlbums, artistPopular, artistRelated };
    } catch (error) {
      console.error("SpotifyService -> getArtist -> error", error);
    }
  }
  async getAlbum(id) {
    try {
      const album = await $api.get(`albums/${id}`);
      return album;
    } catch (error) {
      console.error("SpotifyService -> getAlbum -> error", error);
    }
  }
}

export default new SpotifyService();
