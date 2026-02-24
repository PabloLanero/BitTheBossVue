<template>
  <div class="unity-wrapper">
    <canvas ref="canvasRef" id="unity-canvas"></canvas>
    <div v-if="loading" class="loading-overlay">
      <p>Cargando Unity...</p>
    </div>
    <div v-if="error" class="error-overlay">
      <p>Error cargando Unity: {{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue"

const canvasRef = ref<HTMLCanvasElement | null>(null)
const loading = ref(true)
const error = ref("")

// Declarar los tipos de Unity globalmente
declare global {
  function createUnityInstance(
    canvas: HTMLCanvasElement,
    config: any
  ): Promise<any>
}

onMounted(async () => {
  try {
    // Esperar a que el canvas esté renderizado
    await nextTick()

    const canvas = canvasRef.value
    if (!canvas) {
      error.value = "No se pudo obtener referencia al canvas"
      return
    }

    // Cargar el script loader de Unity
    const loaderScript = document.createElement("script")
    loaderScript.src = "/unity/Build/BuildUnity.loader.js"
    loaderScript.type = "text/javascript"
    
    // Cuando se carga el script del loader, createUnityInstance estará disponible
    loaderScript.onload = () => {
      console.log("✓ Unity loader cargado", { 
        canvasId: canvas.id,
        unityAvailable: typeof window.createUnityInstance !== 'undefined'
      })

      // Verificar que createUnityInstance existe
      if (typeof window.createUnityInstance === "undefined") {
        error.value = "createUnityInstance no está disponible después de cargar el loader"
        loading.value = false
        return
      }

      // Configuración de Unity
      const unityConfig = {
        dataUrl: "/unity/Build/BuildUnity.data.unityweb",
        frameworkUrl: "/unity/Build/BuildUnity.framework.js.unityweb",
        codeUrl: "/unity/Build/BuildUnity.wasm.unityweb",
        streamingAssetsUrl: "/unity/StreamingAssets",
        companyName: "DefaultCompany",
        productName: "BitTheBoss",
        productVersion: "1.0",
      }

      // Inicializar Unity
      window.createUnityInstance(canvas, unityConfig)
        .then((unityInstance: any) => {
          console.log("✓ Unity iniciado correctamente")
          loading.value = false
        })
        .catch((err: any) => {
          const errorMessage = err?.message || err?.toString() || "Error desconocido"
          console.error("✗ Error iniciando Unity:", err)
          error.value = errorMessage
          loading.value = false
        })
    }

    loaderScript.onerror = () => {
      error.value = "Error al cargar el script del loader de Unity"
      loading.value = false
      console.error("✗ Error cargando script loader:", loaderScript.src)
    }

    // Agregar el script al head (más estándar que al body)
    document.head.appendChild(loaderScript)

    // Limpiar cuando se desmonte el componente
    return () => {
      if (loaderScript.parentNode) {
        loaderScript.parentNode.removeChild(loaderScript)
      }
    }
  } catch (err: any) {
    error.value = `Error inesperado: ${err?.message || err}`
    loading.value = false
    console.error("✗ Error en onMounted:", err)
  }
})
</script>

<style scoped>
.unity-wrapper {
  width: 100%;
  height: 100vh;
  background: black;
  position: relative;
  overflow: hidden;
}

#unity-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  z-index: 10;
}

.loading-overlay {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
}

.error-overlay {
  background: rgba(139, 0, 0, 0.8);
  color: #ffcccc;
  flex-direction: column;
  gap: 1rem;
}

.error-overlay p {
  text-align: center;
  max-width: 80%;
}
</style>