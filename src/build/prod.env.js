/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   16/12/16
 *
 * ---------------------------------------------------
 */
var merge = require("webpack-merge");
module.exports = merge(require("./dev.env"), {
  NODE_ENV: '"production"'
});