<script setup lang="ts">
import Header from '@/components/Header/Header.vue';
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useUser } from '@/ApiCalls/useUser';



const { getUsuarios } = useUser()

onMounted(async () => {
  console.log(await getUsuarios() )
})
</script>
<template>
    <Header />
    <RouterView />
</template>