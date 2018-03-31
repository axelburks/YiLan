module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "globals": {
    "__DEV__": true,
    "alert": true,
  },
  "env": {
    "jest": true
  },
  "rules": {
    "no-alert": 0,
    "class-methods-use-this": 0,
    "react/prop-types": [2, { ignore: ["navigation"], customValidators: [] }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
};