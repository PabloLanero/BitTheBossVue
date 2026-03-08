<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useLogin } from '@/stores/LoginStore'
import type { Login } from '@/models/DTO/LoginDTO'
import { SUPPORTED_LOCALES, type AppLocale, setAppLocale } from '@/i18n/i18n'

const { t, locale } = useI18n()
const router = useRouter()
const loginStore = useLogin()

const email       = ref('')
const password    = ref('')
const showPass    = ref(false)
const loading     = ref(false)
const errorMsg    = ref('')

const selectedLocale = computed<AppLocale>({
  get: () => {
    if (SUPPORTED_LOCALES.includes(locale.value as AppLocale)) {
      return locale.value as AppLocale
    }
    return 'en'
  },
  set: (nextLocale) => {
    if (!SUPPORTED_LOCALES.includes(nextLocale)) return
    setAppLocale(nextLocale)
  },
})

async function handleSubmit() {
  errorMsg.value = ''
  loading.value  = true
  try {
    const credentials: Login = { email: email.value, password: password.value }
    await loginStore.login(credentials)
    localStorage.setItem('auth_email', credentials.email)
    router.push('/history')
  } catch (error) {
    errorMsg.value = error instanceof Error ? error.message : t('loginPage.errors.invalidCredentials')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-lang">
        <button
          type="button"
          class="auth-lang__btn"
          :class="{ 'auth-lang__btn--active': selectedLocale === 'en' }"
          @click="selectedLocale = 'en'"
        >
          {{ t('header.langEn') }}
        </button>
        <button
          type="button"
          class="auth-lang__btn"
          :class="{ 'auth-lang__btn--active': selectedLocale === 'es' }"
          @click="selectedLocale = 'es'"
        >
          {{ t('header.langEs') }}
        </button>
      </div>

      <div class="auth-card__avatar">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
      </div>

      <h1 class="auth-card__title">{{ t('loginPage.title') }}</h1>
      <p class="auth-card__subtitle">{{ t('loginPage.subtitle') }}</p>

      <form class="auth-form" @submit.prevent="handleSubmit" novalidate>

        <div class="form-field">
          <label class="form-field__label">
            <svg class="form-field__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            {{ t('loginPage.emailLabel') }}
          </label>
          <input
            v-model="email"
            type="email"
            class="form-field__input"
            :placeholder="t('loginPage.emailPlaceholder')"
            autocomplete="email"
            required
          />
        </div>

        <div class="form-field">
          <label class="form-field__label">
            <svg class="form-field__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            {{ t('loginPage.passwordLabel') }}
          </label>
          <div class="form-field__input-wrap">
            <input
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              class="form-field__input"
              placeholder="********"
              autocomplete="current-password"
              required
            />
            <button type="button" class="form-field__eye" @click="showPass = !showPass">
              <svg v-if="!showPass" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="auth-forgot">
          <button type="button" class="forgot-link">{{ t('loginPage.forgotPassword') }}</button>
        </div>

        <p v-if="errorMsg" class="auth-error">{{ errorMsg }}</p>

        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="loading" class="btn-spinner" />
          <span v-else>{{ t('loginPage.submitBtn') }}</span>
        </button>

        <div class="auth-divider">
          <span class="divider-line" />
          <span class="divider-text">{{ t('loginPage.noAccount') }}</span>
          <span class="divider-line" />
        </div>

        <button type="button" class="btn-secondary" @click="router.push('/Register')">
          {{ t('loginPage.registerBtn') }}
        </button>

      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/auth-form";

.forgot-link {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.auth-lang {
  margin-left: auto;
  display: inline-flex;
  border: 1px solid rgba($color-cyan, 0.35);
  border-radius: $radius-full;
  overflow: hidden;

  &__btn {
    background: transparent;
    border: none;
    color: rgba($color-white, 0.75);
    font-size: $font-size-xs;
    font-weight: 700;
    padding: 5px 9px;
    cursor: pointer;

    &--active {
      background: rgba($color-cyan, 0.24);
      color: $color-white;
    }
  }
}
</style>

