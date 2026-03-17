document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Text Splitting para Animaciones Cinemáticas (Sólo si NO hay reduced motion)
    if (!prefersReducedMotion) {
        const revealTexts = document.querySelectorAll('.reveal-text');
        
        revealTexts.forEach(el => {
            const text = el.innerText;
            el.innerHTML = '';
            const words = text.split(' ');
            
            words.forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'word';
                wordSpan.style.marginRight = '0.3em'; // espaciado
                
                const chars = word.split('');
                chars.forEach(char => {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char';
                    charSpan.innerText = char;
                    wordSpan.appendChild(charSpan);
                });
                el.appendChild(wordSpan);
            });
        });

        // 2. Línea de Tiempo Central (Anime.js / animejs-animation skill)
        const tl = anime.timeline({
            easing: 'easeOutExpo',
        });

        // Intro de la tarjeta
        tl.add({
            targets: '.glass-card',
            scale: [0.93, 1],
            opacity: [0, 1],
            translateY: [40, 0],
            rotateX: [5, 0], // Sutil efecto 3D
            duration: 1200,
            easing: 'spring(1, 80, 10, 0)'
        })
        // Reveal Character by Character (Apple Hero Text effect)
        .add({
            targets: '.char',
            translateY: ['110%', '0%'],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(25, {start: 100}), // Ola de letras
            easing: 'cubicBezier(0.16, 1, 0.3, 1)', // Curva de animación premium
        }, '-=800')
        // Badge Fade In
        .add({
            targets: '.anim-fade',
            opacity: [0, 1],
            duration: 800,
        }, '-=600')
        // Contenido y Footer slide up
        .add({
            targets: '.anim-fade-up',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: anime.stagger(150),
        }, '-=600');
    } else {
        // Fallback for Accessibility
        document.querySelector('.glass-card').style.opacity = '1';
        document.querySelector('.glass-card').style.transform = 'none';
        document.querySelectorAll('.anim-fade, .anim-fade-up').forEach(e => e.style.opacity = '1');
    }

    // 3. Efectos Magnéticos "Magic Hover" (design-spells skill)
    const magnetics = document.querySelectorAll('.magnetic-btn, .magnetic-link');

    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const h = rect.width / 2;
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - rect.height / 2;

            anime({
                targets: this,
                translateX: x * 0.3,
                translateY: y * 0.3,
                duration: 400,
                easing: 'easeOutSine'
            });

            // Parallax en el texto interno
            const text = this.querySelector('.btn-text');
            if(text) {
                anime({
                    targets: text,
                    translateX: x * 0.15,
                    translateY: y * 0.15,
                    duration: 400,
                    easing: 'easeOutSine'
                });
            }
        });

        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateX: 0,
                translateY: 0,
                duration: 800,
                easing: 'spring(1, 80, 10, 0)'
            });
            const text = this.querySelector('.btn-text');
            if(text) {
                anime({
                    targets: text,
                    translateX: 0,
                    translateY: 0,
                    duration: 800,
                    easing: 'spring(1, 80, 10, 0)'
                });
            }
        });
    });

    // 4. Cursor Aurora Glow Fluido (lerp animation)
    const glow = document.getElementById('cursor-glow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if(glow.style.opacity === '0' || !glow.style.opacity) glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    // Render Loop para la interpolación (Lerp) de la aurora
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.05;
        glowY += (mouseY - glowY) * 0.05;
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // 5. Interacción del Formulario Premium
    const form = document.getElementById('notify-form');
    const successMsg = document.getElementById('success-msg');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const text = btn.querySelector('.btn-text');
            
            // design-spells: Reacción táctil hiper-suave en clic
            anime({
                targets: btn,
                scale: [1, 0.92, 1],
                duration: 400,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)'
            });

            text.innerText = 'Verificando...';
            btn.disabled = true;

            setTimeout(() => {
                // Formulario se repliega
                anime({
                    targets: form,
                    opacity: 0,
                    scale: 0.95,
                    duration: 400,
                    easing: 'easeInExpo',
                    complete: () => {
                        form.style.display = 'none';
                        successMsg.style.display = 'block';
                        // Mensaje de éxito aparece gloriosamente
                        anime({
                            targets: successMsg,
                            opacity: [0, 1],
                            translateY: [20, 0],
                            duration: 800,
                            easing: 'easeOutExpo'
                        });
                    }
                });
            }, 1200);
        });
    }
});
