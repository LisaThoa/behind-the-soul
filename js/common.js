const SPECIAL_FORUMS = ["7"];
const styles = getComputedStyle(document.documentElement);

const container = document.getElementById("header_img");
const canvas = document.getElementById("header_mask");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}

resize();
window.addEventListener("resize", resize);

// couche opaque au départ
ctx.fillStyle = styles.getPropertyValue("--neutralDarker");
ctx.fillRect(0, 0, canvas.width, canvas.height);

// réglages pinceau
ctx.lineCap = "round";
ctx.lineWidth = 120;
ctx.globalCompositeOperation = "destination-out";

let t = 0;

function animate() {
  // on "referme" progressivement le masque
  ctx.globalCompositeOperation = "source-over";
  const hex = styles.getPropertyValue("--neutralDarker").trim();

  // conversion hex → rgba
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.06)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // on efface pour révéler
  ctx.globalCompositeOperation = "destination-out";

  const x = canvas.width * (0.5 + 0.45 * Math.sin(t * 0.9));
  const y = canvas.height * (0.5 + 0.35 * Math.cos(t * 1.2));

  ctx.beginPath();
  ctx.arc(x, y, 120, 0, Math.PI * 2);
  ctx.fill();

  t += 0.02;
  requestAnimationFrame(animate);
}

animate();
