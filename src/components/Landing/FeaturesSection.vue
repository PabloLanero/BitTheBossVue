<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Feature {
  icon: string
  title: string
  desc: string
}

const features = computed<Feature[]>(() => [
  { icon: 'person', title: t('home.feature1Title'), desc: t('home.feature1Desc') },
  { icon: 'play', title: t('home.feature2Title'), desc: t('home.feature2Desc') },
  { icon: 'play', title: t('home.feature3Title'), desc: t('home.feature3Desc') },
])

const activeIndex = ref(1)
</script>

<template>
  <section class="features">
    <div class="features__inner">
      <div class="features__header">
        <h2 class="features__title">{{ t('home.featuresTitle') }}</h2>
        <div class="features__divider" />
      </div>

      <div class="features__grid">
        <article
          v-for="(feat, i) in features"
          :key="i"
          class="feature-card"
          :class="{ 'feature-card--active': i === activeIndex }"
          @click="activeIndex = i"
        >
          <div class="feature-card__icon">
            <svg v-if="feat.icon === 'play'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>

          <h3 class="feature-card__title">{{ feat.title }}</h3>
          <p class="feature-card__desc">{{ feat.desc }}</p>

          <div class="feature-card__dots">
            <span
              v-for="(_, di) in features"
              :key="di"
              class="dot"
              :class="{ 'dot--active': di === i }"
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

.features {
  padding: $space-2xl $space-xl;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__header {
    margin-bottom: $space-xl;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: 600;
    color: $color-white;
    margin-bottom: $space-sm;
    letter-spacing: 0.04em;
  }

  &__divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba($color-cyan, 0.5), transparent);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-lg;

    @media (max-width: #{$bp-md}) {
      grid-template-columns: 1fr;
    }
  }
}

.feature-card {
  background: rgba($color-bg-card, 0.4);
  border: 1px solid rgba($color-cyan, 0.1);
  border-radius: $radius-lg;
  padding: $space-xl $space-lg;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $space-md;
  cursor: pointer;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;

  &:hover,
  &--active {
    border-color: rgba($color-cyan, 0.35);
    background: rgba($color-bg-card, 0.65);
    box-shadow: 0 0 24px rgba($color-cyan, 0.08);
  }

  &__icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba($color-cyan, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-cyan;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  &__title {
    font-size: $font-size-base;
    font-weight: 600;
    color: $color-white;
  }

  &__desc {
    font-size: $font-size-sm;
    color: $color-muted;
    line-height: 1.55;
  }

  &__dots {
    display: flex;
    gap: 6px;
    margin-top: auto;
    padding-top: $space-sm;
  }
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba($color-cyan, 0.25);
  transition: background 0.2s;

  &--active {
    background: $color-cyan;
    box-shadow: 0 0 6px $color-cyan;
  }
}
</style>
