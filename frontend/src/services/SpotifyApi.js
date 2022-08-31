import SpotifyWebApi from "spotify-web-api-node";

export default new SpotifyWebApi({
    client_id: "ddc7d259bece4112b9df90559ea0e4ff",
    // redirect_uri: "http://localhost:3000/session",
    redirect_uri: "https://imusic-three.vercel.app/session",
  });