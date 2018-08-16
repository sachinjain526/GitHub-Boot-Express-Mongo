import { commonPostAjaxFunc } from '../GetDataService';
import { gitBaseUrl } from '../KeyAndPath';
import createModelPopup from '../createModal/createModalWidget';

function completeIssueCreation() {
  createModelPopup({
    modalId: 'completeIssueCreation', modalHeading: 'Confirmation', ClassName: 'bg-success', modalContent: "You have successfully created issue in repository the gitHub <span class='text-success'> For More Info Please Visit: www.github.com</span>", buttonName: 'Close',
  });
}
function createGitIssue(passData, repoName) {
  let url = `${gitBaseUrl}repos/sachinjain526/${repoName}/issues`;
  url = url.replace(/\s/g, '');
  commonPostAjaxFunc(url, 'POST', passData, completeIssueCreation);
}
export default createGitIssue;
