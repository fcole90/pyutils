'use strict';

module.exports = {
    "plugins": ["plugins/markdown"],
    "recurseDepth": 10,
    "source": {
        "include": [
            "./src/pyutils.js"
        ]
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    },
    "opts": {
        //"template": "templates/default",  // same as -t templates/default
        "encoding": "utf8",               // same as -e utf8
        "destination": "./docs/",         // same as -d ./out/
        "recurse": true,                  // same as -r
        "tutorials": "./additional_docs",   // same as -u path/to/tutorials
        //"package": "./package.json",
        "readme": "./README.md",
    }
};