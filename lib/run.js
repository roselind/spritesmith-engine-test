// Load in dependencies
var assert = require('assert');
var tests = require('./tests');

// Define our test runner
function spritesmithEngineTest(params) {
  // Assert and localize parameters
  assert(params, '`params` was not provided to `spritesmith-engine-test`');
  var engine = params.engine;
  assert(engine, '`params.engine` was not provided to `spritesmith-engine-test`');
  assert(params.engineName, '`params.engineName` was not provided to `spritesmith-engine-test`, ' +
    'please provide one (e.g. \'phantomjssmith\')');

  // If there is a test that we want to skip but don't recognize, complain and leave
  var testOverrides = params.tests || {};
  var actualTestKeys = Object.keys(testOverrides);
  actualTestKeys.forEach(function verifyTestKeyExists (testKey) {
    assert(tests[testKey], 'Unrecognized test key provided in `tests`: "' + testKey + '"');
  });

  // For each of our tests
  Object.keys(tests).forEach(function iterateTests (testKey) {
    // If the test is hidden, then skip it
    if (testKey[0] === '_') {
      return;
    }

    // Determine if we want to run the test or not
    var runTest = true;
    if (testOverrides.hasOwnProperty(testKey)) {
      runTest = testOverrides[testKey];
    }

    // If we want to run the test, then run it
    // DEV: We don't use `skip` since the test should never be run
    //   `skip` typically indicates a pending test, not one that never runs
    if (runTest) {
      tests[testKey](params);
    }
  });
  // if (testOptions.skipRidiculousImagesTest !== true) {
}

// Export the test function
module.exports = spritesmithEngineTest;
