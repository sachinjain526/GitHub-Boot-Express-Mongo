import { commonPostAjaxFunc, commonGetAjaxFunc } from '../GetDataService';
import renderIsuueWidgets from './userIssueWidgetView';

let containerId = '';
let updateFlag = null;

function renderIssueWidget(resData) {
  renderIsuueWidgets(containerId, resData, updateFlag);// "userIsuueContainer"
}

function getAllUserIssue(fullurl, callback) {
  commonGetAjaxFunc(fullurl, callback);
}

function EditGitIssue(url, passData, updateSuccessFully) {
  commonPostAjaxFunc(url, 'patch', passData, updateSuccessFully);
}
function createUserissueSection(container, fullUrl, updateFlags) {
  containerId = container;
  updateFlag = updateFlags;
  getAllUserIssue(fullUrl, renderIssueWidget);
}

export { createUserissueSection, EditGitIssue };
