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
function createCollaboratorWidgets(collaboratorData) {
    let componentId = '';
    if (collaboratorData && collaboratorData.id) {
        componentId = collaboratorData.id;
    } else {
        componentId = `collaboratorWidget-${generateRandomId()}`;
        const passedData = { ...collaboratorData, id: componentId };
        saveDataInHistory(passedData);
    }
    jQuery('#widgetSection').prepend(`
    <div class="p-3 my-3 mx-auto rounded openWidget" id="${componentId}">
            <h3 class="text-center mt-2 mb-4 text-dark"> Create Collaborator </h3>
            <form method="post" action="#" class="w-100 text-center">
                <div class="form-group row">
                    <label for="${componentId}-action" class="col-sm-3 col-form-label">Action</label>
                    <div class="col-sm-9">
                        <select type="text" class="form-control" id="${componentId}-action"  data-name="collaboraterAction" value="${collaboratorData.action}">
                            <option value="PUT">Add Collaborater</option>
                            <option value="DELETE">Remove Collaborater</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="${componentId}-newcollab" class="col-sm-3 col-form-label">Collaborater Name</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="${componentId}-newcollab" placeholder="Enter Collaborater user name.." data-name="collaboraterName" value="${collaboratorData.collaboratorName ? collaboratorData.collaboratorName : ''}">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="${componentId}-collabRepo" class="col-sm-3 col-form-label">Repository Name</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="${componentId}-collabRepo" placeholder="Enter Repository name.." data-name="collaboraterRepo" value="${collaboratorData.repoName ? collaboratorData.repoName : ''}">
                    </div>
                </div>
                <div class="form-group text-center ">
                    <button type="button" class="btn btn-success collaboratorSubmit">Add Collaborator</button>
                    <button type="button" class="btn btn-danger cancelWidget">Close</button>
                </div>
            </form>         
        </div>`);
}
export default createCollaboratorWidgets;
