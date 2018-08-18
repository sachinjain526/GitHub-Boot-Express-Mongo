import { gitBaseUrl, gitApiToken } from '../KeyAndPath';
import createModelPopup from '../createModal/createModalWidget';
import { getErrorDescription } from '../localUtility';

const jQuery = require('jquery');

function collaboratorCallback() {
  createModelPopup({
    modalId: 'collaboraterAddedSuccesfully', modalHeading: 'Confirmation', ClassName: 'bg-success', modalContent: 'You have successfully uodated repositories collaborater in the gitHub <span class="text-success"> For More Info Please Visit: www.github.com</span>', buttonName: 'Close',
  });
}
function updateCollboratersService(collaborator) {
  const { userName } = JSON.parse(localStorage.getItem('userInfo'));
  jQuery.ajax({
    header: { 'Content-Length': 0 },
    url: `${gitBaseUrl}repos/${userName}/${collaborator.collaboraterRepo}/collaborators/${collaborator.collaboraterName}`,
    method: collaborator.collaboraterAction,
    dataType: 'json',
    mode: 'cors',
    beforeSend(xhr) { xhr.setRequestHeader('Authorization', `BEARER ${gitApiToken}`); },
  }).done((responseData) => {
    collaboratorCallback(responseData);
  }).fail((jqXHR) => {
    createModelPopup({
      modalId: 'errorModal', modalHeading: `Error-${jqXHR.status}`, ClassName: 'bg-danger text-white', modalContent: getErrorDescription(jqXHR.status), buttonName: 'Ok',
    });
  });
}

export default updateCollboratersService;
