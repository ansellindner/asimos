#!/usr/bin/env node

/**
 * ASIMOS
 * Copyright (c) 2016, INTERNAUT (MIT License)
 */

process.title = 'asimos';

var tty = require('../');

var conf = tty.config.readConfig()
  , app = tty.createServer(conf);
app.listen();
