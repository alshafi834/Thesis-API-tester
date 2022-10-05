<template>
  <h2 class="font-semibold text-xl">API tester</h2>
  <div class="flex flex-row mt-8">
    <span class="w-1/12 border rounded flex items-center justify-center">{{
      apiDetails.type
    }}</span>
    <input
      v-model="baseUrl"
      type="text"
      placeholder="API endpoint"
      class="w-9/12 text-sm pl-4 border border-solid rounded"
    />
    <action-button
      text="Send"
      type="primary"
      class="w-2/12 ml-4"
      @click="sendRequest"
    />
  </div>
  <div class="mt-4">
    <div class="flex flex-row mb-2 border-b-2 border-gray-500">
      <h2
        class="mr-2 p-2 cursor-pointer"
        :class="tab === 'body' ? 'tab' : ''"
        @click="changeTab('body')"
      >
        Body(JSON)
      </h2>
      <h2
        class="mr-2 p-2 cursor-pointer"
        :class="tab === 'query' ? 'tab' : ''"
        @click="changeTab('query')"
      >
        Query Param
      </h2>
      <h2
        class="mr-2 p-2 cursor-pointer"
        :class="tab === 'header' ? 'tab' : ''"
        @click="changeTab('header')"
      >
        Auth Header
      </h2>
    </div>
    <div v-if="tab === 'body'">
      <!-- <textarea
        id="input"
        name="input"
        cols="100"
        rows="6"
        class="w-full p-4 border border-solid rounded"
      ></textarea> -->
      <div v-if="!queryParams.body">No body parameters found</div>
      <div
        v-for="(param, index) in queryParams.body"
        :key="param"
        class="flex flex-row mb-2"
      >
        <input
          type="checkbox"
          :checked="param.required"
          class="mr-2 p-2"
          @change="modifyParams(index, 'body')"
        />
        <input
          type="text"
          :value="param.name"
          placeholder="Body Parameter"
          class="p-2 w-1/4 border rounded mr-4 text-xs"
        />
        <input
          v-model="bodyValue.parent_id[index]"
          type="text"
          placeholder="Value"
          class="p-2 w-2/4 border rounded"
          :disabled="!param.required"
          @change="addBody(param.name, bodyValue.parent_id[index])"
        />
      </div>
    </div>
    <div v-if="tab === 'query'">
      <div v-if="!queryParams.query">No query parameters found</div>
      <div
        v-for="(param, index) in queryParams.query"
        :key="param"
        class="flex flex-row mb-2"
      >
        <input
          type="checkbox"
          :checked="param.required"
          class="mr-2 p-2"
          @change="modifyParams(index, 'query')"
        />
        <input
          type="text"
          :value="param.name"
          placeholder="Query Parameter"
          class="p-2 w-1/4 border rounded mr-4 text-xs"
        />
        <input
          v-model="queryValue.parent_id[index]"
          type="text"
          placeholder="Value"
          class="p-2 w-2/4 border rounded"
          :disabled="!param.required"
          @change="addQuery(param.name, queryValue.parent_id[index])"
        />
      </div>
    </div>
    <div v-if="tab === 'header'">
      <div v-if="!queryParams.header">No headers found</div>
      <div
        v-for="(header, index) in queryParams.header"
        :key="header"
        class="flex flex-row mb-2"
      >
        <input
          type="checkbox"
          :checked="header.required"
          class="mr-2 p-2"
          @change="modifyParams(index, 'header')"
        />
        <input
          type="text"
          :value="header.name"
          placeholder="Header"
          class="p-2 w-1/4 border rounded mr-4 text-xs"
        />
        <input
          v-model="headerValue.parent_id[index]"
          type="text"
          placeholder="value"
          class="p-2 w-2/4 border rounded"
          :disabled="!header.required"
          @change="addHeader(header.name, headerValue.parent_id[index])"
        />
      </div>
    </div>
  </div>
  <div class="mt-6">
    <div class="flex flex-row justify-between border-b">
      <h2 class="mb-2">Response:</h2>
      <p>Status: {{ responseStatus }}</p>
    </div>
    <div
      class="w-full h-auto max-h-48 border border-solid rounded bg-white overflow-auto"
    >
      <pre class="text-sm">{{ response }}</pre>
    </div>
  </div>
  <response-tester
    :status="responseStatus"
    :response="response"
    :length="contentLength"
    :type="contentType"
  />
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import ActionButton from "../../Shared/ActionButton.vue";
import { UPDATE_PARAMETERS } from "@/store/constants";
import { SET_FULL_REQUEST } from "@/store/constants";
//import axios from "axios";
import apiCaller from "@/api/apiCaller";
import ResponseTester from "./ResponseTester.vue";
export default defineComponent({
  name: "ApiTester",
  components: { ActionButton, ResponseTester },
  filters: {
    pretty: (val, indent = 2) => {
      if (typeof val !== "object") {
        try {
          val = JSON.parse(val);
        } catch (err) {
          console.warn("value is not JSON");
          return val;
        }

        return JSON.stringify(val, null, indent);
      }
    },
  },
  setup() {
    const store = useStore();
    //let baseUrl = ref("");
    const apis = computed(() => store.state.apis);

    //baseUrl = apis.value.host + apis.value.basePath;

    const tab = ref("body");
    const changeTab = (tabName) => {
      tab.value = tabName;
    };

    const queryParams = computed(() => store.state.parameters);
    /* const requestBody = computed(() =>
      queryParams.value.body
        ? JSON.stringify(
            queryParams.value.body.reduce(
              (a, v) => ({ ...a, [v.name]: "" }),
              {}
            ),
            undefined,
            4
          )
        : null
    ); */
    const apiDetails = computed(() => store.state.apiDetails);

    const baseUrl = computed(() => {
      let postUrl = apiDetails.value.path
        ? apis.value.host + apis.value.basePath + apiDetails.value.path
        : apis.value.host + apis.value.basePath;

      if (queryList.value.length > 0) {
        postUrl = postUrl + "?";
        for (let [i, q] of queryList.value.entries()) {
          if (i === 0) {
            postUrl = postUrl + q.name + "=" + q.value;
          } else {
            postUrl = postUrl + "&" + q.name + "=" + q.value;
          }
        }
      }
      return postUrl;
    });

    /* const baseUrl = ref("");

    baseUrl.value = apiDetails.value.path
      ? apis.value.host + apis.value.basePath + apiDetails.value.path
      : apis.value.host + apis.value.basePath; */

    const modifyParams = (index, type) => {
      store.commit(UPDATE_PARAMETERS, { index, type });
    };

    const bodyValue = ref({
      parent_id: [],
    });
    let bodyList = ref([]);
    const addBody = (name, value) => {
      let bodyObj = { name, value };
      bodyList.value.push(bodyObj);
    };

    const queryValue = ref({
      parent_id: [],
    });
    let queryList = ref([]);
    const addQuery = (name, value) => {
      let queryObj = { name, value };
      //queryList = [...queryList, { name, value }];
      queryList.value.push(queryObj);
    };

    const headerValue = ref({
      parent_id: [],
    });
    let headerList = ref([]);
    const addHeader = (name, value) => {
      let queryObj = { name, value };
      headerList.value.push(queryObj);
    };

    const requestToSend = computed(() => {
      let request = {
        url: baseUrl,
        type: apiDetails.value.type,
        query: queryList,
        header: headerList,
        body: bodyList,
      };
      return request;
    });

    const response = ref(null);
    const responseStatus = ref(null);
    const contentLength = ref(null);
    const contentType = ref(null);
    const sendRequest = async () => {
      /* axios.get(requestToSend.value.url.value).then((resp) => {
        response.value = JSON.stringify(resp.data, null, 2);
        responseStatus.value = resp.status;
      }); */

      const apRes = await apiCaller(requestToSend.value);
      console.log(apRes);
      store.commit(SET_FULL_REQUEST, apRes.config);
      response.value = apRes.res.data;
      responseStatus.value = apRes.res.status;
      // eslint-disable-next-line prettier/prettier
      contentLength.value = apRes.res.headers["content-length"];
      // eslint-disable-next-line prettier/prettier
      contentType.value = apRes.res.headers["content-type"];
    };

    return {
      apis,
      baseUrl,
      changeTab,
      tab,
      queryParams,
      apiDetails,
      modifyParams,
      bodyValue,
      addBody,
      queryValue,
      addQuery,
      headerValue,
      addHeader,
      requestToSend,
      sendRequest,
      response,
      responseStatus,
      contentLength,
      contentType,
    };
  },
  /* computed: {
    ...mapState(["apiDetails"]),
  }, */
});
</script>

<style scoped>
.tab {
  @apply font-semibold bg-gray-200 border-b-0 border-solid rounded-t border-gray-500;
}
</style>
