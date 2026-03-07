<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <Header />
  <section class="legal-page">
    <div class="legal-shell">

      <button class="back-btn" @click="router.back()">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        Back
      </button>

      <div class="legal-header">
        <p class="legal-header__label">Legal</p>
        <h1 class="legal-header__title">Legal Notice</h1>
        <p class="legal-header__date">Last updated: March 2025</p>
      </div>

      <div class="legal-body">

        <section class="legal-section">
          <h2>1. Owner Information</h2>
          <p>
            This platform (<strong>BitTheBoss</strong>) is operated as an academic project developed for
            educational purposes. The platform is not a commercial product and is not intended for
            commercial use, distribution, or monetization.
          </p>
          <ul>
            <li><strong>Project name:</strong> BitTheBoss</li>
            <li><strong>Nature:</strong> Academic / Educational project</li>
            <li><strong>Contact:</strong> bittheboss@example.com</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>2. Purpose of the Platform</h2>
          <p>
            BitTheBoss is a competitive strategy game platform built as a final-year academic project.
            Its purpose is to demonstrate the integration of a Vue.js frontend, a .NET backend,
            and a Unity WebGL game client within a single full-stack application.
          </p>
          <p>
            All gameplay data, rankings, and user profiles are generated within the scope of this
            academic demonstration and have no commercial value.
          </p>
        </section>

        <section class="legal-section">
          <h2>3. Intellectual Property</h2>
          <p>
            All original content on this platform — including but not limited to design, source code,
            game assets, faction lore, and interface elements — is the intellectual property of its
            respective authors and is protected under applicable copyright law.
          </p>
          <p>
            Reproduction, distribution, or public communication of any content without prior written
            authorization from the authors is strictly prohibited, except where permitted by law.
          </p>
        </section>

        <section class="legal-section">
          <h2>4. Disclaimer of Liability</h2>
          <p>
            The platform is provided <em>"as is"</em> for academic demonstration purposes. The authors
            make no warranties, express or implied, regarding the accuracy, reliability, or
            availability of the service. The authors shall not be liable for any direct or indirect
            damages arising from use of the platform.
          </p>
          <p>
            The platform may contain links to third-party services. The authors are not responsible
            for the content or privacy practices of those services.
          </p>
        </section>

        <section class="legal-section">
          <h2>5. Applicable Law</h2>
          <p>
            This legal notice is governed by Spanish law. Any disputes arising from or related to
            the use of this platform shall be subject to the jurisdiction of the competent courts
            of Spain.
          </p>
        </section>

        <section class="legal-section">
          <h2>6. Modifications</h2>
          <p>
            The authors reserve the right to modify this legal notice at any time. Continued use
            of the platform after any such change constitutes acceptance of the updated terms.
          </p>
        </section>

      </div>

      <div class="legal-footer">
        <RouterLink to="/privacy" class="legal-footer__link">Privacy Policy →</RouterLink>
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">
.legal-page {
  min-height: calc(100vh - 72px);
  background: $color-bg;
  padding: $space-xl $space-xl $space-3xl;
}

.legal-shell {
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: $space-xl;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: $space-xs;
  background: transparent;
  border: 1.5px solid rgba($color-cyan, 0.3);
  border-radius: $radius-full;
  color: rgba($color-white, 0.65);
  font-size: $font-size-sm;
  padding: $space-xs $space-md;
  cursor: pointer;
  width: fit-content;
  transition: color 0.2s, border-color 0.2s;

  svg { width: 16px; height: 16px; }

  &:hover {
    color: $color-white;
    border-color: $color-cyan;
  }
}

.legal-header {
  border-bottom: 1px solid rgba($color-cyan, 0.1);
  padding-bottom: $space-lg;

  &__label {
    font-size: $font-size-xs;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: $color-cyan;
    margin-bottom: $space-sm;
  }

  &__title {
    font-size: clamp(1.8rem, 4vw, $font-size-3xl);
    font-weight: 900;
    color: $color-white;
    margin-bottom: $space-xs;
  }

  &__date {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.35);
  }
}

.legal-body {
  display: flex;
  flex-direction: column;
  gap: $space-xl;
}

.legal-section {
  h2 {
    font-size: $font-size-base;
    font-weight: 700;
    color: $color-cyan;
    margin-bottom: $space-sm;
    padding-left: $space-sm;
    border-left: 3px solid $color-cyan;
  }

  p {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.65);
    line-height: 1.8;
    margin-bottom: $space-sm;

    strong { color: rgba($color-white, 0.85); }
    em { color: rgba($color-white, 0.5); }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: $space-sm 0 0;
    display: flex;
    flex-direction: column;
    gap: 6px;

    li {
      font-size: $font-size-sm;
      color: rgba($color-white, 0.65);
      padding-left: $space-md;
      position: relative;

      &::before {
        content: '—';
        position: absolute;
        left: 0;
        color: rgba($color-cyan, 0.5);
      }

      strong { color: rgba($color-white, 0.85); }
    }
  }
}

.legal-footer {
  border-top: 1px solid rgba($color-cyan, 0.1);
  padding-top: $space-lg;
  text-align: right;

  &__link {
    font-size: $font-size-sm;
    color: $color-cyan;
    text-decoration: none;
    font-weight: 600;
    transition: opacity 0.2s;

    &:hover { opacity: 0.75; }
  }
}
</style>
