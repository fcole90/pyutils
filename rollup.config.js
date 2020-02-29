let path = require("path");
const filename = "basic_utils";
export default {
    input: path.resolve(__dirname, "src", `${filename}.js`),
    output: [
      // Output 1 for Node.js in CJS format
      {
        file: path.resolve(__dirname, "dist", `${filename}.node.js`),
        format: 'cjs',
        name: 'node',
        exports: "default"
      },
      // Output 2 for Web ES6
      {
        file: path.resolve(__dirname, "dist", `${filename}.mjs`),
        format: 'es',
        name: 'es6module'
      }
    ]
  };