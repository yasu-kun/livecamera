<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import YouTubePlayer from './components/YouTubePlayer.vue'
import Sidebar from './components/Sidebar.vue'

const videos = [
  {
    id: 'VWpOgCVKoK4',
    title: '沖縄'
  },
  {
    id: 's--MDmshT3I',
    title: '函館山'
  },
  {
    id: 'h3pbOPE3kLs',
    title: '那覇空港'
  },
  {
    id: 'DU-tsAEboZo',
    title: '羽田空港'
  }
]

const sidebarOpen = ref(false)
const gridColumns = ref(3)
const videoSize = ref(1)
const playerRefs = ref([])
const windowWidth = ref(window.innerWidth)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const handleSettingsUpdate = (settings) => {
  gridColumns.value = parseInt(settings.gridColumns)
  videoSize.value = parseInt(settings.videoSize)
}

const handlePlayAllVideos = () => {
  playerRefs.value.forEach(player => {
    if (player) {
      player.playVideo()
    }
  })
}

const handleToggleMuteAllVideos = (shouldMute) => {
  playerRefs.value.forEach(player => {
    if (player) {
      if (shouldMute) {
        player.muteVideo()
      } else {
        player.unmuteVideo()
      }
    }
  })
}

const gridStyle = computed(() => {
  const sizeMultipliers = [0.7, 1, 1.4]
  const baseMinWidth = 250
  const minWidth = baseMinWidth * sizeMultipliers[videoSize.value]
  
  // サイドバーの幅を考慮
  const availableWidth = windowWidth.value - (sidebarOpen.value ? 250 : 0) - 80
  const maxColumns = Math.max(1, Math.floor(availableWidth / (minWidth + 40)))
  const actualColumns = Math.min(gridColumns.value, maxColumns)
  
  return {
    'grid-template-columns': `repeat(${actualColumns}, minmax(${minWidth}px, 1fr))`,
    'grid-auto-rows': 'min-content'
  }
})

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="app-container">
    <button class="sidebar-toggle" @click="toggleSidebar">
      ☰ 設定
    </button>
    
    <Sidebar 
      :is-open="sidebarOpen" 
      @settings-updated="handleSettingsUpdate"
      @play-all-videos="handlePlayAllVideos"
      @toggle-mute-all-videos="handleToggleMuteAllVideos"
    />
    
    <div class="main-content" :class="{ 'sidebar-open': sidebarOpen }">
      <h1>YouTube監視カメラ</h1>
      <div class="video-grid" :style="gridStyle">
        <YouTubePlayer
          v-for="(video, index) in videos"
          :key="video.id"
          :ref="el => playerRefs[index] = el"
          :video-id="video.id"
          :title="video.title"
          :video-size="videoSize"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  min-height: 100vh;
}

.sidebar-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.sidebar-toggle:hover {
  background-color: #2980b9;
}

.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-open {
  margin-left: 250px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  margin-top: 60px;
}

.video-grid {
  display: grid;
  gap: 20px;
  padding: 0 20px;
  justify-items: center;
}

@media (max-width: 768px) {
  .main-content.sidebar-open {
    margin-left: 0;
  }
  
  .video-grid {
    padding: 0 10px;
  }
  
  .sidebar-toggle {
    top: 10px;
    left: 10px;
    padding: 8px 12px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .video-grid {
    gap: 15px;
    padding: 0 5px;
  }
}
</style>
