<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = withDefaults(defineProps<{
  width?: number;
  height?: number;
}>(), {
  width: 180,
  height: 72,
});

const canvasRef = ref<HTMLCanvasElement | null>(null);

let animFrameId = 0;
let target = 0;
let h = 0;
let t = 0;

const CYAN   = '#1af0ff';
const ORANGE = '#ff6a00';
const WHITE  = '#e8f8ff';

function glowText(
  ctx: CanvasRenderingContext2D,
  ch: string,
  x: number,
  y: number,
  size: number,
  color: string,
  blur: number,
  scale: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.font = `900 ${size}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.fillText(ch, 0, 0);
  ctx.shadowBlur = blur * 2;
  ctx.fillText(ch, 0, 0);
  ctx.restore();
}

function bracket(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  color: string,
  flip: boolean
) {
  const d = flip ? -1 : 1;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x + d * s, y - s);
  ctx.lineTo(x, y - s);
  ctx.lineTo(x, y + s);
  ctx.lineTo(x + d * s, y + s);
  ctx.stroke();
  ctx.restore();
}

function draw() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  // Grid
  ctx.globalAlpha = 0.1;
  ctx.strokeStyle = CYAN;
  for (let x = 0; x < W; x += 16) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 16) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Scan line
  const sl = (t * 1.5) % H;
  const g = ctx.createLinearGradient(0, sl - 8, 0, sl + 8);
  g.addColorStop(0, 'transparent');
  g.addColorStop(0.5, CYAN);
  g.addColorStop(1, 'transparent');
  ctx.globalAlpha = 0.07;
  ctx.fillStyle = g;
  ctx.fillRect(0, sl - 8, W, 16);
  ctx.globalAlpha = 1;

  h += (target - h) * 0.12;

  const CX = W / 2;
  const CY = H / 2 - 3;
  const SIZE = Math.round(H * 0.48);
  const GAP  = W * 0.27;

  const bS = 1 + 0.13 * h;
  const tS = 1 - 0.12 * h;

  const b1x = CX - GAP - 18 * h;
  const b1y = CY - 10 * h;
  const tx  = CX;
  const ty  = CY + 12 * h;
  const b2x = CX + GAP + 18 * h;
  const b2y = CY - 10 * h;

  bracket(ctx, b1x - 46 * bS, b1y, SIZE * 0.17 * bS, ORANGE, false);
  bracket(ctx, b2x + 46 * bS, b2y, SIZE * 0.17 * bS, ORANGE, true);

  glowText(ctx, 'B', b1x, b1y, SIZE, CYAN,  18, bS);
  glowText(ctx, 'T', tx,  ty,  SIZE, WHITE, 14, tS);
  glowText(ctx, 'B', b2x, b2y, SIZE, CYAN,  18, bS);

  t++;
  animFrameId = requestAnimationFrame(draw);
}

function onEnter() { target = 1; }
function onLeave() { target = 0; }

onMounted(() => {
  draw();
});

onUnmounted(() => {
  cancelAnimationFrame(animFrameId);
});
</script>

<template>
  <canvas
    ref="canvasRef"
    :width="width"
    :height="height"
    class="btb-logo"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  />
</template>

<style scoped lang="scss">
.btb-logo {
  display: block;
  cursor: pointer;
  background: transparent;
}
</style>
