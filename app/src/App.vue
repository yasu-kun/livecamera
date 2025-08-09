<script setup>
import { ref, onMounted, watch } from 'vue'
import { useTheme } from 'vuetify'
import YouTubePlayerManager from './components/YouTubePlayerManager.vue'

const theme = useTheme()
const isDark = ref(theme.global.current.value.dark)
const drawer = ref(false)

const defaultVideoIds = [
  'VWpOgCVKoK4',
  's--MDmshT3I',
  'h3pbOPE3kLs',
  'DU-tsAEboZo',
  'X6C2hpunZ8c'
]

const videoIds = ref([...defaultVideoIds])
const newLink = ref('')
const draggingIndex = ref(null)

const setTheme = (val) => {
  isDark.value = !!val
  theme.global.name.value = isDark.value ? 'dark' : 'light'
}

const toggleTheme = () => {
  setTheme(!isDark.value)
}

function extractVideoId(input) {
  if (!input) return null
  // If already looks like an 11-char ID, accept
  const idLike = input.match(/^[a-zA-Z0-9_-]{11}$/)
  if (idLike) return idLike[0]
  // Try to parse common YouTube URL formats
  try {
    const url = new URL(input)
    if (url.hostname.includes('youtube.com')) {
      const v = url.searchParams.get('v')
      if (v && v.match(/^[a-zA-Z0-9_-]{11}$/)) return v
      // youtu.be embedded or short
      const parts = url.pathname.split('/')
      const last = parts[parts.length - 1]
      if (last && last.match(/^[a-zA-Z0-9_-]{11}$/)) return last
    }
    if (url.hostname.includes('youtu.be')) {
      const last = url.pathname.replace('/', '')
      if (last && last.match(/^[a-zA-Z0-9_-]{11}$/)) return last
    }
  } catch (_) {
    // not a URL
  }
  return null
}

function addVideo() {
  const id = extractVideoId(newLink.value.trim())
  if (!id) return
  if (!videoIds.value.includes(id)) {
    videoIds.value.push(id)
  }
  newLink.value = ''
}

function removeVideo(id) {
  videoIds.value = videoIds.value.filter(v => v !== id)
}

function moveItem(arr, from, to) {
  if (from === to || from == null || to == null) return arr
  const a = arr.slice()
  const item = a.splice(from, 1)[0]
  a.splice(to, 0, item)
  return a
}

function onDragStart(index) {
  return (e) => {
    draggingIndex.value = index
    try {
      e.dataTransfer?.setData('text/plain', String(index))
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.effectAllowed = 'move'
      }
    } catch (_) {}
  }
}

function onDragOver(event) {
  event.preventDefault()
  try { if (event.dataTransfer) event.dataTransfer.dropEffect = 'move' } catch (_) {}
}

function onDrop(index) {
  return () => {
    if (draggingIndex.value === null) return
    videoIds.value = moveItem(videoIds.value, draggingIndex.value, index)
    draggingIndex.value = null
  }
}

// Persist to localStorage (optional convenience)
onMounted(() => {
  const saved = localStorage.getItem('videoIds')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.every(x => typeof x === 'string')) {
        videoIds.value = parsed
      }
    } catch (_) {}
  }
})

watch(videoIds, (val) => {
  try { localStorage.setItem('videoIds', JSON.stringify(val)) } catch (_) {}
}, { deep: true })
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
    <v-navigation-drawer v-model="drawer" :width="320">
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
        <v-list-subheader>YouTube リンク</v-list-subheader>
        <div class="px-4 pb-2">
          <v-text-field
            v-model="newLink"
            density="compact"
            variant="outlined"
            placeholder="URL または動画ID"
            hide-details
            @keyup.enter="addVideo"
          >
            <template #append-inner>
              <v-btn size="small" icon="mdi-plus" variant="text" @click="addVideo" :disabled="!newLink"></v-btn>
            </template>
          </v-text-field>
        </div>
        <v-list lines="one">
          <v-list-item
            v-for="(id, index) in videoIds"
            :key="id"
            :title="id"
            draggable="true"
            @dragstart="onDragStart(index)"
            @dragover="onDragOver"
            @drop="onDrop(index)"
          >
            <template #prepend>
              <v-icon class="mr-2">mdi-drag</v-icon>
            </template>
            <template #append>
              <v-btn icon="mdi-delete" size="small" variant="text" @click="removeVideo(id)"></v-btn>
            </template>
          </v-list-item>
        </v-list>
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
      <YouTubePlayerManager :video-ids="videoIds" />
    </v-main>
  </v-app>
</template>
