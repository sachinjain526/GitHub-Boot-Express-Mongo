
import { CREATE_REPO, CREATE_ISSUE, ADD_COLLABORATOR } from './actions';

const initailState = {
  action: '',
  repoWidget: {
    repoName: '',
    source: '',
    intent: '',
  },
  issueWidget: {
    title: '',
    repoName: '',
    source: '',
    intent: '',
  },
  collaboratorWidget: {
    action: '',
    repoName: '',
    collaboratorName: '',
    source: '',
    intent: '',
  },
};
const createWidgetReducer = function (state = initailState, action) {
  if (action.type === CREATE_REPO) {
    return {
      ...state,
repoWidget: action.payload,
      action: action.type,
    };
  } if (action.type === CREATE_ISSUE) {
    return {
      ...state,
      issueWidget: action.payload,
      action: action.type,
    };
  }
  if (action.type === ADD_COLLABORATOR) {
    return {
      ...state,
      collaboratorWidget: action.payload,
      action: action.type,
    };
  }
  return state;
};
export default createWidgetReducer;
