<template>
  <a-button class="mb-16" @click="episodeModal = true">Add episode</a-button>
  <a-modal
    v-model:visible="episodeModal"
    title="Add episode"
    @ok="handleAddEpisode"
  >
    <a-input
      v-model:value="episodeName"
      class="mb-16"
      placeholder="Episode name"
    ></a-input>
    <a-input
      v-model:value="episodeNumber"
      placeholder="Episode number"
    ></a-input>
  </a-modal>
  <a-spin tip="Loading..." :spinning="isLoading" size="large">
    <a-row :gutter="16">
      <a-col
        :span="4"
        v-for="episode in itemList"
        :key="episode.id"
        class="mb-16"
      >
        <a-card hoverable size="small" :title="episode.name">
          <template #extra
            ><DeleteOutlined class="delete" @click="removeItem(episode.id)"
          /></template>
          <p>{{ episode.air_date }}</p>
          <ul>
            <li>episode: {{ episode.episode }}</li>
          </ul>
        </a-card>
      </a-col>
    </a-row>
    <a-pagination
      v-model:current="currentPage"
      v-model:pageSize="pageSize"
      :total="itemsCount"
      @change="onPageChange"
    />
  </a-spin>
</template>

<script>
import { getEpisodesAPI } from "../api/api.js";
import { DeleteOutlined } from "@ant-design/icons-vue";

import { ref } from "vue";
export default {
  name: "Episodes",
  components: {
    DeleteOutlined,
  },
  setup() {
    const isLoading = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(20);
    const itemList = ref([]);
    const itemsCount = ref(null);
    const episodeName = ref("");
    const episodeNumber = ref("");

    const getEpisodes = async (params) => {
      isLoading.value = true;
      try {
        const res = await getEpisodesAPI(params);
        const {
          data: {
            info: { count },
            results,
          },
        } = res;
        itemList.value = results;
        itemsCount.value = count;
      } catch (e) {
        console.error(e);
      } finally {
        isLoading.value = false;
      }
    };
    getEpisodes({ page: currentPage.value });

    const onPageChange = () => {
      isLoading.value = true;
      getEpisodes({ page: currentPage.value });
    };

    const removeItem = (itemId) => {
      itemList.value = itemList.value.filter((item) => item.id !== itemId);
    };
    const episodeModal = ref(false);
    const handleAddEpisode = () => {
      itemList.value.push({
        id: Math.random(),
        air_date: `${new Date().toLocaleString("en-US", { month: "long" })}
        ${new Date().getDay()}, ${new Date().getFullYear()}`,
        name: episodeName.value,
        episode: episodeNumber.value,
      });
      episodeName.value = "";
      episodeNumber.value = "";
      episodeModal.value = false;
    };

    return {
      currentPage,
      pageSize,
      itemList,
      itemsCount,
      onPageChange,
      getEpisodes,
      isLoading,
      removeItem,

      episodeModal,
      handleAddEpisode,
      episodeName,
      episodeNumber,
    };
  },
};
</script>

<style scoped lang="less">
.card-title {
  font-size: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    margin: 0 10px;
  }
}

.mb-16 {
  margin-bottom: 16px;
}

.delete {
  transition: color 0.3s;
  &:hover {
    color: #69ad53;
  }
}
</style>
