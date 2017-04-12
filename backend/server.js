/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/1/11
 *
 * ---------------------------------------------------
 */
let pm2 = require('pm2');

let serverConfig = [{
    "name": "www-server",
    "script": "./config/app.js",
    "execMode": "cluster",
    "instances": 4,
    "watch": true,
    "maxMemoryRestart": "100M"
  }];

pm2.connect(function(err){
  if (err) { throw err; }

  pm2.start(serverConfig, function(err){
    pm2.disconnect();

    if (err) {
      throw err;
    } else {
      console.log('backend server starting...');
    }
  });
});
