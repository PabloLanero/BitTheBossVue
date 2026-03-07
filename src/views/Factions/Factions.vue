<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import { ref } from 'vue'

const selected = ref<string | null>(null)

const factions = [
  {
    id: 'circuit-breakers',
    icon: '⚡',
    name: 'Circuit Breakers',
    tag: 'Speed · Disruption',
    color: '#97feed',
    origin: 'Born from the collapsed grid sectors of Neon District 7',
    lore: `When the Great Blackout of 2147 wiped out the eastern grids, a group of rogue engineers refused to wait for the System to restore order. They rewired the ruins themselves — faster, dirtier, and without asking permission. The Circuit Breakers don't play by the rules because they wrote the exploit that broke them. Every node they capture is a reminder that the grid belongs to whoever dares to claim it first.`,
    traits: ['Aggressive opener', 'High mobility', 'Node overload tactics'],
    weakness: 'Vulnerable to sustained sieges',
    motto: '"First in. Last standing."',
  },
  {
    id: 'iron-bastion',
    icon: '🛡️',
    name: 'Iron Bastion',
    tag: 'Defense · Control',
    color: '#b0c4ff',
    badge: 'Most Played',
    origin: 'Forged in the bunkers beneath the Citadel Core',
    lore: `The Citadel was never meant to fall. When the outer factions started tearing the network apart, the engineers of the Deep Core sealed themselves inside and built something that would outlast everything else — the Iron Bastion. Their doctrine is simple: hold every node you claim, never overextend, and let the enemy exhaust themselves against your walls. Patience is their weapon. The circuit is their fortress.`,
    traits: ['Late-game dominance', 'Resource efficiency', 'Fortified node defense'],
    weakness: 'Slow early expansion',
    motto: '"What is built to last, cannot be taken."',
  },
  {
    id: 'ember-syndicate',
    icon: '🔥',
    name: 'Ember Syndicate',
    tag: 'Chaos · High Risk',
    color: '#ffb347',
    origin: 'Risen from the black markets of the Scorch Warrens',
    lore: `Nobody knows exactly when the Ember Syndicate was founded — and that's exactly how they like it. Operating from the smoldering underground of the Scorch Warrens, they've built a network not of nodes, but of favors, sabotage, and calculated chaos. They don't take the board by force alone; they make it impossible for the enemy to trust their own infrastructure. By the time you realize you've lost, the Syndicate has already burned the evidence.`,
    traits: ['Unpredictable playstyle', 'Sabotage mechanics', 'Explosive mid-game bursts'],
    weakness: 'Inconsistent long-term planning',
    motto: '"Let it all burn. We thrive in the ashes."',
  },
]
</script>

<template>
  <Header />
  <section class="factions-page">
    <div class="factions-shell">

      <div class="factions-hero">
        <p class="factions-hero__label">— The War for the Circuit —</p>
        <h1 class="factions-hero__title">Choose Your Faction</h1>
        <p class="factions-hero__subtitle">
          Three powers struggle for control of the grid. Each has its own history, its own doctrine,
          and its own way of claiming what's theirs. Pick your side wisely — the circuit does not forgive hesitation.
        </p>
      </div>

      <div class="factions-grid">
        <div
          v-for="faction in factions"
          :key="faction.id"
          class="faction-card"
          :class="{ 'faction-card--selected': selected === faction.id }"
          :style="{ '--faction-color': faction.color }"
        >
          <div v-if="faction.badge" class="faction-card__badge">{{ faction.badge }}</div>

          <div class="faction-card__header">
            <span class="faction-card__icon">{{ faction.icon }}</span>
            <div>
              <h2 class="faction-card__name">{{ faction.name }}</h2>
              <span class="faction-card__tag">{{ faction.tag }}</span>
            </div>
          </div>

          <p class="faction-card__origin">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            {{ faction.origin }}
          </p>

          <div class="faction-card__divider" />

          <p class="faction-card__lore">{{ faction.lore }}</p>

          <div class="faction-card__divider" />

          <div class="faction-card__traits">
            <p class="faction-card__traits-title">Strengths</p>
            <ul>
              <li v-for="trait in faction.traits" :key="trait">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                {{ trait }}
              </li>
            </ul>
            <p class="faction-card__weakness">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
              {{ faction.weakness }}
            </p>
          </div>

          <p class="faction-card__motto">{{ faction.motto }}</p>

          <button
            class="faction-card__btn"
            :class="{ 'faction-card__btn--active': selected === faction.id }"
            @click="selected = faction.id"
          >
            {{ selected === faction.id ? '✓ Selected' : 'Choose Faction' }}
          </button>
        </div>
      </div>

      <div v-if="selected" class="selection-banner">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        You have pledged your loyalty to
        <strong>{{ factions.find(f => f.id === selected)?.name }}</strong>.
        The circuit awaits.
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">
.factions-page {
  min-height: calc(100vh - 72px);
  background: $color-bg;
  padding: $space-xl $space-xl $space-3xl;
}

.factions-shell {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: $space-2xl;
}

// ── Hero ─────────────────────────────────────────────────
.factions-hero {
  text-align: center;
  max-width: 720px;
  margin: 0 auto;

  &__label {
    font-size: $font-size-xs;
    letter-spacing: 0.2em;
    color: rgba($color-white, 0.35);
    text-transform: uppercase;
    margin-bottom: $space-sm;
  }

  &__title {
    font-size: clamp(2.2rem, 5vw, $font-size-3xl);
    font-weight: 900;
    color: $color-cyan;
    text-shadow: $glow-cyan;
    margin-bottom: $space-md;
  }

  &__subtitle {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.5);
    line-height: 1.7;
  }
}

// ── Grid ─────────────────────────────────────────────────
.factions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $space-xl;
  align-items: start;
}

// ── Card ─────────────────────────────────────────────────
.faction-card {
  --faction-color: #{$color-cyan};

  position: relative;
  background: $color-bg-card;
  border: 1px solid rgba(var(--faction-color), 0.15);
  border: 1px solid color-mix(in srgb, var(--faction-color) 20%, transparent);
  border-radius: $radius-lg;
  padding: $space-xl;
  display: flex;
  flex-direction: column;
  gap: $space-md;
  transition: box-shadow 0.3s, border-color 0.3s, transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.35);
  }

  &--selected {
    border-color: var(--faction-color) !important;
    box-shadow: 0 0 32px color-mix(in srgb, var(--faction-color) 20%, transparent);
  }

  &__badge {
    position: absolute;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
    background: $color-cyan;
    color: #071952;
    font-size: $font-size-xs;
    font-weight: 700;
    padding: 3px 16px;
    border-radius: $radius-full;
    letter-spacing: 0.07em;
    white-space: nowrap;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: $space-md;
  }

  &__icon {
    font-size: 2.6rem;
    line-height: 1;
    flex-shrink: 0;
    filter: drop-shadow(0 0 8px rgba(255,255,255,0.2));
  }

  &__name {
    font-size: $font-size-lg;
    font-weight: 800;
    color: $color-white;
    margin-bottom: 2px;
  }

  &__tag {
    font-size: $font-size-xs;
    color: var(--faction-color);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__origin {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: $font-size-xs;
    color: rgba($color-white, 0.4);
    font-style: italic;
    line-height: 1.5;

    svg {
      width: 13px;
      height: 13px;
      flex-shrink: 0;
      margin-top: 1px;
      opacity: 0.5;
    }
  }

  &__divider {
    height: 1px;
    background: rgba($color-white, 0.06);
  }

  &__lore {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.62);
    line-height: 1.75;
    text-align: left;
  }

  &__traits {
    &-title {
      font-size: $font-size-xs;
      font-weight: 700;
      color: rgba($color-white, 0.45);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: $space-xs;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0 0 $space-sm;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    li {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: $font-size-sm;
      color: rgba($color-white, 0.75);

      svg {
        width: 14px;
        height: 14px;
        color: var(--faction-color);
        flex-shrink: 0;
      }
    }
  }

  &__weakness {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: $font-size-xs;
    color: rgba(255, 180, 180, 0.65);
    margin-top: 2px;

    svg {
      width: 13px;
      height: 13px;
      flex-shrink: 0;
    }
  }

  &__motto {
    font-size: $font-size-sm;
    font-style: italic;
    font-weight: 600;
    color: var(--faction-color);
    text-align: center;
    opacity: 0.85;
    padding: $space-xs $space-sm;
    border-left: 2px solid var(--faction-color);
    background: color-mix(in srgb, var(--faction-color) 6%, transparent);
    border-radius: 0 $radius-sm $radius-sm 0;
  }

  &__btn {
    margin-top: auto;
    padding: $space-sm $space-xl;
    border: 1.5px solid var(--faction-color);
    background: color-mix(in srgb, var(--faction-color) 10%, transparent);
    color: var(--faction-color);
    border-radius: $radius-full;
    font-size: $font-size-sm;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    letter-spacing: 0.04em;

    &:hover {
      background: color-mix(in srgb, var(--faction-color) 22%, transparent);
      box-shadow: 0 0 16px color-mix(in srgb, var(--faction-color) 30%, transparent);
    }

    &--active {
      background: color-mix(in srgb, var(--faction-color) 25%, transparent);
    }
  }
}

// ── Selection banner ──────────────────────────────────────
.selection-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-sm;
  padding: $space-md $space-xl;
  background: rgba($color-cyan, 0.08);
  border: 1px solid rgba($color-cyan, 0.3);
  border-radius: $radius-lg;
  color: rgba($color-white, 0.8);
  font-size: $font-size-sm;

  svg {
    width: 18px;
    height: 18px;
    color: $color-cyan;
    flex-shrink: 0;
  }

  strong {
    color: $color-cyan;
    font-weight: 700;
  }
}
</style>
