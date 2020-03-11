import * as core from '@actions/core';
import {findEgisonVersion} from './installer';
import {defaultVersion} from './default';

// ghc and cabal are installed directly to /opt so use that directlly instead of
// copying over to the toolcache dir.
const baseInstallDir = '/opt';

async function run() {
  try {
    let egisonVersion = core.getInput('egison-version');
    if (!egisonVersion) {
      egisonVersion = defaultVersion;
    }
    findEgisonVersion(baseInstallDir, egisonVersion);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
