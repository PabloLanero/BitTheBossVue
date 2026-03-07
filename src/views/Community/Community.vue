<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
</script>

<template>
  <Header />
  <section class="community-page">
    <div class="community-shell">

      <div class="community-hero">
        <h1 class="community-hero__title">Community</h1>
        <p class="community-hero__subtitle">Connect with players, share strategies and rise together</p>
      </div>

      <div class="community-grid">

        <div class="community-card">
          <div class="community-card__icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </div>
          <h2 class="community-card__title">Players Online</h2>
          <p class="community-card__value">1,284</p>
          <p class="community-card__desc">Active players right now</p>
        </div>

        <div class="community-card">
          <div class="community-card__icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          </div>
          <h2 class="community-card__title">Forum</h2>
          <p class="community-card__value">3,540</p>
          <p class="community-card__desc">Posts this week</p>
        </div>

        <div class="community-card">
          <div class="community-card__icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
          </div>
          <h2 class="community-card__title">Top Players</h2>
          <p class="community-card__value">Hall of Fame</p>
          <p class="community-card__desc">Best ranked this season</p>
        </div>

      </div>

      <div class="community-feed">
        <h2 class="community-feed__title">Latest Activity</h2>
        <ul class="feed-list">
          <li class="feed-item">
            <span class="feed-item__avatar">A</span>
            <div class="feed-item__body">
              <span class="feed-item__user">AlphaNode</span>
              <span class="feed-item__text">won a ranked match against IronWall</span>
            </div>
            <span class="feed-item__time">2m ago</span>
          </li>
          <li class="feed-item">
            <span class="feed-item__avatar">S</span>
            <div class="feed-item__body">
              <span class="feed-item__user">SynthDragon</span>
              <span class="feed-item__text">reached Tier 5 — Circuit Legend</span>
            </div>
            <span class="feed-item__time">11m ago</span>
          </li>
          <li class="feed-item">
            <span class="feed-item__avatar">N</span>
            <div class="feed-item__body">
              <span class="feed-item__user">NeonFox</span>
              <span class="feed-item__text">posted a new strategy guide in the forum</span>
            </div>
            <span class="feed-item__time">34m ago</span>
          </li>
          <li class="feed-item">
            <span class="feed-item__avatar">V</span>
            <div class="feed-item__body">
              <span class="feed-item__user">VoidCipher</span>
              <span class="feed-item__text">challenged 3 players in a row</span>
            </div>
            <span class="feed-item__time">1h ago</span>
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
