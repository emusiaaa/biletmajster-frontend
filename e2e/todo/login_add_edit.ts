import { swapBackendOnLoginPage } from '../utils/swapBackendOnLoginPage';
import { By, Key, Builder, WebDriver, until } from 'selenium-webdriver';
import { createDriver } from '../utils/createDriver';
import { forMs } from '../utils/forMs';

// CHROMEDRIVER_EXE - path to chrome driver
// CHROME_EXE - path to chrome binary
// CICD - set to 1 if run on CI/CD pipeline

const test_name = "Login, add event, edit event";

async function test_case() {
	const driver = await createDriver();
	const user = process.env.E2E_USER;
	const pass = process.env.E2E_PASS;
	const backend = process.env.BACKEND;
	if (user === undefined || pass === undefined)
		throw ("Username or password undefined.");

	// test timeout
	const timeout = setTimeout(function () {
		driver.quit();
		throw ("Timeout");
	}, 120000);

	// start the backend
	await fetch("https://biletmajster.azurewebsites.net/events");

	// main test
	await driver.get("http://localhost:3000/login");

	// wait for login form, then log in
	await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath("//button[contains(., 'Log in')]"))));
	if (backend !== undefined)
		await swapBackendOnLoginPage(driver, backend);
	await driver.findElement(By.id("email")).sendKeys(user);
	await driver.findElement(By.id("password")).sendKeys(pass, Key.ENTER);

	// Go to Add Event
	console.log("Going to Add Event...");
	await driver.wait(until.urlIs("http://localhost:3000/dashboard"));
	await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath("//button[contains(., 'Add new event')]"))), 10000);
	await driver.findElement(By.xpath("//button[contains(., 'Add new event')]")).click();

	// Create a sample event - will redirect to My Events
	console.log("Adding Event...");
	await driver.wait(until.urlIs("http://localhost:3000/events/add"));
	const eventName = "seleniumEvent" + String(Math.floor(Math.random() * 1000000));
	await forMs(1000);
	// title
	await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath("//div[contains(., 'Nazwa eventu')]/input"))), 10000);
	await driver.findElement(By.xpath("//div[contains(., 'Nazwa eventu')]/input")).sendKeys(eventName);
	// max places
	await driver.findElement(By.xpath("//div[contains(., 'Max places')]/input")).sendKeys("100");
	// latitude and longitude
	await driver.findElement(By.xpath("//div[contains(., 'Lat')]/input")).sendKeys("52", Key.TAB, "21");
	// description
	await driver.findElement(By.xpath("//div[contains(., 'Short description of event')]/textarea")).sendKeys("Selenium");
	await driver.findElement(By.xpath("//div[contains(., 'Short description of event')]/textarea")).click();
	// start and end date
	await forMs(200);
	const buttons = await driver.findElements(By.css("[aria-label='Choose date']"));
	buttons[0].click();
	await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
	await forMs(70);
	await driver.actions().sendKeys(Key.ENTER).perform();
	await forMs(70);
	await driver.actions().sendKeys(Key.ESCAPE).perform();
	await forMs(70);
	buttons[1].click();
	await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
	await forMs(70);
	await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
	await forMs(70);
	await driver.actions().sendKeys(Key.ENTER).perform();
	await forMs(70);
	await driver.actions().sendKeys(Key.ESCAPE).perform();
	await driver.actions().sendKeys(Key.ESCAPE).perform();
	// dropdown (add category)
	await driver.findElement(By.xpath("//*[@data-testid='select']")).click();
	await driver.actions().sendKeys(Key.ARROW_DOWN).perform();
	await driver.actions().sendKeys(Key.ENTER).perform();
	await driver.actions().sendKeys(Key.ESCAPE).perform();
	// submit new event
	await driver.findElement(By.xpath("//button[@type='submit']")).click();


	// Wait until event card is present, then click Edit on the event.
	console.log("Opening Edit Event form...");
	await driver.wait(until.urlIs("http://localhost:3000/events/my"));
	console.log("1...");
	await forMs(2000);
	console.log("2...");
	await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath('//div[contains(., "' + eventName + '")]'))), 5000);
	console.log("3...");
	await forMs(1000);
	await driver.findElement(By.xpath('//div[contains(@class, "MuiCard") and contains(., "' + eventName + '")]//button[@data-testid="edit-event-button"]')).click();
	console.log("4...");

	// Change title of the event - will redirect to dashboard
	console.log("Editing Event...");
	await driver.wait(until.urlContains("http://localhost:3000/events/edit"));
	const newEventName = eventName + "edited";
	// await driver.wait(until.elementTextIs(await driver.findElement(By.xpath("//div[contains(., 'Nazwa eventu')]/input")), eventName)); // wait until it loads
	await forMs(10000);
	await driver.findElement(By.xpath("//div[contains(., 'Nazwa eventu')]/input")).click();
	await driver.findElement(By.xpath("//div[contains(., 'Nazwa eventu')]/input")).sendKeys("edited");
	await driver.findElement(By.xpath("//button[@type='submit']")).click();

	// Go to My Events
	console.log("Redirecting...");
	await driver.wait(until.urlIs('http://localhost:3000/dashboard'));
	await driver.findElement(By.xpath("//button[contains(., 'My events')]")).click();

	// Check if the card with the new name is present
	console.log("Finding edited event...");
	await driver.wait(until.urlIs("http://localhost:3000/events/my"));
	await forMs(2000);
	await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath('//*[contains(., "' + newEventName + '")]'))), 10000);

	driver.close();
	driver.quit();
	console.log(test_name + " finished");
	clearTimeout(timeout);
}
test_case();

export { };
