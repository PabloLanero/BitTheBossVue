<script setup lang="ts">
import { ref, watch } from 'vue'
import { useConstants } from '@/stores/Constants'

const props = defineProps<{
  visible: boolean
  userId: number | null
  currentName: string | null
  currentEmail: string | null
}>()

const emit = defineEmits<{
  close: []
  saved: [name: string, email: string]
}>()
const { ApiUrl } = useConstants()

const name     = ref('')
const email    = ref('')
const saving   = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

watch(() => props.visible, (val) => {
  if (val) {
    name.value     = props.currentName  ?? ''
    email.value    = props.currentEmail ?? ''
    errorMsg.value   = ''
    successMsg.value = ''
  }
})

async function handleSave() {
  if (!name.value.trim() || !email.value.trim()) {
    errorMsg.value = 'El nombre y el correo son obligatorios.'
    return
  }

  saving.value   = true
  errorMsg.value = ''

  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No hay sesión activa.')

    if (props.userId != null) {
      const res = await fetch(`${ApiUrl}/Usuario/${props.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: name.value.trim(),
          email: email.value.trim(),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Error al guardar' }))
        throw new Error(err.message ?? 'Error al guardar')
      }
    }

    localStorage.setItem('auth_name', name.value.trim())
    localStorage.setItem('auth_email', email.value.trim())
    successMsg.value = '¡Cambios guardados!'
    emit('saved', name.value.trim(), email.value.trim())

    setTimeout(() => emit('close'), 800)
  } catch (error) {
    errorMsg.value = error instanceof Error ? error.message : 'Error desconocido'
  } finally {
    saving.value = false
  }
}

function onOverlayClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click="onOverlayClick">
        <div class="modal" role="dialog" aria-modal="true">

          <div class="modal__header">
            <span class="modal__icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </span>
            <div class="modal__header-text">
              <h2 class="modal__title">Editar Perfil</h2>
            </div>
            <button class="modal__close" @click="emit('close')" aria-label="Cerrar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <p class="modal__subtitle">
            Actualiza tu información personal. Los cambios se guardarán en tu cuenta.
          </p>

          <form class="modal__form" @submit.prevent="handleSave" novalidate>

            <div class="modal-field">
              <label class="modal-field__label">
                <svg class="modal-field__icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
                Nombre de Usuario
              </label>
              <input
                v-model="name"
                type="text"
                class="modal-field__input"
                placeholder="Tu nombre de usuario"
                autocomplete="username"
                required
              />
            </div>

            <div class="modal-field">
              <label class="modal-field__label">
                <svg class="modal-field__icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Correo Electrónico
              </label>
              <input
                v-model="email"
                type="email"
                class="modal-field__input"
                placeholder="tu@email.com"
                autocomplete="email"
                required
              />
            </div>

            <div class="modal__note">
              <strong>Nota:</strong>
              Tu ID de usuario{{ userId ? ` (#${userId})` : '' }} y fecha de registro no pueden ser modificados.
            </div>

            <p v-if="errorMsg"   class="modal__feedback modal__feedback--error">{{ errorMsg }}</p>
            <p v-if="successMsg" class="modal__feedback modal__feedback--success">{{ successMsg }}</p>

            <div class="modal__actions">
              <button type="button" class="modal__btn modal__btn--cancel" @click="emit('close')">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                Cancelar
              </button>
              <button type="submit" class="modal__btn modal__btn--save" :disabled="saving">
                <span v-if="saving" class="btn-spinner" />
                <template v-else>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
                  Guardar Cambios
                </template>
              </button>
            </div>

          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(#000, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  padding: $space-md;
}

.modal {
  width: 100%;
  max-width: 480px;
  background: #0a1f4d;
  border: 1px solid rgba($color-cyan, 0.2);
  border-radius: $radius-lg;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    gap: $space-sm;
    padding: $space-lg $space-xl $space-sm;
  }

  &__icon {
    width: 42px;
    height: 42px;
    background: linear-gradient(145deg, #0b666a, #097a7e);
    border-radius: $radius-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: $color-white;

    svg { width: 22px; height: 22px; }
  }

  &__header-text { flex: 1; }

  &__title {
    font-size: $font-size-xl;
    font-weight: 700;
    color: $color-white;
  }

  &__close {
    background: none;
    border: none;
    cursor: pointer;
    color: rgba($color-white, 0.45);
    padding: $space-xs;
    display: flex;
    align-items: center;
    border-radius: $radius-sm;
    transition: color 0.2s, background 0.2s;

    svg { width: 20px; height: 20px; }

    &:hover {
      color: $color-white;
      background: rgba($color-white, 0.08);
    }
  }

  &__subtitle {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.55);
    padding: 0 $space-xl $space-lg;
    line-height: 1.5;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $space-md;
    padding: 0 $space-xl $space-xl;
  }

  &__note {
    background: rgba($color-cyan, 0.06);
    border: 1px solid rgba($color-cyan, 0.15);
    border-radius: $radius-sm;
    padding: $space-sm $space-md;
    font-size: $font-size-xs;
    color: rgba($color-white, 0.55);
    line-height: 1.5;

    strong { color: rgba($color-white, 0.75); }
  }

  &__feedback {
    font-size: $font-size-xs;
    text-align: center;
    padding: $space-xs $space-sm;
    border-radius: $radius-sm;

    &--error {
      color: #ff9b9b;
      background: rgba(255, 107, 107, 0.08);
      border: 1px solid rgba(255, 107, 107, 0.2);
    }

    &--success {
      color: #97feed;
      background: rgba(151, 254, 237, 0.08);
      border: 1px solid rgba(151, 254, 237, 0.2);
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-xs;
    transition: background 0.2s, border-color 0.2s, opacity 0.2s;
    min-height: 44px;

    svg { width: 16px; height: 16px; }

    &--cancel {
      background: transparent;
      border: 1.5px solid rgba($color-white, 0.2);
      color: $color-white;

      &:hover {
        border-color: rgba($color-white, 0.4);
        background: rgba($color-white, 0.04);
      }
    }

    &--save {
      background: linear-gradient(135deg, #97feed, #35a29f);
      border: none;
      color: #071952;
      font-weight: 700;

      &:hover:not(:disabled) { opacity: 0.9; }
      &:disabled { opacity: 0.55; cursor: not-allowed; }
    }
  }
}

.modal-field {
  display: flex;
  flex-direction: column;
  gap: $space-xs;

  &__label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: $font-size-sm;
    color: rgba($color-white, 0.8);
    font-weight: 500;
  }

  &__icon {
    width: 15px;
    height: 15px;
    color: rgba($color-white, 0.5);
    flex-shrink: 0;
  }

  &__input {
    width: 100%;
    background: rgba(#020812, 0.55);
    border: 1.5px solid rgba($color-cyan, 0.35);
    border-radius: $radius-sm;
    padding: 10px $space-md;
    color: $color-white;
    font-size: $font-size-sm;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &::placeholder { color: rgba($color-white, 0.25); }

    &:focus {
      border-color: $color-cyan;
      box-shadow: 0 0 0 3px rgba($color-cyan, 0.1);
    }
  }
}

.btn-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(#071952, 0.3);
  border-top-color: #071952;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

// ── Transition ────────────────────────────────────────────
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;

  .modal { transition: transform 0.2s ease, opacity 0.2s ease; }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal { transform: scale(0.96) translateY(8px); opacity: 0; }
}
</style>
