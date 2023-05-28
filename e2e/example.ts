import { By, Key, Builder, WebDriver, until } from 'selenium-webdriver';

// CHROMEDRIVER_EXE - path to chrome driver
// CHROME_EXE - path to chrome binary
// CICD - set to 1 if run on CI/CD pipeline

const test_name = "Example test";

async function test_case() {
	// config
	const customBinary = process.env['CHROME_EXE'];
	const isPipeline = process.env['CICD'] === '1';
	console.log("Running " + test_name + isPipeline ? " in pipeline" : "");
	const chrome = require('selenium-webdriver/chrome');
	const builder = new Builder().forBrowser('chrome');
	const chromeOptions = new chrome.Options();
	chromeOptions.addArguments('--disable-gpu')
	if (isPipeline) {
		chromeOptions.headless();
		chromeOptions.addArguments('window-size=1920x1080');
	}
	if (customBinary !== undefined) {
		chromeOptions.setChromeBinaryPath(customBinary);
	}
	builder.setChromeOptions(chromeOptions);
	const driver = await builder.build();

	// main test
	await driver.get("https://www.duckduckgo.com");

	await driver.wait(until.elementIsVisible(await driver.findElement(By.id("search_form_input_homepage"))) /* here: optional timeout? */);
	const searchBar = await driver.findElement(By.id("search_form_input_homepage"));
	searchBar.sendKeys("Selenium", Key.RETURN);

	setTimeout(function () {
		driver.quit();
		console.log(test_name + " finished");
	}, 10000);
}
test_case();

export { };