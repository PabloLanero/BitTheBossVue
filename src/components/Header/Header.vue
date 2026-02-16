<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>
<template>
    <header>
        <v-row cols="12" class="header" align="center">
            <v-col md="1">

            </v-col>
            <v-col md="2">
                Logo
            </v-col>
            <v-col md="3">

            </v-col>
            <v-col md="6">
                <v-row cols="12" align="center">
                    <v-col md="3">
                         <router-link :to="'#'" :text="$t('header.game')" append-icon="mdi-book" color="red" />
                    </v-col>
                    <v-col md="3">
                        <router-link :to="'#'" :text="$t('header.classification')" append-icon="mdi-book" color="red" />
                    </v-col>
                    <v-col md="3">
                        <router-link :to="'#'" :text="$t('header.signin')" append-icon="mdi-book" color="red" />
                    </v-col>
                    <v-col md="3">
                        <router-link :to="'#'" :text="$t('header.login')" append-icon="mdi-book" color="red" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </header>
</template>
<style scoped>
.header {
    margin-bottom: 30px;
}

</style>