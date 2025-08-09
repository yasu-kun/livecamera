<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import YouTubePlayerManager from './components/YouTubePlayerManager.vue'

const theme = useTheme()
const isDark = ref(theme.global.current.value.dark)
const drawer = ref(false)

const setTheme = (val) => {
  isDark.value = !!val
  theme.global.name.value = isDark.value ? 'dark' : 'light'
}

const toggleTheme = () => {
  setTheme(!isDark.value)
}
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
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
    <v-navigation-drawer v-model="drawer" :width="300">
      <v-toolbar flat density="comfortable">
        <v-toolbar-title>サイドバー</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list density="comfortable">
        <v-list-subheader>表示</v-list-subheader>
        <v-list-item>
          <template #prepend>
            <v-icon>mdi-theme-light-dark</v-icon>
          </template>
          <v-switch hide-details inset :model-value="isDark" @update:modelValue="setTheme" label="ダークモード"></v-switch>
        </v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-subheader>リンク</v-list-subheader>
        <v-list-item href="https://yasu-kun.github.io/livecamera/" target="_blank">
          <template #prepend>
            <v-icon>mdi-open-in-new</v-icon>
          </template>
          公開ページ
        </v-list-item>
        <v-list-item href="https://github.com/yasu-kun/livecamera" target="_blank">
          <template #prepend>
            <v-icon>mdi-github</v-icon>
          </template>
          リポジトリ
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <YouTubePlayerManager />
    </v-main>
  </v-app>
</template>
