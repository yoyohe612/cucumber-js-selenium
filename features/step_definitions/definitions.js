let { Given, When, Then } = require('cucumber')
let { driver } = require('../support/web_driver')
let { By } = require('selenium-webdriver')

let assert = require('assert')

Given(/^open url "([^"]*)"$/, function (arg1) {
    return driver.get(arg1);
});

Then(/^I should get all values larger than (\d+)$/, async function (arg1) {
    let values = await driver.findElements(By.xpath("//*[starts-with(@id,'txt_val')]"));

    for (let value of values) {
        valueWithCurrency = await value.getText();
        valueWOCurrency = valueWithCurrency.slice(1); 
        assert.ok(Number(valueWOCurrency) > 0)
    }
});

Then(/^I should get all values with currencies$/, async function () {
    let values = await driver.findElements(By.xpath("//*[starts-with(@id,'txt_val')]"));
    for (let value of values) {
        valueWithCurrency = await value.getText();
        assert.ok(valueWithCurrency.startsWith("$"));
    }
});

Then(/^I should get the correct balance$/, async function () {
    let values = await driver.findElements(By.xpath("//*[starts-with(@id,'txt_val')]"));
    var sum = 0;
    for (let value of values) {
        valueWithCurrency = await value.getText();
        valueWOCurrency = valueWithCurrency.slice(1);
        sum += Number(valueWOCurrency);
    }

    let totalBalanceElement = await driver.findElement({ id: 'txt_ttl_val' });
    let totalBalanceText = await totalBalanceElement.getText();
    totalBalance = totalBalanceText.slice(1);
    assert.equal(sum,totalBalance);

});

Then(/^I should get correct number of values$/, async function () {
    let labels = await driver.findElements(By.xpath("//*[starts-with(@id,'lbl_val')]"));
    let values = await driver.findElements(By.xpath("//*[starts-with(@id,'txt_val')]"));
    sizeOflabels = labels.length;
    sizeOfValues = values.length;
    return assert.equal(sizeOflabels, sizeOfValues);
});

