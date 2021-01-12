const initState = {};

const plannerReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PLAN":
      console.log("created project", action.plan);
      return state;
    case 'CREATE_PLAN_ERROR':
      console.log('create project error', action.err);
      return state;
    case "EDIT_PLAN":
      console.log("edited project", action.plan);
      return state;
    case 'EDIT_PLAN_ERROR':
      console.log('edit project error', action.err);
      return state;
    default:
      return state;
  }
};

export default plannerReducer;
