import createGitRepository from './repoWidgets/repoWidgetServices';
import createGitIssue from './issueWidgets/issueWidgetServices';
import { createUserissueSection, EditGitIssue } from './getAndupdateAllissues/getAndupdateAllissues';
import createModelPopup from './createModal/createModalWidget';
import { getInputFromRecastAPi, updateHistory } from './GetDataService';
import { repoCreateJson, issueCreateJson, gitBaseUrl } from './KeyAndPath';
import {
  getFormData, makeFormEditable, dateConvertToDDMMYYY,
  createCommonClosedOrSubmitWidget,
} from './localUtility';
import updateCollboratersService from './collaboratorWidgets/updateCollboratersService';
import store from './reduxStore';
import { showRepoWidget, showIsuueWidget, showCollboratorWidget } from './actions';

const jQuery = require('jquery');

// callback function for service
function CreateRpeoAndIssueWidget(recastData) {
  const { source } = recastData;
  jQuery.each(recastData.intents, (index, value) => {
    const intent = value.slug;
    if (intent === 'create-repo') {
      const repoName = recastData.entities.repository;
      if (repoName) {
        store.dispatch(showRepoWidget({ repoName: repoName[0].value, source, intent }));
      } else {
        createModelPopup({
          modalId: 'errorModal',
          modalHeading: 'Error',
          ClassName: 'bg-danger text-white',
          modalContent: 'please write valid query for repository creation.',
          buttonName: 'Ok',
        });
      }
    } else if (intent === 'create-issue') {
      const issueTitle = recastData.entities.issue ? recastData.entities.issue[0].value : '';
      const repoName = recastData.entities.repository ? recastData.entities.repository[0].value : '';
      if (issueTitle && repoName) {
        store.dispatch(showIsuueWidget({
          repoName, title: issueTitle, source, intent,
        }));
      } else {
        createModelPopup({
          modalId: 'errorModal',
          modalHeading: 'Error',
          ClassName: 'bg-danger text-white',
          modalContent: 'please write valid query for issue creation',
          buttonName: 'Ok',
        });
      }
    } else if (intent === 'display-issue') {
      const { userName } = JSON.parse(localStorage.getItem('userInfo'));
      let url = `${gitBaseUrl}repos/${userName}/`;
      const target = recastData.entities.target ? recastData.entities.target[0].value : '';
      const repoName = recastData.entities.repository ? recastData.entities.repository[0].value : '';
      const state = recastData.entities.state ? recastData.entities.state[0].value : '';
      const number = recastData.entities.number ? recastData.entities.number[0].raw : 1;
      // for repo
      if (repoName) {
        url = `${url + repoName}/issues`;
        if (target === 'all' || target === 'any') {
          url += '?filter=all';
          if (state) {
            url += `${url}&state=${state}`;
          }
        } else {
          url += `${url}/${number}`;
        }
      } else {
        url = `${gitBaseUrl}user/issues?filter=all`;
        if (state) {
          url += `${url}&state=${state}`;
        } else {
          url = `${url}&state=all`;
        }
      }
      createUserissueSection('widgetSection', url, true);
    } else if (intent === 'add-collaborator') {
      const action = recastData.entities.action ? recastData.entities.action[0].value : 'PATCH';
      const repoName = recastData.entities.repository ? recastData.entities.repository[0].value : '';
      const collaboratorName = recastData.entities.newcollab ? recastData.entities.newcollab[0].value : '';
      store.dispatch(showCollboratorWidget({
        action, repoName, collaboratorName, source, intent,
      }));
    }
  });
}
function updateWidgetHtml(data) {
  createCommonClosedOrSubmitWidget(data, true);
}
function updateSuccessFully() {
  createModelPopup({
    modalId: 'completeIssueCreation', modalHeading: 'Confirmation', ClassName: 'bg-success', modalContent: "You have successfully uodated issue in the gitHub <span class='text-success'> For More Info Please Visit: www.github.com</span>", buttonName: 'Close',
  });
}
// event listener start from here
function eventListener() {
  jQuery('#queryRunner').on('click', '#submitQuery', () => {
    const inputValue = jQuery('#queryInput').val();
    getInputFromRecastAPi(inputValue, CreateRpeoAndIssueWidget);
  });
  jQuery('main').on('click', '.createRepo', function () {
    const parentElem = jQuery(this).parents('.openWidget');
    const parentId = parentElem.attr('id');
    const formData = getFormData(parentId);
    const thisData = jQuery.extend(true, {}, repoCreateJson, formData);
    createGitRepository(thisData);
    updateHistory('PATCH', parentId, { result: 'Submitted', modifiedDate: dateConvertToDDMMYYY(new Date()) }, updateWidgetHtml);
  });
  jQuery('main').on('click', '.createIssue', function () {
    const parentElem = jQuery(this).parents('.openWidget');
    const parentId = parentElem.attr('id');
    const getRepoName = parentElem.attr('repo');
    const formData = getFormData(parentId);
    const thisData = jQuery.extend(true, {}, issueCreateJson, formData);
    createGitIssue(thisData, getRepoName);
    updateHistory('PATCH', parentId, { result: 'Submitted', modifiedDate: dateConvertToDDMMYYY(new Date()) }, updateWidgetHtml);
  });
  jQuery('main').on('click', '.collaboratorSubmit', function () {
    const parentElem = jQuery(this).parents('.openWidget');
    const parentId = parentElem.attr('id');
    const formData = getFormData(parentId);
    updateCollboratersService(formData);
    updateHistory('PATCH', parentId, { result: 'Submitted', modifiedDate: dateConvertToDDMMYYY(new Date()) }, updateWidgetHtml);
  });
  jQuery('main').on('click', '.cancelWidget', function () {
    const thisElm = jQuery(this).parents('.openWidget');
    const widgetId = thisElm.attr('id');
    updateHistory('PATCH', widgetId, { result: 'Closed', modifiedDate: dateConvertToDDMMYYY(new Date()) }, updateWidgetHtml);
  });
  jQuery('#mainNavBar').on('click', '#AllIssue', () => {
    createUserissueSection('userIsuueContainer', `${gitBaseUrl}user/issues?filter=all&state=all`);
  });
  jQuery('body').on('click', '.modalClose', function () {
    const modalId = jQuery(this).parents('.modal').attr('id');
    jQuery(`#${modalId}`).on('hidden.bs.modal', function () {
      jQuery(this).remove();
    });
  });
  jQuery('body').on('click', '.editSection', function () {
    const thisObj = jQuery(this);
    const containerId = thisObj.attr('container-id');
    makeFormEditable(containerId);
    thisObj.siblings('.submitSection').removeClass('d-none');
    thisObj.addClass('d-none');
  });
  jQuery('body').on('click', '.submitSection', function () {
    const thisObj = jQuery(this);
    const containerId = thisObj.attr('container-id');
    const url = thisObj.parent().attr('api-url');
    const formData = getFormData(containerId);
    const thisData = jQuery.extend(true, {}, issueCreateJson, formData);
    EditGitIssue(url, thisData, () => {
      updateHistory('PATCH', containerId, { ...thisData, modifiedDate: dateConvertToDDMMYYY(new Date()) }, updateSuccessFully);
    });
  });
  jQuery('body').on('click', '.closeThisIsuue', function () {
    const thisObj = jQuery(this);
    const containerId = thisObj.attr('container-id');
    const url = thisObj.parent().attr('api-url');
    EditGitIssue(url, { state: 'closed' }, () => {
      updateHistory('PATCH', containerId, { state: 'closed', modifiedDate: dateConvertToDDMMYYY(new Date()) }, updateSuccessFully);
    });
  });
  jQuery('body').on('click', '.reopenThisIsuue', function () {
    const thisObj = jQuery(this);
    const containerId = thisObj.attr('container-id');
    const url = thisObj.parent().attr('api-url');
    EditGitIssue(url, { state: 'open' }, () => {
      updateHistory('PATCH', containerId, { state: 'open', modifiedDate: dateConvertToDDMMYYY(new Date()) }, updateSuccessFully);
    });
  });
}

export default eventListener;
