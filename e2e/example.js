"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var selenium_webdriver_1 = require("selenium-webdriver");
// CHROMEDRIVER_EXE - path to chrome driver
// CHROME_EXE - path to chrome binary
// CICD - set to 1 if run on CI/CD pipeline
function test_case() {
    return __awaiter(this, void 0, void 0, function () {
        var driverSetup, customBinary, isPipeline, builder, chrome, chromeOptions, driver, _a, _b, _c, _d, searchBar;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    driverSetup = undefined;
                    customBinary = process.env['CHROME_EXE'];
                    isPipeline = process.env['CICD'] === '1';
                    if (!(customBinary !== undefined)) return [3 /*break*/, 2];
                    builder = new selenium_webdriver_1.Builder().forBrowser('chrome');
                    chrome = require('selenium-webdriver/chrome');
                    chromeOptions = new chrome.Options();
                    chromeOptions.setChromeBinaryPath(customBinary);
                    chromeOptions.addArguments('--disable-gpu');
                    if (isPipeline) {
                        chromeOptions.headless();
                        chromeOptions.addArguments('window-size=1920x1080');
                    }
                    builder.setChromeOptions(chromeOptions);
                    return [4 /*yield*/, builder.build()];
                case 1:
                    driverSetup = _e.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, new selenium_webdriver_1.Builder()
                        .forBrowser("chrome")
                        .build()];
                case 3:
                    driverSetup = _e.sent();
                    _e.label = 4;
                case 4:
                    driver = driverSetup;
                    return [4 /*yield*/, driver.get("https://www.duckduckgo.com")];
                case 5:
                    _e.sent();
                    _b = (_a = driver).wait;
                    _d = (_c = selenium_webdriver_1.until).elementIsVisible;
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id("search_form_input_homepage"))];
                case 6: return [4 /*yield*/, _b.apply(_a, [_d.apply(_c, [_e.sent()]) /* here: optional timeout? */])];
                case 7:
                    _e.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id("search_form_input_homepage"))];
                case 8:
                    searchBar = _e.sent();
                    searchBar.sendKeys("Selenium", selenium_webdriver_1.Key.RETURN);
                    setTimeout(function () {
                        driver.quit();
                        console.log("Finished");
                    }, 10000);
                    return [2 /*return*/];
            }
        });
    });
}
test_case();
