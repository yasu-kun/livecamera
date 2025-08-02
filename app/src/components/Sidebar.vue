<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-header">
      <h3>表示設定</h3>
    </div>
    <div class="sidebar-content">
      <div class="setting-item">
        <label>グリッド列数:</label>
        <div class="radio-group">
          <label>
            <input 
              type="radio" 
              value="3" 
              v-model="gridColumns"
              @change="updateSettings"
            >
            3列
          </label>
          <label>
            <input 
              type="radio" 
              value="4" 
              v-model="gridColumns"
              @change="updateSettings"
            >
            4列
          </label>
          <label>
            <input 
              type="radio" 
              value="5" 
              v-model="gridColumns"
              @change="updateSettings"
            >
            5列
          </label>
        </div>
      </div>
      
      <div class="setting-item">
        <label>
          <input 
            type="checkbox" 
            v-model="autoPlay"
            @change="updateSettings"
          >
          自動再生
        </label>
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
      gridColumns: '3',
      autoPlay: false
    }
  },
  methods: {
    updateSettings() {
      this.$emit('settings-updated', {
        gridColumns: this.gridColumns,
        autoPlay: this.autoPlay
      })
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
</style>
