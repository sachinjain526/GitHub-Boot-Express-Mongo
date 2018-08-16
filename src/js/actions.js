export const CREATE_REPO = 'CREATE_REPOWIDGET';
export const CREATE_ISSUE = 'CREATE_ISSUEWIDGET';
export const ADD_COLLABORATOR = 'ADD_COLLABORATORWIDGET';
export const shiftToTop = {
  SHOW_REPO_WIDGET: 'SHOW_REPO_WIDGET',
  SHOW_ISSUE_WIDGET: 'SHOW_ISSUE_WIDGET',
};

export function showRepoWidget(obj) {
  return { type: CREATE_REPO, payload: obj };
}
export function showIsuueWidget(obj) {
  return { type: CREATE_ISSUE, payload: obj };
}
export function showCollboratorWidget(obj) {
  return { type: ADD_COLLABORATOR, payload: obj };
}
export function shiftToTopWidget(obj) {
  return { type: shiftToTop, obj };
}
