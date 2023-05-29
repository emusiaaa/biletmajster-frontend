import { By, Key, Builder, WebDriver, until } from 'selenium-webdriver';
import { createDriver } from './utils/createDriver';

// CHROMEDRIVER_EXE - path to chrome driver
// CHROME_EXE - path to chrome binary
// CICD - set to 1 if run on CI/CD pipeline

const test_name = "Example test";

async function test_case() {
	const driver = await createDriver();

	// main test
	await driver.get("https://www.duckduckgo.com");

	// test timeout
	const timeout = setTimeout(function () {
		driver.quit();
		throw ("Timeout");
	}, 10000);

	await driver.wait(until.elementIsVisible(await driver.findElement(By.id("search_form_input_homepage"))) /* here: optional timeout? */);
	const searchBar = await driver.findElement(By.id("search_form_input_homepage"));
	await searchBar.sendKeys("Selenium", Key.RETURN);

	driver.close();
	driver.quit();
	console.log(test_name + " finished");
	clearTimeout(timeout);
}
test_case();

export { };
