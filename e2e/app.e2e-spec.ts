import { AngularClientSideAuthenticationPage } from './app.po';

describe('angular-client-side-authentication App', () => {
  let page: AngularClientSideAuthenticationPage;

  beforeEach(() => {
    page = new AngularClientSideAuthenticationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
