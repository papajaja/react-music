import { useEffect, useRef, useState } from "react";
import AuthService from "../../services/AuthService";
import CurrentUser from "../../store/CurrentUser";

const Login = () => {
  const [country, setCountry] = useState("");
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef();
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
      await AuthService.getToken(code);

      window.location.href = "/";
    }
    if (localStorage.getItem("user_name")) {
      window.location.href = "/";
    }
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  };

  const logIn = async () => {
    const codeVerifier = AuthService.generateRandomString(64);
    const hashed = await AuthService.sha256(codeVerifier);
    const codeChallenge = await AuthService.base64encode(hashed);
    AuthService.gotoAuth(codeChallenge);
  };

  useEffect(() => {
    checkAuth();
    document.title = "Stopify - Вход";
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const pixelsCount = 1000;
    let pixels = [];

    class Mouse {
      constructor() {
        this.x = -1000;
        this.y = -1000;
        this.radius = 100;
      }
    }
    const mouse = new Mouse();

    document.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.x;
      mouse.y = e.clientY - rect.y;
    });

    class Particle {
      constructor() {
        this.y = Math.random() * canvas.height;
        this.x = Math.random() * canvas.width;
        this.speed = 0;
        this.size = Math.random() * 1.5;
        this.velocity = Math.random() * 3.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 100;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirX = dx / distance;
        let forceDirY = dy / distance;
        let force = (mouse.radius - distance) / mouse.radius;
        let dirX = forceDirX;
        let dirY = forceDirY;
        if (distance < mouse.radius) {
          this.x -= dirX * 5 * force;
          this.y -= dirY * 5 * force;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 20;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 25;
          }
        }
      }

      draw() {
        ctx.beginPath();
        const hue = (this.x + this.y) % 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        // ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
    }

    const initParticles = () => {
      for (let i = 0; i < pixelsCount; i++) {
        pixels.push(new Particle());
      }
    };

    let animid = null;

    const animatePixels = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(86, 94, 111, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pixels.length; i++) {
        pixels[i].update();
        pixels[i].draw();
      }
      animid = requestAnimationFrame(animatePixels);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      pixels = [];
      initParticles();
      cancelAnimationFrame(animid);
      animatePixels();
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div className="loginpage">
      {loaded ? (
        <>
          <canvas style={{ position: "absolute" }} ref={canvasRef}></canvas>
          <div className="loginmenu">
            <div className="loginform">
              <button onClick={logIn} className="loginbutton">
                <div className="loginbuttonsvg"></div>
                <p>Войти со spotify</p>
              </button>
            </div>
            <ol className="logindesc">
              <li>Ваша страна: {country}</li>
              <li>
                1. После нажатия по кнопке вы будете перенаправлены на страницу авторизации Spotify.
              </li>
              <li>2. Spotify недоступен в России (используйте VPN, например, VeePN).</li>
              <li>
                3. Некоторые функции музыкальной платформы недоступны из-за ограничений,
                установленных сервисом Spotify.
              </li>
            </ol>
          </div>
        </>
      ) : (
        <div className="loader" />
      )}
    </div>
  );
};

export default Login;
