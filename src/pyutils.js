/** Pyutils.
 *
 * Simple basic utils borrowed from Python builtins and libraries.
 *
 * @module pyutils
 */

/* Define the pyutils namespace */
let py = {};

//  -----------------------------------------------------
//  ------------------- Definitions ---------------------
//  -----------------------------------------------------
//  ---------------- Useful definitions. ----------------


/* Basic types (recognised by typeof) */
/**Javascript native basic type: number
 * @constant
 * @type {string}
 * @default
 **/
const TYPE_NUMBER = "number";
py.TYPE_NUMBER = TYPE_NUMBER;

/**Javascript native string type
 * @constant
 * @type {string}
 * @default
 **/
const TYPE_STRING = "string";
py.TYPE_STRING = TYPE_STRING;

/**Javascript native boolean type
 * @constant
 * @type {string}
 * @default
 **/
const TYPE_BOOLEAN = "boolean";
py.TYPE_BOOLEAN = TYPE_BOOLEAN;

/**Javascript basic bigint type
 * @constant
 * @type {string}
 * @default
 **/
const TYPE_BIGINT = "bigint";
py.TYPE_BIGINT = TYPE_BIGINT;

/**Javascript basic function type
 * @constant
 * @type {string}
 * @default
 **/
const TYPE_FUNCTION = "function";
py.TYPE_FUNCTION = TYPE_FUNCTION;

/**Javascript basic symbol type
 * @constant
 * @type {string}
 * @default
 **/
const TYPE_SYMBOL = "symbol";
py.TYPE_SYMBOL = TYPE_SYMBOL;

/**Javascript basic undefined type
 * @constant
 * @type {string}
 * @default
 **/
const TYPE_UNDEFINED = "undefined";
py.TYPE_UNDEFINED = TYPE_UNDEFINED;

/* Basic objects */
/**Javascript Object type
 * @constant
 * @type {string}
 * @default
 **/
const TYPE_OBJECT = "Object";
py.TYPE_OBJECT = "Object";


const TYPE_ARRAY = "Array";
py.TYPE_ARRAY = TYPE_ARRAY;


const TYPE_STRING_OBJECT = "String";
py.TYPE_STRING_OBJECT = TYPE_STRING_OBJECT;

const TYPE_NULL = "null";
py.TYPE_NULL = TYPE_STRING_OBJECT;

/* Additional library objects */
py.TYPE_PY_DICT = "Dictionary";

/* Type aliases */
py.True = true;
py.False = false;
py.None = null;




//  -----------------------------------------------------
//  ---------------------- Errors -----------------------
//  -----------------------------------------------------


/**
 * Defines a CustomError
 */
class CustomError extends Error {

    /**
     * Creates a custom error. This is an helper class aimed at creating custom errors.
     * @param {string|String} name - Name of the custom error.
     * @param [message] - Message to display
     * @param params
     */
    constructor(name, message=null, ...params) {
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
        //if (Error.captureStackTrace) {
        //    Error.captureStackTrace(this, CustomError)
        //}

        if (py.in(py.type(name), [py.TYPE_STRING_OBJECT, py.TYPE_STRING]) === false) {
            throw new TypeError(
                `name is not a string. Type: ${py.type(name)}`
            )
        }
        else {
            if (py.is_null_or_undefined(message)) {
                this.message = name;
                this.name = "CustomError";
            }
            else {
                this.message = message;
                this.name = name;
            }
         }
    }
}

py.CustomError = CustomError;


/**
 * AssertionError
 *
 * Thrown when an assert statement fails.
 */
class AssertionError extends py.CustomError {
    constructor(message=null, ...params) {
        super("AssertionError", message, ...params);
    }
}
py.AssertionError = AssertionError;


/**
 * KeyError
 *
 * Thrown when a mapping (dictionary) key is not found in the set of existing keys.
 */
class KeyError extends CustomError {
    constructor(message=null, ...params) {
        super("KeyError", message, ...params);
    }
}
py.KeyError = KeyError;


/**
 * RuntimeError
 *
 * Thrown when an error is detected that doesn’t fall in any of the other categories.
 * The associated value is a string indicating what precisely went wrong.
 */
class RuntimeError extends py.CustomError {
    constructor(message=null, ...params) {
        super("RuntimeError", message, ...params);
    }
}

py.RuntimeError = RuntimeError;


/**
 * ValueError
 *
 * Thrown when an operation or function receives an argument that has the right type but an inappropriate value,
 * and the situation is not described by a more precise exception such as KeyError.
 */
class ValueError extends py.CustomError {
    constructor(message=null, ...params) {
        super("ValueError", message, ...params);
    }
}
py.ValueError = ValueError;




//  -----------------------------------------------------
//  ---------------------- Classes ----------------------
//  -----------------------------------------------------


/**
 * A python-like dictionary class.
 *
 * TODO: continue implementation as https://docs.python.org/3.7/library/stdtypes.html#typesmapping
 */
class Dictionary {
    constructor(init_seq) {
        if (py.is_null_or_undefined(init_seq) === false){
            if (py.type(init_seq) === py.TYPE_ARRAY) {
                // If a proper list is provided, use it to initialise the dictionary
                for (let i = 0; i < init_seq.length; i++) {
                    let key_i, value_i;
                    [key_i, value_i] = init_seq[i];

                    if (py.not_in(py.type(key_i), [py.TYPE_STRING, py.TYPE_STRING_OBJECT])) {
                        TypeError(`Element key [${i}] = ${key_i} should be a string but is of type ${type(key_i)}`);
                    }
                    this[key_i] = value_i;
                }
            }
            else if (!py.is_null_or_undefined(Object.keys(init_seq))) {
                let keys = Object.keys(init_seq);
                for (let i = 0; i < keys.length; i++) {
                    this[keys[i]] = init_seq[keys[i]];
                }
            }
            else {
                throw new py.ValueError(`the given argument of type '${init_seq}' cannot be converted to dictionary.`);
            }
        }
    }

    clear() {
        let all_keys = this.keys();
        for (let i = 0; i < all_keys.length; i++) {
            delete this[all_keys[i]];
        }
    }

    del(key) {
        if (py.in(key, this.keys())) { delete this[key]; }
    }

    keys() {
        return Object.keys(this);
    }

    get(key, _default=null) {
        let val = this[key];

        if (val === undefined) {
            return _default;
        }
        else {
            return val;
        }
    }
}

py.Dictionary = Dictionary;




//  -----------------------------------------------------
//  -------------------- Aliases ------------------------
//  -----------------------------------------------------
//  ---- Aliases of functions to be easily called. ------
//  -----------------------------------------------------


/** Simple alias */
py.print = console.log;



//  -----------------------------------------------------
//  -------------------- Functions ----------------------
//  -----------------------------------------------------
//  --------- Function definitions of utilities. --------
//  --------------- In alphabetical order. --------------
//  -----------------------------------------------------


/**
 * Return the absolute value of a number. The argument may be an integer or a floating point number.
 * If x defines `__abs__()`, `abs(x)` returns `x.__abs__()`.
 *
 * __Note:__ It has no specific support for complex numbers yet.
 *
 * Python equivalent: {@link https://docs.python.org/3.9/library/functions.html#abs}
 * @param x {number}
 * @returns {number}
 */
function abs(x) {
    if (type(x.__abs__) === TYPE_FUNCTION) {
        return x.__abs__();
    }
    else {
        return Math.abs(x);
    }
}



/**
 * Convenient way to insert debugging assertions into a program.
 * @param {boolean} condition - Condition to test
 * @param {string} message - Message to display in case of failure
 * @param {ErrorConstructor} error_constructor - Type of error to display
 */
function assert(condition, message=null, error_constructor=py.AssertionError) {
    if (py.is_null_or_undefined(condition)) {
        throw new py.ValueError("the condition cannot be null");
    }
    else if (py.not_in(py.type(condition), [py.TYPE_BOOLEAN, py.TYPE_BOOLEAN_OBJECT])) {
        throw new py.ValueError(`the condition must be a boolean. Found: ${py.type(condition)}`);
    }

    if (py.is_not_null_or_undefined(message)) {
        message = py.str(message);
    }

    if (py.is_null_or_undefined(error_constructor)) {
        throw new py.ValueError();
    }

    if (condition === false) {
        throw new error_constructor(message);
    }
    else {
        return true;
    }
};
py.assert = assert;

py.assert_len = function(obj, expected_length, message=null, error_constructor=py.AssertionError) {
    const obj_len = py.len(obj);
    if (py.is_null_or_undefined(message)) {
        message = `Expected length ${expected_length} but found ${obj_len} instead.`
    }
    py.assert(obj_len === expected_length, message, error_constructor);
};

py.assert_type = function (obj, expected_types) {
    let obj_type = py.type(obj);
    if (py.in(py.type(expected_types), [py.TYPE_STRING, py.TYPE_STRING_OBJECT])) {
        py.assert(
            obj_type === expected_types,
            `Expected type '${expected_types}' but found '${obj_type}' instead.`,
            TypeError
        );
    }
    else if (py.type(expected_types) === py.TYPE_ARRAY) {
        py.assert(
            py.in(obj_type, expected_types),
            `Expected any of these types [${expected_types}] but found '${obj_type}' instead.`,
            TypeError
        );
    }
    else {
        throw new TypeError(py.type(expected_types));
    }
};


/**
 * Function to create dictionaries. Shorthand for `new Dictionary()`.
 * @param {Iterable.<Iterable>} init_seq
 * @returns {Dictionary}
 */
py.dict = function(init_seq) {
    return new Dictionary(init_seq);
};



/**
 * Checks whether the value is contained in the given sequence. Uses strict equality.
 * If an object is provided it checks against its values.
 *
 * @param {*} value - The value to check for membership
 * @param {Iterable.<*>} sequence - Sequence withing to search the value
 * @returns {boolean}
 */
py.in = function(value, sequence) {

    sequence = Object.values(sequence);

    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] === value) {
            return true;
        }
    }
    return false;
};

/**
 * Checks that the value is not contained in the given sequence. Uses strict equality.
 * @param {*} value - The value to check for membership
 * @param {Iterable.<*>} sequence - Sequence withing to search the value
 * @returns {boolean}
 */
py.not_in = function(value, sequence) {
    return !py.in(value, sequence);
};


/**
 * Checks if a variable is null or undefined.
 * @param {*} obj - A variable.
 * @returns {boolean}
 */
py.is_null_or_undefined = function(obj) {
    let obj_t = py.type(obj);
    return obj_t === py.TYPE_NULL || obj_t === py.TYPE_UNDEFINED;
};

py.is_not_null_or_undefined = function(obj) {
    return py.is_null_or_undefined(obj) === false;
};

/**
 *
 * @param obj
 * @returns {number}
 */
function len(obj) {
    let len_value = obj.length;
    if (py.is_null_or_undefined(len_value)) {
        throw new TypeError(`object of type '${py.type(obj)}' has no length`);
    }
    else if (py.type(len_value) !== py.TYPE_NUMBER) {
        throw new TypeError(`object of type '${py.type(obj)}' has length of type '${py.type(len_value)}' instead of '${py.TYPE_NUMBER}'`);
    }
    else {
        return obj.length;
    }
}
py.len = len;


/**
 * Provides the module path to a module.
 * @param path
 * @param module_name
 * @param extension
 * @returns {string}
 */
py.module_path = function(path, module_name, extension="mjs") {
    return `${path}/${module_name}.${extension}`;
};


/**
 * Returns a range iterator in the given range.
 * @generator
 * @param start {!number} - The starting value. If no
 * @param stop {?number}
 * @param step {?number}
 * @throws ValueError - If the step is 0
 * @yields {number}
 */
function* range(start, stop = null, step = 1) {
    if (step === 0) {
        throw new ValueError("The step cannot be 0");
    }
    if (stop === null) {
        stop = start;
        start = 0;
    }
    if (step === null) {
        step = 1;
    }
    if (stop > start) {
        for (let i = start; i < stop; i += step) {
            yield i;
        }
    }
    else {
        for (let i = start; i > stop; i += step) {
            yield i;
        }
    }

}
py.range = range;



py.str = function(value) {
    return String(value);
};


/**
 * Provides the type of an object in the most sensible way.
 * @param {*} obj - Any kind of object.
 * @returns {string|*|"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
 */
function type(obj) {
  // Null object
  if (obj === null) {
      return "null";
  }

  // Builtins
  if (typeof obj !== "object"){
      return typeof obj;
  }

  // Constructed objects
  if (obj.constructor.name !== "undefined") {
      return obj.constructor.name;
  }

  // Builtins objects
  if (Object.prototype.toString.call(obj) !== "[object Object]")
  {
      return Object.prototype.toString.call(obj).slice(8, -1);
  }

  return "object";
};
py.type = type;




//  -----------------------------------------------------
//  ------------------ Final export ---------------------
//  -----------------------------------------------------

export default py;
// export { bs };

















// /* --- Legacy ----

// Legacy functions. TODO: modernise or delete

//  */

// function s_print() {
//   let str = s => String(s);
//   let sep = " ";

//   if (arguments.length === 0) {
//       return "";
//   }

//   if (arguments.length === 1) {
//       return str(arguments[0]);
//   }

//   let print_str = "";
//   for (let i = 0; i < arguments.length - 1; i++) {
//       print_str += str(arguments[i]) + sep;
//   }
//   print_str += str(arguments[arguments.length - 1]);
//   return print_str;
// }

// let _print = print;

// function print() {
//   console.log(s_print(arguments));
// }

// function print_e() {
//     console.error(s_print(arguments));
// }


// // https://stackoverflow.com/a/18939803

// function set_logging() {
//     window.debug = {
//         log: window.console.log.bind(window.console, '%s: %s'),
//         error: window.console.error.bind(window.console, 'error: %s'),
//         info: window.console.info.bind(window.console, 'info: %s'),
//         warn: window.console.warn.bind(window.console, 'warn: %s')
//     };
// }

// let logging = {
//     "DEBUG": 0,
//     "INFO": 1,
//     "WARNING": 2,
//     "ERROR": 3,
//     "values": ["DEBUG", "INFO", "WARNING", "ERROR"]
// };

// // Default logging level
// logging.level = logging.DEBUG;

// logging.debug = function () {
//     if (logging.DEBUG >= logging.level) {
//         console.log("DEBUG:" + s_print(arguments));
//     }
// };

// logging.info = function () {
//     if (logging.INFO >= logging.level) {
//         console.log("INFO:" + s_print(arguments));
//     }
// };

// logging.warning = function () {
//     if (logging.WARNING >= logging.level) {
//         console.log("WARNING:" + s_print(arguments));
//     }
// };

// logging.error = function () {
//     if (logging.INFO >= logging.level)
//     console.log("INFO:" + s_print(arguments));
// };

// logging.get_current_level = function () {
//     return logging.values[logging.level];
// };






// function raise(message) {
//   if (typeof Error !== "undefined") {
//           throw new Error(message);
//       }
//       throw message; // Fallback
// }

// function assert(condition, message) {
//   if (condition !== true) {
//       message = message || "Assertion failed";
//       raise(message);
//   }
// }



