<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Logo from '@/components/Logo/Logo.vue'
import { useLogin } from '@/stores/LoginStore'

const router   = useRouter()
const loginStore = useLogin()

const isLoggedIn = computed(() => loginStore.isAuthenticated || !!localStorage.getItem('token'))
const userName   = computed(() => localStorage.getItem('auth_name') ?? 'My Profile')
const gameRoute = computed(() => (isLoggedIn.value ? '/history' : '/Login'))

function logout() {
  loginStore.logout()
  localStorage.removeItem('auth_name')
  localStorage.removeItem('auth_email')
  router.push('/Login')
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <button type="button" class="site-header__logo" @click="router.push('/Home')">
        <Logo :width="110" :height="44" />
      </button>

      <nav class="site-header__nav">
        <RouterLink :to="gameRoute" class="nav-link">{{ $t('header.game') }}</RouterLink>
        <RouterLink to="/game" class="nav-link">{{ $t('header.factions') }}</RouterLink>
        <RouterLink to="/factions" class="nav-link">{{ $t('header.community') }}</RouterLink>
        <RouterLink to="/community" class="nav-link">{{ $t('header.communityLink') }}</RouterLink>
      </nav>

      <div class="site-header__actions">
        <template v-if="isLoggedIn">
          <RouterLink to="/Profile" class="preorder-btn preorder-btn--user">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
            {{ userName }}
          </RouterLink>
          <button class="logout-btn" @click="logout">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
          </button>
        </template>

        <RouterLink v-else to="/Login" class="preorder-btn">
          {{ $t('header.login') }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: rgba($color-bg, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba($color-cyan, 0.12);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: $space-sm $space-xl;
    gap: $space-lg;
  }

  &__logo {
    flex-shrink: 0;
    text-decoration: none;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  &__nav {
    display: flex;
    gap: $space-xl;
    flex: 1;
    justify-content: center;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-sm;
    flex-shrink: 0;
  }
}

.nav-link {
  color: $color-white;
  text-decoration: none;
  font-size: $font-size-sm;
  letter-spacing: 0.06em;
  transition: color 0.2s;

  &:hover,
  &.router-link-active {
    color: $color-cyan;
    text-shadow: $glow-cyan;
  }
}

.preorder-btn {
  padding: $space-sm $space-lg;
  border: 1.5px solid $color-cyan;
  border-radius: $radius-full;
  color: $color-cyan;
  font-size: $font-size-sm;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s;

  &:hover {
    background: rgba($color-cyan, 0.12);
    box-shadow: $glow-cyan;
  }

  &--user {
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
      width: 15px;
      height: 15px;
    }
  }
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: transparent;
  border: 1.5px solid rgba($color-orange, 0.4);
  border-radius: $radius-full;
  color: $color-orange;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  svg { width: 16px; height: 16px; }

  &:hover {
    background: rgba($color-orange, 0.1);
    border-color: $color-orange;
  }
}
</style>
