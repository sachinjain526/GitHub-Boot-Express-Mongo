
import renderUserRepos from './userReposView';
import { commonGetAjaxFunc } from '../GetDataService';
import { gitBaseUrl } from '../KeyAndPath';

function createAlluserRepos(contianerId, userName) {
  const fullurl = `${gitBaseUrl}users/${userName}/repos`;
  commonGetAjaxFunc(fullurl, (repoData) => {
    renderUserRepos(contianerId, repoData);
  });
}

export default createAlluserRepos;
