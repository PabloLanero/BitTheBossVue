<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useRegister } from '@/stores/Credentials'
import type { Register } from '@/models/DTO/RegisterDTO'
import { SUPPORTED_LOCALES, type AppLocale, setAppLocale } from '@/i18n/i18n'

const { t, locale } = useI18n()
const router = useRouter()
const registerStore = useRegister()

const userName    = ref('')
const email       = ref('')
const password    = ref('')
const showPass    = ref(false)
const acceptTerms = ref(false)
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
  if (!acceptTerms.value) {
    errorMsg.value = t('registerPage.errors.termsRequired')
    return
  }
  errorMsg.value = ''
  loading.value  = true
  try {
    const data: Register = { userName: userName.value, email: email.value, password: password.value }
    await registerStore.register(data)
    localStorage.setItem('auth_name', data.userName)
    localStorage.setItem('auth_email', data.email)
    router.push('/history')
  } catch (error) {
    errorMsg.value = error instanceof Error ? error.message : t('registerPage.errors.createError')
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
          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>

      <h1 class="auth-card__title">{{ t('registerPage.title') }}</h1>
      <p class="auth-card__subtitle">{{ t('registerPage.subtitle') }}</p>

      <form class="auth-form" @submit.prevent="handleSubmit" novalidate>

        <div class="form-field">
          <label class="form-field__label">
            <svg class="form-field__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
            {{ t('registerPage.userLabel') }}
          </label>
          <input
            v-model="userName"
            type="text"
            class="form-field__input"
            :placeholder="t('registerPage.userPlaceholder')"
            minlength="3"
            autocomplete="username"
            required
          />
          <span class="form-field__hint">{{ t('registerPage.userHint') }}</span>
        </div>

        <div class="form-field">
          <label class="form-field__label">
            <svg class="form-field__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            {{ t('registerPage.emailLabel') }}
          </label>
          <input
            v-model="email"
            type="email"
            class="form-field__input"
            :placeholder="t('registerPage.emailPlaceholder')"
            autocomplete="email"
            required
          />
        </div>

        <div class="form-field">
          <label class="form-field__label">
            <svg class="form-field__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            {{ t('registerPage.passwordLabel') }}
          </label>
          <div class="form-field__input-wrap">
            <input
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              class="form-field__input"
              placeholder="********"
              minlength="6"
              autocomplete="new-password"
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
          <span class="form-field__hint">{{ t('registerPage.passwordHint') }}</span>
        </div>

        <label class="terms-check">
          <input v-model="acceptTerms" type="checkbox" class="terms-check__input" />
          <span class="terms-check__box" :class="{ 'terms-check__box--checked': acceptTerms }">
            <svg v-if="acceptTerms" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </span>
          <span class="terms-check__text">
            {{ t('registerPage.termsPrefix') }}
            <a href="#" class="terms-link">{{ t('registerPage.terms') }}</a>
            {{ t('registerPage.termsMid') }}
            <a href="#" class="terms-link">{{ t('registerPage.privacy') }}</a>
          </span>
        </label>

        <p v-if="errorMsg" class="auth-error">{{ errorMsg }}</p>

        <button type="submit" class="btn-primary" :disabled="loading || !acceptTerms">
          <span v-if="loading" class="btn-spinner" />
          <template v-else>
            <svg viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px">
              <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            {{ t('registerPage.submitBtn') }}
          </template>
        </button>

        <div class="auth-divider">
          <span class="divider-line" />
          <span class="divider-text">{{ t('registerPage.hasAccount') }}</span>
          <span class="divider-line" />
        </div>

        <button type="button" class="btn-secondary" @click="router.push('/Login')">
          {{ t('registerPage.loginBtn') }}
        </button>

      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/auth-form";

.terms-check {
  display: flex;
  align-items: flex-start;
  gap: $space-sm;
  cursor: pointer;

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  &__box {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    border: 1.5px solid rgba($color-white, 0.3);
    border-radius: 4px;
    background: rgba(#020812, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
    transition: border-color 0.2s, background 0.2s;

    svg { width: 12px; height: 12px; color: #071952; }

    &--checked {
      background: $color-cyan;
      border-color: $color-cyan;
    }
  }

  &__text {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.65);
    line-height: 1.5;
  }
}

.terms-link {
  color: $color-white;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: $color-cyan; }
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

