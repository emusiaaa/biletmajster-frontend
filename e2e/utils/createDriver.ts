import { By, Key, Builder, WebDriver, until } from 'selenium-webdriver';

// CHROMEDRIVER_EXE - path to chrome driver
// CHROME_EXE - path to chrome binary
// CICD - set to 1 if run on CI/CD pipeline

export async function createDriver() {
  // config
  const customBinary = process.env['CHROME_EXE'];
  const isPipeline = process.env['CICD'] === '1';
  const chrome = require('selenium-webdriver/chrome');
  const builder = new Builder().forBrowser('chrome');
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments('--disable-gpu')
  if (isPipeline) {
    chromeOptions.headless();
    chromeOptions.addArguments('--window-size=1280x720');
    chromeOptions.addArguments("start-maximized");
  }
  if (customBinary !== undefined) {
    chromeOptions.setChromeBinaryPath(customBinary);
  }
  builder.setChromeOptions(chromeOptions);
  return await builder.build();
}
