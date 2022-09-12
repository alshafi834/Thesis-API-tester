import {
  LOGIN_USER,
  LOGOUT_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
  RECEIVE_APIS,
  SELECT_ENDPOINT,
  SET_PARAMETERS,
  SET_RESPONSES,
  SET_API_PATHS,
  UPDATE_PARAMETERS,
  SET_FULL_REQUEST,
  SET_FULL_RESPONSES,
} from "@/store/constants";
import { useRouter } from "vue-router";

const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [LOGOUT_USER](state) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiration");
    state.isLoggedIn = false;

    const router = useRouter();
    router.push({ name: "HomeView" });
  },
  [RECEIVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
  [ADD_SELECTED_ORGANIZATIONS](state, organizations) {
    state.selectedOrganizations = organizations;
  },
  [RECEIVE_APIS](state, apis) {
    state.apis = apis;
  },
  [SELECT_ENDPOINT](state, details) {
    state.apiDetails = details;
  },
  [SET_PARAMETERS](state, params) {
    state.parameters = params.reduce((acc, obj) => {
      const key = obj.in;
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  },
  [SET_RESPONSES](state, responses) {
    state.responses = responses;
  },
  [UPDATE_PARAMETERS](state, obj) {
    state.parameters[obj.type][obj.index].required =
      !state.parameters[obj.type][obj.index].required;
    //state.parameters = params;
  },
  [SET_API_PATHS](state, apiInfo) {
    state.apis = apiInfo;
  },

  [SET_FULL_REQUEST](state, req) {
    state.fullRequest = req;
  },
  [SET_FULL_RESPONSES](state, res) {
    state.fullResponse = res;
  },
};

export default mutations;
