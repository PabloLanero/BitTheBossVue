<script setup lang="ts">

const props = withDefaults(defineProps<{
    text: string,
    color?:string,
    variant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain',
    rounded?: '0' | 'xs' | 'sm' | 'lg' | 'xl'
}>(),{
    text: 'ejemplo',
    color: 'black',
    variant: 'outlined',
        
})

</script>
<template>
    <v-btn :color="color" :variant="variant" :rounded="rounded">
        {{ text }}
    </v-btn>
</template>