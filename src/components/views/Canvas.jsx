import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef();
  useEffect(() => {
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
  return <canvas style={{ position: "absolute" }} ref={canvasRef}></canvas>;
};

export default Canvas;
