<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import YouTubePlayerManager from './components/YouTubePlayerManager.vue'

const theme = useTheme()
const isDark = ref(theme.global.current.value.dark)

const toggleTheme = () => {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'dark' : 'light'
}
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>YouTube Live Camera</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn 
        icon 
        @click="toggleTheme"
        :title="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <YouTubePlayerManager />
    </v-main>
  </v-app>
</template>

