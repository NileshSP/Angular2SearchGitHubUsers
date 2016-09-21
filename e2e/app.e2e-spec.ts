import { Angular2SearchGitHubUsersPage } from './app.po';

describe('angular2-search-git-hub-users App', function() {
  let page: Angular2SearchGitHubUsersPage;

  beforeEach(() => {
    page = new Angular2SearchGitHubUsersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
