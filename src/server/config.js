/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

const IS_DEV = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging';

const findUp = require('find-up');

if (IS_DEV) {
  require('dotenv').config({ path: findUp.sync('.env') });
}

const { version } = require(findUp.sync('package.json'));

////////////// CONFIG VARIABLES ///////////////
const APP_VERSION = `v${version}`;

// debug
const MINIFYED_REACT_JS = process.env.MINIFYED_REACT_JS !== 'false'; // default: true
const LOG_TO_CONSOLE = process.env.LOG_TO_CONSOLE !== 'false'; // default: true
const LOG_TO_FILE = process.env.LOG_TO_FILE === 'true'; // default: false
const LOG_TO_ROLLBAR = process.env.LOG_TO_ROLLBAR === 'true'; // default: false

// server
const SERVER_PORT = process.env.PORT || 3000;
const WEBPACK_PORT = 8085; // For dev environment only
const FORCE_HTTPS = process.env.FORCE_HTTPS === 'true'; // default: false

// analytics
const ROLLBAR_ACCESS_TOKEN_SERVER = process.env.ROLLBAR_ACCESS_TOKEN_SERVER;

// 3rd Party keys
const TWITTER_CONSUMER_KEY = '';
const TWITTER_CONSUMER_SECRET = '';
const TWITTER_TOKEN_KEY = '';
const TWITTER_TOKEN_SECRET = '';

module.exports = {
  APP_VERSION,
  IS_DEV,
  MINIFYED_REACT_JS,
  LOG_TO_CONSOLE,
  LOG_TO_FILE,
  LOG_TO_ROLLBAR,
  ROLLBAR_ACCESS_TOKEN_SERVER,
  SERVER_PORT,
  FORCE_HTTPS,
  WEBPACK_PORT,

  TWITTER: {
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    tokenKey: TWITTER_TOKEN_KEY,
    tokenSecret: TWITTER_TOKEN_SECRET,
  }
};
