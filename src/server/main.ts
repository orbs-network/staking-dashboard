/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as winston from 'winston';
import * as config from './config';
import { genLogger } from './logger/LoggerFactory';
import { initServer } from './server';

async function main() {
  console.log(`*******************************************`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`config: ${JSON.stringify(config, null, 2)}`);
  console.log(`*******************************************`);

  const { LOG_TO_CONSOLE, LOG_TO_FILE, LOG_TO_ROLLBAR } = config;
  const logger: winston.Logger = genLogger(LOG_TO_CONSOLE, LOG_TO_FILE, LOG_TO_ROLLBAR);

  initServer(logger);
}

main();
