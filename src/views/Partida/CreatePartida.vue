<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import { usePartida } from '@/ApiCalls/usePartida'
import type { CreatePartidaDTO } from '@/models/DTO/CreatePartidaDTO'

const router = useRouter()
const { createPartida } = usePartida()

  const idPartida = ref(`match-${Date.now()}`)
const ownerUserId = ref<number | null>(null)
const rivalUserId = ref<number | null>(null)
const nodosRaw = ref('')
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

function parseJwt(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

function parseUserIdFromToken(): number | null {
  const token = localStorage.getItem('token')
  if (!token) return null

  const claims = parseJwt(token)
  if (!claims) return null

  const rawId =
    claims.nameid ??
    claims.sub ??
    claims.userId ??
    claims.userid ??
    claims.id ??
    claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']

  const parsed = Number(rawId)
  return Number.isNaN(parsed) ? null : parsed
}

const canSubmit = computed(() => {
  return !!idPartida.value.trim() && ownerUserId.value !== null
})

onMounted(() => {
  const userId = parseUserIdFromToken()
  ownerUserId.value = userId
  rivalUserId.value = userId
})

async function handleCreatePartida(): Promise<void> {
  errorMsg.value = ''
  successMsg.value = ''

  if (!canSubmit.value) {
    errorMsg.value = 'Please fill in all required fields to create the match.'
    return
  }

  loading.value = true

  try {
    const arrUsuario = [ownerUserId.value as number, (rivalUserId.value ?? ownerUserId.value) as number]
    const nodos = nodosRaw.value
      .split(',')
      .map((item) => Number(item.trim()))
      .filter((n) => !Number.isNaN(n))

    const payload: CreatePartidaDTO = {
      idPartida: idPartida.value.trim(),
      arrUsuario,
      lstNodos: nodos,
    }

    const created = await createPartida(payload)
    successMsg.value = `Match created successfully: ${created.idPartida}`
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
      <h1>Create Match</h1>
      <p class="subtitle">This screen creates the match in the backend and prepares the session for Unity.</p>

      <form class="create-form" @submit.prevent="handleCreatePartida">
        <label>
          Match ID
          <input v-model="idPartida" type="text" required />
        </label>

        <label>
          Your user (from token)
          <input :value="ownerUserId ?? ''" type="number" readonly />
        </label>

        <label>
          Rival user (optional)
          <input v-model.number="rivalUserId" type="number" />
        </label>

        <label>
          Node IDs (optional, comma-separated)
          <input v-model="nodosRaw" type="text" placeholder="1,2,3" />
        </label>

        <div class="actions">
          <button type="submit" :disabled="loading || !canSubmit">
            {{ loading ? 'Creating...' : 'Create Match' }}
          </button>
          <button type="button" class="secondary" @click="router.push('/game')">Go to Game</button>
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
