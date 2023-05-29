
const { By, Key, Builder, until } = require("selenium-webdriver");
require("chromedriver");

const forMs = async (ms) => new Promise(resolve => setTimeout(() => resolve(), ms));

async function test_case() {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("http://localhost:3000/");

  // log in
  await driver.findElement(By.linkText("LOG IN")).click();
  await driver.findElement(By.id("email")).sendKeys("tommy.sh500@gmail.com", Key.TAB);
  await driver.findElement(By.id("password")).sendKeys("password1234", Key.TAB, Key.TAB, Key.TAB, Key.ENTER, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ENTER, Key.TAB, Key.TAB, Key.TAB);
  await driver.findElement(By.xpath("//button[normalize-space()='Log in']")).click();
  await forMs(2000);

  // navigate to my events
  await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath("//button[normalize-space()='My events']")))).click();
  await forMs(2000);

  // delete event
  await driver.wait(until.elementIsVisible(await driver.findElement(
    By.xpath('//div[contains(@class, "MuiCard-root") and contains(., "Spotkanie w break5")]//button[@data-testid="delete-event-button"]')))).click();
  await forMs(4000);

  // refresh my events page
  await driver.findElement(By.xpath("//button[normalize-space()='Dashboard']")).click();
  await forMs(4000);
  await driver.findElement(By.xpath("//button[normalize-space()='My events']")).click();
  await forMs(2000);

  await forMs(4000);
  await driver.quit();
}

test_case();