<template>
  <div class="unity-wrapper">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue"

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
  await nextTick() // aseguramos que el canvas ya existe

  const canvas = canvasRef.value
  if (!canvas) return

  const script = document.createElement("script")
  script.src = "/unity/Build/BuildUnity.loader.js"

  script.onload = () => {
    const config = {
      dataUrl: "/unity/Build/BuildUnity.data.unityweb",
      frameworkUrl: "/unity/Build/BuildUnity.framework.js.unityweb",
      codeUrl: "/unity/Build/BuildUnity.wasm.unityweb",
      streamingAssetsUrl: "/unity/StreamingAssets",
      companyName: "Company",
      productName: "Game",
      productVersion: "1.0",
    }

    // @ts-ignore
    createUnityInstance(canvas, config)
      .then(() => {
        console.log("Unity cargado correctamente")
      })
      .catch((err: any) => {
        console.error("Error cargando Unity:", err)
      })
  }

  document.body.appendChild(script)
})
</script>

<style scoped>
.unity-wrapper {
  width: 100%;
  height: 100vh;
  background: black;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>