import CurrentUser from "../store/CurrentUser";

const url = "https://accounts.spotify.com/api/token";
const clientId = "419f99d845da4e6180b795dc9e3d2ab0";
const redirectUri = "https://stopify.ru";

class AuthService {
  static generateRandomString(length) {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    const codeVerifier = values.reduce((acc, x) => acc + possible[x % possible.length], "");
    localStorage.setItem("code_verifier", codeVerifier);
    return codeVerifier;
  }

  static async sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const crypto = window.crypto.subtle;
    const digest = await crypto.digest("SHA-256", data);
    return digest;
  }

  static base64encode(input) {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }

  static async getToken(code) {
    let codeVerifier = localStorage.getItem("code_verifier");

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);
  }

  static gotoAuth(codeChallenge) {
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    const params = {
      response_type: "code",
      client_id: clientId,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  static setUser(id, name, image) {
    CurrentUser.setUser(id, name, image);
    localStorage.setItem("user_name", name);
  }

  static logout() {
    CurrentUser.logout();
    localStorage.removeItem("user_name");
  }
}

export default AuthService;
