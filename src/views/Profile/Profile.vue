<script setup lang="ts">
import { useRouter } from 'vue-router'
import Logo from '@/components/Logo/Logo.vue'
import type { Usuario } from '@/models/Usuario'
import type { Tier } from '@/models/Tier'
import type { Partida } from '@/models/Partida'

const router = useRouter()

// Mock data — se reemplazará con llamada a la API
const usuario: Usuario = {
  usuarioId: 12345,
  nombre: 'Circuit Master',
  correo: 'player@battleboard.com',
  visible: true,
  fechaCreacion: new Date('2024-01-15'),
  rol: 'PREMIUM',
  tier: {
    id: 3,
    titulo: 'Diamond Commander',
    fechaCreacion: new Date('2024-01-15'),
    visible: true,
  } as Tier,
  partidas: [
    { idPartida: 'GAME-2024-001', arrUsuario: [{ usuarioId: 1 } as Usuario] },
    { idPartida: 'GAME-2024-002', arrUsuario: [{ usuarioId: 1 } as Usuario] },
    { idPartida: 'GAME-2024-003', arrUsuario: [{ usuarioId: 1 } as Usuario] },
    { idPartida: 'GAME-2024-004', arrUsuario: [{ usuarioId: 1 } as Usuario, { usuarioId: 2 } as Usuario] },
    { idPartida: 'GAME-2024-005', arrUsuario: [{ usuarioId: 1 } as Usuario, { usuarioId: 2 } as Usuario, { usuarioId: 3 } as Usuario] },
  ] as Partida[],
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}
</script>

<template>
  <div class="profile-page">

    <div class="profile-topbar">
      <Logo :width="60" :height="48" />
      <button class="back-btn" @click="router.push('/Landing')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        Volver al Inicio
      </button>
    </div>

    <div class="profile-content">
      <div class="profile-hero">
        <h1 class="profile-hero__title">Perfil de Usuario</h1>
        <p class="profile-hero__subtitle">Gestiona tu información y estadísticas</p>
      </div>

      <!-- Información Personal -->
      <div class="profile-card">
        <div class="profile-card__header">
          <span class="icon-badge">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
          </span>
          <span class="profile-card__header-title">Información Personal</span>
        </div>

        <div class="info-list">
          <div class="info-row">
            <span class="info-row__icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
            </span>
            <div class="info-row__content">
              <span class="info-row__label">Nombre de Usuario</span>
              <span class="info-row__value">{{ usuario.nombre }}</span>
            </div>
          </div>

          <div class="info-row">
            <span class="info-row__icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </span>
            <div class="info-row__content">
              <span class="info-row__label">Correo Electrónico</span>
              <span class="info-row__value">{{ usuario.correo }}</span>
            </div>
          </div>

          <div class="info-row">
            <span class="info-row__icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/></svg>
            </span>
            <div class="info-row__content">
              <span class="info-row__label">ID de Usuario</span>
              <span class="info-row__value">#{{ usuario.usuarioId }}</span>
            </div>
          </div>

          <div class="info-row">
            <span class="info-row__icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
            </span>
            <div class="info-row__content">
              <span class="info-row__label">Rol</span>
              <span class="role-badge" :class="`role-badge--${usuario.rol.toLowerCase()}`">
                {{ usuario.rol }}
              </span>
            </div>
          </div>

          <div class="info-row info-row--last">
            <span class="info-row__icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
            </span>
            <div class="info-row__content">
              <span class="info-row__label">Miembro Desde</span>
              <span class="info-row__value">{{ formatDate(usuario.fechaCreacion) }}</span>
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
            <p class="rank-body__value">{{ usuario.tier?.titulo }}</p>
          </div>
          <div class="rank-body__level">
            <p class="rank-body__label">Nivel</p>
            <p class="rank-body__level-num">{{ usuario.tier?.id }}</p>
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
          <span class="count-badge">{{ usuario.partidas?.length }}</span>
        </div>

        <div class="game-list">
          <div
            v-for="(partida, i) in usuario.partidas"
            :key="partida.idPartida"
            class="game-row"
          >
            <span class="game-row__num">{{ i + 1 }}</span>
            <div class="game-row__info">
              <span class="game-row__id">{{ partida.idPartida }}</span>
              <span class="game-row__players">{{ partida.arrUsuario?.length }} jugador(es)</span>
            </div>
            <button class="detail-btn">Ver Detalles</button>
          </div>
        </div>
      </div>

    </div>
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
}
</style>
