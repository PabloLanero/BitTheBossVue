export interface UnityInstance {
  SendMessage(gameObject: string, methodName: string, parameter?: string): void
  Quit?: () => Promise<void>
}

export interface SendTokenOptions {
  force?: boolean
}

export const UNITY_SESSION_GAME_OBJECT = 'EconomyManager'
export const UNITY_SESSION_METHOD = 'SetSessionToken'
export const TOKEN_STORAGE_KEY = 'session_token'
export const TOKEN_CHANGED_EVENT = 'unity:session-token-changed'

let unityInstance: UnityInstance | null = null
let unityReady = false
let lastTokenSentToUnity: string | null = null

function devLog(message: string, details?: unknown): void {
  if (!import.meta.env.DEV) return
  if (details !== undefined) {
    console.debug(`[UnityBridge] ${message}`, details)
    return
  }
  console.debug(`[UnityBridge] ${message}`)
}

function normalizeToken(token?: string | null): string {
  return (token ?? '').trim()
}

export function readStoredSessionToken(): string {
  return normalizeToken(localStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem('token'))
}

function persistSessionToken(token: string): void {
  if (!token) {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    return
  }
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

function dispatchTokenChanged(token: string): void {
  window.dispatchEvent(
    new CustomEvent<string>(TOKEN_CHANGED_EVENT, {
      detail: token,
    }),
  )
}

export function updateSessionToken(token?: string | null): void {
  const nextToken = normalizeToken(token)
  persistSessionToken(nextToken)
  dispatchTokenChanged(nextToken)
  devLog('Session token updated in front', { hasToken: Boolean(nextToken) })
}

export function clearSessionToken(): void {
  updateSessionToken('')
}

export function registerUnityInstance(instance: UnityInstance): void {
  unityInstance = instance
  unityReady = true
  lastTokenSentToUnity = null
  devLog('Unity instance registered')
}

export function unregisterUnityInstance(): void {
  unityInstance = null
  unityReady = false
  lastTokenSentToUnity = null
  devLog('Unity instance unregistered')
}

export function getUnityInstance(): UnityInstance | null {
  return unityInstance
}

export function sendTokenToUnity(token?: string | null, options?: SendTokenOptions): boolean {
  const nextToken = normalizeToken(token)
  const force = Boolean(options?.force)

  if (!unityReady || !unityInstance) {
    devLog('Skipped token send: Unity is not ready')
    return false
  }

  if (!force && lastTokenSentToUnity === nextToken) {
    devLog('Skipped token send: token has not changed')
    return false
  }

  try {
    unityInstance.SendMessage(UNITY_SESSION_GAME_OBJECT, UNITY_SESSION_METHOD, nextToken)
    lastTokenSentToUnity = nextToken
    devLog('Token sent to Unity', { hasToken: Boolean(nextToken) })
    return true
  } catch (error) {
    devLog('Failed to send token to Unity', error)
    return false
  }
}
