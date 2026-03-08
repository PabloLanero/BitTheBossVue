<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import Button from '@/components/Form/Button.vue';

const { t } = useI18n();
const router = useRouter();
</script>

<template>
  <section class="hero">
    <div class="hero__bg-grid" aria-hidden="true" />

    <div class="hero__content">
      <h1 class="hero__title">{{ t('home.heroTitle') }}</h1>

      <div class="hero__card">
        <div class="hero__card-left">
          <p class="hero__subtitle">{{ t('home.heroSubtitle') }}</p>
          <div class="hero__actions">
            <Button :text="t('home.playDemo')" color="#1af0ff" variant="tonal"  rounded="xl" @click="router.push('/Login')" />
            <Button :text="t('home.learnMore')" color="#e8f8ff" variant="outlined" rounded="xl" />
          </div>
        </div>

        <div class="hero__card-image" aria-hidden="true">
          <div class="hero__space-scene">
            <div class="hero__planet" />
            <div class="hero__ship">
              <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60 5L115 50H5L60 5Z" fill="#1af0ff" fill-opacity="0.08" stroke="#1af0ff" stroke-width="0.8"/>
                <path d="M60 15L100 48H20L60 15Z" fill="#1af0ff" fill-opacity="0.12" stroke="#1af0ff" stroke-width="0.5"/>
                <ellipse cx="60" cy="46" rx="40" ry="5" fill="#1af0ff" fill-opacity="0.06"/>
                <circle cx="60" cy="30" r="4" fill="#1af0ff" fill-opacity="0.9"/>
                <path d="M30 48L5 55L20 48Z" fill="#ff6a00" fill-opacity="0.6"/>
                <path d="M90 48L115 55L100 48Z" fill="#ff6a00" fill-opacity="0.6"/>
              </svg>
            </div>
            <div class="hero__stars">
              <span v-for="i in 40" :key="i" class="star" :style="{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                animationDelay: `${Math.random() * 3}s`,
              }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

.hero {
  position: relative;
  padding: $space-2xl $space-xl;
  overflow: hidden;

  &__bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba($color-cyan, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba($color-cyan, 0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  &__content {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  &__title {
    font-size: clamp(2.2rem, 6vw, $font-size-4xl);
    font-weight: 900;
    color: $color-white;
    letter-spacing: -0.02em;
    margin-bottom: $space-xl;
    text-shadow: $glow-cyan;
  }

  &__card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-xl;
    background: rgba($color-bg-card, 0.5);
    border: 1px solid rgba($color-cyan, 0.18);
    border-radius: $radius-lg;
    overflow: hidden;
    min-height: 260px;

    @media (max-width: #{$bp-md}) {
      grid-template-columns: 1fr;
    }
  }

  &__card-left {
    padding: $space-xl;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $space-lg;
  }

  &__subtitle {
    font-size: $font-size-base;
    color: $color-muted;
    line-height: 1.6;
  }

  &__actions {
    display: flex;
    gap: $space-md;
    flex-wrap: wrap;
  }

  &__card-image {
    position: relative;
    min-height: 220px;
    overflow: hidden;
  }

  &__space-scene {
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at 70% 50%, rgba($color-bg-card, 0.8) 0%, $color-bg 70%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  &__planet {
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #1a3560, #040d20);
    box-shadow: inset -20px -10px 40px rgba(0,0,0,0.7), 0 0 60px rgba($color-cyan, 0.08);
    opacity: 0.7;
  }

  &__ship {
    position: relative;
    z-index: 2;
    width: 200px;
    animation: shipFloat 4s ease-in-out infinite;

    svg {
      width: 100%;
      height: auto;
      filter: drop-shadow(0 0 12px rgba($color-cyan, 0.5));
    }
  }

  &__stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
}

.star {
  position: absolute;
  border-radius: 50%;
  background: $color-white;
  animation: twinkle 3s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50%       { opacity: 0.9; }
}

@keyframes shipFloat {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50%       { transform: translateY(-12px) rotate(2deg); }
}
</style>
