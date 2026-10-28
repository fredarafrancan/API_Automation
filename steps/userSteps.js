const assert = require('node:assert/strict');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('the API base url is configured', function () {
  this.apiBaseUrl =
    process.env.API_BASE_URL || 'https://fake-json-api.mock.beeceptor.com';
});

When('I send a {string} request to {string}', async function (method, path) {
  const url = new URL(path, this.apiBaseUrl);
  const response = await fetch(url, { method });

  this.responseStatus = response.status;
  this.responseBody = await response.json();
});

Then('the response status should be {int}', function (expectedStatus) {
  assert.equal(this.responseStatus, expectedStatus);
});

Then(
  'the response body should contain {string} with value {string}',
  function (propertyPath, expectedValue) {
    assert.equal(getProperty(this.responseBody, propertyPath), expectedValue);
  },
);

Then(
  'the response body should contain {string} with value {int}',
  function (propertyPath, expectedValue) {
    assert.equal(getProperty(this.responseBody, propertyPath), expectedValue);
  },
);

Then(
  'the response body property {string} should not be empty',
  function (propertyPath) {
    const value = getProperty(this.responseBody, propertyPath);
    assert.equal(typeof value, 'string');
    assert.notEqual(value.trim(), '');
  },
);

function getProperty(value, propertyPath) {
  return propertyPath.split('.').reduce((current, property) => {
    assert.ok(
      current !== null &&
        typeof current === 'object' &&
        Object.hasOwn(current, property),
      `Response body is missing property "${propertyPath}"`,
    );
    return current[property];
  }, value);
}
