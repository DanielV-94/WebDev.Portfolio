document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ── Cursor glow LERP ── */
  const glow = document.getElementById("cursor-glow");
  if (!prefersReducedMotion && glow) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const updateGlow = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;
      requestAnimationFrame(updateGlow);
    };
    updateGlow();

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
    });
  }

  /* ── Magnetic hover ── */
  const magneticItems = document.querySelectorAll(".magnetic");
  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (e) => {
      if (prefersReducedMotion) return;
      const rect = item.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);
      item.style.transform = `translate(${offsetX * 0.14}px, ${offsetY * 0.14}px)`;
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  /* ── Sparkle parallax sutil al mover el cursor ── */
  if (!prefersReducedMotion) {
    const sparkles = document.querySelectorAll(".sparkle");
    document.addEventListener("mousemove", (e) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      sparkles.forEach((sp, i) => {
        const depth = ((i % 3) + 1) * 4;
        sp.style.transform += ` translate(${cx * depth}px, ${cy * depth}px)`;
      });
    });
  }
});
