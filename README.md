# 📐 Graficador de Sistemas Lineales 2×2

Aplicación web interactiva para resolver y **visualizar por el método gráfico** sistemas de dos ecuaciones lineales con dos incógnitas:

```
a₁x + b₁y = c₁
a₂x + b₂y = c₂
```

Cada ecuación se escribe en su forma explícita `y = mx + b` y se dibuja como una recta. La intersección de ambas rectas es la solución del sistema.

---

## ✨ Características

- 🎯 **Solución única**: muestra las coordenadas exactas del punto de corte.
- ❌ **Detección de sistemas incompatibles** (rectas paralelas → sin solución).
- ⚠️ **Detección de sistemas compatibles indeterminados** (rectas coincidentes → infinitas soluciones).
- 🔍 **Zoom con la rueda del ratón**, centrado en el cursor.
- 🖱️ **Desplazamiento del plano** arrastrando con el ratón.
- 📱 **Soporte táctil**: arrastre y *pinch-to-zoom* en móviles.
- 🧮 **Validación de entradas**: campos vacíos, no numéricos o valores no finitos.
- ⚡ **Renderizado optimizado** con `requestAnimationFrame` y soporte para pantallas de alta densidad (Retina).
- 🎲 Botón de **ejemplo aleatorio** para practicar.
- 📐 Cuadrícula **adaptativa** que ajusta el paso según el nivel de zoom.
- ♿ Accesibilidad básica (`role="status"`, `aria-live`, etiquetas `for`/`id`).

---

## 🚀 Demo en vivo

Una vez publicado en GitHub Pages estará disponible en:

```
https://jcteacher-lab.github.io/graficador-sistemas-lineales/
```

---

## 📂 Estructura del proyecto

```
graficador-sistemas-lineales/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── LICENSE
├── README.md
└── .gitignore
```

---

## 🛠️ Instalación y uso local

No requiere dependencias ni compilación. Solo necesitas un navegador moderno.

### Opción A — Abrir directamente
Descarga o clona el repositorio y abre `index.html` en tu navegador.

### Opción B — Servidor local (recomendado)
```bash
git clone https://github.com/<tu-usuario>/graficador-sistemas-lineales.git
cd graficador-sistemas-lineales
python3 -m http.server 8000
# Abre http://localhost:8000
```

---

## 🖱️ Cómo usarlo

1. Introduce la **pendiente** `m` y el **intercepto** `b` de cada recta.
2. Pulsa **Graficar** (o presiona `Enter` en cualquier campo).
3. Observa el resultado:
   - Verde → **solución única**.
   - Rojo → **sin solución** (paralelas no coincidentes).
   - Amarillo → **infinitas soluciones** (misma recta).
4. Usa la **rueda** para hacer zoom y **arrastra** para desplazarte.

### Ejemplo rápido

| Recta | m | b |
|-------|---|---|
| 1     | -1| 7 |
| 2     | 2 | 1 |

Resultado: **solución única `(2, 5)`**.

---

## 🌐 Publicar en GitHub Pages

1. Sube el proyecto al repositorio:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: graficador 2x2"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/graficador-sistemas-lineales.git
   git push -u origin main
   ```
2. En GitHub → **Settings → Pages**.
3. En *Branch* selecciona `main` y carpeta `/ (root)`.
4. Guarda. En unos segundos tu app estará online.

---

## 🧠 Detalles técnicos

- **Canvas 2D** con `devicePixelRatio` para trazos nítidos en pantallas Retina.
- **Transformación mundo ↔ pantalla** mediante funciones `toPxX`, `toPxY`, `toMundoX`, `toMundoY`.
- **Clasificación del sistema** por comparación de pendientes e interceptos con tolerancia `1e-12`.
- **Zoom centrado** en el cursor recalculando el `offset` para que el punto bajo el puntero permanezca fijo.
- **Renderizado diferido** con `requestAnimationFrame` para evitar redibujados innecesarios durante el arrastre o el zoom.

---

## 🗺️ Roadmap

- [ ] Entrada alternativa en forma general `ax + by = c`.
- [ ] Exportar la gráfica como imagen PNG.
- [ ] Modo oscuro.
- [ ] Mostrar pasos del método gráfico.
- [ ] Guardar sistemas en `localStorage`.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz un *fork* del proyecto.
2. Crea una rama: `git checkout -b feature/nueva-funcion`.
3. Realiza tus cambios y haz *commit*.
4. Envía un *pull request* describiendo la mejora.

---

## 📄 Licencia

Este proyecto se distribuye bajo la **Licencia Pública General GNU v3.0 (GPL-3.0)**.
Consulta el archivo [LICENSE](./LICENSE) para más detalles.

```
Copyright (C) 2026 Juan Carlos Santiago Sánchez

Este programa es software libre: puedes redistribuirlo y/o modificarlo
bajo los términos de la Licencia Pública General GNU publicada por la
Free Software Foundation, ya sea la versión 3 de la Licencia, o (a tu
elección) cualquier versión posterior.
```

---

## 👤 Autor

**Tu Nombre**
- GitHub: [@jcteacher-lab](https://github.com/jcteacher-lab)
- Correo: juancarlos.santiago.cb161@dgeti.sems.gob.mx

---

⭐ Si este proyecto te resultó útil, considera darle una estrella en GitHub.
