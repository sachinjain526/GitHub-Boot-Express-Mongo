const jQuery = require('jquery');

function getFormData(containerId) {
  const formObj = {};
  jQuery(`#${containerId}`).find('input,select,textarea').each(function () {
    const thisObj = jQuery(this);
    const dataname = thisObj.attr('data-name');
    let thisVal = thisObj.val();
    const type = thisObj.attr('type');
    if (type === 'checkbox' || type === 'radio') {
      thisVal = thisObj.prop('checked');
    }
    if (thisObj.attr('data-type') === 'array') {
      thisVal = thisObj.val().split(',');
    }
    formObj[dataname] = thisVal;
  });
  return formObj;
}

function makeFormEditable(containerId) {
  const formObj = {};
  jQuery(`#${containerId}`).find('input,select,textarea').each(function () {
    const thisObj = jQuery(this);
    thisObj.removeAttr('readonly');
    thisObj.removeAttr('disabled');
  });
  return formObj;
}
function pad(s) {
  return (s < 10) ? `0${s}` : s;
}
function dateConvertToDDMMYYY(date) {
  if (date) {
    const d = new Date(date);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
  }
  return '';
}

function setDataToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getDataToLocalStorage(key) {
  return localStorage[key];
}
function generateRandomId() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 8; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function getErrorDescription(statusCode) {
  let statusDesc = '';
  switch (statusCode) {
    case 204:
      statusDesc = 'Successfully Delete Collaborater from repository.';
      break;
    case 404:
      statusDesc = 'Serach repository/issue not found. Please Try Again!.';
      break;
    case 400:
      statusDesc = 'Bad Request-Please passed the correct data to complete this action. And Try Again!.';
      break;
    case 401:
      statusDesc = 'Unauthorized-Please input correct Authrization to complete this action. And Try Again!.';
      break;
    case 403:
      statusDesc = 'server locked and other reasons. Please Try after some time!.';
      break;
    case 500:
      statusDesc = 'Server under mantainance. Please Try after some time!.';
      break;
    default:
      statusDesc = 'there is some Issue with passing data. We will comeback shortly';
  }
  return statusDesc;
}
function createCommonClosedOrSubmitWidget(widgetData, update) {
  const widgetInternalHtml = `
  <h5 class='text-center mt-2 mb-4 text-info'>This widget has been
  <span class='${widgetData.result.toLowerCase() === 'closed' ? 'text-danger' : 'text-success'} font-weight-bold'> ${widgetData.result} </span></h5>
  <p class='text-center font-weight-bold text-dark'>The query was:
      <span class='text-success'>${widgetData.source}</span>
  </p>
  <p class='d-inline font-weight-bold text-dark'>Create Date:
      <span class='text-success'>${widgetData.createDate}</span>
  </p>
  <p class='d-inline float-right mr-2 font-weight-bold text-dark'>Modified Date:
      <span class='text-success'>${widgetData.modifiedDate}</span>
  </p>`;
  if (update) {
    jQuery(`#${widgetData.id}`).html(widgetInternalHtml)
      .removeClass('openWidget').addClass('closedWidget')
      .attr('id', `closed-${widgetData.id}`);
  } else {
    const widgetHtml = ` <div class='p-3 my-3 mx-auto border border-info rounded  closedWidget' 
    id='closed-${widgetData.id}'>${widgetInternalHtml}</div>`;
    jQuery('#widgetSection').prepend(widgetHtml);
  }
}
export {
  generateRandomId,
  getFormData,
  createCommonClosedOrSubmitWidget,
  makeFormEditable,
  dateConvertToDDMMYYY,
  setDataToLocalStorage,
  getDataToLocalStorage,
  getErrorDescription,
};
