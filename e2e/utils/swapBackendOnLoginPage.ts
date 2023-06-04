import { By, Key, Builder, WebDriver, until } from 'selenium-webdriver';
import { forMs } from './forMs';

export async function swapBackendOnLoginPage(driver: WebDriver, backend: string) {
  const index = backend === "io2central" ? 3 : (backend === "dionizos" ? 2 : 1); 
  if (index === 1)
    return;
  await driver.findElement(By.xpath(`//div[@id='backend']`)).click();
  await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath("//ul/li[1]"))));
  await forMs(500);
  await driver.findElement(By.xpath(`//ul/li[${index}]`)).click();
}
