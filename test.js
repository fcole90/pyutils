const assert = require('assert');
import py from './src/pyutils.js';

function expect_exception(function_exception, expectation, exception_type, exception_expected_text) {
  const exception_not_thrown_msg = `Expected exception ${function_exception} not thrown`;
  it(expectation, () => {
    try {
      function_exception(); // this should fail
      assert.fail(exception_not_thrown_msg);
    } catch (e) {
      if (e.message === exception_not_thrown_msg) {
        throw e;
      }
      else{
        assert.equal(py.type(e), exception_type);
        assert.equal(e.message, exception_expected_text);
      }
    }
  });
}

// Main test function
function main() {
  describe('Custom Error class and its descendants', () => {
    // Custom Error
    class MyError extends py.CustomError {
      constructor(message=null, ...params) {
          super("", message, ...params);
      }
    }
    expect_exception(
      () => {throw new MyError("something")},  // Function throwing the exception
      "Throws a newly created MyError",  // What it does
      "MyError",  // Exception type
      "something",  // The error message we expect to receive
    );
    
    expect_exception(
      () => {throw new py.CustomError("something")},  // Function throwing the exception
      "Throws a CustomError with no name, and message 'something'",  // What it does,
      "CustomError",  // Exception type
      "something"  // The error message we expect to receive
    );
    
    expect_exception(
      () => {throw new py.CustomError(5, "something")},  // Function throwing the exception
      "Throws a TypeError because 'name' is not a string",  // What it does
      "TypeError",  // Exception type
      "name is not a string. Type: number"  // The error message we expect to receive
    );
    
    // Test Assertion Error
    expect_exception(
      () => {throw new py.AssertionError("something")},
      "Throws an AssertionError", 
      "AssertionError",
      "something"
    );
    
    // Test Key Error
    expect_exception(
      () => {throw new py.KeyError("something")},
      "Throws a KeyError", 
      "KeyError",
      "something"
    );
    
    // Test Value Error
    expect_exception(
      () => {throw new py.ValueError("something")},
      "Throws a ValueError", 
      "ValueError",
      "something"
    );
    
    // Test Runtime Error
    expect_exception(
      () => {throw new py.RuntimeError("something")},
      "Throws a RuntimeError", 
      "RuntimeError",
      "something"
    );
  });

  describe('Python functions and commands', () => {
    // Assert
    expect_exception(
      () => {py.assert(3 > 5)},
      "Throws an AssertionError", 
      "AssertionError",
      "AssertionError"
    );

  });

}


main();
