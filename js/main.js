const projects = [
  {
    name: "enhanced-pix2pix-adaptive-weight-loss",
    title: "Enhanced Pix2Pix with Adaptive Weight Loss",
    description:
      "pix2pix GAN พร้อม adaptive loss weighting ด้วย Reinforcement Learning และ Stable Baselines 3 สำหรับงาน image inpainting",
    language: "Python",
    tags: ["GAN", "Pix2Pix", "RL", "Stable Baselines 3"],
    url: "https://github.com/BrzKung/enhanced-pix2pix-adaptive-weight-loss",
    icon: "🧠",
  },
  {
    name: "gluttony-snake",
    title: "Gluttonous Snake",
    description:
      "เกม Snake บนเบราว์เซอร์ สร้างด้วย Vite, Phaser และ ONNX Runtime Web — รองรับโมเดล AI จาก Hugging Face",
    language: "JavaScript",
    tags: ["Vite", "Phaser", "ONNX", "Game"],
    url: "https://github.com/BrzKung/gluttony-snake",
    icon: "🐍",
  },
  {
    name: "gluttony-snake-ai",
    title: "Snake AI Environment",
    description:
      "Custom Gymnasium environment สำหรับฝึก AI agent เล่นเกม Snake ด้วย Reinforcement Learning พร้อม observation space 14 มิติ",
    language: "Python",
    tags: ["Gymnasium", "RL", "Snake", "OpenAI Gym"],
    url: "https://github.com/BrzKung/gluttony-snake-ai",
    icon: "🤖",
  },
  {
    name: "pix2pix-api",
    title: "Pix2Pix API",
    description:
      "REST API สำหรับ inference โมเดล Pix2Pix — นำโมเดล GAN ไปใช้งานจริงผ่าน API endpoint",
    language: "Python",
    tags: ["API", "Pix2Pix", "Inference", "FastAPI"],
    url: "https://github.com/BrzKung/pix2pix-api",
    icon: "⚡",
  },
];

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map((project) => {
      const langClass = project.language.toLowerCase();
      return `
        <article class="project-card">
          <div class="project-card__header">
            <div class="project-card__icon project-card__icon--${langClass}" aria-hidden="true">${project.icon}</div>
            <span class="project-card__lang project-card__lang--${langClass}">${project.language}</span>
          </div>
          <h3 class="project-card__title">
            <a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.title}</a>
          </h3>
          <p class="project-card__desc">${project.description}</p>
          <div class="project-card__tags">
            ${project.tags.map((tag) => `<span class="project-card__tag">${tag}</span>`).join("")}
          </div>
          <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-card__link">
            ดูบน GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
        </article>
      `;
    })
    .join("");
}

function initNav() {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");

  toggle?.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
}

document.getElementById("year")?.textContent = new Date().getFullYear();
renderProjects();
initNav();
