# 📐 Graficador de Sistemas Lineales 2×2

Aplicación web interactiva para resolver y **visualizar por el método gráfico** sistemas de dos ecuaciones lineales con dos incógnitas:

```
a₁x + b₁y = c₁
a₂x + b₂y = c₂
```

Cada ecuación se escribe en su forma explícita `y = mx + b` y se dibuja como una recta. La intersección de ambas rectas es la solución del sistema.

El repositorio incluye además una **guía didáctica completa en LaTeX** (con su PDF compilado): teoría, ejemplos resueltos paso a paso, ejercicios propuestos y soluciones.
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

### 📚 Guía didáctica en LaTeX
- 📖 **Teoría completa**: interpretación geométrica, tipos de solución y clasificación por determinante.
- 🧭 **Método paso a paso**: tabla de valores e intersecciones con los ejes.
- 🧮 **4 ejemplos resueltos** con tablas, gráficas (`pgfplots`) y verificación.
- ✏️ **20 ejercicios propuestos** clasificados por tipo de sistema.
- ✅ **Soluciones detalladas** de los 20 ejercicios.
- 🌍 **4 problemas contextualizados** (autos/motos, planes de internet, etc.).
- 📋 **Autoevaluación**, glosario y bibliografía en formato APA.
- 📄 **PDF compilado** listo para imprimir o distribuir.

---


## 🚀 Demo en vivo

Una vez publicado en GitHub Pages estará disponible en:

```
https://jcteacher-lab.github.io/metodograficomatrices2x2/
```

La guía didáctica en PDF se puede consultar directamente aquí:

```
[https://<tu-usuario>.github.io/graficador-sistemas-lineales/latex/metodografico.pdf](https://github.com/jcteacher-lab/metodograficomatrices2x2/blob/main/latex/m%C3%A9todografico.pdf)
---

## 📂 Estructura del proyecto

```
graficador-sistemas-lineales/
├── index.html                  # Página principal del graficador
├── css/
│   └── styles.css              # Estilos de la aplicación web
├── js/
│   └── app.js                  # Lógica del graficador
├── latex/
│   ├── metodografico.tex       # Guía didáctica (fuente LaTeX)
│   └── metodografico.pdf       # Guía didáctica (PDF compilado)
├── LICENSE                     # GNU GPL v3
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
### Parte LaTeX (para recompilar el PDF)

Requiere una distribución de LaTeX instalada (`TeX Live`, `MiKTeX` o `MacTeX`).

```bash
cd latex
pdflatex metodografico.tex
pdflatex metodografico.tex   # segunda pasada (índice y referencias)
```

También puedes compilarlo en línea sin instalar nada:
- 🔗 [Overleaf](https://www.overleaf.com)
- 🔗 [TeX Live Online](https://texlive.net/)
- 🔗 [Papeeria](https://papeeria.com/)

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

## 📚 Cómo usar la guía didáctica

La guía `latex/metodografico.pdf` está pensada para:

- **Docentes**: material listo para imprimir y usar en clase.
- **Estudiantes**: repaso autónomo con ejemplos resueltos y ejercicios.
- **Autoaprendizaje**: teoría clara, ejemplos guiados y soluciones.

### Contenido

| Sección | Descripción |
|---------|-------------|
| Presentación y propósito | Objetivos y competencias esperadas |
| Sistemas 2×2 | Definición y notación general |
| Interpretación gráfica | Los tres tipos de solución y su clasificación por determinante |
| Método gráfico | Técnicas de trazado (tabla e intersecciones con los ejes) |
| Ejemplos 1–4 | Solución única, sin solución e infinitas soluciones |
| Ejercicios 1–20 | Clasificados + 4 problemas contextualizados |
| Soluciones | Detalle de los 20 ejercicios con verificación |
| Autoevaluación | Rúbrica de criterios |
| Glosario y bibliografía | Definiciones y fuentes APA |

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

### Guía LaTeX
- Clase `article` a 12pt, español (`babel`).
- Paquetes: `amsmath`, `amssymb`, `geometry`, `enumitem`, `booktabs`, `xcolor`, `hyperref`, `pgfplots`.
- Gráficas generadas con `pgfplots` (`compat=1.18`), con `axis lines=middle`, cuadrícula y leyenda.
- Índice automático, `tocdepth=2` y `secnumdepth=2`.
- Metadatos PDF con `hyperref` (título, autor, enlaces en color).
- Compilación probada con `pdflatex` (dos pasadas para el índice).
---

## 🗺️ Roadmap

- [x] Graficador 2×2 con método gráfico.
- [x] Guía didáctica en LaTeX + PDF (teoría, ejemplos, ejercicios y soluciones).
- [ ] Entrada alternativa en forma general `ax + by = c` en la web.
- [ ] Exportar la gráfica como imagen PNG.
- [ ] Modo oscuro.
- [ ] Mostrar pasos del método gráfico en pantalla.
- [ ] Guardar sistemas en `localStorage`.
- [ ] Versión en inglés de la guía LaTeX.
- [ ] Solucionario con gráficas generadas por `pgfplots` para cada ejercicio.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz un *fork* del proyecto.
2. Crea una rama: `git checkout -b feature/nueva-funcion`.
3. Realiza tus cambios y haz *commit*.
4. Envía un *pull request* describiendo la mejora.

**Reglas para contribuir a la guía LaTeX:**
- Mantener el estilo y estructura de secciones actuales.
- Compilar el PDF antes de enviar el PR (`pdflatex` × 2).
- No subir archivos auxiliares (`*.aux`, `*.log`, `*.out`, etc.).

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

> 📌 **Nota:** la guía didáctica (`latex/metodografico.tex` y su PDF derivado)
> se distribuye bajo la misma licencia GPL-3.0. Puedes reutilizarla,
> modificarla y redistribuirla citando la fuente original.
---

## 👤 Autor

**Tu Nombre**
- GitHub: [@jcteacher-lab](https://github.com/jcteacher-lab)
- Correo: juancarlos.santiago.cb161@dgeti.sems.gob.mx

---

⭐ Si este proyecto te resultó útil, considera darle una estrella en GitHub.
