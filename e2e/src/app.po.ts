import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(destination) {
    console.log("browser find", browser)
    return browser.get(destination);
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }
}
