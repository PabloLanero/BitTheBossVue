import type { MatchHistoryItem, MatchResultStatus } from '@/models/GameHistory'

const HISTORY_STORAGE_KEY = 'btb_match_history'

function readHistory(): MatchHistoryItem[] {
  const raw = localStorage.getItem(HISTORY_STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as MatchHistoryItem[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function writeHistory(items: MatchHistoryItem[]): void {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items))
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
  const entry: MatchHistoryItem = {
    id: `${input.partidaId}-${Date.now()}`,
    partidaId: input.partidaId,
    partidaNombre: input.partidaNombre,
    opponentLabel: input.opponentLabel,
    status: input.status,
    finishedAt: input.finishedAt ?? new Date().toISOString(),
  }

  const existing = readHistory()
  existing.unshift(entry)
  writeHistory(existing)
  return entry
}
