import {
  FETCH_JOBS,
  RECEIVE_JOBS,
  FETCH_APIS,
  RECEIVE_APIS,
} from "./constants";
import getApis from "@/api/getApis";
import getJobs from "@/api/getJobs";

const actions = {
  [FETCH_JOBS]: async (context) => {
    const jobListings = await getJobs();
    context.commit(RECEIVE_JOBS, jobListings);
  },
  [FETCH_APIS]: async (context) => {
    const apiList = await getApis();
    context.commit(RECEIVE_APIS, apiList);
  },
};

export default actions;
