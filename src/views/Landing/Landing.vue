<script setup lang="ts">
import HeroSection    from '@/components/Landing/HeroSection.vue';
import FeaturesSection from '@/components/Landing/FeaturesSection.vue';
import FooterSection  from '@/components/Landing/FooterSection.vue';
</script>

<template>
  <main class="landing">
    <HeroSection />
    <FeaturesSection />
    <FooterSection />
  </main>
</template>

<style scoped lang="scss">

.landing {
  background-color: $color-bg;
  min-height: 100vh;
}
</style>
