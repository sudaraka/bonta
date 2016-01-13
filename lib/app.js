/**
 * lib/app.js: main module for `bonta` CLI utility
 *
 * Copyright 2015, Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY;
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 */

(() => {
  'use strict';

  const
    cluster = require(`cluster`),
    path = require(`path`),
    growl = require(`growl`),

    INTERVAL = 25 * 60,  // In seconds

    formatInterval = (interval) => {
      let formatted = `${interval} second(s)`;

      if(60 < interval) {
        interval = parseInt(interval / 60, 10);

        formatted = `${interval} minute(s)`;
      }

      if(60 < interval) {
        interval = parseInt(interval / 60, 10);

        formatted = `${interval} hour(s)`;
      }

      return formatted;
    };


  module.exports = () => {

    if(cluster.isMaster) {
      cluster.fork();

      cluster.on(`exit`, () => {
        setTimeout(() => {
          cluster.fork();
        }, INTERVAL * 1000);
      });
    }
    else {
      growl(`It's time to Have a Drink break!!!`, {
        'title': `Been there for ${formatInterval(INTERVAL)}.`,
        'image': path.join(__dirname, `../assets/images/bottle.png`),
        'sticky': false
      });

      cluster.worker.kill();
    }

  };

})();
