<template>
  <a-spin tip="Loading..." :spinning="isLoading" size="large">
    <a-row :gutter="16">
      <a-col
        :span="4"
        v-for="episode in itemList"
        :key="episode.id"
        class="mb-16"
      >
        <a-card hoverable size="small" :title="episode.name">
          <p>{{ episode.air_date }}</p>
          <ul>
            <li>dimension: {{ episode.dimension }}</li>
            <li>type: {{ episode.type }}</li>
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
import { ref } from "vue";
import { getLocationsAPI } from "../api/api.js";
export default {
  name: "Locations",
  setup() {
    const isLoading = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(20);
    const itemList = ref([]);
    const itemsCount = ref(null);

    const getLocations = async (params) => {
      isLoading.value = true;
      try {
        const res = await getLocationsAPI(params);
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
    getLocations({ page: currentPage.value });

    const onPageChange = () => {
      isLoading.value = true;
      getLocations({ page: currentPage.value });
    };

    return {
      currentPage,
      pageSize,
      itemList,
      itemsCount,
      onPageChange,
      getLocations,
      isLoading,
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
