<template>
  <a-button class="mb-16" @click="characterModal = true"
    >Add Character</a-button
  >
  <a-modal
    v-model:visible="characterModal"
    title="Add character"
    @ok="handleAddCharacter"
  >
    <a-input v-model:value="addName" class="mb-16" placeholder="Name"></a-input>
    <a-select
      v-model:value="addGender"
      class="mb-16 w-100"
      placeholder="Gender"
      :options="genderList"
      allowClear
    ></a-select>
    <a-select
      v-model:value="addStatus"
      class="mb-16 w-100"
      placeholder="Status"
      :options="statusList"
      allowClear
    ></a-select>
    <a-input
      v-model:value="addSpecies"
      class="mb-16"
      placeholder="Species"
    ></a-input>
    <a-input v-model:value="addType" class="mb-16" placeholder="Type"></a-input>
    <a-upload
      v-model:file-list="fileList"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture"
      @change="handleChange"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Character picture (or subzero :D)
      </a-button>
    </a-upload>
  </a-modal>
  <a-spin tip="Loading..." :spinning="isLoading" size="large">
    <a-input-search
      v-model:value="searchValue"
      placeholder="Search character"
      @search="onSearch"
      class="mb-16"
      enter-button
    />
    <a-select
      v-model:value="gender"
      @change="genderHandleChange"
      class="mb-16 w-100"
      placeholder="Select gender"
      :options="genderList"
      allowClear
    ></a-select>
    <a-select
      v-model:value="status"
      @change="statusHandleChange"
      class="mb-16 w-100"
      placeholder="Select status"
      :options="statusList"
      allowClear
    ></a-select>
    <a-row :gutter="16">
      <a-col
        class="mb-16"
        :span="4"
        v-for="character in itemList"
        :key="character.id"
      >
        <a-card hoverable size="small">
          <template #cover>
            <img alt="example" :src="character.image" />
          </template>
          <p class="card-title">{{ character.name }}</p>
          <ul>
            <li>Gender: {{ character.gender }}</li>
            <li>Status: {{ character.status }}</li>
            <li>Species: {{ character.species }}</li>
            <li>Type: {{ character.type || "-" }}</li>
          </ul>
          <div class="delete-container">
            <DeleteOutlined
              class="delete"
              @click="deleteCharacter(character.id)"
            />
          </div>
        </a-card>
      </a-col>
    </a-row>
    <br />
    <a-pagination
      v-model:current="currentPage"
      v-model:pageSize="pageSize"
      :total="itemsCount"
      @change="onPageChange"
    />
  </a-spin>
</template>

<script>
import { ref, computed } from "vue";
import { getCharactersAPI } from "../api/api.js";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons-vue";

export default {
  name: "Characters",
  components: {
    DeleteOutlined,
    UploadOutlined,
  },
  setup() {
    const isLoading = ref(false);
    const apiGet = async (params) => {
      isLoading.value = true;
      try {
        const res = await getCharactersAPI(params);
        const {
          data: {
            info: { count },
            results,
          },
        } = res;
        itemList.value = results;
        itemsCount.value = count;
        console.log(res);
      } catch (e) {
        console.error(e);
      } finally {
        isLoading.value = false;
      }
    };

    apiGet({ page: 1 });

    const currentPage = ref(1);
    const pageSize = ref(20);
    const itemList = ref([]);
    const itemsCount = ref(null);
    const onPageChange = () => {
      apiGet(queryParams.value);
    };

    const searchValue = ref("");
    const onSearch = () => {
      currentPage.value = 1;
      apiGet(queryParams.value);
    };

    const genderList = ref([
      { value: "female", label: "female" },
      { value: "male", label: "male" },
      { value: "genderless", label: "genderless" },
      { value: "unknown", label: "unknown" },
    ]);
    const gender = ref(null);
    const genderHandleChange = () => {
      currentPage.value = 1;
      apiGet(queryParams.value);
    };

    const statusList = ref([
      { value: "alive", label: "alive" },
      { value: "dead", label: "dead" },
      { value: "unknown", label: "unknown" },
    ]);
    const status = ref(null);
    const statusHandleChange = () => {
      currentPage.value = 1;
      apiGet(queryParams.value);
    };

    const queryParams = computed(() => ({
      page: currentPage.value,
      name: searchValue.value,
      gender: gender.value,
      status: status.value,
    }));

    const characterModal = ref(false);
    const addName = ref("");
    const addGender = ref(null);
    const addStatus = ref(null);
    const addSpecies = ref("");
    const addType = ref("");
    const fileList = ref([]);

    const handleAddCharacter = () => {
      itemList.value.push({
        id: Math.random(),
        image:
          fileList.value[0]?.thumbUrl ||
          "https://pbs.twimg.com/profile_images/1257074647104815104/1J8cpwto.jpg",
        name: addName.value,
        gender: addGender.value,
        status: addStatus.value,
        type: addType.value,
        species: addSpecies.value,
      });
      characterModal.value = false;
      addName.value = "";
      addType.value = "";
      addSpecies.value = "";
      addGender.value = null;
      addStatus.value = null;
      fileList.value = [];
    };

    const handleChange = (info) => {
      let resFileList = [...info.fileList];
      resFileList = resFileList.slice(-1);
      fileList.value = resFileList;
    };

    const deleteCharacter = (id) => {
      itemList.value = itemList.value.filter((item) => item.id !== id);
    };

    return {
      currentPage,
      pageSize,
      itemList,
      itemsCount,
      onPageChange,

      searchValue,
      isLoading,
      onSearch,

      gender,
      genderHandleChange,
      genderList,
      apiGet,

      statusList,
      status,
      statusHandleChange,

      queryParams,

      characterModal,
      addName,
      addGender,
      addStatus,
      addType,
      addSpecies,
      handleAddCharacter,

      fileList,
      handleChange,

      deleteCharacter,
    };
  },
};
</script>

<style scoped lang="less">
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    margin: 0 10px;
  }
}

.card-title {
  font-size: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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

.delete-container {
  display: flex;
  justify-content: flex-end;
}

.w-100 {
  width: 100%;
}
</style>
