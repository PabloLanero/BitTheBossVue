<template>
  <Header />
  <section class="unity-page">
    <div class="unity-shell">
      <header class="unity-header">
        <div>
          <h1>BitTheBoss</h1>
          <p>Unity WebGL</p>
        </div>
        <button class="finish-btn" type="button" @click="openExitModal">End Match</button>
      </header>

      <div class="unity-wrapper">
        <canvas ref="canvasRef" id="unity-canvas"></canvas>
        <div v-if="loading" class="loading-overlay">
          <p>Loading Unity...</p>
        </div>
        <div v-if="error" class="error-overlay">
          <p>Error loading Unity: {{ error }}</p>
        </div>
      </div>

      <div v-if="showExitModal" class="modal-backdrop">
        <div class="modal-card">
          <h3>End Match</h3>
          <p>Select the status to register for this match in the history.</p>
          <p v-if="exitError" class="modal-error">{{ exitError }}</p>
          <div class="modal-actions">
            <button type="button" class="modal-btn secondary" :disabled="exiting" @click="cancelExitModal">
              Cancel
            </button>
            <button type="button" class="modal-btn victory" :disabled="exiting" @click="finishMatch('Win')">
              Win
            </button>
            <button type="button" class="modal-btn defeat" :disabled="exiting" @click="finishMatch('Loss')">
              Loss
            </button>
            <button type="button" class="modal-btn cancel" :disabled="exiting" @click="finishMatch('Cancelled')">
              Cancelled
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import { addHistoryEntry } from '@/utils/gameHistory'
import type { MatchResultStatus } from '@/models/GameHistory'
import {
  UNITY_SESSION_GAME_OBJECT,
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
const exiting = ref(false)
const showExitModal = ref(false)
const exitError = ref('')

const UNITY_LOADER_ID = 'unity-loader-script'
const UNITY_BUILD_NAME = (import.meta.env.VITE_UNITY_BUILD_NAME || 'BuildUnity').trim()
const UNITY_BUILD_BASE = `/unity/Build/${UNITY_BUILD_NAME}`
const UNITY_LOADER_SRC = `${UNITY_BUILD_BASE}.loader.js`

const route = useRoute()
const router = useRouter()

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
let isTearingDown = false

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

function requestUnityPause(paused: boolean): void {
  if (!localUnityInstance) return

  try {
    localUnityInstance.SendMessage(
      UNITY_SESSION_GAME_OBJECT,
      paused ? 'PauseGameForModal' : 'ResumeGameAfterModal',
    )
  } catch (pauseError) {
    console.warn('[UnityGame] Could not pause/resume Unity:', pauseError)
  }
}

function openExitModal(): void {
  if (exiting.value) return
  exitError.value = ''
  showExitModal.value = true
  requestUnityPause(true)
}

function cancelExitModal(): void {
  if (exiting.value) return
  showExitModal.value = false
  exitError.value = ''
  requestUnityPause(false)
}

async function teardownUnity(reason: string): Promise<void> {
  if (isTearingDown) return
  isTearingDown = true

  const instance = localUnityInstance
  localUnityInstance = null
  unregisterUnityInstance()

  try {
    if (instance?.Quit) {
      devLog('Closing Unity runtime', { reason })
      await instance.Quit()
    }
  } catch (quitError) {
    console.warn('[UnityGame] Error closing Unity:', quitError)
  } finally {
    hasUnityBooted = false
    isTearingDown = false
  }
}

async function finishMatch(status: MatchResultStatus): Promise<void> {
  if (exiting.value) return

  try {
    exiting.value = true
    exitError.value = ''

    const partidaId = typeof route.query.partidaId === 'string' ? route.query.partidaId : `partida-${Date.now()}`
    const partidaNombreQuery = typeof route.query.gameName === 'string' ? route.query.gameName.trim() : ''
    const opponentLabelQuery = typeof route.query.opponentLabel === 'string' ? route.query.opponentLabel.trim() : ''

    addHistoryEntry({
      partidaId,
      partidaNombre: partidaNombreQuery || partidaId,
      opponentLabel: opponentLabelQuery || 'VS AI - Normal',
      status,
    })

    showExitModal.value = false
    requestUnityPause(false)
    await teardownUnity('finish-match')
    await router.push('/history')
  } catch (finishError) {
    exiting.value = false
    exitError.value =
      finishError instanceof Error ? finishError.message : 'Could not end the match'
    requestUnityPause(false)
  }
}

function initializeUnity(canvas: HTMLCanvasElement): void {
  if (hasUnityBooted) return

  if (typeof window.createUnityInstance === 'undefined') {
    error.value = 'createUnityInstance is not available after loading the loader'
    loading.value = false
    return
  }

  hasUnityBooted = true

  const unityConfig: UnityConfig = {
    dataUrl: `${UNITY_BUILD_BASE}.data.unityweb`,
    frameworkUrl: `${UNITY_BUILD_BASE}.framework.js.unityweb`,
    codeUrl: `${UNITY_BUILD_BASE}.wasm.unityweb`,
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
      devLog('Unity initialized successfully')
      loading.value = false
    })
    .catch((err: unknown) => {
      hasUnityBooted = false
      const errorMessage =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error'
      console.error('[UnityGame] Error starting Unity:', err)
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
      error.value = 'Could not get reference to canvas'
      return
    }

    const handleLoaderReady = () => {
      devLog('Unity loader ready', {
        canvasId: canvas.id,
        loaderSrc: UNITY_LOADER_SRC,
        unityAvailable: typeof window.createUnityInstance !== 'undefined',
      })
      initializeUnity(canvas)
    }

    const handleLoaderError = () => {
      error.value = 'Error loading the Unity loader script'
      loading.value = false
      console.error('[UnityGame] Error loading loader script:', UNITY_LOADER_SRC)
    }

    let loaderScript = document.getElementById(UNITY_LOADER_ID) as HTMLScriptElement | null
    if (!loaderScript) {
      loaderScript = document.createElement('script')
      loaderScript.id = UNITY_LOADER_ID
      loaderScript.src = UNITY_LOADER_SRC
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
    error.value = `Unexpected error: ${err instanceof Error ? err.message : String(err)}`
    loading.value = false
    console.error('[UnityGame] Error in onMounted:', err)
  }
})

onBeforeRouteLeave(async () => {
  await teardownUnity('route-leave')
})

onBeforeUnmount(() => {
  window.removeEventListener(TOKEN_CHANGED_EVENT, onTokenChanged as EventListener)
  if (!isTearingDown) {
    void teardownUnity('component-unmount')
  }
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
  align-items: center;
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

.finish-btn {
  border: 1.5px solid rgba(151, 254, 237, 0.6);
  background: rgba(151, 254, 237, 0.14);
  color: #e6f8ff;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.finish-btn:hover {
  background: rgba(151, 254, 237, 0.22);
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

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 16px;
}

.modal-card {
  width: min(560px, 92vw);
  background: #071952;
  border: 1px solid rgba(151, 254, 237, 0.4);
  border-radius: 14px;
  padding: 16px;
  color: #e6f8ff;
}

.modal-card h3 {
  margin-bottom: 6px;
}

.modal-card p {
  color: rgba(230, 248, 255, 0.86);
  font-size: 0.95rem;
}

.modal-error {
  color: #ffb4b4 !important;
  margin-top: 8px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.modal-btn {
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid rgba(151, 254, 237, 0.45);
  color: #e6f8ff;
}

.modal-btn.secondary {
  background: transparent;
}

.modal-btn.victory {
  background: rgba(151, 254, 237, 0.18);
}

.modal-btn.defeat {
  background: rgba(255, 180, 180, 0.18);
}

.modal-btn.cancel {
  background: rgba(255, 228, 181, 0.15);
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
