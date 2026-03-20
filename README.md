# Daniel Vélez — Portfolio Web

> Sitio de una sola página "coming soon" + contacto, con stickers arrastrables, animaciones holográficas y efectos de profundidad.

---

## 📋 Descripción

Portfolio personal de **Daniel Vélez**, diseñador UX/UI, desarrollador frontend y motion designer con sede en México. El sitio es una única página que reúne el hero introductorio y la sección de contacto:

| Sección                  | Propósito                                                         |
| ------------------------ | ----------------------------------------------------------------- |
| Hero _"Muy Pronto 2026"_ | Tipografía holográfica, listado de servicios y entrada animada    |
| Contacto                 | Stickers arrastrables, links, formulario de notificación de lanzamiento |

---

## ✨ Características principales

### Hero introductorio

- **Tipografía holográfica** con gradiente animado (cian-lima-verde)
- **Entrada escalonada** con GSAP (título, año, servicios, sección de contacto)
- Listado de servicios: Programación Web · Diseño UX/UI · Motion Graphics

### Stickers & interacciones

- **31 stickers SVG arrastrables** con física de inercia (GSAP Draggable + InertiaPlugin)
  - Tamaños aleatorios en cada carga (4 buckets: 80–304 px)
  - Inclinación dinámica según velocidad al arrastrar
  - Siempre sobre el contenido — el usuario debe moverlos para leer
- **Efecto scatter**: si el mouse se mueve muy rápido y de forma sostenida, los stickers huyen a los bordes y regresan solos (5–11 s, cooldown 3.5 s)
- **Hover** con efecto de glow cian al pasar el cursor sobre cada sticker

### Contacto & formulario

- **Glassmorphism** en paneles de contacto y formulario
- **Links directos**: Email, WhatsApp, Instagram, GitHub
- **Formulario de notificación** de lanzamiento (validación + feedback animado)
- **Fuente Pizalio** en los valores de contacto

### Efectos de fondo

- **Grid de profundidad** con parallax sutil al mover el mouse
- **Lines SVG** (`lines.svg`) con parallax independiente e intensidad de glow reactiva al movimiento
- **Textura overlay** (`texture.png`) para acabado cinematográfico

---

## 🛠️ Stack técnico

| Tecnología                 | Uso                                                |
| -------------------------- | -------------------------------------------------- |
| HTML5 semántico            | Estructura de la página                            |
| CSS3                       | Estilos, animaciones, glassmorphism, media queries |
| JavaScript ES6+            | Lógica de animaciones e interacciones              |
| [GSAP 3](https://gsap.com) | Animaciones, Draggable, InertiaPlugin (local)      |
| SVG                        | Logo, lines decorativas, 31 stickers arrastrables  |

### Tipografías

- **Pronell** (`rsc/pronell/Pronell.otf`) — tipografía principal grotesca
- **Pizalio** (`rsc/pizalio-font/pizalio.otf`) — valores de contacto

---

## 📁 Estructura del proyecto

```
WebDev.Portfolio/
├── index.html          # Página única: hero "Muy Pronto" + contacto
├── style.css           # Estilos globales (fuentes, variables, keyframes)
├── contacto.css        # Estilos del layout, stickers y media queries
├── script.js           # Stickers, scatter, parallax, formulario (GSAP)
├── README.md
├── js/
│   ├── gsap.min.js
│   ├── Draggable.min.js
│   ├── InertiaPlugin.min.js
│   └── EaselPlugin.min.js
└── rsc/
    ├── texture.png
    ├── pronell/Pronell.otf
    ├── pizalio-font/pizalio.otf
    └── svg/
        ├── elements/
        │   ├── DANIEL.svg          # Logo / wordmark
        │   ├── lines.svg           # Lines decorativas de fondo
        │   └── recurso-11.svg      # Fondo de profundidad
        └── stickers/               # 31 stickers SVG arrastrables
```

---

## 🚀 Instalación y uso

```bash
# 1. Clonar
git clone https://github.com/DanielV-94/WebDev.Portfolio.git
cd WebDev.Portfolio

# 2. Abrir con servidor local (Five Server / Live Server en VS Code)
#    Navegar a index.html
```

> ⚠️ **Importante**: No abrir como `file://` — usar un servidor local para que los assets SVG y las fuentes carguen correctamente.

---

## 📱 Responsividad

| Breakpoint               | Comportamiento                                           |
| ------------------------ | -------------------------------------------------------- |
| > 960px                  | Diseño completo de escritorio                            |
| ≤ 960px                  | Tipografía reducida, stickers más pequeños               |
| ≤ 720px                  | Grid de una columna, scroll habilitado, stickers a 100px |
| ≤ 480px                  | Layout móvil optimizado, solo 11 stickers visibles       |
| `prefers-reduced-motion` | Animaciones CSS desactivadas                             |

---

## 📬 Contacto

| Canal        | Info                                                      |
| ------------ | --------------------------------------------------------- |
| 📧 Email     | [velez.4991.94@gmail.com](mailto:velez.4991.94@gmail.com) |
| 💬 WhatsApp  | [+52 331 270 6200](https://wa.me/523312706200)            |
| 📸 Instagram | [@daniel_velez94](https://instagram.com/daniel_velez94)   |
| 🐙 GitHub    | [DanielV-94](https://github.com/DanielV-94)               |

---

## 📄 Licencia

© 2026 Daniel Vélez — Todos los derechos reservados.  
El diseño, tipografías y assets visuales son de uso exclusivo del autor.
