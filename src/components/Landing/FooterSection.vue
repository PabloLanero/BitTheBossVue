<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import Logo from '@/components/Logo/Logo.vue';

const { t } = useI18n();
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__left">
        <Logo :width="90" :height="36" />
      </div>

      <nav class="site-footer__links">
        <RouterLink to="/privacy" class="footer-link">{{ t('footer.privacy') }}</RouterLink>
        <RouterLink to="/legal" class="footer-link">{{ t('footer.legalNotice') }}</RouterLink>
        <RouterLink to="/community" class="footer-link">{{ t('footer.community') }}</RouterLink>
      </nav>

      <div class="site-footer__right">
        <a href="#" class="footer-link">{{ t('footer.faq') }}</a>
        <button class="footer-icon-btn" :aria-label="t('footer.closeAria')">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
        <button class="footer-icon-btn" :aria-label="t('footer.refreshAria')">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
        </button>
        <button class="footer-icon-btn" :aria-label="t('footer.settingsAria')">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.49 3a9 9 0 1 0 9.02 9A9 9 0 0 0 11.49 3zM12 20a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm3.5-8.5l-4-2.5v5z"/></svg>
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">

.site-footer {
  border-top: 1px solid rgba($color-cyan, 0.12);
  padding: $space-lg $space-xl;
  margin-top: $space-2xl;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: $space-lg;
  }

  &__links {
    display: flex;
    gap: $space-xl;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: $space-md;
  }
}

.footer-link {
  color: $color-muted;
  font-size: $font-size-sm;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: $color-cyan;
  }
}

.footer-icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: $space-xs;
  color: $color-muted;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: $color-cyan;
  }
}
</style>
