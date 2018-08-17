import { gitApiToken, baseUrl } from './KeyAndPath';
import { getErrorDescription } from './localUtility';
import createModelPopup from './createModal/createModalWidget';

const jQuery = require('jquery');
// ajax common function
function commonPostAjaxFunc(url, mehtod, postData, callback) {
  jQuery.ajax({
    url,
    method: mehtod,
    data: JSON.stringify(postData),
    dataType: 'json',
    mode: 'cors',
    beforeSend(xhr) { xhr.setRequestHeader('Authorization', `BEARER ${gitApiToken}`); },
  }).done((responseData) => {
    callback(responseData);
  }).fail((jqXHR) => {
    createModelPopup({
      modalId: 'errorModal', modalHeading: `Error-${jqXHR.status}`, ClassName: 'bg-danger text-white', modalContent: getErrorDescription(jqXHR.status), buttonName: 'Ok',
    });
  });
}
function commonGetAjaxFunc(url, callback) {
  jQuery.ajax({
    headers: {
      'Content-Type': 'application/json',
    },
    url,
    method: 'get',
    dataType: 'json',
    mode: 'cors',
    beforeSend(xhr) { xhr.setRequestHeader('Authorization', `BEARER ${gitApiToken}`); },
  }).done((responseData) => {
    callback(responseData);
  }).fail((jqXHR) => {
    createModelPopup({
      modalId: 'errorModal', modalHeading: `Error-${jqXHR.status}`, ClassName: 'bg-danger text-white', modalContent: getErrorDescription(jqXHR.status), buttonName: 'Ok',
    });
  });
}
function getInputFromRecastAPi(input, callback) {
  jQuery.ajax({
    headers: {
      'Content-Type': 'application/json',
    },
    url: `https://api.recast.ai/v2/request?text=${input}`,
    method: 'post',
    mode: 'cors',
    beforeSend(xhr) { xhr.setRequestHeader('Authorization', 'Token 82f3ba26a2d8e73677febb5f93528372'); },
  }).done((response) => {
    callback(response.results);
  }).fail((jqXHR) => {
    createModelPopup({
      modalId: 'errorModal', modalHeading: `Error-${jqXHR.status}`, ClassName: 'bg-danger text-white', modalContent: getErrorDescription(jqXHR.status), buttonName: 'Ok',
    });
  });
}
function saveHistory(passData) {
  jQuery.ajax({
    url: `${baseUrl}create/history`,
    method: 'POST',
    data: passData,
    dataType: 'json',
  }).done(() => {
    createModelPopup({
      modalId: 'historymade', modalHeading: 'Confirmation', ClassName: 'bg-success', modalContent: 'You have successfully updated history ', buttonName: 'Close',
    });
  }).fail((jqXHR) => {
    createModelPopup({
      modalId: 'errorModal', modalHeading: `Error-${jqXHR.status}`, ClassName: 'bg-danger text-white', modalContent: 'There is something missing to update history', buttonName: 'Ok',
    });
  });
}
function updateHistory(method, historyId, passData, callback) {
  jQuery.ajax({
    url: `${baseUrl}update/history/${historyId}`,
    method,
    dataType: 'json',
    data: passData,
  }).done((response) => {
    if (callback) {
      callback(response);
    }
    // createModelPopup({
    //   modalId: 'historymade', modalHeading: 'Confirmation', ClassName: 'bg-success',
    //  modalContent: 'You have successfully updated history ', buttonName: 'Close',
    // });
  }).fail((jqXHR) => {
    createModelPopup({
      modalId: 'errorModal', modalHeading: `Error-${jqXHR.status}`, ClassName: 'bg-danger text-white', modalContent: 'There is something missing to update history', buttonName: 'Ok',
    });
  });
}
export {
  commonGetAjaxFunc, commonPostAjaxFunc, getInputFromRecastAPi,
  updateHistory, saveHistory,
};
