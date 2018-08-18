import jQuery from 'jquery';
import { generateRandomId, dateConvertToDDMMYYY } from '../localUtility';
import { saveHistory } from '../GetDataService';

function saveDataInHistory(passedData) {
    const postData = {
        createDate: dateConvertToDDMMYYY(new Date()),
        modifiedDate: dateConvertToDDMMYYY(new Date()),
        result: null,
        ...passedData,
    };
    saveHistory(postData);
}

function createIssueWidgets(issueData) {
    let componentId = '';
    if (issueData && issueData.id) {
        componentId = issueData.id;
    } else {
        componentId = `issueWidget-${generateRandomId()}`;
        const passedData = { ...issueData, id: componentId };
        saveDataInHistory(passedData);
    }
    jQuery('#widgetSection').prepend(`
        <div class="p-3 my-3 mx-auto rounded openWidget" id="${componentId}" repo="${issueData.repoName}">
            <h3 class="text-center mt-2 mb-4 text-dark"> Create Issue </h3>
                <form method="post" action="#" class="w-100 text-center">
                    <div class="form-group row">
                        <label for="${componentId}-title" class="col-sm-3 col-form-label">Title</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="${componentId}-title" placeholder="Enter title.." value="${issueData.title}" data-name="title">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="${componentId}-body" class="col-sm-3 col-form-label">Body</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="${componentId}-body" placeholder="Enter issue body.." data-name="body">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="${componentId}-label" class="col-sm-3 col-form-label">Issue Type</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="${componentId}-label" placeholder="Enter Comma Saparated issue type.." data-type="array" data-name="labels" >
                        </div>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary createIssue">Create Isuue</button>
                        <button type="button" class="btn btn-danger cancelWidget">Cancel</button>
                    </div>
                </form>
            </div> `);
}

export default createIssueWidgets;
