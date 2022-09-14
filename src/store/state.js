const state = () => {
  return {
    isLoggedIn: false,
    jobs: [],
    selectedOrganizations: [],
    apis: [],
    apiDetails: {},
    parameters: [],
    responses: {},
    fullRequest: {},
    fullResponse: {},
    myTests: [],
    testDetails: {},
  };
};

export default state;
