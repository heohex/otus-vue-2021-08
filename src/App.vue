<template>
  <a-layout style="min-height: 100vh">
    <TheSidebar :collapsed="collapsed" />
    <a-layout style="background: #141414">
      <a-layout-header style="padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="collapsed = !collapsed"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content class="layout">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { ref } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import TheSidebar from "./components/layout/TheSidebar";

export default {
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    TheSidebar,
  },
  setup() {
    return {
      collapsed: ref(false),
    };
  },
};
</script>
<style lang="less" scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #69ad53;
  }
}

.layout {
  padding: 24px;
  min-height: 280px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
