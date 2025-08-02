<script setup>
import { ref, computed } from 'vue'
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
const autoPlay = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const handleSettingsUpdate = (settings) => {
  gridColumns.value = parseInt(settings.gridColumns)
  autoPlay.value = settings.autoPlay
}

const gridStyle = computed(() => {
  return {
    'grid-template-columns': `repeat(${gridColumns.value}, 1fr)`
  }
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
    />
    
    <div class="main-content" :class="{ 'sidebar-open': sidebarOpen }">
      <h1>YouTube監視カメラ</h1>
      <div class="video-grid" :style="gridStyle">
        <YouTubePlayer
          v-for="video in videos"
          :key="video.id"
          :video-id="video.id"
          :title="video.title"
          :auto-play="autoPlay"
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
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .main-content.sidebar-open {
    margin-left: 0;
  }
  
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>
