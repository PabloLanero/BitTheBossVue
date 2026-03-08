export function parseJwt(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function getUserIdFromToken(token: string | null): number | null {
  if (!token) return null
  const claims = parseJwt(token)
  if (!claims) return null

  const rawId =
    claims.nameid ??
    claims.sub ??
    claims.userId ??
    claims.userid ??
    claims.id ??
    claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']

  const parsed = Number(rawId)
  return Number.isNaN(parsed) ? null : parsed
}
