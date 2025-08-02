<script setup>
import { ref } from 'vue'
import YouTubePlayer from './YouTubePlayer.vue'

const props = defineProps({
  videos: {
    type: Array,
    required: true
  },
  columns: {
    type: Number,
    default: 2
  },
  rows: {
    type: Number,
    default: 2
  }
})

const columns = ref(props.columns)
const rows = ref(props.rows)

// サイドバーの状態管理
const sidebarOpen = ref(false)

// 動画の表示数を計算
const totalVideos = props.videos.length
const maxVideos = columns.value * rows.value

// 表示する動画の配列
const displayedVideos = ref(props.videos.slice(0, maxVideos))

// サイドバーの表示/非表示切り替え
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// カラム数変更
const updateColumns = (newColumns) => {
  columns.value = newColumns
  const newMaxVideos = newColumns * rows.value
  displayedVideos.value = props.videos.slice(0, newMaxVideos)
}

// 行数変更
const updateRows = (newRows) => {
  rows.value = newRows
  const newMaxVideos = columns.value * newRows
  displayedVideos.value = props.videos.slice(0, newMaxVideos)
}
</script>

<template>
  <div class="video-grid-container">
    <!-- 動画グリッド -->
    <div class="video-grid">
      <YouTubePlayer
        v-for="video in displayedVideos"
        :key="video.id"
        :video-id="video.id"
        :title="video.title"
      />
    </div>
    
    <!-- サイドバー -->
    <div :class="['sidebar', { 'sidebar-closed': !sidebarOpen }]">
      <button @click="toggleSidebar" class="toggle-btn">
        {{ sidebarOpen ? '◀' : '▶' }}
      </button>
      
      <div class="sidebar-content" v-if="sidebarOpen">
        <h3>表示設定</h3>
        
        <div class="setting-group">
          <label>列数: {{ columns }}</label>
          <input 
            type="range" 
            min="1" 
            max="4" 
            v-model="columns" 
            @input="updateColumns(columns)"
          />
        </div>
        
        <div class="setting-group">
          <label>行数: {{ rows }}</label>
          <input 
            type="range" 
            min="1" 
            max="4" 
            v-model="rows" 
            @input="updateRows(rows)"
          />
        </div>
        
        <div class="video-count">
          <p>表示動画数: {{ displayedVideos.length }} / {{ totalVideos }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-grid-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

.sidebar {
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px;
  transition: all 0.3s ease;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
}

.sidebar.sidebar-closed {
  width: 0;
  padding: 0;
  overflow: hidden;
}

.toggle-btn {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-bottom: 20px;
  position: fixed;
  top: 10px;
  right: 10px;
}

.sidebar-content h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.setting-group {
  margin-bottom: 20px;
}

.setting-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.setting-group input[type="range"] {
  width: 100%;
}

.video-count {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

.video-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(v-bind(columns), 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 15px;
  padding: 15px;
  overflow: auto;
}
</style>
