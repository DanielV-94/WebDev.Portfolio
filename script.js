/* ============================================================
   Daniel Vélez Portfolio — GSAP Animations
   ============================================================ */
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.defaults({ ease: "power3.out" });

  // ── Estados iniciales ────────────────────────────────────────
  // Los wrappers son los que se animan (posición, opacidad, escala)
  gsap.set(".logo-daniel-wrap", { xPercent: -50, opacity: 0, scale: 0.85 });
  gsap.set(".btn-contacto", { xPercent: -50, opacity: 0, y: 18, scale: 0.9 });
  gsap.set(".deco-bar-wrap--top", { opacity: 0, y: -60 });
  gsap.set(".deco-bar-wrap--bottom", { opacity: 0, y: 60 });
  gsap.set(".star-wrap", { opacity: 0, scale: 0 });
  gsap.set(".muy-pronto", { opacity: 0, x: -20 });
  gsap.set(".services", { opacity: 0, x: 20 });

  // ── Timeline de entrada ──────────────────────────────────────
  const tl = gsap.timeline();

  // 1) Barras
  tl.to(".deco-bar-wrap--top", {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: "back.out(1.4)",
  }).to(
    ".deco-bar-wrap--bottom",
    { y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)" },
    "-=0.75",
  );

  // 2) Estrellas: desde el centro expandiéndose, tiny → tamaño real
  tl.to(
    ".star-wrap",
    {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "back.out(2)",
      stagger: { amount: 0.7, from: "center" },
    },
    "-=0.3",
  );

  // 3) Logo (wrapper centrado con xPercent, GSAP no rompe el left:50%)
  tl.to(
    ".logo-daniel-wrap",
    { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" },
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
    { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
    "-=0.3",
  );

  // ── Idle loops (arrancan al terminar la entrada) ─────────────
  tl.then(() => {
    // — MOVIMIENTO RANDOM por pantalla ─────────────────────────
    // Cada star-wrap vaga de forma continua e independiente
    function wanderStar(wrap) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const tx = gsap.utils.random(-vw * 0.25, vw * 0.25);
      const ty = gsap.utils.random(-vh * 0.25, vh * 0.25);
      const dur = gsap.utils.random(4, 9);

      // Escala simula profundidad (lejos=pequeño, cerca=grande)
      const sc = gsap.utils.random(0.2, 1.6);
      const op = gsap.utils.mapRange(0.2, 1.6, 0.15, 1, sc);
      const blur = gsap.utils.mapRange(0.2, 1.6, 4, 28, sc);
      const shadowOp = gsap.utils.mapRange(0.2, 1.6, 0.2, 0.95, sc);

      gsap.to(wrap, {
        x: tx,
        y: ty,
        scale: sc,
        opacity: op,
        filter: `drop-shadow(0 0 ${blur}px rgba(241, 255, 0.08, ${shadowOp})) drop-shadow(0 0 ${blur * 2}px rgba(150,238,255,${shadowOp * 0.6}))`,
        duration: dur,
        ease: "sine.inOut",
        overwrite: false,
        onComplete: () => wanderStar(wrap),
      });
    }

    document.querySelectorAll(".star-wrap").forEach((wrap, i) => {
      gsap.delayedCall(i * 0.18, () => wanderStar(wrap));
    });

    // — ROTACIÓN suave continua en algunas estrellas ──────────
    // La rotación va en el wrapper para que el drop-shadow gire también
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

    // — PARPADEO sutil en algunas ────────────────────────────
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

    // ── Hover magnético en star-wraps ───────────────────────
    document.querySelectorAll(".star-wrap").forEach((wrap) => {
      wrap.addEventListener("mousemove", (e) => {
        const r = wrap.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * 0.55;
        const dy = (e.clientY - cy) * 0.55;
        gsap.to(wrap, {
          x: `+=${dx}`,
          y: `+=${dy}`,
          scale: 1.5,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      wrap.addEventListener("mouseleave", () => {
        gsap.to(wrap, {
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
          onComplete: () => wanderStar(wrap),
        });
      });
    });

    // Actualizar wander si cambia el tamaño de ventana
    window.addEventListener("resize", () => {
      document
        .querySelectorAll(".star-wrap")
        .forEach((wrap) => wanderStar(wrap));
    });
  }); // Cierre del DOMContentLoaded
});
