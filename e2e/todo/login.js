
const {By, Key, Builder} = require("selenium-webdriver");
require("chromedriver");

const forMs = async (ms) => new Promise(resolve => setTimeout(() => resolve(), ms));

async function test_case() {
	let driver = await new Builder().forBrowser("chrome").build();

	await driver.get("http://localhost:3000/");

	await driver.findElement(By.linkText("LOG IN")).click();
	await driver.findElement(By.id("email")).sendKeys("tommy.sh500@gmail.com", Key.TAB);
	await driver.findElement(By.id("password")).sendKeys("password1234", Key.TAB, Key.TAB, Key.TAB, Key.ENTER, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ENTER, Key.TAB, Key.TAB, Key.TAB);


	// await driver.findElement(By.partialLinkText("Log")).click();
	await driver.findElement(By.xpath("//button[normalize-space()='Log in']")).click();

	await forMs(5000);



	await driver.quit();
}

test_case();