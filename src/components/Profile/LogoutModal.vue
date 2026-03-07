<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const { t } = useI18n()

function onOverlayClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
    emit('cancel')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div class="modal-overlay" @click="onOverlayClick">
        <div class="modal" role="alertdialog" aria-modal="true">

          <div class="modal__header">
            <span class="modal__icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </span>
            <h2 class="modal__title">{{ t('logoutModal.title') }}</h2>
          </div>

          <p class="modal__body">
            {{ t('logoutModal.body') }}
          </p>

          <div class="modal__actions">
            <button class="modal__btn modal__btn--cancel" @click="emit('cancel')">
              {{ t('logoutModal.cancel') }}
            </button>
            <button class="modal__btn modal__btn--confirm" @click="emit('confirm')">
              {{ t('logoutModal.confirm') }}
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(#000, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 600;
  padding: $space-md;
}

.modal {
  width: 100%;
  max-width: 420px;
  background: #071952;
  border: 1px solid rgba($color-cyan, 0.15);
  border-radius: $radius-lg;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  padding: $space-xl;
  display: flex;
  flex-direction: column;
  gap: $space-md;

  &__header {
    display: flex;
    align-items: center;
    gap: $space-md;
  }

  &__icon {
    width: 44px;
    height: 44px;
    background: rgba(#1e1e2e, 0.8);
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: $color-orange;

    svg { width: 22px; height: 22px; }
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: 700;
    color: $color-white;
  }

  &__body {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.65);
    line-height: 1.55;
  }

  &__actions {
    display: flex;
    gap: $space-md;
    margin-top: $space-xs;
  }

  &__btn {
    flex: 1;
    padding: 11px $space-md;
    border-radius: $radius-sm;
    font-size: $font-size-sm;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, opacity 0.2s;

    &--cancel {
      background: transparent;
      border: 1.5px solid rgba($color-white, 0.2);
      color: $color-white;

      &:hover {
        border-color: rgba($color-white, 0.45);
        background: rgba($color-white, 0.05);
      }
    }

    &--confirm {
      background: $color-orange;
      border: none;
      color: $color-white;
      font-weight: 700;

      &:hover { opacity: 0.88; }
    }
  }
}

// ── Transition ────────────────────────────────────────────
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
  .modal { transition: transform 0.2s ease, opacity 0.2s ease; }
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  .modal { transform: scale(0.96) translateY(6px); opacity: 0; }
}
</style>
