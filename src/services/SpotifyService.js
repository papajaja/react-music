import $api from "../api/api";

class SpotifyService {
  async getTrack() {}
  async getFeaturedPlaylists(limit = 20) {
    try {
      const featuredPlaylists = await $api.get(`browse/featured-playlists?limit=${limit}`);
      return featuredPlaylists.data;
    } catch (error) {
      console.error("SpotifyService -> getFeaturedPlaylists -> error", error);
      return error;
    }
  }
  async getPlaylist(id) {
    const playlist = await $api.get(`playlists/${id}`);
    return playlist.data;
  }
  async getAuthor() {}
  async getAlbum() {}
}

export default new SpotifyService();
