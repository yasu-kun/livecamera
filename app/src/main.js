import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: '#1976D2',
          secondary: '#424242',
        },
      },
      dark: {
        colors: {
          background: '#121212',
          surface: '#212121',
          primary: '#2196F3',
          secondary: '#616161',
        },
      },
    },
  },
})

createApp(App).use(vuetify).mount('#app')
