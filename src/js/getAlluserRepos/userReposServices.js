
import renderUserRepos from './userReposView';
import { commonGetAjaxFunc } from '../GetDataService';
import { gitBaseUrl } from '../KeyAndPath';

let contianerId = '';
function getServiceData(repoData) {
  renderUserRepos(contianerId, repoData);
}
function getAllUserRepo() {
  const fullurl = `${gitBaseUrl}users/sachinjain526/repos`;
  commonGetAjaxFunc(fullurl, getServiceData);
}
function createAlluserRepos(contianer) {
  contianerId = contianer;
  getAllUserRepo();
}

export default createAlluserRepos;
