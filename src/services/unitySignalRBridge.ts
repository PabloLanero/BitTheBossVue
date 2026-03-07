import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  HttpTransportType,
  LogLevel,
} from '@microsoft/signalr'
import { getUnityInstance, readStoredSessionToken } from '@/services/unityBridge'

export interface UnitySignalRBridgeApi {
  connect(hubUrl: string, token: string, partidaId: string, gameObjectName: string): void
  disconnect(): void
  sendSpawn(partidaId: string, nodeName: string, troopType: number, actorSlot: number): void
  sendMove(
    partidaId: string,
    sourceNode: string,
    targetNode: string,
    troopTypesCsv: string,
    actorSlot: number,
  ): void
}

declare global {
  interface Window {
    BTBSignalRBridge?: UnitySignalRBridgeApi
  }
}

const DEFAULT_GAME_OBJECT = 'SignalRMultiplayerManager'
const UNITY_CALLBACK_METHOD = 'OnSignalRMessage'

const state: {
  connection: HubConnection | null
  hubUrl: string
  partidaId: string
  token: string
  gameObjectName: string
  playerSlot: number
} = {
  connection: null,
  hubUrl: '',
  partidaId: '',
  token: '',
  gameObjectName: DEFAULT_GAME_OBJECT,
  playerSlot: 0,
}

function devLog(message: string, details?: unknown): void {
  if (!import.meta.env.DEV) return
  if (details !== undefined) {
    console.debug(`[UnitySignalRBridge] ${message}`, details)
    return
  }
  console.debug(`[UnitySignalRBridge] ${message}`)
}

function normalizeText(value?: string | null): string {
  return (value ?? '').trim()
}

function toInt(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.trunc(value)
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

function sendToUnity(payload: Record<string, unknown>): void {
  const unity = getUnityInstance()
  if (!unity) {
    devLog('No se envio mensaje a Unity porque la instancia no esta lista', payload)
    return
  }

  try {
    unity.SendMessage(state.gameObjectName, UNITY_CALLBACK_METHOD, JSON.stringify(payload))
  } catch (error) {
    console.warn('[UnitySignalRBridge] Error enviando mensaje a Unity:', error)
  }
}

function parseTroopTypesCsv(csv: string): number[] {
  if (!csv) return []

  return csv
    .split(',')
    .map((value) => Number.parseInt(value.trim(), 10))
    .filter((value) => Number.isFinite(value))
}

function buildConnection(hubUrl: string): HubConnection {
  const connection = new HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => state.token,
      transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling,
      withCredentials: false,
    })
    .withAutomaticReconnect([0, 1500, 3000, 6000])
    .configureLogging(import.meta.env.DEV ? LogLevel.Information : LogLevel.Warning)
    .build()

  connection.on('MatchJoined', (payload: any) => {
    const playerSlot = toInt(payload?.playerSlot)
    state.playerSlot = playerSlot

    sendToUnity({
      type: 'player-assigned',
      partidaId: normalizeText(payload?.partidaId) || state.partidaId,
      playerSlot,
      playersConnected: toInt(payload?.playersConnected),
      matchReady: Boolean(payload?.matchReady),
    })
  })

  connection.on('LobbyUpdated', (payload: any) => {
    sendToUnity({
      type: 'lobby-updated',
      partidaId: normalizeText(payload?.partidaId) || state.partidaId,
      playersConnected: toInt(payload?.playersConnected),
      matchReady: Boolean(payload?.matchReady),
    })
  })

  connection.on('MatchReady', (payload: any) => {
    sendToUnity({
      type: 'match-ready',
      partidaId: normalizeText(payload?.partidaId) || state.partidaId,
      playersConnected: toInt(payload?.playersConnected),
      matchReady: true,
    })
  })

  connection.on('SpawnActionReceived', (payload: any) => {
    sendToUnity({
      type: 'spawn',
      partidaId: normalizeText(payload?.partidaId) || state.partidaId,
      actorSlot: toInt(payload?.actorSlot),
      nodeName: normalizeText(payload?.nodeName),
      troopType: toInt(payload?.troopType),
    })
  })

  connection.on('MoveActionReceived', (payload: any) => {
    const troopTypes = Array.isArray(payload?.troopTypes) ? payload.troopTypes : []
    const troopTypesCsv = troopTypes.map((value: unknown) => toInt(value)).join(',')

    sendToUnity({
      type: 'move',
      partidaId: normalizeText(payload?.partidaId) || state.partidaId,
      actorSlot: toInt(payload?.actorSlot),
      sourceNode: normalizeText(payload?.sourceNode),
      targetNode: normalizeText(payload?.targetNode),
      troopTypesCsv,
    })
  })

  connection.on('SystemMessage', (payload: any) => {
    sendToUnity({
      type: 'system',
      partidaId: normalizeText(payload?.partidaId) || state.partidaId,
      detail: normalizeText(payload?.detail || payload?.message),
    })
  })

  connection.onreconnecting(() => {
    sendToUnity({
      type: 'reconnecting',
      partidaId: state.partidaId,
    })
  })

  connection.onreconnected(() => {
    sendToUnity({
      type: 'connected',
      partidaId: state.partidaId,
    })

    if (state.partidaId) {
      void connection.invoke('JoinMatch', state.partidaId).catch((error: unknown) => {
        console.warn('[UnitySignalRBridge] Error en rejoin tras reconexion:', error)
      })
    }
  })

  connection.onclose(() => {
    sendToUnity({
      type: 'disconnected',
      partidaId: state.partidaId,
    })
  })

  return connection
}

async function disconnectInternal(): Promise<void> {
  const connection = state.connection
  if (!connection) return

  state.connection = null
  const partidaId = state.partidaId

  try {
    if (connection.state === HubConnectionState.Connected && partidaId) {
      await connection.invoke('LeaveMatch', partidaId)
    }
  } catch (error) {
    devLog('Error al salir de la partida SignalR', error)
  }

  try {
    if (connection.state !== HubConnectionState.Disconnected) {
      await connection.stop()
    }
  } catch (error) {
    devLog('Error al cerrar la conexion SignalR', error)
  }

  state.playerSlot = 0
  state.hubUrl = ''

  sendToUnity({
    type: 'disconnected',
    partidaId,
  })
}

async function ensureConnection(hubUrl: string): Promise<HubConnection> {
  if (state.connection && state.hubUrl === hubUrl) return state.connection

  await disconnectInternal()

  state.connection = buildConnection(hubUrl)
  state.hubUrl = hubUrl
  return state.connection
}

async function connectInternal(
  hubUrl: string,
  token: string,
  partidaId: string,
  gameObjectName: string,
): Promise<void> {
  const nextHubUrl = normalizeText(hubUrl)
  const nextPartidaId = normalizeText(partidaId)
  const nextGameObjectName = normalizeText(gameObjectName) || DEFAULT_GAME_OBJECT
  const nextToken = normalizeText(token) || readStoredSessionToken()

  if (!nextHubUrl || !nextPartidaId) {
    sendToUnity({
      type: 'system',
      detail: 'HubUrl/PartidaId invalidos para SignalR.',
    })
    return
  }

  const previousPartidaId = state.partidaId

  state.gameObjectName = nextGameObjectName
  state.partidaId = nextPartidaId
  state.token = nextToken

  const connection = await ensureConnection(nextHubUrl)

  if (
    previousPartidaId &&
    previousPartidaId !== nextPartidaId &&
    connection.state === HubConnectionState.Connected
  ) {
    await connection.invoke('LeaveMatch', previousPartidaId).catch((error: unknown) => {
      devLog('Error saliendo de partida anterior', error)
    })
  }

  if (connection.state === HubConnectionState.Disconnected) {
    await connection.start()
  }

  sendToUnity({
    type: 'connected',
    partidaId: nextPartidaId,
  })

  await connection.invoke('JoinMatch', nextPartidaId)
  devLog('Conectado a SignalR', { hubUrl: nextHubUrl, partidaId: nextPartidaId })
}

async function sendSpawnInternal(
  partidaId: string,
  nodeName: string,
  troopType: number,
  actorSlot: number,
): Promise<void> {
  const connection = state.connection
  if (!connection || connection.state !== HubConnectionState.Connected) return

  const payload = {
    partidaId: normalizeText(partidaId) || state.partidaId,
    nodeName: normalizeText(nodeName),
    troopType: toInt(troopType),
    actorSlot: toInt(actorSlot),
  }

  if (!payload.partidaId || !payload.nodeName) return
  await connection.invoke('SendSpawnAction', payload)
}

async function sendMoveInternal(
  partidaId: string,
  sourceNode: string,
  targetNode: string,
  troopTypesCsv: string,
  actorSlot: number,
): Promise<void> {
  const connection = state.connection
  if (!connection || connection.state !== HubConnectionState.Connected) return

  const payload = {
    partidaId: normalizeText(partidaId) || state.partidaId,
    sourceNode: normalizeText(sourceNode),
    targetNode: normalizeText(targetNode),
    troopTypes: parseTroopTypesCsv(troopTypesCsv),
    actorSlot: toInt(actorSlot),
  }

  if (!payload.partidaId || !payload.sourceNode || !payload.targetNode) return
  await connection.invoke('SendMoveAction', payload)
}

export function registerUnitySignalRBridge(): void {
  if (typeof window === 'undefined') return
  if (window.BTBSignalRBridge) return

  window.BTBSignalRBridge = {
    connect: (hubUrl, token, partidaId, gameObjectName) => {
      void connectInternal(hubUrl, token, partidaId, gameObjectName).catch((error: unknown) => {
        console.error('[UnitySignalRBridge] Error conectando SignalR:', error)
        sendToUnity({
          type: 'system',
          detail: 'Error conectando SignalR.',
        })
      })
    },
    disconnect: () => {
      void disconnectInternal()
    },
    sendSpawn: (partidaId, nodeName, troopType, actorSlot) => {
      void sendSpawnInternal(partidaId, nodeName, troopType, actorSlot).catch((error: unknown) => {
        devLog('Error enviando spawn a SignalR', error)
      })
    },
    sendMove: (partidaId, sourceNode, targetNode, troopTypesCsv, actorSlot) => {
      void sendMoveInternal(partidaId, sourceNode, targetNode, troopTypesCsv, actorSlot).catch(
        (error: unknown) => {
          devLog('Error enviando move a SignalR', error)
        },
      )
    },
  }
}

export function unregisterUnitySignalRBridge(): void {
  if (typeof window === 'undefined') return
  if (!window.BTBSignalRBridge) return

  void disconnectInternal()
  delete window.BTBSignalRBridge
}
