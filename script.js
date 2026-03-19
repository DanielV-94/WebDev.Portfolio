/* ============================================================
   Daniel Vélez Portfolio — GSAP Animations
   ============================================================ */

gsap.defaults({ ease: "power3.out" });

// ── Centrar logo y botón con xPercent (GSAP respeta left:50%) ─
gsap.set(".logo-daniel", { xPercent: -50, opacity: 0, scale: 0.85 });
gsap.set(".btn-contacto", { xPercent: -50, opacity: 0, y: 18, scale: 0.9 });
gsap.set(".deco-bar--top", { opacity: 0, y: -60 });
gsap.set(".deco-bar--bottom", { opacity: 0, y: 60 });
gsap.set(".star", { opacity: 0, scale: 0 });
gsap.set(".muy-pronto", { opacity: 0, x: -20 });
gsap.set(".services", { opacity: 0, x: 20 });

// ── Timeline de entrada ──────────────────────────────────────
const tl = gsap.timeline();

// 1) Barras
tl.to(".deco-bar--top", {
  y: 0,
  opacity: 1,
  duration: 0.9,
  ease: "back.out(1.4)",
}).to(
  ".deco-bar--bottom",
  { y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)" },
  "-=0.75",
);

// 2) Estrellas: desde el centro expandiéndose, tiny → tamaño real
tl.to(
  ".star",
  {
    opacity: 1,
    scale: 1,
    duration: 0.7,
    ease: "back.out(2)",
    stagger: { amount: 0.7, from: "center" },
  },
  "-=0.3",
);

// 3) Logo
tl.to(
  ".logo-daniel",
  {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "back.out(1.2)",
  },
  "-=0.3",
);

// 4) Muy Pronto + Servicios
tl.to(".muy-pronto", { opacity: 1, x: 0, duration: 0.7 }, "-=0.4").to(
  ".services",
  { opacity: 1, x: 0, duration: 0.7 },
  "-=0.65",
);

// 5) Botón
tl.to(
  ".btn-contacto",
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.7,
    ease: "back.out(1.5)",
  },
  "-=0.3",
);

// ── Idle loops (arrancan al terminar la entrada) ─────────────
tl.then(() => {
  // — MOVIMIENTO RANDOM por pantalla ─────────────────────────
  // Cada estrella vaga de forma continua e independiente
  function wanderStar(star) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Destino random relativo a la posición CSS original (fixed)
    const tx = gsap.utils.random(-vw * 0.25, vw * 0.25);
    const ty = gsap.utils.random(-vh * 0.25, vh * 0.25);
    const dur = gsap.utils.random(4, 9);

    // Escala random: simula profundidad (lejos=pequeño, cerca=grande)
    const sc = gsap.utils.random(0.2, 1.6);

    // Opacidad ligada a la escala: más lejos → más tenue
    const op = gsap.utils.mapRange(0.2, 1.6, 0.15, 1, sc);

    // Sombra variable según profundidad: cerca = glow grande, lejos = sombra pequeña
    const blur = gsap.utils.mapRange(0.2, 1.6, 4, 28, sc);
    const shadowOp = gsap.utils.mapRange(0.2, 1.6, 0.2, 0.95, sc);

    gsap.to(star, {
      x: tx,
      y: ty,
      scale: sc,
      opacity: op,
      filter: `drop-shadow(0 0 ${blur}px rgba(239, 0, 255, ${shadowOp})) drop-shadow(0 0 ${blur * 2}px rgba(150, 238, 255, ${shadowOp * 0.6}))`,
      duration: dur,
      ease: "sine.inOut",
      overwrite: false,
      onComplete: () => wanderStar(star),
    });
  }

  document.querySelectorAll(".star").forEach((star, i) => {
    // Delay escalonado para que no todas salgan al mismo tiempo
    gsap.delayedCall(i * 0.18, () => wanderStar(star));
  });

  // — ROTACIÓN suave continua en algunas estrellas
  [
    { sel: ".star-m--3", deg: 360, dur: 12 },
    { sel: ".star-sm--2", deg: -360, dur: 9 },
    { sel: ".star-sm--4", deg: 360, dur: 14 },
    { sel: ".star-sm--6", deg: -360, dur: 11 },
    { sel: ".star-l--1", deg: 360, dur: 16 },
  ].forEach(({ sel, deg, dur }) => {
    gsap.to(sel, {
      rotation: deg,
      duration: dur,
      repeat: -1,
      ease: "none",
      delay: gsap.utils.random(0, 2),
    });
  });

  // — PARPADEO sutil en algunas
  [".star-sm--1", ".star-m--2", ".star-l--2"].forEach((sel) => {
    gsap.to(sel, {
      opacity: 0.25,
      duration: gsap.utils.random(1.4, 2.5),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: gsap.utils.random(0, 2),
    });
  });

  // ── Hover magnético en estrellas ─────────────────────────
  document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("mousemove", (e) => {
      const r = star.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * 0.55;
      const dy = (e.clientY - cy) * 0.55;
      gsap.to(star, {
        x: `+=${dx}`,
        y: `+=${dy}`,
        scale: 1.5,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    star.addEventListener("mouseleave", () => {
      // Al soltar, la estrella retoma su wander desde donde quedó
      gsap.to(star, {
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
        onComplete: () => wanderStar(star),
      });
    });
  });

  // Actualizar rangos si cambia el tamaño de ventana
  window.addEventListener("resize", () => {
    document.querySelectorAll(".star").forEach((star) => wanderStar(star));
  });
});
