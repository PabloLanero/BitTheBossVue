<template>
  <Header />
  <section class="unity-page">
    <div class="unity-shell">
      <header class="unity-header">
        <h1>BitTheBoss</h1>
        <p>Unity WebGL</p>
      </header>

      <div class="unity-wrapper">
        <canvas ref="canvasRef" id="unity-canvas"></canvas>
        <div v-if="loading" class="loading-overlay">
          <p>Cargando Unity...</p>
        </div>
        <div v-if="error" class="error-overlay">
          <p>Error cargando Unity: {{ error }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Header from '@/components/Header/Header.vue'
import {
  TOKEN_CHANGED_EVENT,
  type UnityInstance,
  readStoredSessionToken,
  registerUnityInstance,
  sendTokenToUnity,
  unregisterUnityInstance,
} from '@/services/unityBridge'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const loading = ref(true)
const error = ref('')
const UNITY_LOADER_ID = 'unity-loader-script'

interface UnityConfig {
  dataUrl: string
  frameworkUrl: string
  codeUrl: string
  streamingAssetsUrl: string
  companyName: string
  productName: string
  productVersion: string
}

declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: UnityConfig,
    ) => Promise<UnityInstance>
  }
}

let localUnityInstance: UnityInstance | null = null
let hasUnityBooted = false

function devLog(message: string, details?: unknown): void {
  if (!import.meta.env.DEV) return
  if (details !== undefined) {
    console.debug(`[UnityGame] ${message}`, details)
    return
  }
  console.debug(`[UnityGame] ${message}`)
}

function onTokenChanged(event: Event): void {
  const customEvent = event as CustomEvent<string>
  sendTokenToUnity(customEvent.detail ?? '')
}

function initializeUnity(canvas: HTMLCanvasElement): void {
  if (hasUnityBooted) return

  if (typeof window.createUnityInstance === 'undefined') {
    error.value = 'createUnityInstance no esta disponible despues de cargar el loader'
    loading.value = false
    return
  }

  hasUnityBooted = true

  const unityConfig: UnityConfig = {
    dataUrl: '/unity/Build/BuildUnity.data.unityweb',
    frameworkUrl: '/unity/Build/BuildUnity.framework.js.unityweb',
    codeUrl: '/unity/Build/BuildUnity.wasm.unityweb',
    streamingAssetsUrl: '/unity/StreamingAssets',
    companyName: 'DefaultCompany',
    productName: 'BitTheBoss',
    productVersion: '1.0',
  }

  window.createUnityInstance(canvas, unityConfig)
    .then((unityInstance: UnityInstance) => {
      localUnityInstance = unityInstance
      registerUnityInstance(unityInstance)
      sendTokenToUnity(readStoredSessionToken())
      devLog('Unity iniciado correctamente')
      loading.value = false
    })
    .catch((err: unknown) => {
      hasUnityBooted = false
      const errorMessage =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Error desconocido'
      console.error('[UnityGame] Error iniciando Unity:', err)
      error.value = errorMessage
      loading.value = false
    })
}

onMounted(async () => {
  window.addEventListener(TOKEN_CHANGED_EVENT, onTokenChanged as EventListener)

  try {
    await nextTick()

    const canvas = canvasRef.value
    if (!canvas) {
      error.value = 'No se pudo obtener referencia al canvas'
      return
    }

    const handleLoaderReady = () => {
      devLog('Unity loader cargado', {
        canvasId: canvas.id,
        unityAvailable: typeof window.createUnityInstance !== 'undefined',
      })
      initializeUnity(canvas)
    }

    const handleLoaderError = () => {
      error.value = 'Error al cargar el script del loader de Unity'
      loading.value = false
      console.error('[UnityGame] Error cargando script loader:', '/unity/Build/BuildUnity.loader.js')
    }

    let loaderScript = document.getElementById(UNITY_LOADER_ID) as HTMLScriptElement | null
    if (!loaderScript) {
      loaderScript = document.createElement('script')
      loaderScript.id = UNITY_LOADER_ID
      loaderScript.src = '/unity/Build/BuildUnity.loader.js'
      loaderScript.type = 'text/javascript'
      loaderScript.addEventListener('load', handleLoaderReady, { once: true })
      loaderScript.addEventListener('error', handleLoaderError, { once: true })
      document.head.appendChild(loaderScript)
    } else if (typeof window.createUnityInstance !== 'undefined') {
      handleLoaderReady()
    } else {
      loaderScript.addEventListener('load', handleLoaderReady, { once: true })
      loaderScript.addEventListener('error', handleLoaderError, { once: true })
    }
  } catch (err: unknown) {
    error.value = `Error inesperado: ${err instanceof Error ? err.message : String(err)}`
    loading.value = false
    console.error('[UnityGame] Error en onMounted:', err)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener(TOKEN_CHANGED_EVENT, onTokenChanged as EventListener)
  if (localUnityInstance) {
    unregisterUnityInstance()
    localUnityInstance = null
  }
  hasUnityBooted = false
})
</script>

<style scoped>
.unity-page {
  padding: 0 24px 24px;
}

.unity-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(151, 254, 237, 0.35);
  background: linear-gradient(165deg, #0b1f63 0%, #071952 45%, #0b666a 100%);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.unity-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: #e6f8ff;
  margin-bottom: 10px;
}

.unity-header h1 {
  font-size: 1.2rem;
  line-height: 1;
}

.unity-header p {
  color: #97feed;
  font-size: 0.9rem;
}

.unity-wrapper {
  width: 100%;
  height: min(72vh, 820px);
  background: #000;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(151, 254, 237, 0.28);
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

@media (max-width: 900px) {
  .unity-page {
    padding: 0 12px 16px;
  }

  .unity-shell {
    padding: 12px;
  }

  .unity-wrapper {
    height: 58vh;
  }
}
</style>
