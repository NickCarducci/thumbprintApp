const initState = {};

const proposalReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROPOSAL":
      console.log("created project", action.plan);
      return state;
    case 'CREATE_PROPOSAL_ERROR':
      console.log('create project error', action.err);
      return state;
    case "EDIT_PROPOSAL":
      console.log("edited project", action.plan);
      return state;
    case 'EDIT_PROPOSAL_ERROR':
      console.log('edit project error', action.err);
      return state;
    default:
      return state;
  }
};

export default proposalReducer;
