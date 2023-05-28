import { By, Key, Builder, WebDriver, until } from 'selenium-webdriver';

// CHROMEDRIVER_EXE - path to chrome driver
// CHROME_EXE - path to chrome binary
// CICD - set to 1 if run on CI/CD pipeline

async function test_case() {
	// config
	let driverSetup: WebDriver | undefined = undefined;
	const customBinary = process.env['CHROME_EXE'];
	const isPipeline = process.env['CICD'] === '1';
	if (customBinary !== undefined) {
		const builder = new Builder().forBrowser('chrome');
		const chrome = require('selenium-webdriver/chrome');

		const chromeOptions = new chrome.Options();
		chromeOptions.setChromeBinaryPath(customBinary);
		chromeOptions.addArguments('--disable-gpu')
		if (isPipeline) {
			chromeOptions.headless();
			chromeOptions.addArguments('window-size=1920x1080');
		}
		builder.setChromeOptions(chromeOptions);
		driverSetup = await builder.build();
	} else {
		driverSetup = await new Builder()
			.forBrowser("chrome")
			.build();
	}

	// main test
	const driver = driverSetup as WebDriver;
	await driver.get("https://www.duckduckgo.com");

	await driver.wait(until.elementIsVisible(await driver.findElement(By.id("search_form_input_homepage"))) /* here: optional timeout? */);
	const searchBar = await driver.findElement(By.id("search_form_input_homepage"));
	searchBar.sendKeys("Selenium", Key.RETURN);

	setTimeout(function () {
		driver.quit();
		console.log("Finished");
	}, 10000);
}
test_case();

export { };