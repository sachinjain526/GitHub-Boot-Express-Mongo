import {
  CREATE_ISSUE, CREATE_REPO, ADD_COLLABORATOR,
} from './actions';
import store from './reduxStore';
import createAlluserRepos from './getAlluserRepos/userReposServices';
import createRepoWidgets from './repoWidgets/repoWidgetsView';
import createIssueWidgets from './issueWidgets/issueWidgetsView';
import createCollaboratorWidgets from './collaboratorWidgets/collaboratorWidgetsView';
import { getHistory } from './GetDataService';
import { createCommonClosedOrSubmitWidget } from './localUtility';
import renderIsuueWidgets from './getAndupdateAllissues/userIssueWidgetView';

const jQuery = require('jquery');

function initialPageRendering(data) {
  jQuery.each(data, (index, value) => {
    console.log(index);
    if (value.result) {
      createCommonClosedOrSubmitWidget(value);
    } else {
      if (value.intent === 'create-repo') {
        createRepoWidgets(value);
      }
      if (value.intent === 'create-issue') {
        createIssueWidgets(value);
      }
      if (value.intent === 'add-collaborator') {
        createCollaboratorWidgets(value);
      }
      if (value.intent === 'display-issues') {
        renderIsuueWidgets('widgetSection', [value], true, true);
      }
    }
  });
}

function onLoadEventToFetchData() {
  getHistory(initialPageRendering);
  createAlluserRepos('userRepoSection');
}
function renderWidgets() {
  const curentState = store.getState();
  if (curentState.repoWidget && curentState.action === CREATE_REPO) {
    createRepoWidgets(curentState.repoWidget);
  }
  if (curentState.issueWidget && curentState.action === CREATE_ISSUE) {
    createIssueWidgets(curentState.issueWidget);
  }
  if (curentState.collaboratorWidget && curentState.action === ADD_COLLABORATOR) {
    createCollaboratorWidgets(curentState.collaboratorWidget);
  }
}
store.subscribe(renderWidgets);
export default onLoadEventToFetchData;
