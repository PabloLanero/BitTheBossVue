import type { MatchHistoryItem, MatchResultStatus } from '@/models/GameHistory'
import { getUserIdFromToken } from '@/utils/auth'

const HISTORY_STORAGE_KEY_PREFIX = 'btb_match_history'

function getCurrentUserId(): number | null {
  return getUserIdFromToken(localStorage.getItem('token'))
}

function buildHistoryStorageKey(userId: number | null): string {
  return userId === null
    ? `${HISTORY_STORAGE_KEY_PREFIX}:guest`
    : `${HISTORY_STORAGE_KEY_PREFIX}:user:${userId}`
}

function readHistory(userId = getCurrentUserId()): MatchHistoryItem[] {
  const raw = localStorage.getItem(buildHistoryStorageKey(userId))
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as MatchHistoryItem[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function writeHistory(items: MatchHistoryItem[], userId = getCurrentUserId()): void {
  localStorage.setItem(buildHistoryStorageKey(userId), JSON.stringify(items))
}

export function getHistoryEntries(): MatchHistoryItem[] {
  return readHistory().sort((a, b) => b.finishedAt.localeCompare(a.finishedAt))
}

export interface AddHistoryEntryInput {
  partidaId: string
  partidaNombre: string
  opponentLabel: string
  status: MatchResultStatus
  finishedAt?: string
}

export function addHistoryEntry(input: AddHistoryEntryInput): MatchHistoryItem {
  const userId = getCurrentUserId()
  const entry: MatchHistoryItem = {
    id: `${input.partidaId}-${Date.now()}`,
    partidaId: input.partidaId,
    partidaNombre: input.partidaNombre,
    opponentLabel: input.opponentLabel,
    status: input.status,
    finishedAt: input.finishedAt ?? new Date().toISOString(),
  }

  const existing = readHistory(userId)
  existing.unshift(entry)
  writeHistory(existing, userId)
  return entry
}
