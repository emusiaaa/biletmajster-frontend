import { By, Key, Builder, WebDriver, until } from 'selenium-webdriver';
import { createDriver } from './utils/createDriver';

// CHROMEDRIVER_EXE - path to chrome driver
// CHROME_EXE - path to chrome binary
// CICD - set to 1 if run on CI/CD pipeline

const test_name = "Login, add event, edit event";

async function test_case() {
	const driver = await createDriver();
	const user = process.env.E2E_USER;
	const pass = process.env.E2E_PASS;
	if (user === undefined || pass === undefined)
		throw ("Username or password undefined.");

	// test timeout
	const timeout = setTimeout(function () {
		driver.quit();
		throw ("Timeout");
	}, 20000);

	// main test
	await driver.get("http://localhost:3000/login");

	// wait for login form, then log in
	await driver.wait(until.elementIsVisible(await driver.findElement(By.linkText("Log in"))));
	await driver.findElement(By.id("email")).sendKeys(user);
	await driver.findElement(By.id("password")).sendKeys(pass, Key.ENTER);

	// Go to Add Event
	await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath("//button[contains(., 'Add new event)]"))));
	await driver.findElement(By.xpath("//button[contains(., 'Add new event')]")).click();

	// Create a sample event - will redirect to My Events
	const eventName = "seleniumEvent" + String(Math.floor(Math.random() * 1000000));
	// title
	await driver.findElement(By.xpath("//*[@id=':r2:']")).sendKeys(eventName);
	// max places
	await driver.findElement(By.xpath("//*[@id=':r8:']")).sendKeys("100");
	// latitude and longitude
	await driver.findElement(By.xpath("//*[@id=':r9:']")).sendKeys("52", Key.TAB, "21");
	// description
	await driver.findElement(By.xpath("//*[@id=':r3:']")).sendKeys("Selenium");
	// start and end date
	await driver.actions().sendKeys(Key.TAB).perform();
	await driver.actions().sendKeys(Key.ENTER).perform();
	await driver.actions().sendKeys(Key.ENTER).perform();
	await driver.actions().sendKeys(Key.TAB).perform();
	await driver.actions().sendKeys(Key.TAB).perform();
	await driver.actions().sendKeys(Key.TAB).perform();
	await driver.actions().sendKeys(Key.ENTER).perform();
	await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
	await driver.actions().sendKeys(Key.ENTER).perform();
	// dropdown (add category)
	await driver.findElement(By.xpath("//*[@data-testid='select']")).click();
	await driver.actions().sendKeys(Key.ARROW_DOWN).perform();
	await driver.actions().sendKeys(Key.ENTER).perform();
	await driver.actions().sendKeys(Key.ESCAPE).perform();
	await driver.findElement(By.xpath("//*[@data-testid='open-form-btn']")).click();
	// submit new event
	await driver.findElement(By.xpath("//button[@type='submit]")).click();


	// Wait until event card is present, then click Edit on the event.
	// await driver.wait(until.urlIs("http://localhost:3000/events/my"));
	await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath('//div[contains(@class, "MuiCard-root") and contains(., "' + eventName + '")]'))));
	await driver.findElement(By.xpath('//div[contains(@class, "MuiCard-root") and contains(., "' + eventName + '")]//button[@data-testid="edit-event-button"]')).click();

	// Change title of the event - will redirect to dashboard
	const newEventName = eventName + "edited";
	await driver.wait(until.elementTextIs(await driver.findElement(By.xpath("//*[@id=':r2:']")), eventName)); // wait until it loads
	await driver.findElement(By.xpath("//*[@id=':r2:']")).click();
	await driver.findElement(By.xpath("//*[@id=':r2:']")).clear();
	await driver.findElement(By.xpath("//*[@id=':r2:']")).sendKeys(newEventName);
	await driver.findElement(By.xpath("//button[@type='submit]")).click();

	// Go to My Events
	await driver.wait(until.urlIs('http://localhost:3000/dashboard'));
	await driver.findElement(By.xpath("//button[contains(., 'My events')]")).click();

	// Check if the card with the new name is present
	await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath('//div[contains(@class, "MuiCard-root") and contains(., "' + newEventName + '")]'))));

	driver.close();
	driver.quit();
	console.log(test_name + " finished");
	clearTimeout(timeout);
}
test_case();

export { };
