<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Logo from '@/components/Logo/Logo.vue';
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <RouterLink to="/" class="site-header__logo">
        <Logo :width="110" :height="44" />
      </RouterLink>

      <nav class="site-header__nav">
        <RouterLink to="#game"      class="nav-link">{{ $t('header.game') }}</RouterLink>
        <RouterLink to="#factions"  class="nav-link">{{ $t('header.factions') }}</RouterLink>
        <RouterLink to="#community" class="nav-link">{{ $t('header.community') }}</RouterLink>
      </nav>

      <RouterLink to="/Login" class="preorder-btn">
        {{ $t('header.login') }}
      </RouterLink>
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
  }

  &__nav {
    display: flex;
    gap: $space-xl;
    flex: 1;
    justify-content: center;
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
  flex-shrink: 0;
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
}
</style>
