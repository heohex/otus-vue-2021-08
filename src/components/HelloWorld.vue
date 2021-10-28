<template>
  <h1>{{ msg }}</h1>
  <a-row :gutter="16">
    <a-col :span="4">
      <a-card hoverable size="small">
        <template #cover>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </template>
        <p class="card-title">asd</p>
        <p>Description</p>
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </a-card>
    </a-col>
  </a-row>
  <br>
  <a-pagination v-model:current="current" :total="50" show-less-items />
</template>

<script>
import { ref } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    return {
      current: ref(2),
    };
  },
};
</script>

<style scoped lang="less">
.card-title {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    margin: 0 10px;
  }
}
</style>
