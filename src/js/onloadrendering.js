import {
  CREATE_ISSUE, CREATE_REPO, ADD_COLLABORATOR,
} from './actions';
import store from './reduxStore';
import createAlluserRepos from './getAlluserRepos/userReposServices';
import createRepoWidgets from './repoWidgets/repoWidgetsView';
import createIssueWidgets from './issueWidgets/issueWidgetsView';
import createCollaboratorWidgets from './collaboratorWidgets/collaboratorWidgetsView';
import { createCommonClosedOrSubmitWidget } from './localUtility';
import renderIsuueWidgets from './getAndupdateAllissues/userIssueWidgetView';
import createModelPopup from './createModal/createModalWidget';

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

function updateView(data) {
  jQuery('#authSection').find('.btn-link').toggleClass('d-none');
  if (data) {
    jQuery('#userInfo').html(data.displayName);
  }
}

function onLoadEventToFetchData() {
  jQuery('body').on('click', '#logout', () => {
    updateView();
    localStorage.removeItem('userInfo');
  });

  const userInfo = localStorage.getItem('userInfo');

  if (userInfo) {
    const userData = JSON.parse(userInfo);
    updateView(userData);
  } else {
    jQuery.ajax({
      url: '/api/current_user',
      method: 'get',
      dataType: 'json',
    }).done((ResData) => {
      if (ResData) {
        const { accessToken, userName, displayName } = ResData;
        updateView({ displayName });
        localStorage.setItem('userInfo', JSON.stringify({ accessToken, userName, displayName }));
        initialPageRendering(ResData.history);
        createAlluserRepos('userRepoSection', ResData.userName);
      } else {
        console.log('Please login Again');
      }
    }).fail((jqXHR) => {
      createModelPopup({
        modalId: 'errorModal', modalHeading: `Error-${jqXHR.status}`, ClassName: 'bg-danger text-white', modalContent: 'there is login isuue', buttonName: 'Ok',
      });
    });
  }
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
