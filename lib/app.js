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

const
  cluster = require('cluster'),
  growl = require('growl');

module.exports = () => {
  'use strict';

  if(cluster.isMaster) {
    cluster.fork();

    cluster.on('exit', () => {
      setTimeout(() => {
        cluster.fork();
      }, 5000);
    });
  }
  else {
    console.log('It\'s time to take a drink');
    growl('It\'s time to take a drink');

    cluster.worker.kill();
  }
};
