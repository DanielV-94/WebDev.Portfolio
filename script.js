document.addEventListener('DOMContentLoaded', () => {
  // 1. Efecto Glow siguiendo el ratón (Interactividad y Diseño)
  const glow = document.createElement('div');
  glow.id = 'glow-cursor';
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    // Hacemos visible el cursor solo cuando se mueve
    if (glow.style.opacity === "0" || !glow.style.opacity) {
      glow.style.opacity = "1";
    }

    // Hacemos que siga la posición del mouse
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = "0"; // Esconder si el cursor sale de la pantalla
  });

  // 2. Lógica del formulario (Validación y Animación)
  const form = document.getElementById('notify-form');
  const successMsg = document.getElementById('success-msg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita recargar la página

      const btn = form.querySelector('button');
      const input = form.querySelector('input');

      // Cambio de estado en el botón para simular carga
      const originalText = btn.textContent;
      btn.textContent = 'Procesando...';
      btn.disabled = true;
      input.disabled = true;
      btn.style.opacity = '0.7';

      // Simulamos una latencia como si llamáramos a una Base de Datos (1.5 seg)
      setTimeout(() => {
        form.classList.add('hidden'); // Ocultar el formulario

        // Mostrar el mensaje de éxito
        successMsg.classList.remove('hidden');

        // Una pequeñísima pausa para permitir que el navegador dibuje el elemento
        // antes de aplicar la clase de transición
        setTimeout(() => {
          successMsg.classList.add('visible');
        }, 50);

      }, 1500);
    });
  }
});
