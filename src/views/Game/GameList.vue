<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import type { MatchHistoryItem, MatchResultStatus } from '@/models/GameHistory'
import { getHistoryEntries } from '@/utils/gameHistory'

type StatusFilter = 'All' | MatchResultStatus

const router = useRouter()
const loading = ref(true)
const searchText = ref('')
const selectedStatus = ref<StatusFilter>('All')
const rows = ref<MatchHistoryItem[]>([])

const statusFilters: StatusFilter[] = ['All', 'Win', 'Loss', 'Cancelled']

const statusCounts = computed(() => ({
  Win: rows.value.filter((item) => item.status === 'Win').length,
  Loss: rows.value.filter((item) => item.status === 'Loss').length,
  Cancelled: rows.value.filter((item) => item.status === 'Cancelled').length,
}))

const filteredRows = computed(() => {
  const query = searchText.value.trim().toLowerCase()
  return rows.value.filter((row) => {
    if (selectedStatus.value !== 'All' && row.status !== selectedStatus.value) return false
    if (!query) return true

    return (
      row.partidaNombre.toLowerCase().includes(query) ||
      row.partidaId.toLowerCase().includes(query) ||
      row.opponentLabel.toLowerCase().includes(query)
    )
  })
})

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'No date'
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function statusClass(status: MatchResultStatus): string {
  return `status-${status.toLowerCase()}`
}

onMounted(() => {
  rows.value = getHistoryEntries()
  loading.value = false
})
</script>

<template>
  <Header />
  <section class="game-page">
    <div class="game-shell">
      <div class="game-head">
        <h1>Match History</h1>
        <button class="new-btn" @click="router.push('/history/new')">Play New Match</button>
      </div>

      <div class="status-resume">
        <p>Win: {{ statusCounts.Win }}</p>
        <p>Loss: {{ statusCounts.Loss }}</p>
        <p>Cancelled: {{ statusCounts.Cancelled }}</p>
      </div>

      <div class="search-wrap">
        <input v-model="searchText" type="text" placeholder="Search by name, ID or opponent" />
      </div>

      <div class="filters">
        <button
          v-for="filter in statusFilters"
          :key="filter"
          :class="['filter-btn', { active: selectedStatus === filter }]"
          @click="selectedStatus = filter"
        >
          {{ filter }}
        </button>
      </div>

      <div v-if="loading" class="empty">Loading history...</div>
      <div v-else-if="filteredRows.length === 0" class="empty">No matches in history.</div>

      <div v-else class="list">
        <article v-for="row in filteredRows" :key="row.id" class="row">
          <div class="row__main">
            <h2>{{ row.partidaNombre }}</h2>
            <p>ID: {{ row.partidaId }}</p>
            <p>{{ row.opponentLabel }}</p>
            <p>Finished: {{ formatDate(row.finishedAt) }}</p>
          </div>
          <span class="status-pill" :class="statusClass(row.status)">{{ row.status }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.game-page {
  min-height: calc(100vh - 72px);
  background: $color-bg;
  padding: $space-xl;
}

.game-shell {
  max-width: 980px;
  margin: 0 auto;
  background: $color-bg-card;
  border: 1px solid rgba($color-cyan, 0.2);
  border-radius: $radius-lg;
  padding: $space-xl;
}

.game-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: $space-md;
  margin-bottom: $space-sm;

  h1 {
    color: $color-cyan;
  }
}

.new-btn {
  border: 1.5px solid rgba($color-cyan, 0.5);
  background: rgba($color-cyan, 0.12);
  color: $color-white;
  border-radius: $radius-sm;
  padding: 10px $space-md;
  cursor: pointer;
}

.status-resume {
  display: flex;
  gap: $space-md;
  margin-bottom: $space-md;

  p {
    color: rgba($color-white, 0.72);
    font-size: $font-size-sm;
  }
}

.search-wrap {
  margin-bottom: $space-sm;

  input {
    width: 100%;
    background: rgba(#020812, 0.55);
    border: 1.5px solid rgba($color-cyan, 0.35);
    border-radius: $radius-sm;
    padding: 10px $space-md;
    color: $color-white;
    outline: none;
  }
}

.filters {
  display: flex;
  gap: $space-xs;
  margin-bottom: $space-md;
  flex-wrap: wrap;
}

.filter-btn {
  border: 1px solid rgba($color-white, 0.2);
  background: transparent;
  color: rgba($color-white, 0.8);
  border-radius: $radius-sm;
  padding: 6px 10px;
  cursor: pointer;
}

.filter-btn.active {
  border-color: rgba($color-cyan, 0.6);
  background: rgba($color-cyan, 0.16);
  color: $color-white;
}

.list {
  display: grid;
  gap: $space-sm;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: $space-md;
  align-items: center;
  border: 1px solid rgba($color-cyan, 0.15);
  border-radius: $radius-sm;
  padding: $space-md;

  &__main h2 {
    color: $color-white;
    margin-bottom: 4px;
  }

  &__main p {
    color: rgba($color-white, 0.7);
    font-size: $font-size-sm;
  }
}

.status-pill {
  border-radius: $radius-full;
  padding: 6px 12px;
  font-size: $font-size-xs;
  font-weight: 700;
  white-space: nowrap;
}

.status-win {
  color: #97feed;
  border: 1px solid rgba(151, 254, 237, 0.5);
  background: rgba(151, 254, 237, 0.12);
}

.status-loss {
  color: #ffb4b4;
  border: 1px solid rgba(255, 180, 180, 0.5);
  background: rgba(255, 180, 180, 0.12);
}

.status-cancelled {
  color: #ffe4b5;
  border: 1px solid rgba(255, 228, 181, 0.45);
  background: rgba(255, 228, 181, 0.1);
}

.empty {
  color: rgba($color-white, 0.7);
  border: 1px dashed rgba($color-white, 0.2);
  border-radius: $radius-sm;
  padding: $space-lg;
}
</style>
