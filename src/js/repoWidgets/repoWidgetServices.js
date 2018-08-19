import { commonPostAjaxFunc } from '../GetDataService';
import { gitBaseUrl } from '../KeyAndPath';
import createModelPopup from '../createModal/createModalWidget';
import renderUserRepos from '../getAlluserRepos/userReposServices';

function createGitRepository(passData) {
  const url = `${gitBaseUrl}user/repos`;
  commonPostAjaxFunc(url, 'POST', passData, (repoData) => {
    createModelPopup({
      modalId: 'completeIssueCreation', modalHeading: 'Confirmation', ClassName: 'bg-success', modalContent: "You have successfully created repository in the gitHub <span class='text-success'> For More Info Please Visit: www.github.com</span>", buttonName: 'Close',
    });
    renderUserRepos('userRepoSection', repoData);
  });
}
export default createGitRepository;
