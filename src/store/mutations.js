import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
  RECEIVE_APIS,
  SELECT_ENDPOINT,
  SET_PARAMETERS,
  SET_API_PATHS,
} from "@/store/constants";

const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
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
  [SET_API_PATHS](state, apiInfo) {
    state.apis = apiInfo;
  },
};

export default mutations;
