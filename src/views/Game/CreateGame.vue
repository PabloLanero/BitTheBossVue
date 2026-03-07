<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import { usePartida } from '@/ApiCalls/usePartida'
import type { CreatePartidaDTO } from '@/models/DTO/CreatePartidaDTO'
import { getUserIdFromToken } from '@/utils/auth'
import { useConstants } from '@/stores/Constants'

const router = useRouter()
const { createPartida } = usePartida()
const { ApiUrl } = useConstants()

const gameName = ref('')
const opponentMode = ref<'ia' | 'player'>('ia')
const difficulty = ref<'Easy' | 'Normal' | 'Hard'>('Normal')
const rivalUserId = ref<number | null>(null)
const INITIAL_MONEY_PLAYER1 = 100
const INITIAL_MONEY_PLAYER2 = 100
const loading = ref(false)
const errorMsg = ref('')

const myUserId = ref<number | null>(null)

const canCreate = computed(() => {
  if (!gameName.value.trim() || myUserId.value === null) return false
  if (opponentMode.value === 'player' && rivalUserId.value === null) return false
  return true
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
    errorMsg.value = 'Please fill in all required fields.'
    return
  }

  loading.value = true

  try {
    const idPartida = buildIdPartida(gameName.value.trim())
    const secondUser = opponentMode.value === 'player' ? (rivalUserId.value as number) : (myUserId.value as number)
    const payload: CreatePartidaDTO = {
      idPartida,
      arrUsuario: [myUserId.value as number, secondUser],
      lstNodos: [],
    }

    await createPartida(payload)

    const opponentLabel =
      opponentMode.value === 'ia' ? `VS AI - ${difficulty.value}` : `VS Player #${secondUser}`

    const token = localStorage.getItem('token') ?? ''
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
    errorMsg.value = error instanceof Error ? error.message : 'Could not create the match'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Header />
  <section class="create-page">
    <div class="create-shell">
      <h1>New Match</h1>
      <p>Configure the parameters and launch a new match.</p>

      <form class="form" @submit.prevent="handleCreate">
        <label>
          Match Name
          <input v-model="gameName" type="text" placeholder="My match against AI" required />
        </label>

        <label>
          Opponent Mode
          <select v-model="opponentMode">
            <option value="ia">VS AI</option>
            <option value="player">VS Player</option>
          </select>
        </label>

        <label v-if="opponentMode === 'ia'">
          AI Difficulty
          <select v-model="difficulty">
            <option value="Easy">Easy</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
          </select>
        </label>

        <label v-else>
          Rival User ID
          <input v-model.number="rivalUserId" type="number" min="1" required />
        </label>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

        <div class="actions">
          <button type="button" class="secondary" @click="router.push('/history')">Back</button>
          <button type="submit" :disabled="loading || !canCreate">{{ loading ? 'Opening...' : 'Play New Match' }}</button>
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
