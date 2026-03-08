<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import { usePartida } from '@/ApiCalls/usePartida'
import type { CreatePartidaDTO } from '@/models/DTO/CreatePartidaDTO'
import { getUserIdFromToken } from '@/utils/auth'
import { useConstants } from '@/stores/Constants'
import { readStoredSessionToken, updateSessionToken } from '@/services/unityBridge'

const router = useRouter()
const { t } = useI18n()
const { createPartida } = usePartida()
const { ApiUrl } = useConstants()

const gameName = ref('')
const difficulty = ref<'Easy' | 'Normal' | 'Hard'>('Normal')
const INITIAL_MONEY_PLAYER1 = 100
const INITIAL_MONEY_PLAYER2 = 100
const loading = ref(false)
const errorMsg = ref('')

const myUserId = ref<number | null>(null)

const canCreate = computed(() => {
  return !!gameName.value.trim() && myUserId.value !== null
})

onMounted(() => {
  myUserId.value = getUserIdFromToken(localStorage.getItem('token'))
})

function buildIdPartida(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${slug || 'match'}-${Date.now()}`
}

async function handleCreate(): Promise<void> {
  errorMsg.value = ''
  if (!canCreate.value) {
    errorMsg.value = t('createGame.errors.required')
    return
  }

  loading.value = true

  try {
    const idPartida = buildIdPartida(gameName.value.trim())
    const payload: CreatePartidaDTO = {
      idPartida,
    }

    await createPartida(payload)

    const difficultyLabel = t(`createGame.difficulty.${difficulty.value.toLowerCase()}`)
    const opponentLabel = t('createGame.opponentLabel.ai', { difficulty: difficultyLabel })

    const token = readStoredSessionToken()
    if (!token) {
      throw new Error(t('createGame.errors.session'))
    }

    updateSessionToken(token)
    router.push({
      path: '/game',
      query: {
        partidaId: idPartida,
        gameName: gameName.value.trim(),
        opponentLabel,
        token,
        apiBaseUrl: ApiUrl,
        moneyPlayer1: String(INITIAL_MONEY_PLAYER1),
        moneyPlayer2: String(INITIAL_MONEY_PLAYER2),
      },
    })
  } catch (error) {
    errorMsg.value = error instanceof Error ? error.message : t('createGame.errors.create')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Header />
  <section class="create-page">
    <div class="create-shell">
      <h1>{{ t('createGame.title') }}</h1>
      <p>{{ t('createGame.subtitle') }}</p>

      <form class="form" @submit.prevent="handleCreate">
        <label>
          {{ t('createGame.matchName') }}
          <input v-model="gameName" type="text" :placeholder="t('createGame.matchNamePlaceholder')" required />
        </label>

        <label>
          {{ t('createGame.aiDifficulty') }}
          <select v-model="difficulty">
            <option value="Easy">{{ t('createGame.difficulty.easy') }}</option>
            <option value="Normal">{{ t('createGame.difficulty.normal') }}</option>
            <option value="Hard">{{ t('createGame.difficulty.hard') }}</option>
          </select>
        </label>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

        <div class="actions">
          <button type="button" class="secondary" @click="router.push('/history')">
            {{ t('createGame.actions.back') }}
          </button>
          <button type="submit" :disabled="loading || !canCreate">
            {{ loading ? t('createGame.actions.opening') : t('createGame.actions.play') }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.create-page {
  min-height: calc(100vh - 72px);
  background: $color-bg;
  padding: $space-xl;
}

.create-shell {
  max-width: 720px;
  margin: 0 auto;
  background: $color-bg-card;
  border: 1px solid rgba($color-cyan, 0.2);
  border-radius: $radius-lg;
  padding: $space-xl;
}

h1 {
  color: $color-cyan;
  margin-bottom: $space-xs;
}

p {
  color: rgba($color-white, 0.72);
  margin-bottom: $space-lg;
}

.form {
  display: grid;
  gap: $space-md;
}

label {
  display: grid;
  gap: $space-xs;
  color: rgba($color-white, 0.8);
}

input,
select {
  background: rgba(#020812, 0.55);
  border: 1.5px solid rgba($color-cyan, 0.35);
  border-radius: $radius-sm;
  padding: 10px $space-md;
  color: $color-white;
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
  border-color: rgba($color-white, 0.35);
  background: transparent;
}

.error {
  color: #ff9b9b;
  margin-bottom: 0;
}
</style>
