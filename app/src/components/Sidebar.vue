<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-header">
      <h3>表示設定</h3>
    </div>
    <div class="sidebar-content">
      <div class="setting-item">
        <label>グリッド列数: {{ gridColumns }}列</label>
        <input 
          type="range" 
          min="1" 
          max="6" 
          v-model="gridColumns"
          @input="updateSettings"
          class="slider"
        />
      </div>
      
      <div class="setting-item">
        <label>動画サイズ: {{ videoSizeLabels[videoSize] }}</label>
        <input 
          type="range" 
          min="0" 
          max="2" 
          v-model="videoSize"
          @input="updateSettings"
          class="slider"
        />
      </div>
      
      <div class="setting-item">
        <h4>動画制御</h4>
        <div class="control-buttons">
          <button @click="playAllVideos" class="control-btn play-btn">
            ▶ 一括再生
          </button>
          <button @click="muteAllVideos" class="control-btn mute-btn">
            {{ isMuted ? '🔊 ミュート解除' : '🔇 一括ミュート' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      gridColumns: 3,
      videoSize: 1,
      isMuted: false,
      videoSizeLabels: ['小', '中', '大']
    }
  },
  methods: {
    updateSettings() {
      this.$emit('settings-updated', {
        gridColumns: this.gridColumns,
        videoSize: this.videoSize
      })
    },
    playAllVideos() {
      this.$emit('play-all-videos')
    },
    muteAllVideos() {
      this.isMuted = !this.isMuted
      this.$emit('toggle-mute-all-videos', this.isMuted)
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 250px;
  height: 100%;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  transition: left 0.3s ease;
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0,0,0,0.2);
}

.sidebar.open {
  left: 0;
}

.sidebar-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #34495e;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-item label {
  font-weight: bold;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.radio-group label {
  font-weight: normal;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.radio-group input[type="radio"] {
  transform: scale(1.2);
}

.setting-item input[type="checkbox"] {
  transform: scale(1.2);
  margin-right: 8px;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background: #34495e;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3498db;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3498db;
  cursor: pointer;
  border: none;
}

.control-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.control-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.play-btn {
  background-color: #27ae60;
  color: white;
}

.play-btn:hover {
  background-color: #229954;
}

.mute-btn {
  background-color: #e74c3c;
  color: white;
}

.mute-btn:hover {
  background-color: #c0392b;
}

.setting-item h4 {
  margin: 0 0 10px 0;
  color: #ecf0f1;
  font-size: 16px;
}
</style>
