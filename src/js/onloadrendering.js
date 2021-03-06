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
import { getHistory } from './GetDataService';

const jQuery = require('jquery');

function initialPageRendering(data) {
  jQuery.each(data, (index, value) => {
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
  if (data) {
    jQuery('#mainNavBar').removeClass('d-none');
    jQuery('#queryRunner').html(` <div class='container'>
    <h1 class=''>Write Your Query</h1>
    <form class='form-inline w-100 m-auto'>
        <input class='form-control  w-75 mr-2' type='search' placeholder='Type your query..' aria-label='Search' id='queryInput'
            required>
        <button class='btn btn-success my-2' type='button' id='submitQuery'>Run Query</button>
    </form>
</div>`);
    jQuery('#authSection').html(`
    <a class='btn btn-link my-2 my-sm-0 mr-2' href='#'><img src='${data.photoUrl}' alt='user images'/><span class='d-none'>${data.displayName}</spna></a>
    <a class='btn btn-danger my-2 my-sm-0 mr-2' href='/logout' id='logout'>LogOut</a>`);
  } else {
    jQuery('#mainNavBar').addClass('d-none');
    jQuery('#queryRunner').html(` <div class='container'>
        <h1 class=''>Welcome to Git Hub Boot</h1>
        <h4 class='text-danger'> To be continue..</h4>
        <a class='btn btn-primary my-2 my-sm-0 mr-2' href='/auth/github'>Login With GitHub</a>
    </div>`);
    jQuery('#authSection').html('');
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
    getHistory(initialPageRendering);
    createAlluserRepos('userRepoSection', userData.userName);
  } else {
    jQuery.ajax({
      url: '/api/current_user',
      method: 'get',
      dataType: 'json',
    }).done((ResData) => {
      if (ResData) {
        const {
          accessToken, userName, displayName, photoUrl, jwtToken,
        } = ResData;
        updateView({ displayName });
        localStorage.setItem('userInfo', JSON.stringify({
          accessToken, userName, displayName, photoUrl, jwtToken,
        }));
        initialPageRendering(ResData.history);
        createAlluserRepos('userRepoSection', ResData.userName);
      }
    }).fail((jqXHR) => {
      console.log(jqXHR);
      updateView();
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
