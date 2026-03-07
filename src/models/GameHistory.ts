export type MatchResultStatus = 'Win' | 'Loss' | 'Cancelled'

export interface MatchHistoryItem {
  id: string
  partidaId: string
  partidaNombre: string
  opponentLabel: string
  status: MatchResultStatus
  finishedAt: string
}
