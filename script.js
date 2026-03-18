document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const revealElements = document.querySelectorAll(".reveal");
  if (!prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  const glow = document.getElementById("cursor-glow");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  const updateGlow = () => {
    currentX += (mouseX - currentX) * 0.09;
    currentY += (mouseY - currentY) * 0.09;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(updateGlow);
  };

  if (!prefersReducedMotion && glow) {
    updateGlow();
    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      glow.style.opacity = "1";
    });
    document.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
    });
  }

  const magneticItems = document.querySelectorAll(".magnetic");
  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      if (prefersReducedMotion) {
        return;
      }

      const rect = item.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);

      item.style.transform = `translate(${offsetX * 0.12}px, ${offsetY * 0.12}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  const form = document.getElementById("notify-form");
  const emailInput = document.getElementById("email-input");
  const successMsg = document.getElementById("success-msg");

  if (!form || !emailInput || !successMsg) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!emailInput.checkValidity()) {
      successMsg.textContent = "Ingresa un correo válido para continuar.";
      successMsg.style.color = "#ff9db5";
      emailInput.focus();
      return;
    }

    successMsg.textContent =
      "¡Listo! Te avisaré cuando publiquemos el sitio final 🚀";
    successMsg.style.color = "#6fffc4";
    form.reset();
  });
});
