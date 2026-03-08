<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import { usePartida } from '@/ApiCalls/usePartida'
import type { CreatePartidaDTO } from '@/models/DTO/CreatePartidaDTO'

const router = useRouter()
const { t } = useI18n()
const { createPartida } = usePartida()

const idPartida = ref(`match-${Date.now()}`)
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const canSubmit = computed(() => {
  return !!idPartida.value.trim()
})

async function handleCreatePartida(): Promise<void> {
  errorMsg.value = ''
  successMsg.value = ''

  if (!canSubmit.value) {
    errorMsg.value = t('createPartida.errors.required')
    return
  }

  loading.value = true

  try {
    const payload: CreatePartidaDTO = {
      idPartida: idPartida.value.trim(),
    }

    const created = await createPartida(payload)
    successMsg.value = t('createPartida.success', { id: created.idPartida })
  } catch (error) {
    errorMsg.value = error instanceof Error ? error.message : t('createPartida.errors.create')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Header />
  <section class="create-page">
    <div class="create-shell">
      <h1>{{ t('createPartida.title') }}</h1>
      <p class="subtitle">{{ t('createPartida.subtitle') }}</p>

      <form class="create-form" @submit.prevent="handleCreatePartida">
        <label>
          {{ t('createPartida.labels.matchId') }}
          <input v-model="idPartida" type="text" required />
        </label>

        <div class="actions">
          <button type="submit" :disabled="loading || !canSubmit">
            {{ loading ? t('createPartida.actions.creating') : t('createPartida.actions.create') }}
          </button>
          <button type="button" class="secondary" @click="router.push('/game')">{{ t('createPartida.actions.goToGame') }}</button>
        </div>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <p v-if="successMsg" class="success">{{ successMsg }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.create-page {
  min-height: calc(100vh - 72px);
  padding: $space-xl;
  background: $color-bg;
}

.create-shell {
  max-width: 720px;
  margin: 0 auto;
  background: $color-bg-card;
  border: 1px solid rgba($color-cyan, 0.18);
  border-radius: $radius-lg;
  padding: $space-xl;
}

h1 {
  color: $color-cyan;
  margin-bottom: $space-xs;
}

.subtitle {
  color: rgba($color-white, 0.65);
  margin-bottom: $space-lg;
}

.create-form {
  display: grid;
  gap: $space-md;

  label {
    display: grid;
    gap: $space-xs;
    color: rgba($color-white, 0.8);
    font-size: $font-size-sm;
  }

  input {
    background: rgba(#020812, 0.55);
    border: 1.5px solid rgba($color-cyan, 0.35);
    border-radius: $radius-sm;
    padding: 10px $space-md;
    color: $color-white;
    outline: none;
  }
}

.actions {
  display: flex;
  gap: $space-sm;
}

button {
  border: 1.5px solid rgba($color-cyan, 0.5);
  background: rgba($color-cyan, 0.12);
  color: $color-white;
  border-radius: $radius-sm;
  padding: 10px $space-md;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.secondary {
  border-color: rgba($color-white, 0.3);
  background: transparent;
}

.error {
  color: #ff9b9b;
}

.success {
  color: #97feed;
}
</style>
