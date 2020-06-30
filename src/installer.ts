import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as fs from 'fs';

export function findEgisonVersion(baseInstallDir: string, version: string) {
  if (!baseInstallDir) {
    throw new Error('baseInstallDir parameter is required');
  }
  if (!version) {
    throw new Error('versionSpec parameter is required');
  }

  switch (process.platform) {
    case 'linux':
      _findEgisonVersionForLinux(baseInstallDir, version);
      break;
    default:
      throw new Error(`unsupported OS: ${process.platform}`);
  }
}

async function _findEgisonVersionForLinux(
  baseInstallDir: string,
  version: string
) {
  var tmpOutput = baseInstallDir + '/egison.deb';
  var revision = _packageRevisionOf(version);
  var debUrl = `https://raw.githubusercontent.com/egison/egison-package-builder/${revision}/packages/egison.x86_64.deb`;
  await exec.exec(`wget -O ${tmpOutput} ${debUrl}`);
  if (fs.existsSync(tmpOutput)) {
    await exec.exec(`sudo dpkg -i ${tmpOutput}`);
  } else {
    throw new Error(`cannot download egison ${version}`);
  }
  await io.rmRF(tmpOutput);
}

function _packageRevisionOf(version: string) {
  switch (version) {
    case '4.0.3':
      return '2a39d25c446b494d6abe50b824191d5da3175cc7';
    case '4.0.0':
      return '09b9229017513aefbec18eb2e11c2ba6717711bb';
    case '3.10.3':
      return '744e59bf2ac0828ed45ed71ff81cf29c2c2f0fca';
    case '3.9.4':
      return '3418c471b9a9649dc1e46cd2e23c09b0c04da7d9';
    default:
      throw new Error(`unsupported egison ${version}`);
  }
}
