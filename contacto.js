/* ============================================================
   Contacto — GSAP Draggable + InertiaPlugin + Entrada
   ============================================================ */

gsap.registerPlugin(Draggable, InertiaPlugin);

/* ─── Utilidades ────────────────────────────────────────── */
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));

/* ─── 1. STICKERS: carga SVGs e inicializa Draggable ────── */
function initStickers() {
  const stickers = document.querySelectorAll(".sticker");

  // Grupos de tamaño: pequeño / mediano / grande / enorme
  // Se asignan al azar para que cada sticker tenga un tamaño único
  const sizeBuckets = [
    [100, 150], // pequeño
    [160, 220], // mediano
    [230, 290], // grande
    [300, 380], // enorme
  ];

  stickers.forEach((el, i) => {
    const src = el.dataset.src;

    // Tamaño completamente random: elige bucket al azar y luego valor dentro
    const bucket = sizeBuckets[randInt(0, sizeBuckets.length - 1)];
    const sz = Math.round(rand(bucket[0], bucket[1]));
    el.style.setProperty("--sz", sz + "px");
    el.style.width = sz + "px";
    el.style.height = sz + "px";

    // Inyectar imagen
    const img = document.createElement("img");
    img.src = src;
    img.draggable = false;
    el.appendChild(img);

    // Z-index inicial aleatorio (sensación de apilamiento)
    el.style.zIndex = randInt(10, 60);

    // Rotación inicial aleatoria sutil
    const initRot = rand(-25, 25);
    gsap.set(el, { rotation: initRot, scale: rand(0.85, 1.1) });

    // ── Entrada escalonada ──────────────────────────────
    const finalScale = rand(0.85, 1.1);
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0, rotation: initRot + rand(-40, 40) },
      {
        opacity: 1,
        scale: finalScale,
        rotation: initRot,
        duration: 0.6,
        delay: 0.3 + i * 0.06 + rand(0, 0.2),
        ease: "back.out(1.8)",
      },
    );

    // ── Draggable + Inertia ─────────────────────────────
    Draggable.create(el, {
      type: "x,y",
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing",
      zIndexBoost: true, // sube z-index al coger
      edgeResistance: 0.65, // rebota suave en bordes
      bounds: window,

      onPress() {
        // Traer al frente
        this.target.style.zIndex = 9000;

        el.classList.add("is-dragging");
        gsap.to(el, {
          scale: 1.18,
          rotation: "+=8", // pequeño giro al agarrar
          duration: 0.25,
          ease: "back.out(2)",
          overwrite: "auto",
        });
      },

      onRelease() {
        el.classList.remove("is-dragging");
        el.classList.add("was-released");

        // Ajustar z al soltar
        el.style.zIndex = randInt(50, 200);

        gsap.to(el, {
          scale: rand(0.85, 1.1),
          rotation: `+=${rand(-6, 6)}`, // pequeño rebote rotacional
          duration: 0.5,
          ease: "elastic.out(1, 0.45)",
          overwrite: "auto",
          onComplete() {
            el.classList.remove("was-released");
          },
        });
      },

      onDrag() {
        // Inclinación dinámica según velocidad
        const tiltX = gsap.utils.clamp(-18, 18, this.velocityX * 0.04);
        const tiltY = gsap.utils.clamp(-10, 10, this.velocityY * 0.02);
        gsap.to(el, {
          skewX: tiltX,
          skewY: tiltY,
          duration: 0.15,
          overwrite: "auto",
        });
      },

      onDragEnd() {
        // Restablecer skew al terminar
        gsap.to(el, { skewX: 0, skewY: 0, duration: 0.4, ease: "power2.out" });
      },

      // Reducir velocidad de inertia
      throwProps: { type: "x,y", resistance: 580, maxDuration: 2.5 },
    });

    // ── Hover sutil cuando NO se arrastra ────────────────
    el.addEventListener("mouseenter", () => {
      if (!el.classList.contains("is-dragging")) {
        gsap.to(el, {
          filter:
            "drop-shadow(0 0 22px rgba(150,238,255,0.6)) drop-shadow(0 6px 28px rgba(0,0,0,0.8))",
          duration: 0.25,
          overwrite: "auto",
        });
      }
    });
    el.addEventListener("mouseleave", () => {
      if (!el.classList.contains("is-dragging")) {
        gsap.to(el, {
          filter: "drop-shadow(0 4px 18px rgba(0,0,0,0.7))",
          duration: 0.35,
          overwrite: "auto",
        });
      }
    });
  });
}

/* ─── 2. ENTRADA del contenido ──────────────────────────── */
function initEntrance() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Forzar invisible antes de animar (el CSS los deja en opacity:1 como fallback)
  gsap.set([".btn-back", ".contact-hero", ".contact-grid", ".contact-footer"], { opacity: 0 });

  tl.to(".btn-back", { opacity: 1, y: 0, duration: 0.5 })
    .fromTo(
      ".contact-hero",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.75 },
      "-=0.2",
    )
    .fromTo(
      ".contact-grid",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.45",
    )
    .fromTo(
      ".contact-footer",
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.3",
    );

  // Animar items de contacto con stagger
  tl.fromTo(
    ".contact-item",
    { opacity: 0, x: -16 },
    { opacity: 1, x: 0, duration: 0.45, stagger: 0.09 },
    "<",
  );
}

/* ─── 3. FORMULARIO de notificación ─────────────────────── */
function initForm() {
  const form = document.getElementById("notifyForm");
  const success = document.getElementById("formSuccess");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("notifyEmail").value.trim();

    if (!email) return;

    // Animación del botón al enviar
    const btn = form.querySelector(".notify-form__btn");
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete() {
        success.textContent = "✓ ¡Listo! Te avisaré en cuanto esté listo.";
        success.classList.add("visible");
        form.reset();

        // Ocultar mensaje tras 5s
        gsap.delayedCall(5, () => {
          success.classList.remove("visible");
        });
      },
    });
  });
}

/* ─── 4. GRID parallax sutil con ratón ──────────────────── */
function initGridParallax() {
  const grid = document.querySelector(".depth-grid");
  if (!grid) return;

  window.addEventListener("mousemove", (e) => {
    const mx = (e.clientX / window.innerWidth - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;

    gsap.to(grid, {
      backgroundPositionX: `${50 + mx * 6}%`,
      backgroundPositionY: `${50 + my * 6}%`,
      duration: 2,
      ease: "power1.out",
    });
  });
}

/* ─── 5. SCATTER — mouse rápido dispersa los stickers ──── */
function initScatterEffect() {
  let lastX = 0,
    lastY = 0;
  let lastTime = 0;
  let scatterCooldown = false;

  // Historial de velocidades recientes para calcular promedio sostenido
  // Solo dispara si el promedio de los últimos N frames supera el umbral
  const HISTORY = 6; // frames a promediar
  const THRESHOLD = 4.5; // px/ms promedio — requiere una sacudida real y sostenida
  const COOLDOWN_MS = 2000; // ms mínimos entre scatter consecutivos
  const speedHistory = [];

  window.addEventListener("mousemove", (e) => {
    const now = performance.now();
    const dt = now - lastTime || 1;

    const vx = (e.clientX - lastX) / dt;
    const vy = (e.clientY - lastY) / dt;
    const speed = Math.sqrt(vx * vx + vy * vy);

    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = now;

    // Mantener historial de las últimas N velocidades
    speedHistory.push(speed);
    if (speedHistory.length > HISTORY) speedHistory.shift();

    // Promedio de velocidad sostenida
    const avgSpeed =
      speedHistory.reduce((a, b) => a + b, 0) / speedHistory.length;

    if (avgSpeed > THRESHOLD && !scatterCooldown) {
      scatterCooldown = true;
      speedHistory.length = 0; // resetear historial tras disparar
      setTimeout(() => {
        scatterCooldown = false;
      }, COOLDOWN_MS);

      const stickers = document.querySelectorAll(".sticker");
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      stickers.forEach((el) => {
        // No dispersar los que están siendo arrastrados
        if (el.classList.contains("is-dragging")) return;

        // Destino: cerca del borde más cercano al cursor,
        // con algo de aleatoriedad para que no queden todos en el mismo sitio
        const side = Math.random();
        let tx, ty;
        if (side < 0.25) {
          // borde izquierdo
          tx = rand(-vw * 0.55, -vw * 0.1);
          ty = rand(-vh * 0.3, vh * 0.3);
        } else if (side < 0.5) {
          // borde derecho
          tx = rand(vw * 0.1, vw * 0.55);
          ty = rand(-vh * 0.3, vh * 0.3);
        } else if (side < 0.75) {
          // borde superior
          tx = rand(-vw * 0.3, vw * 0.3);
          ty = rand(-vh * 0.55, -vh * 0.1);
        } else {
          // borde inferior
          tx = rand(-vw * 0.3, vw * 0.3);
          ty = rand(vh * 0.1, vh * 0.55);
        }

        // Intensidad proporcional a la velocidad promedio del mouse
        const intensity = gsap.utils.clamp(1, 3, avgSpeed / THRESHOLD);
        tx *= intensity;
        ty *= intensity;

        gsap.to(el, {
          x: tx,
          y: ty,
          opacity: rand(0.05, 0.18), // casi desaparecen
          scale: rand(0.2, 0.5), // se encogen al irse
          rotation: `+=${rand(-60, 60)}`,
          duration: rand(0.7, 1.3),
          ease: "power3.out",
          overwrite: "auto",
          // Quedan fuera un buen rato antes de volver
          onComplete() {
            gsap.to(el, {
              x: rand(-vw * 0.08, vw * 0.08),
              y: rand(-vh * 0.08, vh * 0.08),
              opacity: 1,
              scale: rand(0.85, 1.1),
              rotation: `+=${rand(-20, 20)}`,
              duration: rand(2.5, 4.5),
              delay: rand(5, 11),
              ease: "elastic.out(1, 0.45)",
              overwrite: "auto",
            });
          },
        });
      });
    }
  });
}

/* ─── Init ───────────────────────────────────────────────── */
initEntrance();
initStickers();
initForm();
initGridParallax();
initScatterEffect();
