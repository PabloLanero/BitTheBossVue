export type MatchResultStatus = 'Victoria' | 'Derrota' | 'Cancelada'

export interface MatchHistoryItem {
  id: string
  partidaId: string
  partidaNombre: string
  opponentLabel: string
  status: MatchResultStatus
  finishedAt: string
}
