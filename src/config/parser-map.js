/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/1/11
 *
 * ---------------------------------------------------
 */
let staticMap = require('../map/static-map.json');
let config = require('../build/config');

module.exports = function(pageName, extendName) {
  let page = pageName + '.' + extendName;

  for (let key in staticMap) {
    if (key === page) {
      page = staticMap[key];
    }
  }

  return 'http://' + config.static.domain + config.platform + extendName + '/' + page;
};