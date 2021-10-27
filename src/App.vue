<template>
  <a-layout style="min-height: 100vh">
    <TheSidebar />
    <a-layout>
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
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          minHeight: '280px',
        }"
      >
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
      selectedKeys: ref(["1"]),
      collapsed: ref(false),
    };
  },
};
</script>
<style lang="less">
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #69ad53;
}

.logo {
  width: 100%;
  max-width: 220px;
  display: block;
  margin: 10px auto;
  padding: 0 5px;
}
</style>
