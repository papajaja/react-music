import $api from "../api/api";

class SpotifyService {
  async getTrack() {}
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
