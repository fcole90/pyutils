const assert = require('assert');
import bs from './src/basic_utils.js';
const { AssertionError } = require('assert');

it('should return true', () => {
  assert.equal(true, true)
})


const functionundertest = () => {throw new bs.AssertionError("Testing A")};

describe('Testing Error States', () => {
  it('Throws an error', () => {
    try {
      functionundertest(); // this should fail
      assert.fail('expected exception not thrown'); // this throws an AssertionError
    } catch (e) { // this catches all errors, those thrown by the function under test
                  // and those thrown by assert.fail
      if (e instanceof AssertionError) {
        // bubble up the assertion error
        throw e;
      }
      console.log("Message:")
      console.log(e);
      assert.equal(e.message, 'AssertionError: Testing A');
    }
  });
});

