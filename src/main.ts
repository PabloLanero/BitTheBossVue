import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/styles/main.scss'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// Internalizacion (i18n)
import { i18n } from './i18n/i18n'

const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
  icons:{
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme:{
    defaultTheme: 'light',
    themes : {
      light: {
        colors: {
          background: '#071952',
          primary: '#97FEED',
          secondary: '#0B666A',
          accent: '#35A29F',
          error: '#FF5252', 
          info: '#2196F3', 
          success: '#4CAF50', 
          warning: '#FFC107', 
        }
      }
    },
  }
})



const app = createApp(App)

app.use(pinia)
app.use(router)
.use(vuetify)
.use(i18n)
.mount('#app')
