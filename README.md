# Daniel Vélez — Portfolio Web

> Sitio "coming soon" + página de contacto con stickers arrastrables, animaciones holográficas y efectos de profundidad.

---

## 📋 Descripción

Portfolio personal de **Daniel Vélez**, diseñador UX/UI, desarrollador frontend y motion designer con sede en México. El sitio está compuesto por dos páginas:

| Página                 | Archivo         | Propósito                                                      |
| ---------------------- | --------------- | -------------------------------------------------------------- |
| Landing _"Muy Pronto"_ | `index.html`    | Página principal con efectos holográficos y estrellas animadas |
| Contacto               | `contacto.html` | Página interactiva con stickers arrastrables y formulario      |

---

## ✨ Características principales

### `index.html` — Landing page

- **Tipografía holográfica** con gradiente animado (verde-cian-lima)
- **Estrellas animadas** con movimiento wandering, parallax magnético al hover y efecto de profundidad
- **Barras decorativas** SVG con entrada animada
- **Fondo de profundidad** — `Recurso 11.svg` como capa fija con `mix-blend-mode: screen`
- **Film grain** animado para textura cinematográfica
- Botón de acceso a la página de contacto

### `contacto.html` — Página de contacto

- **39 stickers SVG arrastrables** con física de inercia (GSAP Draggable + InertiaPlugin)
  - Tamaños aleatorios en cada carga (4 buckets: 100–380px)
  - Inclinación dinámica según velocidad al arrastrar
  - Siempre sobre el contenido — el usuario debe moverlos para leer
- **Efecto scatter**: si el mouse se mueve muy rápido, los stickers huyen a los bordes y regresan solos (5–11s)
- **Glassmorphism** en paneles de contacto y formulario
- **Links directos**: Email, WhatsApp, Instagram, GitHub
- **Formulario de notificación** de lanzamiento
- **Grid de profundidad** con parallax sutil al mover el mouse
- **Fuente Pizalio** en los valores de contacto

---

## 🛠️ Stack técnico

| Tecnología                 | Uso                                                |
| -------------------------- | -------------------------------------------------- |
| HTML5 semántico            | Estructura de ambas páginas                        |
| CSS3                       | Estilos, animaciones, glassmorphism, media queries |
| JavaScript ES6+            | Lógica de animaciones e interacciones              |
| [GSAP 3](https://gsap.com) | Animaciones, Draggable, InertiaPlugin, EasePack    |
| SVG                        | Logo, estrellas, barras decorativas, 39 stickers   |

### Tipografías

- **Pronell** (`rsc/pronell/Pronell.otf`) — tipografía principal grotesca
- **Pizalio** (`rsc/pizalio-font/pizalio.otf`) — valores de contacto

---

## 📁 Estructura del proyecto

```
WebDev.Portfolio/
├── index.html          # Landing "Muy Pronto"
├── style.css           # Estilos globales compartidos
├── script.js           # Animaciones GSAP para index
├── contacto.html       # Página de contacto
├── contacto.css        # Estilos de contacto + media queries
├── contacto.js         # Stickers, scatter, parallax, formulario
├── package.json
├── README.md
└── rsc/
    ├── pronell/Pronell.otf
    ├── pizalio-font/pizalio.otf
    └── svg/
        ├── Recurso 11.svg      # Fondo de profundidad
        ├── elements/           # Logo, barras, botón, estrellas
        └── stickers/           # 39 stickers SVG arrastrables
```

---

## 🚀 Instalación y uso

```bash
# 1. Clonar
git clone https://github.com/DanielV-94/WebDev.Portfolio.git
cd WebDev.Portfolio

# 2. Instalar dependencias (GSAP local)
npm install

# 3. Abrir con servidor local (Five Server / Live Server en VS Code)
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
