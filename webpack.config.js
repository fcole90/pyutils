let path = require("path");
const filename = "basic_utils";

const node_config = {
  target: "node",
  mode: 'development',
  entry: path.resolve(__dirname, "src", `${filename}.js`),
  output: {
    filename: `${filename}.node.js`,
    publicPath: 'dist'
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
          }
        }
      ]
    }
};

const web_config =  {
    target: "web",
    mode: 'development',
    entry: path.resolve(__dirname, "src", `${filename}.js`),
    output: {
      filename: `${filename}.js`,
      publicPath: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
            }
          }
        ]
      }
  };

  // const web_module_config =  {
  //   target: "web",
  //   mode: 'development',
  //   entry: path.resolve(__dirname, "src", `${filename}.js`),
  //   output: {
  //     filename: `${filename}.mjs`,
  //     publicPath: 'dist'
  //   },
  //   module: {
  //       rules: [
  //           {
  //               test: /\.js$/,
  //               exclude: /node_modules/,
  //               use: {
  //                   loader: 'babel-loader',
  //                   options: {
  //                       presets: [
  //                         [
  //                           "@babel/preset-env",
  //                           {
  //                             "targets": {
  //                               "esmodules": true
  //                             }
  //                           }
  //                         ]
  //                       ]
  //                   }
  //           }
  //         }
  //       ]
  //     }
  // };

module.exports = [node_config, web_config] //, web_module_config];
