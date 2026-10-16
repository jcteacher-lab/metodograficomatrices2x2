/* =========================================================
   Graficador de Sistemas Lineales 2×2
   Copyright (C) 2026 Juan Carlos Santiago Sánchez

   Este programa es software libre: puedes redistribuirlo
   y/o modificarlo bajo los términos de la Licencia Pública
   General GNU (GPL v3) publicada por la Free Software Foundation.

   Se distribuye con la esperanza de ser útil, pero SIN
   NINGUNA GARANTÍA. Ver el archivo LICENSE para más detalles.
   ========================================================= */

'use strict';

(() => {

  /* ---------- Referencias DOM ---------- */
  const canvas     = document.getElementById('canvas');
  const ctx        = canvas.getContext('2d');
  const $m1        = document.getElementById('m1');
  const $b1        = document.getElementById('b1');
  const $m2        = document.getElementById('m2');
  const $b2        = document.getElementById('b2');
  const $resultado = document.getElementById('resultado');

  /* ---------- Estado de la vista ---------- */
  const MIN_ESCALA = 5;
  const MAX_ESCALA = 400;
  const ESCALA_INICIAL = 30;

  const state = {
    escala: ESCALA_INICIAL,
    offsetX: 0,
    offsetY: 0,
    m1: -1, b1: 7,
    m2: 2,  b2: 1,
    dragging: false,
    lastX: 0,
    lastY: 0,
    needsRedraw: false
  };

  /* ---------- Ajuste de alta densidad (retina) ---------- */
  function ajustarCanvas(){
    const dpr  = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w    = Math.max(1, Math.round(rect.width  * dpr));
    const h    = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h){
      canvas.width  = w;
      canvas.height = h;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const anchoCSS = () => canvas.width  / (window.devicePixelRatio || 1);
  const altoCSS  = () => canvas.height / (window.devicePixelRatio || 1);

  /* ---------- Conversión mundo ↔ pantalla ---------- */
  const toPxX = x => anchoCSS() / 2 + state.offsetX + x * state.escala;
  const toPxY = y => altoCSS()  / 2 + state.offsetY - y * state.escala;
  const toMundoX = px => (px - anchoCSS() / 2 - state.offsetX) / state.escala;
  const toMundoY = py => -(py - altoCSS() / 2 - state.offsetY) / state.escala;

  /* ---------- Redibujado con requestAnimationFrame ---------- */
  function solicitarRedibujo(){
    if (state.needsRedraw) return;
    state.needsRedraw = true;
    requestAnimationFrame(() => {
      state.needsRedraw = false;
      redibujar();
    });
  }

  /* ---------- Paso de cuadrícula adaptativo ---------- */
  function pasoCuadricula(){
    const e = state.escala;
    if (e >= 200) return 1;
    if (e >= 100) return 2;
    if (e >= 50)  return 5;
    if (e >= 20)  return 10;
    if (e >= 10)  return 20;
    return 50;
  }

  /* ---------- Plano cartesiano ---------- */
  function dibujarPlano(){
    const W = anchoCSS(), H = altoCSS();
    ctx.clearRect(0, 0, W, H);

    const origenX = W / 2 + state.offsetX;
    const origenY = H / 2 + state.offsetY;
    const paso    = pasoCuadricula();
    const pxPaso  = paso * state.escala;

    // Cuadrícula
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();

    const inicioX = origenX - Math.floor(origenX / pxPaso) * pxPaso;
    for (let x = inicioX; x <= W; x += pxPaso){
      ctx.moveTo(Math.round(x) + .5, 0);
      ctx.lineTo(Math.round(x) + .5, H);
    }
    const inicioY = origenY - Math.floor(origenY / pxPaso) * pxPaso;
    for (let y = inicioY; y <= H; y += pxPaso){
      ctx.moveTo(0, Math.round(y) + .5);
      ctx.lineTo(W, Math.round(y) + .5);
    }
    ctx.stroke();

    // Ejes
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(0, Math.round(origenY) + .5);
    ctx.lineTo(W, Math.round(origenY) + .5);
    ctx.moveTo(Math.round(origenX) + .5, 0);
    ctx.lineTo(Math.round(origenX) + .5, H);
    ctx.stroke();

    // Flechas de los ejes
    dibujarFlecha(W - 8, origenY, 'right');
    dibujarFlecha(origenX, 8, 'up');

    // Etiquetas de los ejes
    ctx.fillStyle = '#111827';
    ctx.font = 'italic 14px Georgia, serif';
    ctx.fillText('x', W - 16, origenY - 8);
    ctx.fillText('y', origenX + 10, 16);

    // Numeración
    dibujarNumeracion(origenX, origenY, paso, pxPaso);
  }

  function dibujarFlecha(x, y, dir){
    ctx.beginPath();
    if (dir === 'right'){
      ctx.moveTo(x, y - 5);
      ctx.lineTo(x + 8, y);
      ctx.lineTo(x, y + 5);
    } else {
      ctx.moveTo(x - 5, y + 6);
      ctx.lineTo(x, y - 2);
      ctx.lineTo(x + 5, y + 6);
    }
    ctx.closePath();
    ctx.fillStyle = '#111827';
    ctx.fill();
  }

  function dibujarNumeracion(origenX, origenY, paso, pxPaso){
    ctx.fillStyle = '#4b5563';
    ctx.font = '12px system-ui, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const W = anchoCSS(), H = altoCSS();

    // Eje X
    for (let x = origenX + pxPaso; x < W; x += pxPaso){
      const val = ((x - origenX) / state.escala).toFixed(0);
      ctx.fillText(val, x, origenY + 6);
      tick(x, origenY, 'v');
    }
    for (let x = origenX - pxPaso; x > 0; x -= pxPaso){
      const val = ((x - origenX) / state.escala).toFixed(0);
      ctx.fillText(val, x, origenY + 6);
      tick(x, origenY, 'v');
    }

    // Eje Y
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = origenY + pxPaso; y < H; y += pxPaso){
      const val = (-(y - origenY) / state.escala).toFixed(0);
      ctx.fillText(val, origenX - 8, y);
      tick(origenX, y, 'h');
    }
    for (let y = origenY - pxPaso; y > 0; y -= pxPaso){
      const val = (-(y - origenY) / state.escala).toFixed(0);
      ctx.fillText(val, origenX - 8, y);
      tick(origenX, y, 'h');
    }

    // Origen
    ctx.fillStyle = '#111827';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('0', origenX - 6, origenY + 4);
  }

  function tick(x, y, dir){
    ctx.save();
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    if (dir === 'v'){
      ctx.moveTo(x, y - 4);
      ctx.lineTo(x, y + 4);
    } else {
      ctx.moveTo(x - 4, y);
      ctx.lineTo(x + 4, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  /* ---------- Dibujar una recta y = m x + b ---------- */
  function dibujarRecta(m, b, color){
    const W = anchoCSS(), H = altoCSS();

    // Extremos en coordenadas de pantalla
    const x1 = toMundoX(0);
    const x2 = toMundoX(W);
    const y1 = m * x1 + b;
    const y2 = m * x2 + b;

    // Recortar cuando la pendiente es muy alta (casi vertical)
    if (!isFinite(y1) || !isFinite(y2)) return;

    // Convertir a píxeles
    const py1 = toPxY(y1);
    const py2 = toPxY(y2);

    // Extender si sale de pantalla: usamos línea paramétrica
    const px1 = 0, px2 = W;

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(px1, py1);
    ctx.lineTo(px2, py2);
    ctx.stroke();
  }

  /* ---------- Punto solución ---------- */
  function dibujarPunto(x, y, colorPunto = '#111827'){
    const px = toPxX(x);
    const py = toPxY(y);

    ctx.save();

    // Halo
    ctx.beginPath();
    ctx.arc(px, py, 12, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(17,24,39,.12)';
    ctx.fill();

    // Punto
    ctx.beginPath();
    ctx.arc(px, py, 6.5, 0, Math.PI * 2);
    ctx.fillStyle = colorPunto;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Etiqueta
    const etiqueta = `(${fmt(x)}, ${fmt(y)})`;
    ctx.font = '600 14px system-ui, Arial';
    const w = ctx.measureText(etiqueta).width;
    const bx = px + 14;
    const by = py - 28;

    ctx.fillStyle = 'rgba(17,24,39,.85)';
    ctx.beginPath();
    ctx.roundRect(bx, by, w + 16, 24, 6);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'middle';
    ctx.fillText(etiqueta, bx + 8, by + 12);
    ctx.restore();
  }

  function fmt(v){
    if (Math.abs(v) < 1e-9) v = 0;
    return Number.isInteger(v) ? v.toString() : v.toFixed(3);
  }

  /* ---------- Redibujar todo ---------- */
  function redibujar(){
    dibujarPlano();

    const { m1, b1, m2, b2 } = state;

    dibujarRecta(m1, b1, '#2563eb');
    dibujarRecta(m2, b2, '#ef4444');

    // Intersección
    if (Math.abs(m1 - m2) > 1e-12){
      const x = (b2 - b1) / (m1 - m2);
      const y = m1 * x + b1;
      if (isFinite(x) && isFinite(y)) dibujarPunto(x, y);
    }
  }

  /* ---------- Validación de entradas ---------- */
  function leerNumero(input, nombre){
    const raw = input.value.trim();
    if (raw === '') throw new Error(`El campo "${nombre}" no puede estar vacío.`);
    const v = Number(raw);
    if (!isFinite(v)) throw new Error(`El campo "${nombre}" debe ser un número válido.`);
    return v;
  }

  /* ---------- Clasificar el sistema ---------- */
  function clasificar(m1, b1, m2, b2){
    const EPS = 1e-12;
    if (Math.abs(m1 - m2) < EPS){
      if (Math.abs(b1 - b2) < EPS){
        return { tipo:'infinitas' };
      }
      return { tipo:'sin-solucion' };
    }
    const x = (b2 - b1) / (m1 - m2);
    const y = m1 * x + b1;
    return { tipo:'unica', x, y };
  }

  /* ---------- Mostrar resultado ---------- */
  function mostrarResultado(info){
    $resultado.classList.remove('ok', 'warn', 'err');

    switch (info.tipo){
      case 'unica':
        $resultado.classList.add('ok');
        $resultado.textContent =
          `✅ Solución única: (${fmt(info.x)}, ${fmt(info.y)})`;
        break;

      case 'sin-solucion':
        $resultado.classList.add('err');
        $resultado.textContent =
          '❌ Sistema incompatible (sin solución): las rectas son paralelas y no se cortan.';
        break;

      case 'infinitas':
        $resultado.classList.add('warn');
        $resultado.textContent =
          '⚠️ Sistema compatible indeterminado: las dos rectas son la misma, hay infinitas soluciones.';
        break;

      default:
        $resultado.classList.add('err');
        $resultado.textContent = '⛔ Error desconocido.';
    }
  }

  /* ---------- Acción principal: graficar ---------- */
  function graficar(){
    try {
      const m1 = leerNumero($m1, 'm₁');
      const b1 = leerNumero($b1, 'b₁');
      const m2 = leerNumero($m2, 'm₂');
      const b2 = leerNumero($b2, 'b₂');

      state.m1 = m1; state.b1 = b1;
      state.m2 = m2; state.b2 = b2;

      mostrarResultado(clasificar(m1, b1, m2, b2));
      solicitarRedibujo();
    } catch (err){
      $resultado.classList.remove('ok', 'warn');
      $resultado.classList.add('err');
      $resultado.textContent = `⛔ ${err.message}`;
      // No redibujamos si hay error de validación
    }
  }

  /* ---------- Centrar vista ---------- */
  function centrarVista(){
    state.escala  = ESCALA_INICIAL;
    state.offsetX = 0;
    state.offsetY = 0;
    solicitarRedibujo();
  }

  /* ---------- Ejemplo aleatorio ---------- */
  function ejemploAleatorio(){
    const m1 = randInt(-4, 4) || 1;
    const b1 = randInt(-6, 6);
    const m2 = randInt(-4, 4) || -2;
    const b2 = randInt(-6, 6);

    $m1.value = m1; $b1.value = b1;
    $m2.value = m2; $b2.value = b2;
    graficar();
  }

  const randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  /* ---------- Zoom centrado en el cursor ---------- */
  function zoomEn(px, py, factor){
    const mx = toMundoX(px);
    const my = toMundoY(py);

    let nueva = state.escala * factor;
    nueva = Math.max(MIN_ESCALA, Math.min(MAX_ESCALA, nueva));
    state.escala = nueva;

    // Reajustar offset para mantener el punto bajo el cursor
    state.offsetX = px - anchoCSS() / 2 - mx * state.escala;
    state.offsetY = py - altoCSS()  / 2 + my * state.escala;

    solicitarRedibujo();
  }

  /* ---------- Eventos de ratón ---------- */
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const dpr  = window.devicePixelRatio || 1;
    const px = (e.clientX - rect.left) * dpr / dpr;
    const py = (e.clientY - rect.top)  * dpr / dpr;
    zoomEn(px, py, e.deltaY < 0 ? 1.12 : 1 / 1.12);
  }, { passive:false });

  canvas.addEventListener('mousedown', (e) => {
    state.dragging = true;
    canvas.classList.add('grabbing');
    state.lastX = e.clientX;
    state.lastY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!state.dragging) return;
    state.offsetX += e.clientX - state.lastX;
    state.offsetY += e.clientY - state.lastY;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    solicitarRedibujo();
  });

  window.addEventListener('mouseup', () => {
    state.dragging = false;
    canvas.classList.remove('grabbing');
  });

  /* ---------- Eventos táctiles ---------- */
  let pinchDist = 0;

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1){
      state.dragging = true;
      state.lastX = e.touches[0].clientX;
      state.lastY = e.touches[0].clientY;
    } else if (e.touches.length === 2){
      state.dragging = false;
      pinchDist = distancia(e.touches);
    }
  }, { passive:true });

  canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.touches.length === 1 && state.dragging){
      const t = e.touches[0];
      state.offsetX += t.clientX - state.lastX;
      state.offsetY += t.clientY - state.lastY;
      state.lastX = t.clientX;
      state.lastY = t.clientY;
      solicitarRedibujo();
    } else if (e.touches.length === 2){
      e.preventDefault();
      const d = distancia(e.touches);
      if (pinchDist > 0){
        const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
        const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
        zoomEn(cx, cy, d / pinchDist);
      }
      pinchDist = d;
    }
  }, { passive:false });

  canvas.addEventListener('touchend', () => {
    state.dragging = false;
    pinchDist = 0;
  });

  const distancia = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  /* ---------- Botones y teclado ---------- */
  document.getElementById('btnGraficar').addEventListener('click', graficar);
  document.getElementById('btnCentrar').addEventListener('click', centrarVista);
  document.getElementById('btnEjemplo').addEventListener('click', ejemploAleatorio);

  [$m1, $b1, $m2, $b2].forEach(inp => {
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') graficar();
    });
  });

  /* ---------- Redimensionado ---------- */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ajustarCanvas();
      solicitarRedibujo();
    }, 100);
  });

  /* ---------- Compatibilidad roundRect ---------- */
  if (!CanvasRenderingContext2D.prototype.roundRect){
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r){
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      this.beginPath();
      this.moveTo(x + r, y);
      this.arcTo(x + w, y, x + w, y + h, r);
      this.arcTo(x + w, y + h, x, y + h, r);
      this.arcTo(x, y + h, x, y, r);
      this.arcTo(x, y, x + w, y, r);
      this.closePath();
      return this;
    };
  }

  /* ---------- Arranque ---------- */
  ajustarCanvas();
  graficar();

})();