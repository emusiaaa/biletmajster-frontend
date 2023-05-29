
const {By, Key, Builder, until } = require("selenium-webdriver");
require("chromedriver");

const forMs = async (ms) => new Promise(resolve => setTimeout(() => resolve(), ms));

async function test_case() {
	let driver = await new Builder().forBrowser("chrome").build();

	await driver.get("http://localhost:3000/");

	// log in
	await driver.findElement(By.linkText("LOG IN")).click();
	await driver.findElement(By.id("email")).sendKeys("tommy.sh500@gmail.com", Key.TAB);
	await driver.findElement(By.id("password")).sendKeys("password1234",
		Key.TAB, Key.TAB, Key.TAB, Key.ENTER, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ENTER, Key.TAB, Key.TAB, Key.TAB);
	// await driver.findElement(By.partialLinkText("Log")).click();
	await driver.findElement(By.xpath("//button[normalize-space()='Log in']")).click();
	await forMs(2000);

	// navigate to my events
	await driver.findElement(By.xpath("//button[normalize-space()='Add new event']")).click();
	await forMs(2000);

	// add new event

	// title
	await driver.findElement(By.xpath("//*[@id=':r2:']")).sendKeys("Spotkanie w break6");
	// max places
	await driver.findElement(By.xpath("//*[@id=':r8:']")).sendKeys("100");
	// latitude and longitude
	await driver.findElement(By.xpath("//*[@id=':r9:']")).sendKeys("52", Key.TAB, "21");
	// description
	await driver.findElement(By.xpath("//*[@id=':r3:']")).sendKeys("Selenium description of event", Key.TAB);
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
	// await driver.findElement(By.xpath("//*[@data-testid='open-form-btn']")).click(); - add new category
	
	// submit new event
	await driver.findElement(By.xpath("//*[@data-testid='add-btn']")).click();
	await forMs(3000);

	// refresh my events page
	await driver.wait(until.elementIsVisible(await driver.findElement(
		By.xpath('//div[contains(@class, "MuiCard-root") and contains(., "Spotkanie w break6")]//button[@data-testid="edit-event-button"]'))));

	setTimeout(async function() {
		await driver.quit();
	}, 5000);
}

test_case();