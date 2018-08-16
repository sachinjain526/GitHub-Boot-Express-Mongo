import { dateConvertToDDMMYYY } from '../localUtility';
import { saveHistory } from '../GetDataService';

const jQuery = require('jquery');

function renderIsuueWidgets(containerId, issues, updateFlag, historyLoad) {
    let resData = [];
    if (!(issues && issues.length)) {
        resData = [issues];
    } else {
        resData = issues;
    }
    let issueHtml = '';
    jQuery.each(resData, (index, data) => {
        const {
            id, url, html_url,
            number, created_at, author_association,
            state, updated_at, assignees, closed_at, title, body,
        } = data;

        issueHtml = `${issueHtml}  <section class="${updateFlag ? 'm-2' : 'col-6'} issuesection border border-secondary p-3 text-center font-weight-bold rounded" id="${id}" data-issue-url="${url}">
        <a href="${html_url}" target="_blank">
            <h4>Issue Number : #${number}</h4>
        </a>
        <div class="d-flex border-bottom  border-top  border-info text-left my-2">
            <div class="col-6 px-3 border-right  border-info">
                <p>Created:
                    <span class="text-success">${dateConvertToDDMMYYY(created_at)}</span>
                </p>
                <p> Owner:
                    <span class="text-success">${author_association}</span>
                </p>
                <p>State:
                    <span class="text-success">${state}</span>
                </p>
            </div>
            <div class="col-6 px-3">
                <p>Last Updated:
                    <span class="text-success">${dateConvertToDDMMYYY(updated_at)}</span>
                </p>
                <p>assignees:
                    <span class="text-success">${assignees}</span>
                </p>
                <p>Closed At :
                    <span class="text-danger">${dateConvertToDDMMYYY(closed_at)}</span>
                </p>
            </div>
            <p class="d-none"></p>
        </div>

        <div class="form-group row">
            <label for="issueTitle-issuenumber" class="col-sm-3 col-form-label">Title</label>
            <div class="col-sm-9">
                <input readonly type="text" class="form-control" id="issueTitle-issuenumber" placeholder="Enter title.." data-name="title"
                    value="${title}">
            </div>
        </div>
        <div class="form-group row">
            <label for="issueDescription-issuenumber" class="col-sm-3 col-form-label">Issue Description</label>
            <div class="col-sm-9">
                <textarea readonly name="openissueDescription" id="issueDescription-issuenumber" rows="5" class="w-100" data-name="body">${body}</textarea>
            </div>
        </div>

        <div class="button-section" api-url="${url}">
            <button type="button" class="btn btn-success submitSection px-5 my-1 d-none" container-id="${id}">Submit</button>
            <button type="button" class="btn btn-dark editSection px-5 my-1" container-id="${id}">Edit</button>
            <button type="button" class="btn btn-danger px-5 my-1 closeThisIsuue ${state !== 'closed' ? '' : 'd-none'}" container-id="${id}">Close Issue</button>
            <button type="button" class="btn btn-primary px-5 my-1 reopenThisIsuue ${state === 'closed' ? '' : 'd-none'}" container-id="${id}">Reopen Issue</button>
        </div>
        </section>`;
        if (updateFlag && (!jQuery(`#${id}`).length)) {
            if (!historyLoad) {
                saveHistory({
                    id,
                    url,
                    html_url,
                    number,
                    created_at,
                    author_association,
                    state,
                    updated_at,
                    assignees,
                    closed_at,
                    title,
                    body,
                    intent: 'display-issues',
                    createDate: dateConvertToDDMMYYY(new Date()),
                    modifiedDate: dateConvertToDDMMYYY(new Date()),
                });
            }
            jQuery(`#${containerId}`).prepend(issueHtml);
        }
    });
    if (!updateFlag) {
        jQuery(`#${containerId}`).html(issueHtml);
    }
}
export default renderIsuueWidgets;
