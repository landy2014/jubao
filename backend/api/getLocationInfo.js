/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/3/23
 *
 * ---------------------------------------------------
 */
const request = require('request');

function getLocationInfo(lat, lng, cb) {
  // http://lbs.qq.com/index.html 申请key
  let key = 'GDQBZ-YK43U-PDPVC-23CXY-W7OJK-USFQB';
  let location = lat + ',' + lng;

  let reqURL = 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + location + '&key=' + key + '&get_poi=1';

  request(reqURL, (err, res, body) => {
    cb(res.body);
  });
}

module.exports = getLocationInfo;