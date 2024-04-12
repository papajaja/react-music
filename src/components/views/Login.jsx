import { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import CurrentUser from "../../store/CurrentUser";
import SpotifyService from "../../services/SpotifyService";
import { useFetching } from "../../hooks/useFetching";
import { unstable_HistoryRouter } from "react-router-dom";

const Login = () => {
  const [country, setCountry] = useState("");
  const [loaded, setLoaded] = useState(false);
  const checkAuth = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    await fetch("https://api.country.is")
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        setCountry(data.country);
      })
      .catch((error) => {
        console.error("Ошибка при получении информации о местоположении:", error);
      });

    if (code && !CurrentUser.id) {
      console.log("first");
      await AuthService.getToken(code);

      window.location.href = "/";
    }
    if (localStorage.getItem("user_name")) {
      console.log("second");
      window.location.href = "/";
    }
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  };

  const logIn = async () => {
    const codeVerifier = AuthService.generateRandomString(64);
    const hashed = await AuthService.sha256(codeVerifier);
    const codeChallenge = AuthService.base64encode(hashed);
    AuthService.gotoAuth(codeChallenge);
  };

  useEffect(() => {
    checkAuth();
    document.title = "Вход";
  }, []);

  return (
    <div className="loginpage">
      {loaded ? (
        <div className="loginmenu">
          <div className="loginform">
            <button onClick={logIn} className="loginbutton">
              <div className="loginbuttonsvg"></div>
              <p>Войти со spotify</p>
            </button>
          </div>
          {/* <hr /> */}
          <ol className="logindesc">
            <li>Ваша страна: {country}</li>
            <li>1. После нажатия по кнопке вы будете перенаправлены на страницу авторизации Spotify.</li>
            <li>2. Spotify недоступен в России (используйте VPN).</li>
            <li>3. Некоторые функции музыкальной платформы недоступны из-за ограничений, установленных сервисом.</li>
          </ol>
        </div>
      ) : (
        <div className="loader" />
      )}
    </div>
  );
};

export default Login;
