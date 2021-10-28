<template>
  <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible width="250px">
    <img alt="Rick and Morty" src="@/assets/logo.png" class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <router-link
        v-for="menuItem in menu"
        :key="menuItem.link"
        :to="menuItem.link"
      >
        <a-menu-item :key="menuItem.name">
          <component :is="menuItem.icon" />
          <span>{{ menuItem.name }}</span>
        </a-menu-item>
      </router-link>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons-vue";

import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { computed, watch } from "vue";

export default {
  name: "TheSidebar",
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  components: {
    UserOutlined,
    VideoCameraOutlined,
    EnvironmentOutlined,
  },
  setup() {
    const route = useRoute();
    const routeName = computed(() => route.name);
    const selectedKeys = ref([null]);
    watch(routeName, (routeName) => {
      selectedKeys.value = [routeName];
    });
    const menu = reactive([
      {
        name: "Episodes",
        link: "/",
        icon: "video-camera-outlined",
      },
      {
        name: "Characters",
        link: "characters",
        icon: "user-outlined",
      },
      {
        name: "Locations",
        link: "locations",
        icon: "environment-outlined",
      },
    ]);
    return { selectedKeys, menu, routeName };
  },
};
</script>

<style scoped></style>
