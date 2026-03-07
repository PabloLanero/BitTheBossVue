<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Header from '@/components/Header/Header.vue'

const { t } = useI18n()

const cards = computed(() => [
  {
    key: 'players',
    title: t('community.cards.players.title'),
    value: t('community.cards.players.value'),
    desc: t('community.cards.players.desc'),
  },
  {
    key: 'forum',
    title: t('community.cards.forum.title'),
    value: t('community.cards.forum.value'),
    desc: t('community.cards.forum.desc'),
  },
  {
    key: 'top',
    title: t('community.cards.top.title'),
    value: t('community.cards.top.value'),
    desc: t('community.cards.top.desc'),
  },
])

const feedItems = computed(() => [
  { key: 'alpha', avatar: 'A', user: 'AlphaNode', text: t('community.feed.alpha.text'), time: t('community.feed.alpha.time') },
  { key: 'synth', avatar: 'S', user: 'SynthDragon', text: t('community.feed.synth.text'), time: t('community.feed.synth.time') },
  { key: 'neon', avatar: 'N', user: 'NeonFox', text: t('community.feed.neon.text'), time: t('community.feed.neon.time') },
  { key: 'void', avatar: 'V', user: 'VoidCipher', text: t('community.feed.void.text'), time: t('community.feed.void.time') },
])
</script>

<template>
  <Header />
  <section class="community-page">
    <div class="community-shell">

      <div class="community-hero">
        <h1 class="community-hero__title">{{ t('community.title') }}</h1>
        <p class="community-hero__subtitle">{{ t('community.subtitle') }}</p>
      </div>

      <div class="community-grid">
        <div v-for="card in cards" :key="card.key" class="community-card">
          <div class="community-card__icon">
            <svg v-if="card.key === 'players'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <svg v-else-if="card.key === 'forum'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
          </div>
          <h2 class="community-card__title">{{ card.title }}</h2>
          <p class="community-card__value">{{ card.value }}</p>
          <p class="community-card__desc">{{ card.desc }}</p>
        </div>
      </div>

      <div class="community-feed">
        <h2 class="community-feed__title">{{ t('community.feed.title') }}</h2>
        <ul class="feed-list">
          <li v-for="item in feedItems" :key="item.key" class="feed-item">
            <span class="feed-item__avatar">{{ item.avatar }}</span>
            <div class="feed-item__body">
              <span class="feed-item__user">{{ item.user }}</span>
              <span class="feed-item__text">{{ item.text }}</span>
            </div>
            <span class="feed-item__time">{{ item.time }}</span>
          </li>
        </ul>
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">
.community-page {
  min-height: calc(100vh - 72px);
  background: $color-bg;
  padding: $space-xl;
}

.community-shell {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: $space-2xl;
}

.community-hero {
  text-align: center;

  &__title {
    font-size: clamp(2rem, 5vw, $font-size-3xl);
    font-weight: 900;
    color: $color-cyan;
    text-shadow: $glow-cyan;
    margin-bottom: $space-sm;
  }

  &__subtitle {
    font-size: $font-size-base;
    color: rgba($color-white, 0.55);
  }
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: $space-lg;
}

.community-card {
  background: $color-bg-card;
  border: 1px solid rgba($color-cyan, 0.15);
  border-radius: $radius-lg;
  padding: $space-xl;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-sm;
  text-align: center;
  transition: border-color 0.25s, box-shadow 0.25s;

  &:hover {
    border-color: rgba($color-cyan, 0.4);
    box-shadow: 0 0 20px rgba($color-cyan, 0.08);
  }

  &__icon {
    width: 46px;
    height: 46px;
    background: linear-gradient(145deg, #0b666a, #097a7e);
    border-radius: $radius-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-white;

    svg { width: 24px; height: 24px; }
  }

  &__title {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.5);
    font-weight: 500;
  }

  &__value {
    font-size: $font-size-xl;
    font-weight: 800;
    color: $color-white;
  }

  &__desc {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.4);
  }
}

.community-feed {
  background: $color-bg-card;
  border: 1px solid rgba($color-cyan, 0.12);
  border-radius: $radius-lg;
  overflow: hidden;

  &__title {
    font-size: $font-size-base;
    font-weight: 700;
    color: $color-white;
    padding: $space-md $space-lg;
    border-bottom: 1px solid rgba($color-cyan, 0.08);
  }
}

.feed-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feed-item {
  display: flex;
  align-items: center;
  gap: $space-md;
  padding: $space-md $space-lg;
  border-bottom: 1px solid rgba($color-white, 0.05);

  &:last-child { border-bottom: none; }

  &__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0b666a, #071952);
    border: 1.5px solid rgba($color-cyan, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-sm;
    font-weight: 700;
    color: $color-cyan;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    font-size: $font-size-sm;
    color: rgba($color-white, 0.7);
  }

  &__user {
    font-weight: 700;
    color: $color-white;
    margin-right: 4px;
  }

  &__time {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.3);
    white-space: nowrap;
  }
}
</style>

