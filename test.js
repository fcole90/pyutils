const assert = require('assert');
import bs from './src/basic_utils.js';
const { AssertionError } = require('assert');

it('should return true', () => {
  assert.equal(true, true)
})




describe('Custom Error class', () => {

  const throw_assertion_error = () => {throw new bs.AssertionError("Testing A")};

  it('Throws an error', () => {
    try {
      throw_assertion_error(); // this should fail
      assert.fail('Expected exception not thrown'); // this throws an AssertionError
    } catch (e) { // this catches all errors, those thrown by the function under test
                  // and those thrown by assert.fail
      if (e.message === "Expected exception not thrown") {
        throw e;
      }
      else{
        console.log("Message:")
        console.log(e.message);
        assert.equal(e.message, 'AssertionError: Testing A');
      }
      
    }
  });
});

