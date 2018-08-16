const gitBaseUrl = 'https://api.github.com/';
const gitApiToken = '6082c09a0b663c268436fb1505c2032e45d6cab8';
const baseUrl = '/api/';
const repoCreateJson = {
  name: 'Hello-World',
  description: 'This is your first repository',
  homepage: 'https://github.com',
  private: false,
  has_issues: true,
  has_projects: true,
  has_wiki: true,
};
const issueCreateJson = {
  title: 'Found a bug',
  body: "I'm having a problem with this.",
  labels: [
    'bug',
  ],
};

export {
  gitBaseUrl, gitApiToken, repoCreateJson, issueCreateJson, baseUrl,
};
