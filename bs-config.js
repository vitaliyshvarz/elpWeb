"use strict";

/// Export configuration options
module.exports = {
    "port": process.env.PORT || 3000,
    "files": "dist/**/*",
    "server": {
        "baseDir": "dist"
    },
    //"https": true,
    //"browser": ["google-chrome", "firefox"]
}
