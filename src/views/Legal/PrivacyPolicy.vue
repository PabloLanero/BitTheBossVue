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
        <h1 class="legal-header__title">Privacy Policy</h1>
        <p class="legal-header__date">Last updated: March 2025</p>
      </div>

      <div class="legal-body">

        <div class="legal-highlight">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
          <p>
            BitTheBoss is an academic project. We collect only the minimum data necessary to
            make the platform function, and we do not share it with any third parties.
          </p>
        </div>

        <section class="legal-section">
          <h2>1. Data Controller</h2>
          <p>
            The data controller for this platform is the academic team responsible for the
            BitTheBoss project. For any privacy-related enquiries, contact us at:
            <strong>bittheboss@example.com</strong>
          </p>
        </section>

        <section class="legal-section">
          <h2>2. Data We Collect</h2>
          <p>When you register and use the platform, we collect the following personal data:</p>
          <ul>
            <li><strong>Username</strong> — used to identify you within the platform</li>
            <li><strong>Email address</strong> — used for account authentication</li>
            <li><strong>Password</strong> — stored in hashed form, never in plain text</li>
            <li><strong>Match history</strong> — game results associated with your account</li>
            <li><strong>Competitive rank</strong> — tier and level derived from match results</li>
          </ul>
          <p>We do not collect payment data, location data, or any sensitive personal information.</p>
        </section>

        <section class="legal-section">
          <h2>3. Legal Basis for Processing</h2>
          <p>
            The legal basis for processing your personal data is the execution of the service
            contract established when you create an account (Art. 6.1.b GDPR), and where
            applicable, your explicit consent (Art. 6.1.a GDPR).
          </p>
        </section>

        <section class="legal-section">
          <h2>4. How We Use Your Data</h2>
          <p>Your personal data is used exclusively for the following purposes:</p>
          <ul>
            <li>Authenticating your identity and managing your session</li>
            <li>Displaying your profile, match history and competitive rank</li>
            <li>Enabling gameplay and recording match results</li>
            <li>Maintaining the integrity and security of the platform</li>
          </ul>
          <p>
            Your data is never used for marketing, advertising, or sold to third parties
            under any circumstances.
          </p>
        </section>

        <section class="legal-section">
          <h2>5. Data Retention</h2>
          <p>
            Your personal data is retained for as long as your account remains active.
            Upon account deletion, all associated personal data will be permanently removed
            from our systems within 30 days, except where retention is required by law.
          </p>
        </section>

        <section class="legal-section">
          <h2>6. Cookies and Local Storage</h2>
          <p>
            This platform uses <strong>browser local storage</strong> to store your
            authentication token (JWT) and session preferences. No third-party tracking
            cookies are used. The stored token is used solely to maintain your authenticated
            session and is removed when you log out.
          </p>
        </section>

        <section class="legal-section">
          <h2>7. Your Rights</h2>
          <p>Under the GDPR and applicable Spanish data protection law, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
            <li><strong>Rectification</strong> — correct any inaccurate or incomplete data</li>
            <li><strong>Erasure</strong> — request deletion of your personal data ("right to be forgotten")</li>
            <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
            <li><strong>Restriction</strong> — request limitation of processing in certain circumstances</li>
            <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at <strong>bittheboss@example.com</strong>.
            You also have the right to lodge a complaint with the Spanish Data Protection Agency
            (AEPD) at <strong>www.aepd.es</strong>.
          </p>
        </section>

        <section class="legal-section">
          <h2>8. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your
            personal data against unauthorized access, alteration, disclosure, or destruction.
            These measures include password hashing, JWT-based authentication, and
            HTTPS-encrypted communication between the client and server.
          </p>
        </section>

        <section class="legal-section">
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update
            the date at the top of this page. Continued use of the platform after any changes
            constitutes your acceptance of the updated policy.
          </p>
        </section>

      </div>

      <div class="legal-footer">
        <RouterLink to="/legal" class="legal-footer__link">← Legal Notice</RouterLink>
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

.legal-highlight {
  display: flex;
  align-items: flex-start;
  gap: $space-md;
  background: rgba($color-cyan, 0.06);
  border: 1px solid rgba($color-cyan, 0.2);
  border-radius: $radius-lg;
  padding: $space-md $space-lg;

  svg {
    width: 22px;
    height: 22px;
    color: $color-cyan;
    flex-shrink: 0;
    margin-top: 2px;
  }

  p {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.7);
    line-height: 1.7;
    margin: 0;
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
  }

  ul {
    list-style: none;
    padding: 0;
    margin: $space-sm 0 $space-sm;
    display: flex;
    flex-direction: column;
    gap: 6px;

    li {
      font-size: $font-size-sm;
      color: rgba($color-white, 0.65);
      padding-left: $space-md;
      position: relative;
      line-height: 1.6;

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
