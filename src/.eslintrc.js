module.exports = {
  "env": {
    "browser": true,
    "commonjs": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    sourceType: 'module'
  },
  "extends": "standard",
  plugins: [
    'html'
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": 0,
    "quotes": [
      "error",
      "single"
    ],
    "no-console": 0,
    "semi": [
      "error",
      "always"
    ],
    "no-mixed-spaces-and-tabs" : 0
  }
};