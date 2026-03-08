<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Header from '@/components/Header/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t, tm } = useI18n()

type LegalSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

const sections = computed(() => tm('legalNotice.sections') as LegalSection[])
</script>

<template>
  <Header />
  <section class="legal-page">
    <div class="legal-shell">

      <button class="back-btn" @click="router.back()">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        {{ t('legalCommon.back') }}
      </button>

      <div class="legal-header">
        <p class="legal-header__label">{{ t('legalCommon.label') }}</p>
        <h1 class="legal-header__title">{{ t('legalNotice.title') }}</h1>
        <p class="legal-header__date">{{ t('legalCommon.lastUpdated') }}</p>
      </div>

      <div class="legal-body">
        <section v-for="section in sections" :key="section.title" class="legal-section">
          <h2>{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.bullets?.length">
            <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
        </section>
      </div>

      <div class="legal-footer">
        <RouterLink to="/privacy" class="legal-footer__link">{{ t('legalNotice.footerLink') }}</RouterLink>
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">
.legal-page {
  min-height: calc(100vh - 72px);
  background: $color-bg;
  padding: $space-xl $space-xl $space-3xl;
}

.legal-shell {
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: $space-xl;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: $space-xs;
  background: transparent;
  border: 1.5px solid rgba($color-cyan, 0.3);
  border-radius: $radius-full;
  color: rgba($color-white, 0.65);
  font-size: $font-size-sm;
  padding: $space-xs $space-md;
  cursor: pointer;
  width: fit-content;
  transition: color 0.2s, border-color 0.2s;

  svg { width: 16px; height: 16px; }

  &:hover {
    color: $color-white;
    border-color: $color-cyan;
  }
}

.legal-header {
  border-bottom: 1px solid rgba($color-cyan, 0.1);
  padding-bottom: $space-lg;

  &__label {
    font-size: $font-size-xs;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: $color-cyan;
    margin-bottom: $space-sm;
  }

  &__title {
    font-size: clamp(1.8rem, 4vw, $font-size-3xl);
    font-weight: 900;
    color: $color-white;
    margin-bottom: $space-xs;
  }

  &__date {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.35);
  }
}

.legal-body {
  display: flex;
  flex-direction: column;
  gap: $space-xl;
}

.legal-section {
  h2 {
    font-size: $font-size-base;
    font-weight: 700;
    color: $color-cyan;
    margin-bottom: $space-sm;
    padding-left: $space-sm;
    border-left: 3px solid $color-cyan;
  }

  p {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.65);
    line-height: 1.8;
    margin-bottom: $space-sm;

    strong { color: rgba($color-white, 0.85); }
    em { color: rgba($color-white, 0.5); }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: $space-sm 0 0;
    display: flex;
    flex-direction: column;
    gap: 6px;

    li {
      font-size: $font-size-sm;
      color: rgba($color-white, 0.65);
      padding-left: $space-md;
      position: relative;

      &::before {
        content: '—';
        position: absolute;
        left: 0;
        color: rgba($color-cyan, 0.5);
      }

      strong { color: rgba($color-white, 0.85); }
    }
  }
}

.legal-footer {
  border-top: 1px solid rgba($color-cyan, 0.1);
  padding-top: $space-lg;
  text-align: right;

  &__link {
    font-size: $font-size-sm;
    color: $color-cyan;
    text-decoration: none;
    font-weight: 600;
    transition: opacity 0.2s;

    &:hover { opacity: 0.75; }
  }
}
</style>


