<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Logo from '@/components/Logo/Logo.vue'
import EditProfileModal from '@/components/Profile/EditProfileModal.vue'
import LogoutModal from '@/components/Profile/LogoutModal.vue'
import { useUser } from '@/ApiCalls/useUser'
import { useLogin } from '@/stores/LoginStore'

const router = useRouter()
const { getUsuarios, getUsuarioById } = useUser()

const showEditModal   = ref(false)
const showLogoutModal = ref(false)
const loginStore = useLogin()

function handleLogout() {
  loginStore.logout()
  localStorage.removeItem('auth_name')
  localStorage.removeItem('auth_email')
  router.push('/Login')
}

function onProfileSaved(newName: string, newEmail: string) {
  if (userRaw.value) {
    userRaw.value = { ...userRaw.value, nombre: newName, correo: newEmail }
  }
}

const loading = ref(true)
const errorMsg = ref('')
const userRaw = ref<Record<string, any> | null>(null)
const tokenClaims = ref<Record<string, any> | null>(null)

function parseJwt(token: string): Record<string, any> | null {
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

function claim(claims: Record<string, any> | null, keys: string[]): string | null {
  if (!claims) return null
  for (const key of keys) {
    const value = claims[key]
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value)
    }
  }
  return null
}

const profile = computed(() => {
  const u = userRaw.value ?? {}
  const c = tokenClaims.value ?? {}
  const fallbackName = localStorage.getItem('auth_name')
  const fallbackEmail = localStorage.getItem('auth_email')

  const claimId = c.nameid
    ?? c.sub
    ?? c.userId
    ?? c.userid
    ?? c.id
    ?? c['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']

  const claimName = c.unique_name ?? c.name
  const claimEmail = c.email ?? c['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
  const claimRole = c.role ?? c['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

  return {
    id: u.usuarioId ?? u.userId ?? claimId ?? null,
    name: u.nombre ?? u.userName ?? claimName ?? fallbackName ?? null,
    email: u.correo ?? u.email ?? claimEmail ?? fallbackEmail ?? null,
    role: u.rol ?? u.role ?? claimRole ?? null,
    createdAt: u.fechaCreacion ?? u.createdAt ?? null,
    tierTitle: u.tier?.titulo ?? u.tier?.tituloTier ?? u.tier?.title ?? null,
    tierLevel: u.tier?.id ?? null,
    partidas: Array.isArray(u.partidas) ? u.partidas : [],
  }
})

function noData(value: unknown): string {
  if (value === null || value === undefined) return 'No data'
  const text = String(value).trim()
  return text.length > 0 ? text : 'No data'
}

function roleClass(roleValue: unknown): string {
  const role = String(roleValue ?? '').toLowerCase()
  if (role === 'premium' || role === 'admin' || role === 'user') {
    return `role-badge--${role}`
  }
  return 'role-badge--empty'
}

async function loadProfile(): Promise<void> {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/Login')
    return
  }

  const claims = parseJwt(token)
  tokenClaims.value = claims
  const idClaim = claim(claims, [
    'nameid',
    'sub',
    'userId',
    'userid',
    'id',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  ])
  const emailClaim = claim(claims, [
    'email',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  ])
  const nameClaim = claim(claims, ['unique_name', 'name'])

  if (idClaim && !Number.isNaN(Number(idClaim))) {
    userRaw.value = await getUsuarioById(Number(idClaim))
    return
  }

  const usuarios = await getUsuarios()
  const match = usuarios.find((u: any) =>
    (emailClaim && (u.correo === emailClaim || u.email === emailClaim))
    || (nameClaim && (u.nombre === nameClaim || u.userName === nameClaim)),
  )

  userRaw.value = match ?? usuarios[0] ?? null
}

function formatDate(dateValue: string | Date | null): string {
  if (!dateValue) return 'No data'
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return 'No data'
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

function playersCount(partida: any): number {
  if (Array.isArray(partida?.arrUsuario)) return partida.arrUsuario.length
  return 0
}

onMounted(async () => {
  loading.value = true
  errorMsg.value = ''
  try {
    await loadProfile()
    if (!userRaw.value) {
      errorMsg.value = 'No se encontraron datos de usuario para esta sesión.'
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'No se pudo cargar el perfil'
    if (msg.toLowerCase().includes('failed to fetch')) {
      errorMsg.value = 'No se pudo conectar con el backend para cargar el perfil completo. Mostrando datos disponibles.'
    } else {
      errorMsg.value = msg
    }
    if (msg.toLowerCase().includes('token') || msg.toLowerCase().includes('autentic')) {
      localStorage.removeItem('token')
      router.push('/Login')
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="profile-page">

    <div class="profile-topbar">
      <Logo :width="60" :height="48" />
      <div class="profile-topbar__right">
        <button class="back-btn" @click="router.push('/Home')">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Volver al Inicio
        </button>
        <button class="logout-btn" @click="showLogoutModal = true">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
          Cerrar Sesión
        </button>
      </div>
    </div>

    <div class="profile-content">
      <div class="profile-hero">
        <h1 class="profile-hero__title">Perfil de Usuario</h1>
        <p class="profile-hero__subtitle">Gestiona tu información y estadísticas</p>
      </div>

      <div v-if="errorMsg" class="profile-card profile-state profile-state--error">
        {{ errorMsg }}
      </div>
      <!-- Información Personal -->
      <div class="profile-card">
        <div class="profile-card__header">
          <span class="icon-badge">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
          </span>
          <span class="profile-card__header-title">Información Personal</span>
          <button class="edit-btn" @click="showEditModal = true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            Editar
          </button>
        </div>

        <div class="info-list">
          <div class="info-row">
            <span class="info-row__icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
            </span>
            <div class="info-row__content">
              <span class="info-row__label">Nombre de Usuario</span>
              <span class="info-row__value">{{ loading ? 'Cargando...' : noData(profile.name) }}</span>
            </div>
          </div>

          <div class="info-row">
            <span class="info-row__icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </span>
            <div class="info-row__content">
              <span class="info-row__label">Correo Electrónico</span>
              <span class="info-row__value">{{ loading ? 'Cargando...' : noData(profile.email) }}</span>
            </div>
          </div>

          <div class="info-row">
            <span class="info-row__icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/></svg>
            </span>
            <div class="info-row__content">
              <span class="info-row__label">ID de Usuario</span>
              <span class="info-row__value">{{ loading ? 'Cargando...' : (profile.id ? `#${profile.id}` : 'No data') }}</span>
            </div>
          </div>

          <div class="info-row">
            <span class="info-row__icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
            </span>
            <div class="info-row__content">
              <span class="info-row__label">Rol</span>
              <span class="role-badge" :class="roleClass(profile.role)">
                {{ loading ? 'Cargando...' : noData(profile.role ? String(profile.role).toUpperCase() : null) }}
              </span>
            </div>
          </div>

          <div class="info-row info-row--last">
            <span class="info-row__icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
            </span>
            <div class="info-row__content">
              <span class="info-row__label">Miembro Desde</span>
              <span class="info-row__value">{{ loading ? 'Cargando...' : formatDate(profile.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Rango Competitivo -->
      <div class="profile-card profile-card--rank">
        <div class="profile-card__header">
          <span class="icon-badge">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>
          </span>
          <span class="profile-card__header-title">Rango Competitivo</span>
        </div>

        <div class="rank-body">
          <div>
            <p class="rank-body__label">Tier Actual</p>
            <p class="rank-body__value">{{ loading ? 'Cargando...' : noData(profile.tierTitle) }}</p>
          </div>
          <div class="rank-body__level">
            <p class="rank-body__label">Nivel</p>
            <p class="rank-body__level-num">{{ loading ? '-' : noData(profile.tierLevel) }}</p>
          </div>
        </div>
      </div>

      <!-- Historial de Partidas -->
      <div class="profile-card">
        <div class="profile-card__header">
          <span class="icon-badge">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5S14.67 12 15.5 12s1.5.67 1.5 1.5S16.33 15 15.5 15zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5S19.33 12 18.5 12z"/></svg>
          </span>
          <span class="profile-card__header-title">Historial de Partidas</span>
          <span class="count-badge">{{ loading ? '-' : profile.partidas.length }}</span>
        </div>

        <div class="game-list">
          <div v-if="loading" class="game-row">
            <span class="game-row__num">-</span>
            <div class="game-row__info">
              <span class="game-row__id">Cargando...</span>
              <span class="game-row__players">Cargando...</span>
            </div>
            <button class="detail-btn" disabled>Ver Detalles</button>
          </div>
          <div
            v-else
            v-for="(partida, i) in profile.partidas"
            :key="partida.idPartida"
            class="game-row"
          >
            <span class="game-row__num">{{ i + 1 }}</span>
            <div class="game-row__info">
              <span class="game-row__id">{{ partida.idPartida }}</span>
              <span class="game-row__players">{{ playersCount(partida) }} jugador(es)</span>
            </div>
            <button class="detail-btn">Ver Detalles</button>
          </div>
          <div v-if="!loading && profile.partidas.length === 0" class="game-row">
            <span class="game-row__num">-</span>
            <div class="game-row__info">
              <span class="game-row__id">No data</span>
              <span class="game-row__players">No hay partidas registradas</span>
            </div>
            <button class="detail-btn" disabled>Ver Detalles</button>
          </div>
        </div>
      </div>
    </div>

    <LogoutModal
      v-if="showLogoutModal"
      @cancel="showLogoutModal = false"
      @confirm="handleLogout"
    />

    <EditProfileModal
      :visible="showEditModal"
      :user-id="profile.id ? Number(profile.id) : null"
      :current-name="profile.name"
      :current-email="profile.email"
      @close="showEditModal = false"
      @saved="onProfileSaved"
    />
  </div>
</template>

<style scoped lang="scss">
.profile-page {
  min-height: 100vh;
  background-color: $color-bg;
  color: $color-white;
  font-family: $font-sans;
}

// ── Top bar ──────────────────────────────────────────────
.profile-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $space-sm $space-xl;
  border-bottom: 1px solid rgba($color-cyan, 0.08);

  &__right {
    display: flex;
    align-items: center;
    gap: $space-sm;
  }
}

.back-btn {
  display: flex;
  align-items: center;
  gap: $space-xs;
  padding: $space-xs $space-md;
  background: transparent;
  border: 1.5px solid rgba($color-cyan, 0.4);
  border-radius: $radius-full;
  color: $color-white;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  svg { width: 16px; height: 16px; }

  &:hover {
    background: rgba($color-cyan, 0.08);
    border-color: $color-cyan;
  }
}

// ── Content wrapper ───────────────────────────────────────
.profile-content {
  max-width: 760px;
  margin: 0 auto;
  padding: $space-2xl $space-xl $space-3xl;
  display: flex;
  flex-direction: column;
  gap: $space-lg;
}

.profile-state {
  padding: $space-xl;
  text-align: center;
  color: rgba($color-white, 0.75);

  &--error {
    color: #ff9b9b;
  }
}

.profile-hero {
  margin-bottom: $space-sm;

  &__title {
    font-size: clamp(1.8rem, 4vw, $font-size-3xl);
    font-weight: 800;
    color: $color-cyan;
    margin-bottom: $space-xs;
  }

  &__subtitle {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.5);
  }
}

// ── Card ─────────────────────────────────────────────────
.profile-card {
  background: $color-bg-card;
  border: 1px solid rgba($color-cyan, 0.12);
  border-radius: $radius-lg;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    gap: $space-sm;
    padding: $space-md $space-lg;
    border-bottom: 1px solid rgba($color-cyan, 0.08);
  }

  &__header-title {
    font-size: $font-size-base;
    font-weight: 600;
    color: $color-white;
    flex: 1;
  }

  &--rank {
    background: linear-gradient(135deg, $color-bg-card 60%, rgba($color-cyan, 0.04));
  }
}

.icon-badge {
  width: 34px;
  height: 34px;
  background: linear-gradient(145deg, #0b666a, #097a7e);
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: $color-white;

  svg { width: 18px; height: 18px; }
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: $space-xs $space-md;
  background: transparent;
  border: 1.5px solid rgba($color-orange, 0.45);
  border-radius: $radius-full;
  color: $color-orange;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  svg { width: 16px; height: 16px; }

  &:hover {
    background: rgba($color-orange, 0.1);
    border-color: $color-orange;
  }
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px $space-md;
  background: transparent;
  border: 1.5px solid rgba($color-cyan, 0.35);
  border-radius: $radius-full;
  color: $color-cyan;
  font-size: $font-size-xs;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  svg { width: 13px; height: 13px; }

  &:hover {
    background: rgba($color-cyan, 0.08);
    border-color: $color-cyan;
  }
}

.count-badge {
  background: rgba($color-cyan, 0.15);
  color: $color-cyan;
  font-size: $font-size-xs;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: $radius-full;
  border: 1px solid rgba($color-cyan, 0.25);
}

// ── Info list ─────────────────────────────────────────────
.info-list {
  padding: 0 $space-lg;
}

.info-row {
  display: flex;
  align-items: center;
  gap: $space-md;
  padding: $space-md 0;
  border-bottom: 1px solid rgba($color-white, 0.06);

  &--last { border-bottom: none; }

  &__icon {
    width: 32px;
    height: 32px;
    background: rgba($color-cyan, 0.08);
    border-radius: $radius-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: $color-cyan;

    svg { width: 16px; height: 16px; }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__label {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.45);
  }

  &__value {
    font-size: $font-size-sm;
    color: $color-white;
    font-weight: 500;
  }
}

.role-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  font-weight: 700;
  letter-spacing: 0.08em;

  &--premium {
    background: rgba($color-orange, 0.18);
    color: $color-orange;
    border: 1px solid rgba($color-orange, 0.35);
  }

  &--admin {
    background: rgba($color-cyan, 0.15);
    color: $color-cyan;
    border: 1px solid rgba($color-cyan, 0.3);
  }

  &--user {
    background: rgba($color-white, 0.08);
    color: rgba($color-white, 0.6);
    border: 1px solid rgba($color-white, 0.15);
  }

  &--empty {
    background: rgba($color-white, 0.06);
    color: rgba($color-white, 0.6);
    border: 1px solid rgba($color-white, 0.12);
  }
}

// ── Rank ─────────────────────────────────────────────────
.rank-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $space-lg $space-lg $space-xl;

  &__label {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.45);
    margin-bottom: $space-xs;
  }

  &__value {
    font-size: $font-size-xl;
    font-weight: 700;
    color: $color-white;
  }

  &__level {
    text-align: right;
  }

  &__level-num {
    font-size: $font-size-3xl;
    font-weight: 900;
    color: $color-white;
    line-height: 1;
  }
}

// ── Game list ─────────────────────────────────────────────
.game-list {
  padding: $space-xs $space-lg $space-md;
}

.game-row {
  display: flex;
  align-items: center;
  gap: $space-md;
  padding: $space-sm 0;
  border-bottom: 1px solid rgba($color-white, 0.05);

  &:last-child { border-bottom: none; }

  &__num {
    width: 28px;
    height: 28px;
    background: rgba($color-cyan, 0.1);
    border-radius: $radius-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-xs;
    font-weight: 700;
    color: $color-cyan;
    flex-shrink: 0;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__id {
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-white;
  }

  &__players {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.4);
  }
}

.detail-btn {
  padding: $space-xs $space-md;
  background: transparent;
  border: 1.5px solid rgba($color-cyan, 0.35);
  border-radius: $radius-sm;
  color: $color-white;
  font-size: $font-size-xs;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  white-space: nowrap;

  &:hover {
    background: rgba($color-cyan, 0.08);
    border-color: $color-cyan;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
