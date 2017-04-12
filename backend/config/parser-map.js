/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/1/11
 *
 * ---------------------------------------------------
 */
let staticMap = require('../map/static-map.json');
let config = require('../config/production.json');

module.exports = function(pageName, extendName) {
  let page = pageName + '.' + extendName;

  for (let key in staticMap) {
    if (key === page) {
      page = staticMap[key];
    }
  }

  return '//' + config.domain.static + '/' + extendName + '/' + page;
};