<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    width="250px"
  >
    <img alt="Rick and Morty" src="@/assets/logo.png" class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1">
        <user-outlined />
        <span>Characters</span>
      </a-menu-item>
      <a-menu-item key="2">
        <video-camera-outlined />
        <span>Episodes</span>
      </a-menu-item>
      <a-menu-item key="3">
        <EnvironmentOutlined />
        <span>Locations</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";

export default {
  name: "TheSidebar",
  components: {
    UserOutlined,
    VideoCameraOutlined,
    EnvironmentOutlined,
  },
  setup() {
    return {
      selectedKeys: ref(["1"]),
    };
  },
};
</script>

<style scoped></style>
