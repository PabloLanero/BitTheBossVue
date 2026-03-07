<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Header from '@/components/Header/Header.vue'

const { t } = useI18n()

const factionConfig = [
  { id: 'circuit', icon: 'CB', color: '#97feed' },
  { id: 'iron', icon: 'IB', color: '#b0c4ff' },
  { id: 'ember', icon: 'ES', color: '#ffb347' },
] as const

const factions = computed(() =>
  factionConfig.map((faction) => ({
    id: faction.id,
    icon: faction.icon,
    color: faction.color,
    name: t(`factions.items.${faction.id}.name`),
    tag: t(`factions.items.${faction.id}.tag`),
    origin: t(`factions.items.${faction.id}.origin`),
    lore: t(`factions.items.${faction.id}.lore`),
    traits: [
      t(`factions.items.${faction.id}.traits.0`),
      t(`factions.items.${faction.id}.traits.1`),
      t(`factions.items.${faction.id}.traits.2`),
    ],
    weakness: t(`factions.items.${faction.id}.weakness`),
    motto: t(`factions.items.${faction.id}.motto`),
  })),
)
</script>

<template>
  <Header />
  <section class="factions-page">
    <div class="factions-shell">
      <div class="factions-hero">
        <p class="factions-hero__label">{{ t('factions.hero.label') }}</p>
        <h1 class="factions-hero__title">{{ t('factions.hero.title') }}</h1>
        <p class="factions-hero__subtitle">
          {{ t('factions.hero.subtitle') }}
        </p>
      </div>

      <div class="factions-grid">
        <div
          v-for="faction in factions"
          :key="faction.id"
          class="faction-card"
          :style="{ '--faction-color': faction.color }"
        >
          <div class="faction-card__header">
            <span class="faction-card__icon">{{ faction.icon }}</span>
            <div>
              <h2 class="faction-card__name">{{ faction.name }}</h2>
              <span class="faction-card__tag">{{ faction.tag }}</span>
            </div>
          </div>

          <p class="faction-card__origin">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {{ faction.origin }}
          </p>

          <div class="faction-card__divider" />

          <p class="faction-card__lore">{{ faction.lore }}</p>

          <div class="faction-card__divider" />

          <div class="faction-card__traits">
            <p class="faction-card__traits-title">{{ t('factions.strengthsTitle') }}</p>
            <ul>
              <li v-for="trait in faction.traits" :key="trait">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                {{ trait }}
              </li>
            </ul>
            <p class="faction-card__weakness">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
              </svg>
              {{ faction.weakness }}
            </p>
          </div>

          <p class="faction-card__motto">{{ faction.motto }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.factions-page {
  min-height: calc(100vh - 72px);
  background: $color-bg;
  padding: $space-xl $space-xl $space-3xl;
}

.factions-shell {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: $space-2xl;
}

.factions-hero {
  text-align: center;
  max-width: 720px;
  margin: 0 auto;

  &__label {
    font-size: $font-size-xs;
    letter-spacing: 0.2em;
    color: rgba($color-white, 0.35);
    text-transform: uppercase;
    margin-bottom: $space-sm;
  }

  &__title {
    font-size: clamp(2.2rem, 5vw, $font-size-3xl);
    font-weight: 900;
    color: $color-cyan;
    text-shadow: $glow-cyan;
    margin-bottom: $space-md;
  }

  &__subtitle {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.5);
    line-height: 1.7;
  }
}

.factions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $space-xl;
  align-items: start;
}

.faction-card {
  --faction-color: #{$color-cyan};

  position: relative;
  background: $color-bg-card;
  border: 1px solid color-mix(in srgb, var(--faction-color) 20%, transparent);
  border-radius: $radius-lg;
  padding: $space-xl;
  display: flex;
  flex-direction: column;
  gap: $space-md;
  transition: box-shadow 0.3s, border-color 0.3s, transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: $space-md;
  }

  &__icon {
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--faction-color);
    border: 1px solid color-mix(in srgb, var(--faction-color) 60%, transparent);
    border-radius: $radius-sm;
    padding: 5px 8px;
    line-height: 1;
    flex-shrink: 0;
  }

  &__name {
    font-size: $font-size-lg;
    font-weight: 800;
    color: $color-white;
    margin-bottom: 2px;
  }

  &__tag {
    font-size: $font-size-xs;
    color: var(--faction-color);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__origin {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: $font-size-xs;
    color: rgba($color-white, 0.4);
    font-style: italic;
    line-height: 1.5;

    svg {
      width: 13px;
      height: 13px;
      flex-shrink: 0;
      margin-top: 1px;
      opacity: 0.5;
    }
  }

  &__divider {
    height: 1px;
    background: rgba($color-white, 0.06);
  }

  &__lore {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.62);
    line-height: 1.75;
    text-align: left;
  }

  &__traits {
    &-title {
      font-size: $font-size-xs;
      font-weight: 700;
      color: rgba($color-white, 0.45);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: $space-xs;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0 0 $space-sm;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    li {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: $font-size-sm;
      color: rgba($color-white, 0.75);

      svg {
        width: 14px;
        height: 14px;
        color: var(--faction-color);
        flex-shrink: 0;
      }
    }
  }

  &__weakness {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: $font-size-xs;
    color: rgba(255, 180, 180, 0.65);
    margin-top: 2px;

    svg {
      width: 13px;
      height: 13px;
      flex-shrink: 0;
    }
  }

  &__motto {
    font-size: $font-size-sm;
    font-style: italic;
    font-weight: 600;
    color: var(--faction-color);
    text-align: center;
    opacity: 0.85;
    padding: $space-xs $space-sm;
    border-left: 2px solid var(--faction-color);
    background: color-mix(in srgb, var(--faction-color) 6%, transparent);
    border-radius: 0 $radius-sm $radius-sm 0;
  }
}
</style>

